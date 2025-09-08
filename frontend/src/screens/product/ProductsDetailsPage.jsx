import { Body, Caption, Container, DateFormatter, Loader, Title } from "../../router";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { commonClassNameOfInput } from "../../components/common/Design";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/features/productSlice";
import { useParams } from "react-router-dom";
import { fetchBiddingHistory, placeBid } from "../../redux/features/biddingSlice";
import { toast } from "react-toastify";

export const ProductsDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, isLoading } = useSelector((state) => state.product);
  const { history } = useSelector((state) => state.bidding);
  const { user } = useSelector((state) => state.auth);

  const [rate, setRate] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [minBidAmount, setMinBidAmount] = useState(0);

  const isProductCreator = user?._id === product?.user?._id;

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(fetchBiddingHistory(id));
  }, [dispatch, id]);

  // Calculate minimum bid amount based on current highest bid
  useEffect(() => {
    if (history && history.length > 0) {
      const highestBid = Math.max(...history.map((bid) => bid.price));
      setMinBidAmount(highestBid + 1); // Set minimum bid to highest bid + 1
      setRate(highestBid + 1); // Set initial rate to minimum bid
    } else if (product) {
      setMinBidAmount(product.price);
      setRate(product.price);
    }
  }, [history, product]);

  // Initialize and update the timer
  useEffect(() => {
    if (!product) return;

    if (product.isEnded) {
      setTimeLeft(0);
      setIsEnded(true);
      return;
    }

    if (!product.isVerify) {
      setTimeLeft(0);
      return;
    }

    if (product.isSoldout) {
      setTimeLeft(0);
      return;
    }

    const endTime = new Date(product.endTime).getTime() + 90000;
    const now = new Date().getTime();
    const initialTimeLeft = Math.max(0, endTime - now);
    
    if (initialTimeLeft <= 0) {
      setTimeLeft(0);
      setIsEnded(true);
      return;
    }
    
    setTimeLeft(initialTimeLeft);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const remaining = Math.max(0, endTime - now);
      
      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        setIsEnded(true);
        try {
          fetch(`/api/products/${id}/end`, { method: 'PUT' });
        } catch (error) {
          console.error('Failed to update product end status:', error);
        }
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [product, id]);

  const incrementBid = () => {
    setRate(prevRate => Math.max(prevRate + 1, minBidAmount));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const save = async (e) => {
    e.preventDefault();

    if (rate < minBidAmount) {
      return toast.error(`Your bid must be at least ₹${minBidAmount}`);
    }

    const formData = {
      price: rate,
      productId: id,
    };

    try {
      await dispatch(placeBid(formData)).unwrap();
      dispatch(fetchBiddingHistory(id));
      // Update minimum bid amount after successful bid
      setMinBidAmount(rate + 1);
    } catch (error) {
      return toast.error("An error occurred while placing bid");
    }
  };

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="pt-24 px-8">
        <Container>
          <div className="flex justify-between gap-8">
            <div className="w-1/2">
              <div className="h-[70vh] relative">
                <img src={product?.image?.filePath} alt="" className="w-full h-full object-cover rounded-xl" />
                {isEnded && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                    Ended
                  </div>
                )}
              </div>
            </div>
            <div className="w-1/2">
              <Title level={2} className="capitalize">
                {product?.title}
              </Title>
              <div className="flex gap-5">
                <div className="flex text-green ">
                  <IoIosStar size={20} />
                  <IoIosStar size={20} />
                  <IoIosStar size={20} />
                  <IoIosStarHalf size={20} />
                  <IoIosStarOutline size={20} />
                </div>
                {/* <Caption>(2 customer reviews)</Caption> */}
              </div>
              <br />
              <Body>{product?.description.slice(0, 150)}...</Body>
              <br />
              <Caption>Item condition: New</Caption>
              <br />
              <Caption>Item Verifed: {product?.isVerify ? "Yes" : "No"}</Caption>
              <br />
              <Caption>Time left:</Caption>
              <br />
              {!product?.isVerify ? (
                <div className="bg-yellow-100 text-yellow-600 p-4 rounded-lg text-center font-medium">
                  Timer will start after product verification
                </div>
              ) : isEnded ? (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center font-medium">
                  Auction has ended
                </div>
              ) : (
                <>
                  <div className="flex gap-8 text-center">
                    <div className="p-5 px-10 shadow-s1">
                      <Title level={4}>{days}</Title>
                      <Caption>Days</Caption>
                    </div>
                    <div className="p-5 px-10 shadow-s1">
                      <Title level={4}>{hours}</Title>
                      <Caption>Hours</Caption>
                    </div>
                    <div className="p-5 px-10 shadow-s1">
                      <Title level={4}>{minutes}</Title>
                      <Caption>Minutes</Caption>
                    </div>
                    <div className="p-5 px-10 shadow-s1">
                      <Title level={4}>{seconds}</Title>
                      <Caption>Seconds</Caption>
                    </div>
                  </div>
                </>
              )}
              <br />
              <Title className="flex items-center gap-2">
                Auction {isEnded ? 'ended' : 'ends'}:
                <Caption> 
                  {product?.endTime ? (
                    <DateFormatter date={product.endTime} />
                  ) : (
                    "Pending verification"
                  )}
                </Caption>
              </Title>
              <Title className="flex items-center gap-2 my-5">
                Timezone: <Caption>UTC 0</Caption>
              </Title>
              <Title className="flex items-center gap-2 my-5">
                Price:<Caption>₹{product?.price} </Caption>
              </Title>
              <Title className="flex items-center gap-2">
                Current bid:<Caption className="text-3xl">₹{rate} </Caption>
              </Title>
              <div className="p-5 px-10 shadow-s3 py-8">
                {isProductCreator ? (
                  <div className="bg-yellow-100 text-yellow-600 p-4 rounded-lg text-center font-medium">
                    You cannot bid on your own product
                  </div>
                ) : (
                  <form onSubmit={save} className="flex gap-3 justify-between">
                    <div className="flex-1">
                      <input 
                        className={commonClassNameOfInput} 
                        type="number" 
                        name="price" 
                        value={rate} 
                        onChange={(e) => setRate(Math.max(Number(e.target.value), minBidAmount))}
                        min={minBidAmount}
                        disabled={isEnded || product?.isSoldout || !product?.isVerify} 
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Minimum bid amount: ₹{minBidAmount}
                      </p>
                    </div>
                    <button 
                      type="button" 
                      onClick={incrementBid} 
                      className={`bg-gray-100 rounded-md px-5 py-3 ${
                        isEnded || product?.isSoldout || !product?.isVerify ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isEnded || product?.isSoldout || !product?.isVerify}
                    >
                      <AiOutlinePlus />
                    </button>
                    <button 
                      type="submit"
                      className={`py-3 px-8 rounded-lg ${
                        isEnded || product?.isSoldout || !product?.isVerify 
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
                          : "bg-green text-white"
                      }`}
                      disabled={isEnded || product?.isSoldout || !product?.isVerify}
                    >
                      {isEnded ? 'Auction Ended' : 'Place Bid'}
                    </button>
                  </form>
                )}
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Caption className="text-gray-600">Seller</Caption>
                    <Title level={4}>{product?.user?.name}</Title>
                  </div>
                  {isProductCreator && (
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      Your Product
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="details mt-8">
            <div className="flex items-center gap-5">
              <button className={`rounded-md px-10 py-4 text-black shadow-s3 ${activeTab === "description" ? "bg-green text-white" : "bg-white"}`} onClick={() => handleTabClick("description")}>
                Description
              </button>
              <button className={`rounded-md px-10 py-4 text-black shadow-s3 ${activeTab === "auctionHistory" ? "bg-green text-white" : "bg-white"}`} onClick={() => handleTabClick("auctionHistory")}>
                Auction History
              </button>
              <button className={`rounded-md px-10 py-4 text-black shadow-s3 ${activeTab === "reviews" ? "bg-green text-white" : "bg-white"}`} onClick={() => handleTabClick("reviews")}>
                Reviews
              </button>
              <button className={`rounded-md px-10 py-4 text-black shadow-s3 ${activeTab === "moreProducts" ? "bg-green text-white" : "bg-white"}`} onClick={() => handleTabClick("moreProducts")}>
                More Products
              </button>
            </div>

            <div className="tab-content mt-8">
              {activeTab === "description" && (
                <div className="description-tab shadow-s3 p-8 rounded-md">
                  <Title level={4}>Description</Title>
                  <br />
                  <Caption className="leading-7">
                    {product?.description}
                  </Caption>

                  <br />
                  <Title level={4}>Product Overview</Title>
                  <div className="flex justify-between gap-5">
                    <div className="mt-4 capitalize w-1/2">
                      <div className="flex justify-between border-b py-3">
                        <Title>category</Title>
                        <Caption>{product?.category}</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>height</Title>
                        <Caption> {product?.height} (cm)</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>length</Title>
                        <Caption> {product?.lengthpic} (cm)</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>width</Title>
                        <Caption> {product?.width} (cm)</Caption>
                      </div>
                      <div className="flex justify-between border-b py-3">
                        <Title>weight</Title>
                        <Caption> {product?.weight} (kg)</Caption>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>medium used</Title>
                        <Caption> {product?.mediumused} </Caption>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>Price</Title>
                        <Caption> ₹{product?.price} </Caption>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>Sold out</Title>
                        {product?.isSoldout ? <Caption>Sold out</Caption> : <Caption>On Stock</Caption>}
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>verify</Title>
                        {product?.isVerify ? <Caption>Yes</Caption> : <Caption>No</Caption>}
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <Title>Create At</Title>
                        <Caption> <DateFormatter date={product?.createdAt} /> </Caption>
                      </div>
                      <div className="flex justify-between py-3">
                        <Title>Update At</Title>
                        <Caption><DateFormatter date={product?.updtedAt} /> </Caption>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="h-[60vh] p-2 bg-green rounded-xl">
                        <img src={product?.image?.filePath} alt="" className="w-full h-full object-cover rounded-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "auctionHistory" && <AuctionHistory history={history} />}
              {activeTab === "reviews" && (
                <div className="reviews-tab shadow-s3 p-8 rounded-md">
                  <Title level={5} className=" font-normal">
                    Reviews
                  </Title>
                  <hr className="my-5" />
                  <Title level={5} className=" font-normal text-red-500">
                    Coming Soon!
                  </Title>
                </div>
              )}
              {activeTab === "moreProducts" && (
                <div className="more-products-tab shadow-s3 p-8 rounded-md">
                  <h1>More Products</h1>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export const AuctionHistory = ({ history }) => {
  return (
    <>
      <div className="shadow-s1 p-8 rounded-lg">
        <Title level={5} className=" font-normal">
          Auction History
        </Title>
        <hr className="my-5" />
        {history?.length === 0 ? (
          <h2 className="m-2">No Bidding Record Found!</h2>
        ) : (
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-5">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bid Amount(USD)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Auto
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                    <td className="px-6 py-4"><DateFormatter date={item?.createdAt} /></td>
                    <td className="px-6 py-4">₹{item?.price}</td>
                    <td className="px-6 py-4">{item?.user?.name}</td>
                    {/* <td className="px-6 py-4"> </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};