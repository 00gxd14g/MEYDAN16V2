const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false // Disabled for inline styles
}));

// Compression middleware
app.use(compression());

const publicPath = path.join(__dirname, 'public');

// Serve static files
app.use(express.static(publicPath, {
    maxAge: '1d',
    etag: true
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(publicPath, 'pages', 'about.html'));
});

app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(publicPath, 'pages', 'portfolio.html'));
});

app.get('/availabilities', (req, res) => {
    res.sendFile(path.join(publicPath, 'pages', 'availabilities.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(publicPath, 'pages', 'contact.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(publicPath, 'index.html'));
});

// Error handler
app.use((err, req, res, _next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Bir hata oluştu!');
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 MEYDAN16 Server Started!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📍 Server running at: http://localhost:${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✨ MEYDAN16 - Şehrin Yeni Meydanı');
    console.log('📧 info@meydan16.com.tr\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n👋 SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n👋 SIGINT received. Shutting down gracefully...');
    process.exit(0);
});
