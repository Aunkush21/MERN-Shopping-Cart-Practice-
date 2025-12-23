const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');
const { model } = require('mongoose');

// @route   GET api/items
// @desc    Get All Items
// @access  Public 

router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ date: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// @route   POST api/items
// @desc    POST items
// @access  Public 

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/id
// @desc    DELETE a Item
// @access  Public 

router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        msg: 'Item not found'
      });
    }

    res.json({
      success: true,
      msg: 'Item deleted'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;
