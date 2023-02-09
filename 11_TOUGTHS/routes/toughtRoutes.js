const express = require('express');
const router = express.Router();

//helpers
const checkAuth = require('../helpers/auth').checkAuth;

const ToughtsController = require('../controllers/ToughtController');

router.get('/add', checkAuth, ToughtsController.createToughts);
router.post('/add', checkAuth, ToughtsController.createToughtsSave);
router.post('/edit', checkAuth, ToughtsController.updateTought);
router.get('/edit/:id', checkAuth, ToughtsController.editToughts);
router.get("/dashboard", checkAuth, ToughtsController.dashboard);
router.post("/remove", checkAuth, ToughtsController.removeToughts); 
router.get("/", checkAuth, ToughtsController.showToughts);

module.exports = router;