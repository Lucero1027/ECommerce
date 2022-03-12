const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id,
      // be sure to include its associated Products
      {
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock']
          },
        ]
      });
    if (category) {
      res.status(200).json(category);
    } else {
      console.log('Not found!');
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    )
    
    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200);
  } catch(error) {
    res.status(400).json(error);
  }
});

module.exports = router;
