import { Category } from "../models/category.model.js";

export const addCategory = async (req,res) => {
    try {
        const {name, description,  author} = req.body;

    if(!name || !description){
        return res.status(400).json({
            success:false,
            message:"All Fields are Requires"
        })
    }

    const isNameAlready = await Category.findOne({ name });

    if(isNameAlready){
        return res.status(400).json({
            success:false,
            message:"category name alreay exists"
        })
    }

    await Category.create({
        name,
        description,
        author,
    })

    return res.status(201).json({
        success: true,
        message: "Category addedd successfully",
      });

    } catch (error) {
        console.log(error)
    }

}

export const allCategories = async (_,res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories)
    } catch (error) {
        console.log(error)
    }
}

export const updateCategory = async (req,res)=>{
  try {
    const {categoryId} = req.params
    const {name} = req.body
    const {description} = req.body

    const category = await Category.findByIdAndUpdate(categoryId, {name, description} , {new:true})

   

    return res.status(200).json({
        success:true,
        message:"category updated Successfully",
        category,
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteCategory = async (req,res) =>{
   try {
    const {categoryId} = req.params
    await Category.findByIdAndDelete(categoryId)

    return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
    })
   } catch (error) {
    console.log(error)
   }
}