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
            .findOne({username:id})
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
            .findOne({username:id}, {favorites: 1})
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
    return User.updateOne({username:id}, info)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.updateFavorite = (id, favorite) => {
    return User
        	.updateOne({username: id}, {$addToSet : {favorites: favorite}})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.updateAccess = (id, date) => {
    return User.updateOne({username: id}, {lastAccess: date})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}

module.exports.updateUserPassword = (id, pwd) => {
    return User.updateOne({username: id}, pwd)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.deleteUser = id => {
    return User.deleteOne({username:id})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}
 
