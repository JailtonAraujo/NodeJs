module.exports.checkAuth = function(req, res, next){

    const userId = req.session.userid;

    if(!userId){
        req.flash('message','Por favor, faça login!');
        res.render('auth/login');
        return
    }

    next();
}