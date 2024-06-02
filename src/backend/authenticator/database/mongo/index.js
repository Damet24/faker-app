const mongoose = require('mongoose');

async function mongoConnection(connectionString) {
    await mongoose.connect(connectionString);
    console.log('MongoDB connected');
}

module.exports = {
    mongoConnection,
    Credential: mongoose.model("Credential", new mongoose.Schema({
        email: String,
        passwordHash: String
    }))
};