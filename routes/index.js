const routerx = require('express-promise-router');
const articuloRouter = require('./api/articulo');
const categoriaRouter = require('./api/categoria');
const usuarioRouter = require('./api/usuario')

const router = routerx();

router.use('/usuario', usuarioRouter);
router.use('/categoria', categoriaRouter);
router.use('/articulo', articuloRouter);

module.exports = router;

