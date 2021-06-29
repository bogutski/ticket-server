const { Router } = require('express');

const upload = require('../utils/multerFileUploader');

const serviceHeader = require('../utils/serviceHeader');
const albumCreate = require('./controllers/create');
const albumGetById = require('./controllers/getById');
const albumSearch = require('./controllers/search');
const albumUpdateById = require('./controllers/updateById');
const albumDeleteById = require('./controllers/deleteById');
const albumStats = require('./controllers/stats');
const pauseController = require('../core/pauseController');
const albumAddImage = require('./controllers/addImage');

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/album/stats
  serviceHeader('albumStats'), // mark request
  pauseController,
  albumStats,
);

router.post(
  '/', // POST /localhost:5000/album/stats
  serviceHeader('albumCreate'),
  albumCreate,
);

router.get(
  '/:albumId',
  serviceHeader('albumGetById'),
  pauseController,
  albumGetById,
);

router.post(
  '/search',
  serviceHeader('albumSearch'),
  pauseController,
  albumSearch,
);

router.patch(
  '/:albumId',
  serviceHeader('albumUpdateById'),
  pauseController,
  albumUpdateById,
);

router.delete(
  '/:albumId',
  serviceHeader('albumDeleteById'),
  pauseController,
  albumDeleteById,
);

router.put(
  '/:albumId/image',
  upload.single('image'),
  serviceHeader('albumAddImage'),
  pauseController,
  albumAddImage,
);

module.exports = router;
