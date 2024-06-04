// register.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {

    res.json({
        dados: req.body,
        message: 'Form received' 
    });
});

module.exports = router;