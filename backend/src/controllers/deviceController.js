const Device = require('../models/Device');
const crypto = require('crypto');

// Mendapatkan semua perangkat user
const getDevices = async (req, res) => {
  try {
    const devices = await Device.find({ owner: req.user._id })
      .populate('template')
      .sort({ createdAt: -1 });
    res.json(devices);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data perangkat',
      error: error.message
    });
  }
};

// Mendapatkan detail perangkat
const getDevice = async (req, res) => {
  try {
    const device = await Device.findOne({
      _id: req.params.id,
      owner: req.user._id
    }).populate('template');

    if (!device) {
      return res.status(404).json({
        message: 'Perangkat tidak ditemukan'
      });
    }

    res.json(device);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil detail perangkat',
      error: error.message
    });
  }
};

// Membuat perangkat baru
const createDevice = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      template
    } = req.body;

    // Generate auth token untuk perangkat
    const authToken = crypto.randomBytes(32).toString('hex');

    const device = new Device({
      name,
      description,
      type,
      template,
      owner: req.user._id,
      authToken
    });

    await device.save();

    // Update user dengan perangkat baru
    req.user.devices.push(device._id);
    await req.user.save();

    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat membuat perangkat',
      error: error.message
    });
  }
};

// Update perangkat
const updateDevice = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      template
    } = req.body;

    const device = await Device.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      {
        name,
        description,
        type,
        template
      },
      { new: true }
    ).populate('template');

    if (!device) {
      return res.status(404).json({
        message: 'Perangkat tidak ditemukan'
      });
    }

    res.json(device);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengupdate perangkat',
      error: error.message
    });
  }
};

// Hapus perangkat
const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!device) {
      return res.status(404).json({
        message: 'Perangkat tidak ditemukan'
      });
    }

    // Hapus referensi perangkat dari user
    req.user.devices = req.user.devices.filter(
      id => id.toString() !== device._id.toString()
    );
    await req.user.save();

    res.json({ message: 'Perangkat berhasil dihapus' });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus perangkat',
      error: error.message
    });
  }
};

// Update status perangkat
const updateDeviceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const device = await Device.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      {
        status,
        lastSeen: Date.now()
      },
      { new: true }
    );

    if (!device) {
      return res.status(404).json({
        message: 'Perangkat tidak ditemukan'
      });
    }

    res.json(device);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengupdate status perangkat',
      error: error.message
    });
  }
};

// Tambah data perangkat
const addDeviceData = async (req, res) => {
  try {
    const { values } = req.body;

    const device = await Device.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      {
        $push: {
          data: {
            timestamp: Date.now(),
            values
          }
        },
        lastSeen: Date.now()
      },
      { new: true }
    );

    if (!device) {
      return res.status(404).json({
        message: 'Perangkat tidak ditemukan'
      });
    }

    res.json(device);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambah data perangkat',
      error: error.message
    });
  }
};

module.exports = {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
  updateDeviceStatus,
  addDeviceData
}; 