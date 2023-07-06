const itemModel = require("../models/ItemModel");

const controllers = {
  listItems: async (req, res) => {
    // const items = await itemModel.find();
    // res.json(items);
    res.send("This is list!");
  },

  getItem: async (req, res) => {
    res.send("This is item!");

    // const itemID = req.params.itemID;
    // let item = null;

    // try {
    //   item = await itemModel.findById(itemID);
    // } catch (err) {
    //   res.statusCode = 500;
    //   return res.json();
    // }

    // if (!item) {
    //   console.log("does not exists");
    //   res.statusCode = 404;
    //   return res.json();
    // }
  },
};

module.exports = controllers;
