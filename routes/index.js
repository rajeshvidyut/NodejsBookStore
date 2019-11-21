var fs = require('fs');
const knex = require('../knex/knex.js');



module.exports = function(app,passport) {
    app.use(function(req, res, next) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
      });
    app.get('/login',(req, res) => {
        res.render('login/login.ejs', {
            title: 'Welcome to Books Store | View Books'
        });
    });
    
    app.get('/list',isLoggedIn,(req, res) => {
         knex('books')
        .where('books.status',1)
        .select('cms_users.id', 'cms_users.name as CreatedBy', 'books.id','books.book_title','books.isbn_number',
        'books.description','books.image','books.created_by','books.created_at')
        .join('cms_users', 'books.created_by', '=', 'cms_users.id')
        .then(rows => {
            var user =[];
            if (req.session.passport.user)
                user = req.session.passport.user[0];
            
                res.render('index.ejs', {
                    title: "Welcome to Books Store | View Books",
                    books: rows,
                    user:user
                });
        });
    });
    app.get('/',(req, res) => {
         knex('books')
        .where('books.status',1)
        .select('cms_users.id', 'cms_users.name as CreatedBy', 'books.id','books.book_title','books.isbn_number',
        'books.description','books.image','books.created_by','books.created_at')
        .join('cms_users', 'books.created_by', '=', 'cms_users.id')
        .then(rows => {
            res.render('index.ejs', {
                title: "Welcome to Books Store | View Books",
                books: rows,
            });
        });
    });
    app.get('/users',isLoggedIn,(req, res) => {
        knex('cms_users').then(rows => {
            res.render('user/user.ejs', {
                title: 'Users',
                users: rows
            });
        })
    });
  

    app.get('/add',isLoggedIn, function(req, res){
        var user =[];
            if (req.session.passport.user)
                user = req.session.passport.user[0];

        res.render('add_books.ejs', {
            title: "Books | Add a book",
            message: '',
            user:user
        });
    });

    app.post('/add',isLoggedIn, (req, res, next) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }
        user_id ="";
        if (req.session.passport.user){
            user_id = req.session.passport.user[0].id;
        }
        let message = '';
        let book_title = req.body.book_title;
        let isbn_number = req.body.isbn_number;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = book_title + '.' + fileExtension;
        knex('books').where({ isbn_number:isbn_number}).then(rows => {
            if (rows.length > 0) {
                message = 'ISBN number already exists';
                res.render('add_books.ejs', {
                    message,
                    title: "Welcome to Books Store | Add a new book"
                });
            }else {
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        knex('books')
                        .insert({ 
                            book_title: book_title,
                            isbn_number:isbn_number,
                            image:image_name,
                            created_by:user_id 
                        }).then(rows => {
                            res.redirect('/list');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add_books.ejs', {
                        message,
                        title: "Welcome to Books Store | Add a new book"
                    });
                }
            }
        })
    });
    app.post('/edit/:id',isLoggedIn, (req, res, next) => {
        let bookId = req.params.id;
        let book_title = req.body.book_title;
        let isbn_number = req.body.isbn_number;
        user_id ="";
        if (req.session.passport.user){
            user_id = req.session.passport.user[0].id;
        }
        knex('books')
        .where({ id: bookId })
        .update({ book_title: book_title,isbn_number:isbn_number,updated_by: user_id})
        .then(rows => {
            res.redirect('/list');
        });
    });

    app.get('/edit/:id', isLoggedIn,(req, res, next) => {
        let bookId = req.params.id;
        var user =[];
        if (req.session.passport.user)
            user = req.session.passport.user[0];
        knex('books')
        .where({ id: bookId })
        .then(rows => {
            res.render('edit_books.ejs', {
                title: "Edit Books",
                book: rows[0],
                message: '',
                user:user
            });
        });
    });

    app.get('/delete/:id', (req, res, next) => {
        let bookId = req.params.id;
        knex('books')
        .select('image')
        .where({ id: bookId })
        .then(rows=>{
            let image = rows[0].image;
            fs.unlink(`public/assets/img/${image}`, (err) => {
                knex('books')
                .where({ id: bookId })
                .update({ status: 2}).then(rows=>{
                    res.redirect('/list');
                })
            });
        })
    });

    app.get('/user_add',function(req, res){
        res.render('user/user_add.ejs',{title: 'Add User',message: req.flash('message')});
    });
    app.post('/user_add', (req, res, next) => {
        let message = '';
        let username = req.body.username;
        let email = req.body.email;
        let mobile_number = req.body.mobile_number;
        let password = req.body.password;
        let user_type = req.body.user_type;
        knex('cms_users')
        .where({ name: username })
        .then(rows => {
            if (rows.length > 0) {
                message = 'Username already exists';
                res.render('user_add.ejs', {
                    message,
                    title: 'Add user'
                });
            }else{
                knex('cms_users')
                .insert({ 
                    name: username,
                    email:email,
                    mobile_number:mobile_number,
                    password:password,
                    user_type:user_type
                }).then(rows => {
                    res.redirect('/list');
                });
            }
        });
        
    });
    app.get('/user_edit/:id',isLoggedIn,(req, res) => {
        let user_id = req.params.id;
        knex('cms_users')
        .where({ id: user_id })
        .then(rows => {
            res.render('user/user_edit.ejs', {
                title: 'Edit User',
                message: '',
                user : rows[0]
            })
        });
    });




    app.post('/user_edit/:id',isLoggedIn,(req,res) => {
        let id = req.body.id;
        let username = req.body.username;
        let email = req.body.email;
        let mobile_number = req.body.mobile_number;
        let password = req.body.password;
        let user_type = req.body.user_type;
        knex('cms_users')
        .where({ id: id })
        .update({ name: username,email:email,mobile_number: mobile_number,password:password,user_type:user_type})
        .then(rows => {
            res.redirect('/list');
        });
    });

    app.get('users', isLoggedIn,(req, res) => {
        res.render('login/login', {
            title: 'Add User',
            message: ''
        });
    });

    app.post('/login', function(req,res,next){
        passport.authenticate('local-login',{
            successRedirect : '/list', 
            failureRedirect : '/login',
            failureFlash : true 
            // res.redirect('/dashboard');
        })(req,res,next);
    })

    app.get('/logout',isLoggedIn, function(req, res, next) {
        req.session.destroy();
        req.logout();
        res.redirect('/');
        if (!req.user) 
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.redirect('/');
    });

    app.get('/account', isLoggedIn, function(req, res){
        res.render('account', { user: req.user });
    });

    app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { 
            successRedirect : '/list', 
            failureRedirect: '/login' }),
            function(req, res) {
                res.redirect('/list');
            }
    );
};
function isLoggedIn(req,res,next){
    // console.log(req.isAuthenticated())
    if(req.isAuthenticated())
        return next();
        res.redirect('/login');
}
