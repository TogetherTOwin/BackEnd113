const routerx = require('express-promise-router');
const articuloController = require('../../controllers/ArticleController');
const router = routerx();
const auth = require('../../middlewares/auth');

// router.post('/add', articuloController.add);
// router.get('/query', articuloController.query);
// router.get('/list',  articuloController.list);
// router.put('/update', articuloController.update);
// router.delete('/remove', articuloController.remove);
// router.put('/activate', articuloController.activate);
// router.put('/deactivate', articuloController.deactivate);

router.post('/add', auth.verifyUsuario, articuloController.add);
router.get('/query', auth.verifyUsuario, articuloController.query);
router.get('/list',  auth.verifyUsuario, articuloController.list);
router.put('/update', auth.verifyUsuario, articuloController.update);
router.delete('/remove', auth.verifyUsuario, articuloController.remove);
router.put('/activate', auth.verifyUsuario, articuloController.activate);
router.put('/deactivate', auth.verifyUsuario, articuloController.deactivate);


module.exports = router;