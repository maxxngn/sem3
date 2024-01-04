const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/SEM-3', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    author: {
        type: String,
        required: true 
    },
    size: {
        type: Number,
        required: true 
    },
    views: {
        type: Number,
        default: 0 
    }
});

const Song = mongoose.model('Song', songSchema);

app.use(bodyParser.json());


app.get('/api/songs', async (req, res) => {
    try{
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/songs/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ error: 'song not found' });
        }
        res.json(song);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/api/songs', async (req, res) => {
    const { name, author, size, views } = req.body;
    try {
        const newsong = new Song({ name, author, size, views });
        const savedsong = await newsong.save();
        res.json(savedsong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/songs/:id', async (req, res) => {
    const { name, author, size, views } = req.body;
    try {
        const updatedsong = await Song.findByIdAndUpdate(
            req.params.id,
            { name, author, size, views },
            { new: true }
        );
        if (!updatedsong) {
            return res.status(404).json({ error: 'song not found' });
        }
        res.json(updatedsong);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/songs/:id', async (req, res) => {
    try {
        const deletedsong = await Song.findByIdAndDelete(req.params.id);
        if (!deletedsong) {
            return res.status(404).json({ error: 'song not found' });
        }
        res.json(deletedsong);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});