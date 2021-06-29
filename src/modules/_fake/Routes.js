const { Router } = require('express');
const serviceHeader = require('../utils/serviceHeader');
const fakeGeneratorBase = require('./base/fakeGeneratorBase');

const router = Router();

router.post('/base', serviceHeader('fakeGeneratorBase'), fakeGeneratorBase);

module.exports = router;
