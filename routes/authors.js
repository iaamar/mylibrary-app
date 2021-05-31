const express = require("express")
const Author = require("../models/author")
const router = express.Router()

//All Authors Router
router.get('/', async (req, res) => {
    let serachQuery = {}
    if (req.query.name != null && req.query.name != '') {
        serachQuery.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(serachQuery)
        res.render('authors/index', {
            authors: authors,
            serachQuery: req.query
        })

    } catch (error) {
        res.redirect('/')
    }
})
//New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})
//Create Author Router
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name,
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch (error) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
        })
    }
})

module.exports = router