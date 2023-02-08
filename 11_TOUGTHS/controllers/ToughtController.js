const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtControler {

    static async showToughts (req, res){

        res.render('toughts/home');

    }

}