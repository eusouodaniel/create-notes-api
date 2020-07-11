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

router.get('/search', withAuth, async (req, res) => {
    const { query } = req.query;
    try {
        let notes = await Note
            .find({ author: req.user._id })
            .find({ $text: { $search:query } });
        res.send(notes)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get('/:id', withAuth, async (req, res) => {
    const { id } = req.params;
    try {
        let note = await Note.findById(id);
        if(isOwner(req.user, note)){
            res.status(200).json(note);
        } else {
            res.status(403).json({ error: "Permission denied" });
        }

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get('/', withAuth, async (req, res) => {
    try {
        let notes = await Note.find({ author: req.user._id });
        res.send(notes)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

router.put('/:id', withAuth, async (req, res) => {
    const { title, body } = req.body;
    const { id } = req.params;
    try {
        let note = await Note.findById(id);
        if(isOwner(req.user, note)){
            let note = await Note.findOneAndUpdate(
                {_id: id},
                { $set: { title: title, body: body } },
                { upsert: true, 'new': true }
            )

            res.json(note);
        } else {
            res.status(403).json({ error: "Permission denied" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error when update note" });
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    const { id } = req.params;
    try {
        let note = await Note.findById(id);
        if(isOwner(req.user, note)){
            await Note.findByIdAndDelete(id);
            res.json({ message: "Ok" });
        } else {
            res.status(403).json({ error: "Permission denied" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error when delete note" });
    }
})

const isOwner = (user, note) => {
    if (JSON.stringify(user._id) == JSON.stringify(note.author._id)){
        return true;
    }

    return false;
}

module.exports = router;
