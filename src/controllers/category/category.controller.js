const Category = require("../../models/Category");
const slugify = require("slugify");

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
      // slug: cat.slug,
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
      const categoryList = createCategories(categories);
      return res.status(200).json({ categoryList });
    }
  });
};
exports.getCategoriesPaginate = (req, res) => {
  const pageNo = parseInt(req.params.page); // parseInt(req.query.pageNo)
  const size = parseInt(req.params.perPage);
  const query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1",
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;

  Category.find({},{}, query).exec((error, categories) =>{
    if (error) {
      console.log(error, "ERROR")
      return res.status(400).json({ error });
    }
    if (categories) {
      const categoryList = createCategories(categories);
      console.log(categoryList, "CATEGORIES list");
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

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    categoryImage: "",
  };
  if (req.file) {
    categoryObj.categoryImage = process.env.API + "/public/" + req.file;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const category = new Category(categoryObj);
  category.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) return res.status(201).json({ category });
  });
};

exports.editCategory = (req, res) => {
  const categoryID = req.body._id;
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    categoryImage: req.body.categoryImage?.toString(),
  };
  if (req.file) {
    categoryObj.categoryImage = process.env.API + "/public/" + req.file;
  }
  Category.findByIdAndUpdate(
    categoryID,
    categoryObj,
    { new: true, useFindAndModify: false },
    function (error, category) {
      if (error) return res.status(500).json({ error });
      else return res.status(200).json({ category });
    }
  );
};

exports.deleteCategory = (req, res) => {
  const categoryId = req.params.categoryID;
  if (categoryId)
    Category.findByIdAndDelete(
      categoryId,
      { useFindAndModify: false },
      function (error, category) {
        if (error) return res.status(400).json({ error });
        else return res.status(200).json({ category });
      }
    );
  else return res.status(404).json({ message: "No Category given." });
};
