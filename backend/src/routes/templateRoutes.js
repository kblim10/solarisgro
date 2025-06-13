const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate
} = require('../controllers/templateController');

// Protected routes
router.get('/', auth, getTemplates);
router.get('/:id', auth, getTemplate);
router.post('/', auth, createTemplate);
router.put('/:id', auth, updateTemplate);
router.delete('/:id', auth, deleteTemplate);

module.exports = router; 