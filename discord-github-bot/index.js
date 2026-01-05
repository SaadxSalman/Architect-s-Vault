require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public'));

// --- Discord Bot Setup ---
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds] 
});

// Using 'ClientReady' to be future-proof and avoid deprecation warnings
client.once(Events.ClientReady, (c) => {
    console.log(`🤖 Bot online as ${c.user.tag}`);
});

// --- Routes ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/github-webhook', async (req, res) => {
    const event = req.headers['x-github-event'];
    const data = req.body;
    
    // Safety check for channel
    const channelId = process.env.DISCORD_CHANNEL_ID;
    const channel = client.channels.cache.get(channelId);

    let eventSummary = {
        type: event,
        repo: data.repository?.full_name || 'Unknown Repo',
        user: '',
        action: ''
    };

    let embed = null;
    let row = null;

    if (event === 'push') {
        eventSummary.user = data.pusher?.name || 'Unknown User';
        eventSummary.action = `pushed ${data.commits?.length || 0} commit(s) to ${data.ref?.split('/').pop()}`;
        
        embed = new EmbedBuilder()
            .setTitle('🚀 New Push')
            .setDescription(`**${eventSummary.user}** ${eventSummary.action}\n**Message:** ${data.head_commit?.message || 'No message'}`)
            .setColor('#6366f1');

    } else if (event === 'issues' && data.action === 'opened') {
        eventSummary.user = data.issue.user.login;
        eventSummary.action = `opened issue: #${data.issue.number} ${data.issue.title}`;

        embed = new EmbedBuilder()
            .setTitle('⚠️ New Issue')
            .setDescription(eventSummary.action)
            .setColor('#f59e0b');

        row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`close_issue_${data.repository.owner.login}_${data.repository.name}_${data.issue.number}`)
                .setLabel('Close Issue')
                .setStyle(ButtonStyle.Danger)
        );
    }

    // Attempt to send to Discord with Error Handling to prevent server crash
    if (channel && embed) {
        channel.send({ 
            embeds: [embed], 
            components: row ? [row] : [] 
        }).catch(err => {
            console.error(`❌ Discord Permission Error: Make sure the bot can view and post in channel ${channelId}.`);
            console.error(`Error Code: ${err.code}`);
        });
    } else if (!channel) {
        console.warn(`⚠️ Warning: Channel ${channelId} not found. Check your .env and Bot permissions.`);
    }

    // Always emit to Dashboard so the website works even if Discord fails
    io.emit('github_event', eventSummary);
    res.sendStatus(200);
});

// --- Discord Interaction Handling ---
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith('close_issue_')) {
        const [, , owner, repo, num] = interaction.customId.split('_');

        try {
            await axios.patch(`https://api.github.com/repos/${owner}/${repo}/issues/${num}`, 
                { state: 'closed' },
                { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } }
            );

            await interaction.reply({ content: `✅ Issue #${num} closed successfully!`, ephemeral: true });
            
            // Remove the button so it can't be clicked again
            await interaction.message.edit({ components: [] });
        } catch (err) {
            console.error('❌ GitHub API Error:', err.response?.data || err.message);
            await interaction.reply({ 
                content: '❌ Error closing issue. Check if your GITHUB_TOKEN has "repo" permissions.', 
                ephemeral: true 
            });
        }
    }
});

// Start everything
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌐 Dashboard & Webhook running on http://localhost:${PORT}`);
});

// Global error handling for the client to prevent unhandled crashes
client.on('error', console.error);

client.login(process.env.DISCORD_TOKEN);