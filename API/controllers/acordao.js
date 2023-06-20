var Acordao = require('../models/acordao')

module.exports.list = (query, skip, limit) => {
    return Acordao
            .find(query)
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


module.exports.getAcordaosNumber = () => {
    return Acordao
            .find()
            .count()
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


module.exports.addAcordao = acordao => {
    acordao._id = Acordao.find().count()

    return Acordao
            .create(acordao)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.deleteAcordao = id => {
    return Acordao
            .deleteOne({_id:id})
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}


module.exports.updateAcordao = acordao => {
    return Acordao
            .updateOne({_id:acordao._id}, acordao)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
}