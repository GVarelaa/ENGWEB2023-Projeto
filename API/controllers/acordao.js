var Acordao = require('../models/acordao')

module.exports.list = () => {
    return Acordao
            .find()
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}

module.exports.getAcordao = id => {
    return Acordao
            .findOne({_id: id})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}

