const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/productModel");
const BiddingProduct = require("../models/biddingModel");

const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category, height, lengthPic, width, mediumused, weight } = req.body;
    const userId = req.user.id;

    const originalSlug = slugify(title, {
        lower: true,
        remove: /[+~.()'"!:@]/g,
        strict: true,
    });
    let slug = originalSlug;
    let suffix = 1;

    while (await Product.findOne({ slug })) {
        slug = $`{originalSlug}-${suffix}`;
        suffix++;
    }

    if (!title || !description || !price) {
        res.status(400);
        throw new Error("Please fill out all required fields");
    }

    let fileData = {}
    if (req.file) {
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Bidding/Product",
                resource_type: "image",
            });
        }
        catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded");
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            public_id: uploadedFile.public_id,
        };
    }

    const product = await Product.create({
        user: userId,
        title,
        slug: slug,
        description,
        category,
        price,
        height,
        lengthPic,
        width,
        mediumused,
        weight,
        image: fileData,
        createdAt: new Date(),
        endTime: new Date(Date.now() + 60 * 1000) // 1 minute from now
    });
    res.status(201).json({
        success: true,
        data: product,
    });
});

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort("-createdAt").populate("user");
  
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
        const biddingPrice = latestBid ? latestBid.price : product.price;
  
        const totalBids = await BiddingProduct.countDocuments({ product: product._id });
  
        return {
          ...product._doc,
          biddingPrice,
          totalBids, // Adding the total number of bids
        };
      })
    );
  
    res.status(200).json(productsWithDetails);
  });
  

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.user?.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    if (product.image && product.image.public_id) {
        try {
            await cloudinary.uploader.destroy(product.image.public_id)
        } catch (error) {
            console.log(error);

            res.status(500);
            throw new Error("Error deleting image from cloudinary");
        }
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category, height, lengthPic, width, mediumused, weight } = req.body;
    const { id } = req.params;


    const product = await Product.findById(id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (product.user?.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    let fileData = {}
    if (req.file) {
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Bidding/Product",
                resource_type: "image",
            });
        }
        catch (error) {
            res.status(500);
            throw new Error("Image could not be uploaded");
        }
        if (product.image && product.image.public_id) {
            try {
                await cloudinary.uploader.destroy(product.image.public_id)
            } catch (error) {
                console.log(error);

                res.status(500);
                throw new Error("Error deleting image from cloudinary");
            }
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            public_id: uploadedFile.public_id,
        };
    }

    const updateProduct = await Product.findByIdAndUpdate(
        {
            _id: id,
        },
        {
            title,
            description,
            category,
            price,
            height,
            lengthPic,
            width,
            mediumused,
            weight,
            image: Object.keys(fileData).length === 0 ? Product?.image : fileData,
        }, {
        new: true,
        runValidators: true,
    }
    );
    res.status(201).json(updateProduct);
});
  

const getAllProductsOfUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const products = await Product.find({ user: userId }).sort("-createdAt").populate("user");
  
    const productsWithPrices = await Promise.all(
      products.map(async (product) => {
        const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
        const biddingPrice = latestBid ? latestBid.price : product.price;
        return {
          ...product._doc,
          biddingPrice, // Adding the price field
        };
      })
    );
  
    res.status(200).json(productsWithPrices);
  });

    const verifyAndAddCommisionInProductByAdmin = asyncHandler(async (req, res) => {
    const {commission} = req.body;
    const {id} = req.params;

    const product = await Product.findById(id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const now = new Date();
    product.isVerify = true;
    product.commission = commission;
    product.verificationTime = now;
    product.endTime = new Date(now.getTime() + 60 * 1000); // 1 minute from verification

    await product.save();

    res.status(200).json({message:"Product verified successfully." , data : product});
});

const getWonProducts = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const wonProducts = await Product.find({ soldTo: userId }).sort("-createdAt").populate("user");
  
    const productsWithPrices = await Promise.all(
      wonProducts.map(async (product) => {
        const latestBid = await BiddingProduct.findOne({ product: product._id }).sort("-createdAt");
        const biddingPrice = latestBid ? latestBid.price : product.price;
        return {
          ...product._doc,
          biddingPrice, // Adding the price field
        };
      })
    );
  
    res.status(200).json(productsWithPrices);
  });

    const getAllProductsByAdmin = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort("-createdAt").populate("user");


    res.json(products);
});

    const deleteProductByAdmin = asyncHandler(async (req, res) => {
        const { productIds } = req.body;
        const product = await Product.findById(id);
    
        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }
    
        //now delete product from cloudinary
        if (product.image && product.image.public_id) {
            try {
                await cloudinary.uploader.destroy(product.image.public_id)
            } catch (error) {
                console.log(error);
    
                res.status(500);
                throw new Error("Error deleting image from cloudinary");
            }
        }
    
        await Product.findByIdAndDelete(productIds);
        res.status(200).json({ message: "Product deleted successfully" });
});

    const getProduct= asyncHandler(async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate("user");
    
        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }
        
        res.status(200).json(product);
});

    const getAllSoldProducts = asyncHandler(async (req, res) => {

        const products = await Product.find({isSoldout:true}).sort("-createdAt").populate("user");
        
        res.json(products);
});

    const test = asyncHandler(async (req, res) => {
    res.send("test");
});

const endProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    product.isEnded = true;
    await product.save();

    res.status(200).json({ message: "Product auction ended successfully" });
});

module.exports = {
    createProduct,
    getAllProducts,
    getWonProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    getAllProductsOfUser,
    verifyAndAddCommisionInProductByAdmin,
    getAllProductsByAdmin,
    deleteProductByAdmin,
    getAllSoldProducts,
    endProduct,
};