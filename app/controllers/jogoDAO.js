module.exports.jogo = function(application, req, res) {
    if (req.session.loged) {
        res.render('jogo');
    } else {
        res.send("Faça login"); 
    }
}

module.exports.logout = function(application, req, res) {
    req.session.destroy(function(err) {
        res.render("index", {validacao : {}, dadosForm : {}});
    });
}