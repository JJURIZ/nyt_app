const db = require('./models');

// CREATE A MOVIE
db.movie.findOrCreate({
    where: {
        title: "Godfather" },
    defaults: { 
        headline: "Godfather, Part II",
        byline: "Vincent Canby",
        url: "http://nytimes.com",
        date: Date.now(),
        }
    }).then(([movie, created]) => {
        console.log(created)
        console.log(movie);
    }).catch((err) => {
        console.log(err)
    });