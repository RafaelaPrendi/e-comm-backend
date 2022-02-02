const Category = require("../../models/Category");
const slugify = require("slugify");

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const category = new Category(categoryObj);
  category.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) return res.status(201).json({ category });
  });
};
const createCategories = (categories, parentId = null) => {
  let categoryList = [];
  let filteredcategory;
  if (parentId == null) {
    filteredcategory = categories.filter((cat) => cat.parentId == undefined);
  } else {
    filteredcategory = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cat of filteredcategory) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: createCategories(categories, cat._id),
    });
  }
  return categoryList;
};
exports.getCategories = (req, res) => {
  //get all data
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories, );
      return res.status(200).json({ categoryList });
    }
  });
};
exports.getCategory = (req, res) => {
  const categoryId = req.params.categoryID;
  if (categoryId)
    Category.findById(categoryId).exec((error, category) => {
      if (error) return res.status(400).json({ error });
      if (category) return res.status(200).json({ category });
    });
  else return res.status(404).json({ message: "No Category given." });
};
