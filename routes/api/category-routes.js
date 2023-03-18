const router = require("express").Router();
const { Category, Product } = require("../../models");
const log = console.log;

//get route to find all categories
router.get("/", (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "category_id"],
      },
    ],
  })
    .then((data) => res.json(data))
    .catch((err) => {
      log(err);
      res.status(500).json(err);
    });
});

//get route to find one category by its 'id' value
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "category_id"],
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.json(404).json({ message: "There is no catergory with this id! " });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      log(err);
      res.status(500).json(err);
    });
});

//post route to create a new category
router.post("/", (req, res) => {
  Category.create({
    catergory_name: req.body.catergory_name,
  })
    .then((data) => res.json(data))
    .catch((err) => {
      log(err);
      res.status(500).json(err);
    });
});

//put route to update its "id" value
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data[0]) {
        res.status(404).json({ message: "There is no category with this id!" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      log(err);
      res.status(500).json(err);
    });
});

//delete route to destroy its 'id' value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({
            message: "There is no category found with the id entered! ",
          });
        return;
      }
      res.json(data);
    })

    .catch((err) => {
      log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
