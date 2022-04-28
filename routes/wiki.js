const express = require('express');
const func = require('../views');
const {Page} = require('../models');
const router = express.Router();


//retrieve all wiki pages
router.get('/', (req,res,next)=>{
    res.send(func.main(Page.findAll()));
});

router.post('/', async (req,res,next) => {
    try{
        const page = await Page.create({
            title: req.body.title,
            content: req.body.content,
        });
        res.redirect(`/wiki/${page.slug}`);
    } catch (err){
        console.log(err);
    }
})

router.get('/add',(req,res,next) => {
    res.send(func.addPage());
})

router.get('/:slug', async (req, res, next) => {
    try{
        const page = await Page.findOne({
            where:{
                slug:req.params.slug
            }
        });
    res.send(func.wikiPage(page));
    } catch(err){next(err)};
});

module.exports = router;