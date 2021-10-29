// Student Name : Minusha Shaik
// Student ID: 301146227
// Date: 28/10/2021


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */


/* GET books List page. READ */
router.get('/', (req, res, next) => {
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'book',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {


     res.render('books/details', {
      title: 'Add book',
      books: '',
      action: '/books/add'
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  // form data
  let data = req.body;
  const newBook = {
    Title: data.title,
    Price: parseInt(data.price),
    Author: data.author,
    Genre: data.genre
  }
  // Create the book
  book.create(newBook, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {


     book.findById( req.params.id , (err, book) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('books/details', {
          title: 'Edit book',
          books: book,
          action: ''
        });
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let data = req.body;
  const upsertData = {
    Title: data.title,
    Price: parseInt(data.price),
    Author: data.author,
    Genre: data.genre
  }
  book.update{_id: req.params.id} , upsertData, {upsert: true}, (err, result) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.redirect('/books');
    }
  });
});


// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  book.remove( {_id: req.params.id} , (err) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.redirect('/books');
    }
  });

});

module.exports = router;