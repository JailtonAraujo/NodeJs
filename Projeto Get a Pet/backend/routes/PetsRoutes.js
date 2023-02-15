const router = require('express').Router();

const petsController = require('../controllers/PetsController');
const authGuard = require('../middlewares/authGuard');
const uploadImage = require('../helpers/uploads-image');

router.post('/create',authGuard,uploadImage.array('images'),petsController.create);
router.get('/',petsController.getAll);
router.get('/mypets',authGuard,petsController.getAllUserPets);
router.get('/myadoptions',authGuard,petsController.getAllUserAdoptions);
router.get('/:id',petsController.getPetById);
router.delete('/:id',authGuard,petsController.delete);
router.patch('/:id',authGuard,uploadImage.array('images'),petsController.updatePet);
router.patch('/schedule/:id',authGuard,petsController.schedulePet);
router.patch('/conclude/:id',authGuard,petsController.conclude);

module.exports = router;

