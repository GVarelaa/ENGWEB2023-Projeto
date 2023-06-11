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
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.addUser = user => {
    user["id"] = User.find().count()
    return User
            .create(user)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.updateUser = user => {
    return User
            .updateOne({_id: user._id}, user)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.deleteUser = id => {
    return User
            .deleteOne({_id: id})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.getTotalRecords = () => {
    return User
            .find()
            .count()
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}