import { Blog } from "../models/blog.model.js";

export const addBlog = async (req,res) =>{
    try {
        const { title, content, author, categories, tags, featuredImage, isPublished } = req.body;


        if(!title || !content || !featuredImage || !author || !categories){
            return res.status(403).json({
                success:false,
                message:"All Fields are Required"
            })
        }

        const newBlog = new Blog({
            title,
            content,
            author,
            categories,
            tags,
            featuredImage,
            isPublished,
            publishedAt: isPublished ? new Date() : null,
          });
      
          await newBlog.save();

          return res.status(200).json({
            success:true,
            message:"Blog Added Successfully"
          })

    } catch (error) {
        consolr.log(error)
    }
}

export const getBlogs = async (req,res) =>{
   try {
    const blogs = await Blog.find()
    res.status(200).json(blogs)

   } catch (error) {
    console.log(error)
   }

}


export const updateBlog = async (req,res) =>{
  try {
    const {blogId} = req.params
    const {title} = req.body
    const {content} = req.body
    const {featuredImage} = req.body
    const {tags} = req.body

    if(!title || !content || !featuredImage || !tags){
        return res.status(403).json({
            success:false,
            message:"All Fields are Required"
        })
    }

    const blog = await Blog.findByIdAndUpdate(blogId, {title, content, featuredImage, tags}, {new: true})

    return res.status(200).json({
        success:true,
        message:"Blog Updates Successfully",
        blog,
    })
  } catch (error) {
    console.log(error)
  }
}


export const deleteBlog = async (req, res) =>{
   try {
    const {blogId} = req.params
    await Blog.findByIdAndDelete(blogId)
    return res.status(200).json({
        success:true,
        message:"Blog Deleted Successfuly"
    })
   } catch (error) {
    console.log(error);
    
   }
} 