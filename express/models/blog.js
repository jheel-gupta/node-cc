const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating new instance of the schema object 
//and passing an object as a parameter which can describe the structure of our blog document
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema); //we pass 'Blog' inside mongoose.model as it is the singular of the db collection name we have given (ie blogs) as the model will pluralise
                                                 // this name 'blog' to 'blogs' and search in our databse collection for a collection of the name 'blogs'  THUS ITS IMPT TO NAME IS AS SINGULAR OF THE NAME OF OUR COLLECTION
module.exports = Blog;