var Tribunal = require('../models/tribunal')

module.exports.list = () => {
    return Tribunal.find()
            .then(response => { return response })
            .catch(error => { return error })
}

module.exports.getDescritores = (id) => {
    return Tribunal.findOne({ _id: id}).select('descritores -_id').sort()
            .then(response => { return response })
            .catch(error => { return error })
}

module.exports.getAreaTematica1 = (id) => {
    return Tribunal.findOne({ _id: id}).select('areaTematica1 -_id').sort()
            .then(response => { return response })
            .catch(error => { return error })
}

module.exports.getAreaTematica2 = (id) => {
    return Tribunal.findOne({ _id: id}).select('areaTematica2 -_id').sort()
            .then(response => { return response })
            .catch(error => { return error })
}

module.exports.addTribunal = t => {
    return Tribunal.create(t)
            .then(response => { return response })
            .catch(error => { return error })
}

module.exports.deleteTribunal = id => {
    return Tribunal.deleteOne({_id: id})
            .then(response => { return response })
            .catch(error => { return error })
}

module.exports.updateTribunal = t => {
    return Tribunal.updateOne({_id: t._id}, t)
            .then(response => { return response })
            .catch(error => { return error })
}