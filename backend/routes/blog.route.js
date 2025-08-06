import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'
import { addBlog, deleteBlog, getBlogs, updateBlog } from '../controllers/blog.controller.js'

const router = express.Router()

router.route("/").get(getBlogs)
router.route("/add").post(isAuthenticated, addBlog)
router.route("/update/:blogId").put(isAuthenticated, updateBlog)
router.route("/delete/:blogId").delete(isAuthenticated, deleteBlog)

export default router