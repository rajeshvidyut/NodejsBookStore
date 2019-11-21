const knex = require('../knex/knex.js');
module.exports = {
    searchPage:(req,res) =>{
        const {term } = req.query;
        knex('books')
        .where('isbn_number','rlike',term)
        .then(rows => {
            var user =[];
            if (req.session.passport.user)
                user = req.session.passport.user[0];
            res.render('index.ejs', {
                title: "Welcome to Books Store | View Books"
                ,books: rows,
                user:user

            });
        });
    },
};
