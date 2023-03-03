//Mohammadali Hejazinasr
//301223170
//MidtermCOMP229


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let book = require('../models/books');

router.get('/', (req, res, next) => {
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Add a Book',
    books: '',
    action: '/books/add'
  });

});

router.post('/add', (req, res, next) => {
  let data = req.body;
  const newBook = {
    Title: data.title,
    Description: data.description,
    Price: parseInt(data.price),
    Author: data.author,
    Genre: data.genre
  }
  book.create(newBook, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/books');
    }
  });
});

router.get('/:id', (req, res, next) => {
  book.findById( req.params.id , (err, book) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/details', {
        title: 'Edit a Book',
        books: book,
        action: ''
      });
    }
  });
    
});

router.post('/:id', (req, res, next) => {
    let data = req.body;
    const upsertData = {
      Title: data.title,
      Description: data.description,
      Price: parseInt(data.price),
      Author: data.author,
      Genre: data.genre
    }
    book.update( {_id: req.params.id} , upsertData, {upsert: true}, (err, result) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.redirect('/books');
      }
    });
});

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
