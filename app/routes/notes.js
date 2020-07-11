var express = require('express');
var router = express.Router();
const Note = require('../schemas/note');
const withAuth = require('../middlewares/auth');

router.post('/', withAuth, async (req, res) => {
    const { title, body } = req.body;
    let note = new Note({ title, body, author: req.user._id });

    try {
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;
