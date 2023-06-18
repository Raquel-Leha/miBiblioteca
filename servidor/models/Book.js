
const mongoose = require ('mongoose');



const BookSchema = mongoose.Schema({
    titulo: {
        type: String,
        
    },
    autor: {
        type: String,
        
    },
    genero: {
        type: String
        
    },
    subgenero: {
        type: String
    },
    sinopsis: {
        type: String
        
    },
    portada: {
        type: String
        
    },
    fechaPublicacion: {
        type: String
        
    },
    paginas: {
        type: Number
    },
    copias: {
        type: Number
    }

}, {
    collection: 'books'
}
);


module.exports = mongoose.model('Book', BookSchema);





