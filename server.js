const express = require('express');
const { Octokit } = require("@octokit/rest");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/send-response', async (req, res) => {
    const { answer } = req.body;

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    });

    try {
        await octokit.issues.create({
            owner: 'sihlebaruza',
            repo: 'gta',
            title: `Date Response: ${answer}`,
            body: `The answer to the date invitation was: ${answer}`
        });

        res.json({ message: "Response recorded successfully" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to record response" });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
