const mongoose = require('mongoose');

const dataPointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['number', 'boolean', 'string', 'enum']
  },
  unit: {
    type: String,
    trim: true
  },
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  enumValues: [{
    type: String
  }],
  visualization: {
    type: {
      type: String,
      enum: ['gauge', 'line', 'bar', 'toggle', 'text'],
      default: 'line'
    },
    color: String,
    icon: String
  }
});

const deviceTemplateSchema = new mongoose.Schema({
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
  dataPoints: [dataPointSchema],
  actions: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['toggle', 'slider', 'input', 'select']
    },
    parameters: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  }],
  icon: {
    type: String,
    default: 'device'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp saat template diupdate
deviceTemplateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const DeviceTemplate = mongoose.model('DeviceTemplate', deviceTemplateSchema);

module.exports = DeviceTemplate; 