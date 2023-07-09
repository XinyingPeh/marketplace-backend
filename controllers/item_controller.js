const itemModel = require("../models/ItemModel");

const controllers = {
  listItems: async (req, res) => {
    // res.send("This is list!");
    const items = await itemModel.find();
    res.json(items);
  },

  getItem: async (req, res) => {
    // res.send("This is item!");
    const itemID = req.params.itemID;
    let item = null;
    try {
      // use model to find by id
      item = await itemModel.findById(itemID);
    } catch (err) {
      // if any error -> return response 500
      res.statusCode = 500;
      return res.json();
    }

    // if not exists -> return response 404
    if (!item) {
      console.log("does not exist");
      res.statusCode = 404;
      return res.json();
    }
    console.log("success");

    // return json response of the fetched data
    return res.json(item);
  },
};

module.exports = controllers;
