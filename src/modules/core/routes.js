const baseRouter = require('../_base/Routes');
const albumRouter = require('../album/Routes');
const fakeRouter = require('../_fake/Routes');


function routes(app) {
  app.use('/base', baseRouter);
  app.use('/fake', fakeRouter);
  app.use('/album', albumRouter);
}

module.exports = routes;
