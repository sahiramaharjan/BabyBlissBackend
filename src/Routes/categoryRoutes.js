const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/authMiddleware");
const { authorizeRole } = require("../Middlewares/authorizeMiddleware");
const categoryController = require("../Controllers/categoryControllers");

/**
 * @description To get all categories
 * @api /api/category/create
 * @access PUBLIC
 * @type POST
 * @return response
 */

router.post(
  "/create",
  auth,
  authorizeRole("admin"),
  categoryController.addCategory
);
router.put(
  "/update/:id",
  auth,
  authorizeRole("admin"),
  categoryController.updateCategory
); // put will change every document
router.patch(
  "/update/:id",
  auth,
  authorizeRole("admin"),
  categoryController.updateCategory
); //patch will change specific document
router.get(
  "/get",
  auth,
  categoryController.getCategories
);
router.get(
  "/get/:id",
  auth,
  authorizeRole("admin"),
  categoryController.getCategory
);
router.delete(
  "/delete/:id",
  auth,
  authorizeRole("admin"),
  categoryController.deleteCategory
);

module.exports = router;
