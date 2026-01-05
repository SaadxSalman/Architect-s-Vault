require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public'));

// --- Discord Bot Setup ---
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => console.log(`🤖 Bot online as ${client.user.tag}`));

// --- Routes ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/github-webhook', async (req, res) => {
    const event = req.headers['x-github-event'];
    const data = req.body;
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);

    let eventSummary = {
        type: event,
        repo: data.repository?.full_name,
        user: '',
        action: ''
    };

    if (event === 'push') {
        eventSummary.user = data.pusher.name;
        eventSummary.action = `pushed ${data.commits.length} commit(s) to ${data.ref.split('/').pop()}`;
        
        const embed = new EmbedBuilder()
            .setTitle('🚀 New Push')
            .setDescription(`**${eventSummary.user}** ${eventSummary.action}\n**Message:** ${data.head_commit.message}`)
            .setColor('#6366f1');
        
        if (channel) channel.send({ embeds: [embed] });

    } else if (event === 'issues' && data.action === 'opened') {
        eventSummary.user = data.issue.user.login;
        eventSummary.action = `opened issue: #${data.issue.number} ${data.issue.title}`;

        const embed = new EmbedBuilder()
            .setTitle('⚠️ New Issue')
            .setDescription(eventSummary.action)
            .setColor('#f59e0b');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`close_issue_${data.repository.owner.login}_${data.repository.name}_${data.issue.number}`)
                .setLabel('Close Issue')
                .setStyle(ButtonStyle.Danger)
        );

        if (channel) channel.send({ embeds: [embed], components: [row] });
    }

    // Emit to Dashboard
    io.emit('github_event', eventSummary);
    res.sendStatus(200);
});

// --- Discord Interaction Handling ---
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith('close_issue_')) {
        const [, , owner, repo, num] = interaction.customId.split('_');

        try {
            await axios.patch(`https://api.github.com/repos/${owner}/${repo}/issues/${num}`, 
                { state: 'closed' },
                { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } }
            );

            await interaction.reply({ content: `✅ Issue #${num} closed.`, ephemeral: true });
            await interaction.message.edit({ components: [] });
        } catch (err) {
            await interaction.reply({ content: '❌ Error closing issue. Check GITHUB_TOKEN permissions.', ephemeral: true });
        }
    }
});

// Start everything
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌐 Dashboard & Webhook running on http://localhost:${PORT}`);
});

client.login(process.env.DISCORD_TOKEN);