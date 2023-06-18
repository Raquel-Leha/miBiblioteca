const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require ('mongoose-unique-validator');


//Ahora definimos el esquema que necesita nuestro usuario

let userSchema = new Schema ({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true //Solo puede haber un usuario con el mismo email
    },
    password: {
        type: String
    }
}, {
    collection: 'users'

});



userSchema.plugin(uniqueValidator, { messsage: "Email already in use."});
module.exports = mongoose.model('User', userSchema);