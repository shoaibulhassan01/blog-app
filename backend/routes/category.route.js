import express from 'express'
import { addCategory, allCategories, deleteCategory, updateCategory } from '../controllers/category.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/").get(allCategories)
router.route("/add").post(isAuthenticated,   addCategory)
router.route('/update/:categoryId').put(isAuthenticated,  updateCategory)
router.route('/delete/:categoryId').delete(isAuthenticated,  deleteCategory)

export default router