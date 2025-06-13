const DeviceTemplate = require('../models/DeviceTemplate');

// Mendapatkan semua template
const getTemplates = async (req, res) => {
  try {
    const templates = await DeviceTemplate.find().sort({ createdAt: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data template',
      error: error.message
    });
  }
};

// Mendapatkan detail template
const getTemplate = async (req, res) => {
  try {
    const template = await DeviceTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        message: 'Template tidak ditemukan'
      });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil detail template',
      error: error.message
    });
  }
};

// Membuat template baru
const createTemplate = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      dataPoints,
      actions
    } = req.body;

    const template = new DeviceTemplate({
      name,
      description,
      type,
      dataPoints,
      actions
    });

    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat membuat template',
      error: error.message
    });
  }
};

// Update template
const updateTemplate = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      dataPoints,
      actions
    } = req.body;

    const template = await DeviceTemplate.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        type,
        dataPoints,
        actions
      },
      { new: true }
    );

    if (!template) {
      return res.status(404).json({
        message: 'Template tidak ditemukan'
      });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengupdate template',
      error: error.message
    });
  }
};

// Hapus template
const deleteTemplate = async (req, res) => {
  try {
    const template = await DeviceTemplate.findByIdAndDelete(req.params.id);

    if (!template) {
      return res.status(404).json({
        message: 'Template tidak ditemukan'
      });
    }

    res.json({ message: 'Template berhasil dihapus' });
  } catch (error) {
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus template',
      error: error.message
    });
  }
};

module.exports = {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate
}; 