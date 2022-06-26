const express = require('express');
const Menu = require('../models/Menu');
const Joi = require('@hapi/joi');
const auth = require('../middlewares/auth');
Joi.objectId = require('joi-objectid')(Joi)
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var mongoose = require('mongoose');
const Products = require('../models/Products');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve();
        const localPath = `${uploadPath}/uploads/`;
        cb(null, localPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

const router = express.Router();

/**
 * @route GET/ api/courses
 * @description Get List of courses
 * @access Private
 */
router.get('/', async (req, res) => {
    const menu = await Products
        .find()
        .sort('date');
    res.send(menu);
});


router.get('/:id', async (req, res) => {
    const menuItem = await Products
        .findById(req.params.id)
    res.send(menuItem);
});


/**
 * @route POST / api/courses
 * @description Add course
 * @access Private
 */
router.post('/', auth, upload.single('file'), async (req, res) => {
    let { error } = MenuValidationSchema.validate(req.body);
    if (error) { console.log(error); return res.status(400).send(error.details[0].message) }
    const {
        title,
        subTitle,
        description,
        price,
        Quantity,
        Unit,
        category
    } = req.body;
    // console.log(req.file.filename)
    try {
        // Creation object of the Course Model
        menu = new Menu({
            title,
            subTitle,
            description,
            price,
            Quantity,
            Unit,
            category,
            ImagePlaceholder: req.file.filename ? req.file.filename : 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
            user_id: req.user.id
        })
        await menu.save(async (err,menn)=>{
            product = new Products({
                _id:menn._id,
                title,
                subTitle,
                description,
                price,
                Quantity,
                Unit,
                category,
                ImagePlaceholder: req.file.filename ? req.file.filename : 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
                user_id: req.user.id
            })
            await product.save()
            res.status(200).send(product);      
        }
        );
        
    }
    catch (error) {
        console.log(error)
        res.status(500).send('Server Error',error);
    }
});

/**
 * @route Put / api/courses/:id
 * @description update course
 * @access Private
 */
router.put('/update/:id',  auth,  async (req, res) => {

    // let { error } = MenuValidationSchema.validate(req.body);
    // if (error) { console.log(error); return res.status(400).send(error.details[0].message) }
    const {
        title,
        subTitle,
        description,
        price,
        Quantity,
        Unit,
        category
    } = req.body;
    // Build contact object
    console.log('hellow',req.body)
    const updatedCourse = {
        title:title,
        subTitle:subTitle,
        description:description,
        price:price,
        Quantity:Quantity,
        Unit:Unit,
        category:category,
        // ImagePlaceholder: req.file.filename ? req.file.filename : 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg',
        user_id: req.user.id
    };
    
    // if (publication_Status) updatedCourse.publication_Status = publication_Status;

    // console.log(req.param.id)
    try {

        let product = await Products.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Course not found' });

        // Make sure user owns contact
        // if (course.educator_id.toString() !== req.user.id)
        //     return res.status(401).json({ msg: 'Not authorized' });

        course = await Products.findByIdAndUpdate(
            req.params.id
            ,
            { $set: updatedCourse },
            { new: true }
        );

        res.status(200).send(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// router.post('/update', auth, async (req, res) => {
//     try {
//         const course = await Products.findById(req.body.id);
//         // const products = await Products.find()
//         // if (!course) return res.status(404).json(products);
//         // // Make sure user owns course
//         // if (course.educator_id.toString() !== req.user.id)
//         //     return res.status(401).json({ msg: 'Not authorized' });

//         // RegisterCourse.deleteMany({ course_id: req.params.id }).then((d) => {
//         //     console.log(d.deletedCount);
//         // });
//         // await Products.findByIdAndRemove(req.body.id);
//         // res.status(200).send('non')

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }

// });






/**
 * @route DELETE / api/course
 * @description remove course
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        const course = await Products.findById(req.params.id);
        const products = await Products.find()
        if (!course) return res.status(404).json(products);
        // Make sure user owns course
        if (course.educator_id.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Not authorized' });

        // RegisterCourse.deleteMany({ course_id: req.params.id }).then((d) => {
        //     console.log(d.deletedCount);
        // });
        await Products.findByIdAndRemove(req.params.id);
        res.status(200).json(products);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// Schema Validation 
const MenuValidationSchema = Joi.object({
    title: Joi.string()
        .min(1).max(50).required(),
    subTitle: Joi.string().min(1).max(50).required(),
    description: Joi.string().required().max(3000),
    date: Joi.date(),
    price: Joi.number().required().min(1).max(10000),
    Quantity: Joi.number().required().min(1).max(10000),
    Unit: Joi.string().required().min(1).max(10000),
    category: Joi.string()
        .min(1).max(50).required(),
    user_id: Joi.objectId(),
});
module.exports = router;