// Script to create Template 2 in database
const mongoose = require('mongoose');
require('dotenv').config();

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['wedding', 'birthday', 'anniversary', 'baby_shower', 'other'], required: true },
  thumbnail: { type: String, required: true },
  design: { type: Object, required: true },
  isActive: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
}, { timestamps: true });

const Template = mongoose.model('Template', TemplateSchema);

const template2 = {
  name: 'Template 2',
  type: 'wedding',
  thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
  design: {
    type: 'frontend', // Đánh dấu là template frontend
    component: 'template2', // Component name
    backgroundColor: '#FFF5F5',
    textStyles: {},
    imagePlaceholders: [
      { id: 'envelopePhoto', position: { x: 50, y: 50 }, size: { width: 300, height: 300 } },
      { id: 'mainPhoto', position: { x: 50, y: 50 }, size: { width: 400, height: 500 } },
      { id: 'photo1', position: { x: 20, y: 75 }, size: { width: 100, height: 120 } },
      { id: 'photo2', position: { x: 50, y: 75 }, size: { width: 100, height: 120 } },
      { id: 'photo3', position: { x: 80, y: 75 }, size: { width: 100, height: 120 } },
      { id: 'thankPhoto1', position: { x: 25, y: 15 }, size: { width: 150, height: 150 } },
      { id: 'thankPhoto2', position: { x: 75, y: 15 }, size: { width: 150, height: 150 } },
      { id: 'thankMainPhoto', position: { x: 50, y: 45 }, size: { width: 300, height: 400 } },
    ],
  },
  isActive: true,
};

async function createTemplate2() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventcard');
    console.log('Connected to MongoDB');

    // Delete existing Template 2 if exists
    await Template.deleteOne({ name: 'Template 2' });
    console.log('Deleted existing Template 2 if exists');

    // Create new Template 2
    const created = await Template.create(template2);
    console.log('✅ Created Template 2 successfully!');
    console.log('Template ID:', created._id.toString());

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating Template 2:', error);
    process.exit(1);
  }
}

createTemplate2();



