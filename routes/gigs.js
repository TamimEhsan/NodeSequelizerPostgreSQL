const express = require('express');
const router = require('express-promise-router')();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) =>
    Gig.findAll()
        .then(gigs => {
            //console.log(gigs);
            res.send({gigs});
        })
        .catch(err => console.log(err)));

router.route('/add')
    .post( async (req, res, next) => {
        const {title, technologies, budget, description, contact_email} = req.body;
        // insert into table
        try {
            const gig = await Gig.create({
                title,
                technologies,
                budget,
                description,
                contact_email
            });
            res.sendStatus(200);

        } catch (err) {
            res.send({err});
        }

    });

router.route('/search')
    .post( async (req,res) => {
        const {term} = req.body.query;
        try{
            const gig = await Gig.findAll({ where: { technologies: { [Op.like] : '%' + term+ '%' }  }  })
            res.send(gig);
        }catch (e) {
            res.send(e);
        }
    });

module.exports = router;