const express = require("express");
const router = express.Router();
const knex = require("../db/knexConfig");

/* GET users listing. */
router.get("/", function(req, res, next) {
    //res.send('this is a list of movies');
    if (Object.keys(req.query).length === 0) {
        knex("movies").then((data) => {
            res.status(200).json(data);
        });
    } else {
        knex("movies")
            .where({ title: req.query.title })
            .then((data) => {
                //must use %20 in the url: http://localhost:3000/movies?title=Midnight%20In%20Paris
                res.status(200).json(data);
            });
    }
});

router.get("/:movieId", function(req, res, next) {
    //res.send('this is a list of movies');
    console.log(typeof Number.parseInt(req.params.movieId));
    Number.isNaN(Number.parseInt(req.params.movieId)) ?
        res.status(400).send("Invalid ID supplied") :
        knex("movies")
        .where({ id: req.params.movieId })
        .then((data) => {
            data.length === 0 ?
                res.status(404).send("Movie ID not found") :
                res.status(200).json(data);
        });
});

router.post('/', function(req, res, next) {
    knex("movies").insert(req.body).then(res.send("Movie Added"))
})

module.exports = router;