import { Body, Caption, Container, Title } from "../../router";
import { AiOutlinePropertySafety } from "react-icons/ai";
import PropTypes from "prop-types";

export const User1 = "https://cdn-icons-png.flaticon.com/128/6997/6997662.png";
export const User2 = "https://cdn-icons-png.flaticon.com/128/236/236832.png";
export const User3 = "https://cdn-icons-png.flaticon.com/128/236/236831.png";
export const User4 = "https://cdn-icons-png.flaticon.com/128/1154/1154448.png";

export const Hero = () => {
  return (
    <>
      <section className="hero bg-primary py-8">
        <Container className="flex items-center justify-between md:flex-row flex-col">
          <div className="w-full md:w-1/2 text-white pr-12">
            <Title level={3} className="text-white">
              Build, sell & collect digital items.
            </Title>
            <Body className="leading-7 text-gray-200 my-8">
              
            </Body>
            
            <div className="flex items-center gap-8 my-8">
              <div>
                <Title level={4} className=" text-white">
                  
                </Title>
                <Body className="leading-7 text-gray-200"> </Body>
              </div>
              <div>
                <Title level={4} className=" text-white">
                  
                </Title>
                <Body className="leading-7 text-gray-200"> </Body>
              </div>
              <div>
                <Title level={4} className=" text-white">
                  
                </Title>
                <Body className="leading-7 text-gray-200"> </Body>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 my-16 relative py-16">
            <img src="../images/home/hero.webp" alt="" />
            <div className="horiz-move absolute md:top-28 top-8 left-0">
              {/* <Box title="" desc="" /> */}
            </div>
            <div className="horiz-move absolute bottom-72 right-0">
              {/* <Box title="" desc="" /> */}
            </div>

            {/* <div className="px-5 py-4 bg-white shadow-md flex items-center gap-5 rounded-xl ml-5 -mt-5 vert-move w-1/2"> */}
              <Title></Title>
              <div className="flex items-center">
                {/* <ProfileCard className="border-2 border-white"> */}
                  {/* <img src={User1} alt="User1" className="w-full h-full object-cover" /> */}
                {/* </ProfileCard> */}
                {/* <ProfileCard className="border-2 border-white -ml-4"> */}
                  {/* <img src={User2} alt="User1" className="w-full h-full object-cover" /> */}
                {/* </ProfileCard> */}
                {/* <ProfileCard className="border-2 border-white -ml-4"> */}
                  {/* <img src={User3} alt="User1" className="w-full h-full object-cover" /> */}
                {/* </ProfileCard> */}
                {/* <ProfileCard className="border-2 border-white -ml-4"> */}
                  {/* <img src={User4} alt="User1" className="w-full h-full object-cover" /> */}
                {/* </ProfileCard> */}

                {/* <ProfileCard className="border-2 border-white -ml-4">
                  <CiCirclePlus size={27} />
                </ProfileCard> */}
              {/* </div> */}
            </div>
          </div>
        </Container>
      </section>
      <div className="bg-white w-full py-16 -mt-10 rounded-t-[40px]"></div>
    </>
  );
};

const Box = ({ title, desc }) => {
  return (
    <>
      <div className="px-5 py-4 bg-white shadow-md flex items-center gap-5 rounded-xl w-auto">
        <div className="w-14 h-14 bg-green_100 flex items-center justify-center rounded-full">
          <AiOutlinePropertySafety size={27} className="text-primary" />
        </div>
        <div>
          <Title>{title}</Title>
          <Caption>{desc}</Caption>
        </div>
      </div>
    </>
  );
};

Box.propTypes = {
  title: PropTypes.any,
  desc: PropTypes.any,
};