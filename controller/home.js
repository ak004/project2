exports.home = function (req,res) {
    res.render("index", {
        test:"testt"
    })
}

exports.login = function (req,res) {
    res.render("auth-sign-in", {
        test:"testt"
    })
}

exports.signup = function (req,res) {
    res.render("auth-sign-up", {
        test:"testt"
    })
}


exports.blank = function (req,res) {
    res.render("blank_page", {
        test:"testt"
    })
}