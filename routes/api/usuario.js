const routerx = require('express-promise-router');
const usuarioController = require('../../controllers/UserController');
const router = routerx();
const auth = require('../../middlewares/auth');

// router.post('/login', usuarioController.login);
// router.post('/add',usuarioController.add);
// router.get('/query', usuarioController.query);
// router.get('/list', usuarioController.list);
// router.put('/update', usuarioController.update);
// router.delete('/remove', usuarioController.remove);
// router.put('/activate', usuarioController.activate);
// router.put('/deactivate', usuarioController.deactivate);

router.post('/login', usuarioController.login);
router.post('/add', auth.verifyUsuario, usuarioController.add);
router.get('/query', auth.verifyUsuario, usuarioController.query);
router.get('/list', auth.verifyUsuario, usuarioController.list);
router.put('/update', auth.verifyUsuario, usuarioController.update);
router.delete('/remove', auth.verifyUsuario, usuarioController.remove);
router.put('/activate', auth.verifyUsuario, usuarioController.activate);
router.put('/deactivate', auth.verifyUsuario, usuarioController.deactivate);


module.exports = router;