const router = require('express').Router();

const petsController = require('../controllers/PetsController');
const authGuard = require('../middlewares/authGuard');
const uploadImage = require('../helpers/uploads-image');

router.post('/create',authGuard,uploadImage.array('images'),petsController.create);

module.exports = router;

