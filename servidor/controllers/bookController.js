const Book = require("../models/Book");

exports.addBook = async (req,res) => {
    try {

        let book;

        // Añadimos el libro a la coleccion
        book = new Book (req.body);

        await book.save();
        res.send(book);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
        
    }
}

exports.listBooks = async (req,res) => {

    try {
        const books = await Book.find();
        res.json(books);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
        
    }
}

exports.upDateBook = async (req,res) => {
    try {
        const { titulo, autor, genero, subgenero, sinopsis, portada, fechaPublicacion, paginas, copias } = req.body;
        let book = await Book.findById(req.params.id);

        if(!book){
            res.status(404).json({ msg: "No existe el libro buscado" })
        }

        book.titulo = titulo;
        book.autor = autor;
        book.genero = genero;
        book.subgenero = subgenero;
        book.sinopsis = sinopsis;
        book.portada = portada;
        book.fechaPublicacion= fechaPublicacion;
        book.paginas = paginas;
        book.copias = copias;


        book = await Book.findOneAndUpdate({_id: req.params.id}, book, {new: true})
        res.json(book);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
        
    }
}

//Este metodo lo vamos a utilizar para poder actualizar el producto

exports.getBook = async (req,res) => {

    try {
        let book = await Book.findById(req.params.id);

        if(!book){
            res.status(404).json({ msg: "No existe el libro buscado" })
        }

        res.json(book);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

exports.deleteBook = async (req,res) => {
    try {

        let book = await Book.findById(req.params.id);
        
        if(!book){
            res.status(404).json({ msg: "No se encuentra el libro que quiere eliminar"})
        }

        await Book.findOneAndRemove({_id: req.params.id});
        res.json({ msg: "El libro ha sido eliminado de tu colección"});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}