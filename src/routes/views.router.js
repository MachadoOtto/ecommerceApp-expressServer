const { Router } = require('express');

const viewsRouter = Router();

let counter = 0;

viewsRouter.get('/counter', (req, res) => {
    res.render('counter', { counter });
    ++counter;
});

module.exports = viewsRouter;