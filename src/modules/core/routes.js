const baseRouter = require('../_base/Routes');
const albumRouter = require('../event/Routes');
const fakeRouter = require('../_fake/Routes');


function routes(app) {
  app.use('/base', baseRouter);
  app.use('/fake', fakeRouter);
  app.use('/event', albumRouter);
}

module.exports = routes;
