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
exports.getCategories = (req, res) => {
  //get all data
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) return res.status(200).json({ categories });
  });
};
