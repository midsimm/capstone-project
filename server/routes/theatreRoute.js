const express = require('express');
const router = express.Router();
const Theatre = require('../models/theatreModel');

// Create a new theatre
router.post('/add-theatre', async (req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: "Theatre added successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Theatre not added"
        });
    }
});

// Get all theatres
router.get('/', async (req, res) => {
    try {
        const theatres = await Theatre.find();
        res.status(200).json(theatres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single theatre by ID
router.get('/:id', async (req, res) => {
    try {
        const theatre = await Theatre.findById(req.params.id);
        if (!theatre) {
            return res.status(404).json({ message: 'Theatre not found' });
        }
        res.status(200).json(theatre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a theatre by ID
router.put('/update-theatre', async (req, res) => {
    try {
        const updatedTheatre = await Theatre.findByIdAndUpdate(req.body.theatreId, req.body, { new: true });
        if (!updatedTheatre) {
            return res.send({
                success: false,
                message: "Theatre not updated"
            })
        }
        res.send({
            success: true,
            message: "Theatre updated successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

// Delete a theatre by ID
router.delete('/delete-theatre', async (req, res) => {
    try {
        const deletedTheatre = await Theatre.findByIdAndDelete(req.body.theatreId);
        if (!deletedTheatre) {
            return res.send({
            success: false,
            message: 'Theatre not found'
            });
        }
        res.send({
            success: true,
            message: 'Theatre deleted successfully'
        });
        } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;