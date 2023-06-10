var Acordao = require('../models/acordao')

module.exports.list = (skip, limit) => {
    return Acordao
            .find()
            .skip(skip)
            .limit(limit)
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

module.exports.getRelatores = () => {
    return Acordao
            .distinct("Relator")
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}

