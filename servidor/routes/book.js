


//Rutas para libro
const express = require('express');
const router = express.Router();

//Importamos el controlador
const bookController = require('../controllers/bookController');


// api/books

router.post('/', bookController.addBook);
router.get('/', bookController.listBooks);
router.put('/:id', bookController.upDateBook);
router.get('/:id', bookController.getBook);  
router.delete('/:id', bookController.deleteBook);


module.exports = router;