const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['sensor', 'actuator', 'hybrid']
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeviceTemplate',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authToken: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'error'],
    default: 'offline'
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  data: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    values: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index untuk pencarian cepat
deviceSchema.index({ owner: 1, name: 1 });
deviceSchema.index({ authToken: 1 });

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device; 