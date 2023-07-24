
const mongoose = require('mongoose');



const connection = mongoose.connect('mongodb+srv://chandnwj:chandbabu@cluster0.jsk2z6k.mongodb.net/images-web-app?retryWrites=true&w=majority');


module.exports= connection;