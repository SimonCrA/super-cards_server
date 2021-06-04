const Card = require('../models/cards.model')
const mongoose = require('mongoose')

exports.insert = async (req, res) => {
  try {
    const card = new Card(req.body)
    const cardSaved = await card.save()
    res.status(201).json({
      ok: true,
      card: cardSaved._id
    })
  } catch (error) {
    console.log(error);
  }
}

exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  const oId = mongoose.Types.ObjectId(req.query.user)
  Card.find({ user: oId, status: req.query.status })
        .limit(limit)
        .skip(limit * page)
        .exec( (err, cardDB) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err
            })
          }
          res.status(200).json({
            ok: true,
            cards: cardDB
          });
        })
}

exports.getById = (req, res) => {
  Card.findById({ _id: req.params.cardId }, (err, cardDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    } else if (!cardDB) {
      return res.status(404).json({
        ok: false,
        err: "Card does not exist"
      })
    } else {
      res.status(200).json({
        ok: true,
        user: cardDB
      })
    }
  })
}

exports.patchById = (req, res) => {
  Card.findOneAndUpdate({_id: req.params.cardId }, req.body, { useFindAndModify: false }, (err, cardUpdated) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }else if (!cardUpdated) {
      return res.status(404).json({
        ok: false,
        err: 'Card not found or already deleted'
      });
    } else {
      res.status(200).json({
        ok: true,
        card: cardUpdated
      });
    }
  })

}

exports.disableById = (req, res) => {
  let status = {
    status: false
  }
  Card.findByIdAndUpdate(req.params.cardId, status, (err, cardDisabled) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err: 'bad Request'
      });
    } else if (!cardDisabled) {
      return res.status(404).json({
        ok: false,
        err: 'Card not found or already deleted'
      });
    } else {
      res.status(200).json({
        ok: true,
        user: {
          id: cardDisabled._id,
          message: 'user Disabled'
        }
      });
    }
  })
}
