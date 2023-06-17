// Controlador para o modelo User

var User = require('../models/user')

// Devolve a lista de Users
module.exports.list = () => {
    return User
            .find()
            .sort('name')
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.getUser = id => {
    return User
            .findOne({_id:id})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.checkEmail = (email) => {
    return User
            .findOne({email: email})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.checkUsername = (username) => {
    return User
            .findOne({username: username})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.getFavorites = id => {
    return User
            .findOne({_id:id}, {favorites: 1})
            .then(response => {
                return response
            })
            .catch(error => {
                console.log(error)
                return error
            })
}


module.exports.addUser = u => {
    return User.create(u)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.updateUser = (id, info) => {
    return User.updateOne({_id:id}, info)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.updateFavorite = (id, favorite) => {
    return User
        	.updateOne({_id: id}, {$push : {favorites: favorite}})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.updateUserStatus = (id, status) => {
    return User.updateOne({_id:id}, {active: status})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}

module.exports.updateUserPassword = (id, pwd) => {
    return User.updateOne({_id:id}, pwd)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.deleteUser = id => {
    return User.deleteOne({_id:id})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}
 
