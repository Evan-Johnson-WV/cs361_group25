const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const PORT = 3000;

const readData = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

app.get('/recommendations/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        const users = readData('users.json');
        const items = readData('items.json');

        //Finds the user by ID
        const user = users.find(u => u.userId === userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const matches = items.filter(item => 
            item.tags.some(tag => user.interest_tags.includes(tag))
        );
        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: "Error reading data files"});
    }
});

app.listen(PORT, () => {
    console.log(`Personalized Feed Service running on port ${PORT}`);
});