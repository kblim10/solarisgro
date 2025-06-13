const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice,
  updateDeviceStatus,
  addDeviceData
} = require('../controllers/deviceController');

// Protected routes
router.get('/', auth, getDevices);
router.get('/:id', auth, getDevice);
router.post('/', auth, createDevice);
router.put('/:id', auth, updateDevice);
router.delete('/:id', auth, deleteDevice);
router.patch('/:id/status', auth, updateDeviceStatus);
router.post('/:id/data', auth, addDeviceData);

module.exports = router; 