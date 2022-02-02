const Product = require("../../models/Product");
const slugify = require("slugify");
const shortid = require("shortid");

exports.addProduct = (req, res) => {
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((f) => {
      return { img: f.filename };
    });
  }
  const productObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
    offer: req.body.offer,
    productPictures: productPictures,
    createdBy: req.user._id,
    category: req.body.category,
  };
  const product = new Product(productObj);
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) return res.status(201).json({ product });
  });
};
exports.getProducts = (req, res) => {
  //get all data
  product.find({}).exec((error, products) => {
    if (error) return res.status(400).json({ error });
    if (products) {
      const productList = createProducts(products);
      return res.status(200).json({ productList });
    }
  });
};
exports.getProduct = (req, res) => {
  const productId = req.params.productID;
  if (productId)
    product.findById(productId).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) return res.status(200).json({ product });
    });
  else return res.status(404).json({ message: "No product given." });
};
