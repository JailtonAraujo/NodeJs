const router = require('express').Router();

const UserController = require('../controllers/UserController');

//middlewares
const authGuard = require('../middlewares/authGuard');


const imageUploads = require('../helpers/uploads-image');

router.post('/register', UserController.register);
router.post('/login',UserController.login);


router.get('/checkuser',authGuard,UserController.checkUser);
router.patch('/edit',authGuard, imageUploads.single("image"), UserController.updateUser);

module.exports = router;