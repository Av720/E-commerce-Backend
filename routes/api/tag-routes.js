const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


router.get('/', (req, res) => {
  // this will find all the tags 
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
       
      }
    ]
  })
    .then(data => res.status(200).json(data)) 
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // this route will find a tag byt its id
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      }
    ]
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'There is no tag with that id!' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // this route will create a tag 
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.put('/:id', (req, res) => {
 //this route will update a tag using an 'id'
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data[0]) {
        res.status(404).json({ message: 'There is no tag with that id!' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.delete('/:id', (req, res) => {
  // this route will delete/destroy a tag but its "id"
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'There is no tag with that id!' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;