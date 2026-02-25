const express = require('express');
const router = express.Router();

// This endpoint would fetch the latest logs stored by your Rust engine
router.get('/status', async (req, res) => {
    // In a real app, query MongoDB for the latest "AgentActions"
    res.json({
        active_drones: 2,
        last_action: "Irrigation Triggered in Zone 1",
        timestamp: new Date().toISOString()
    });
});

module.exports = router;