const Cart = require("../../models/Cart");

exports.addItemToCart = (req, res) => {
  const userID = req.user._id?.toString();
  const cartObj = {
    user: userID,
    cartItems: req.body.cartItems,
  };
  Cart.find({ user: userID }).exec(async (error, result) => {
    if (error) return res.status(400).json({ error });
    if (result.length > 0) {
      const cart = result[0];
      // if cart already exists then update cart by quantity
      const product = req.body.cartItems.product;
      const addedItem = cart.cartItems?.find((c) => c.product == product);
      let condition, action;
      if (addedItem) {
        condition = { user: userID, "cartItems.product": product };
        action = {
          $set: {
            //to update that item only $
            "cartItems.$": {
              ...req.body.cartItems,
              quantity:
                parseInt(addedItem.quantity) +
                parseInt(req.body.cartItems.quantity),
            },
          },
        };
      } else {
        condition = { user: userID };
        action = { $push: { cartItems: req.body.cartItems } };
      }
      Cart.findOneAndUpdate(
        condition,
        action,
        {
          safe: true,
          new: true,
          upsert: true,
          projection: {},
          useFindAndModify: false,
        }
      ).exec((error, _cart) => {
        if (error) return res.status(400).json({ error });
        else if (_cart) return res.status(201).json({ _cart });
        else return res.status(400).json({ error: "Cart not found" });
      });
    }else {
      const cart = new Cart(cartObj);
      //create new cart
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) return res.status(201).json({ cart });
      });
    }
  });
};

exports.getCartItems = (req, res) => {
  //get all dataS
  Cart.find({}).exec((error, items) => {
    if (error) return res.status(400).json({ error });
    if (items) {
      return res.status(200).json({ items });
    }
  });
};
exports.getCartItem = (req, res) => {
  const itemId = req.params.itemId;
  if (itemId)
    Cart.findById(itemId).exec((error, item) => {
      if (error) return res.status(400).json({ error });
      if (item) return res.status(200).json({ item });
    });
  else return res.status(404).json({ message: "No item given." });
};
