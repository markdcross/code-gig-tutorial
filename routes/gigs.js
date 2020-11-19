const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// Get gig list
router.get('/', (req, res) =>
    Gig.findAll()
        .then((gigs) => {
            console.log(gigs);
            res.render('gigs', {
                gigs,
            });
        })
        .catch((err) => console.log(err))
);

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
    const data = {
        title: 'Simple Wordpress website',
        technologies: 'Wordpress,php,html,css',
        budget: '$3000',
        description:
            'The Death Star plans are not in the main computer. Where are those transmissions you intercepted? What have you done with those plans? We intercepted no transmissions. Aaah....This is a consular ship. Were on a diplomatic mission. If this is a consular ship...were is the Ambassador? ',
        contact_email: 'user2@gmail.com',
    };

    let { title, technologies, budget, description, contact_email } = data;

    // Insert into table
    Gig.create({
        title,
        technologies,
        description,
        budget,
        contact_email,
    })
        .then((gig) => res.redirect('/gigs'))
        .catch((err) => console.log(err));
});

module.exports = router;
