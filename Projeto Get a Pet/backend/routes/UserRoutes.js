const router = require('express').Router();

const UserController = require('../controllers/UserController');

//middlewares
const authGuard = require('../middlewares/authGuard');

router.post('/register', UserController.register);
router.post('/login',UserController.login);

router.get('/checkuser',authGuard,UserController.checkUser);

module.exports = router;