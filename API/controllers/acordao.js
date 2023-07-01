var Acordao = require("../models/acordao");

module.exports.list = (query, skip, limit) => {
    return Acordao.find(query)
        .skip(skip)
        .limit(limit)
        .sort({_id: -1})
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
};

module.exports.getAcordao = (id) => {
  if (isNaN(parseInt(id)))
    throw new Error('O tipo do identificador do registo apresentado não corresponde a um número!')
  return Acordao.findOne({ _id: id })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

module.exports.getAcordaosNumber = (query) => {
    return Acordao.find(query)
        .count()
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
};

module.exports.getRelatores = () => {
    return Acordao.distinct("Relator")
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
};

module.exports.addAcordao = (acordao) => {
    return Acordao.find().count()
        .then((response1) => {
            acordao["_id"] = response1
            Acordao.create(acordao)
                .then((response2) => {
                    return response2;
                })
                .catch((error) => {
                    return error;
                });
        })
        .catch((error) => {
            return error
        })

};

module.exports.deleteAcordao = (id) => {
    return Acordao.deleteOne({ _id: id })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
};

module.exports.updateAcordao = (acordao) => {
    return Acordao.updateOne({ _id: acordao._id }, acordao)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
};
