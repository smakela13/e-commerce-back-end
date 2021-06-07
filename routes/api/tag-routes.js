const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
  // be sure to include its associated Product data
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  }).then(tagData => res.json(tagData))
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
  // be sure to include its associated Product data
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  }).then(tagData => res.json(tagData))
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tagData => res.json(tagData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(tagData => {
    if (!tagData[0]) {
      res.status(404).json({ message: 'No entry found' });
      return;
    }
    res.status(200).json(tagData);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
      where: {
        id: req.params.id
      }
    }).then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No entry found' });
        return;
      }
      res.status(200).json(tagData)
    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
