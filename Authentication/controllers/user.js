var User = require("../models/user")


module.exports.list = () => {
    return User
            .find()
            .sort('username')
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.getUser = id => {
    return User
            .findOne({_id: id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}