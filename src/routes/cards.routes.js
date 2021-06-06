const CardsController = require('../controllers/cards.controller')
const AuthorizationMiddleware = require('../middlewares/authorization.middleware')

exports.routesConfig = (app) => {

  app.post('/api/cards',[
    AuthorizationMiddleware.verifyValidJWT
  ], CardsController.insert)
  app.patch('/api/cards/:cardId',[
    AuthorizationMiddleware.verifyValidJWT
  ], CardsController.patchById)
  app.get('/api/cards/:cardId',[
    AuthorizationMiddleware.verifyValidJWT
  ], CardsController.getById)
  app.get('/api/cards',[
    AuthorizationMiddleware.verifyValidJWT
  ], CardsController.list)
  app.delete('/api/cards/:cardId',[
    AuthorizationMiddleware.verifyValidJWT
  ], CardsController.disableById)
  app.delete('/api/cards/delete/:cardId',[
    AuthorizationMiddleware.verifyValidJWT
  ], CardsController.deleteById)
}