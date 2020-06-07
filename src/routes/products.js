'use restrict';

const express = require('express');
const router  = express.Router();
const controller = require('../controllers/product.controller');

router.get('/'           , controller.get );
router.get('/id/:value'  , controller.getById );
router.get('/slug/:value', controller.getBySlug );
router.get('/tag/:value' , controller.getByTag );
router.post('/'          , controller.post );
router.put('/:id'        , controller.put );
router.delete('/:id'     , controller.delete );

module.exports = router;