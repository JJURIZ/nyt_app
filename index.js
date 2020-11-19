// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');


// APP
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// SETUP EJS 
app.set('view engine', 'ejs')
app.use(ejsLayouts);

// HOME ROUTE
app.get('/', (req, res) => {
    // res.send(`Welcome to the backend`)
    axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=${API_KEY}`)
    .then(response => {
        if (response.status === 200) {
            console.log(response.data.results)
            let len = response.data.results.length;
            let results = response.data.results;
            for (let i = 0; i < len; i++) {
                let movieResultObject = response.data.results[i];

                const finalObject = {
                    title: movieResultObject.display_title,
                    byline: movieResultObject.byline,
                    headline: movieResultObject.headline,
                    date: movieResultObject.publication_date,
                    link: movieResultObject.link.url
                }
                console.log(finalObject);
            }
        } 
    })
    .catch(err => {
        console.log(err)
    })
    res.send(`Welcome to my backend`)
})





app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`)

})