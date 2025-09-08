const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

const createCategory = asyncHandler(async (req, res) => {
    try{
        const existingCategory = await Category.findOne({title:req.body.title});
        if(existingCategory){
            return res.status(400).json({message:"Category with this title already exists"});
        }
        const category = await Category.create({
            user:req.user._id,
            title:req.body.title,
        });

        res.json(category);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
});

const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const catagories = await Category.find({}).populate("user").sort("-createdAt");
        res.json(catagories);
    } catch (error) {
        res.json(error);
    }
});

const getCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const catagories = await Category.findById(id).populate("user").sort("-createdAt");
        res.json(catagories);
    } catch (error) {
        res.json(error);
    }
});


const updateCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const catagories = await Category.findByIdAndUpdate(id , {
            title:req?.body?.title,
        },{
            new:true,
            runValidators:true,
        });
        res.json(catagories);
    } catch (error) {
        res.json(error);
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json({message : "Category deleted successfully"});
    } catch (error) {
        res.json(error);
    }
});

module.exports = {
    createCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteCategory,
}