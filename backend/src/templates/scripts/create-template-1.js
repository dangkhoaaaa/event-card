// Script to create Template 1 specifically
// Run with: node src/templates/scripts/create-template-1.js

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

const template1 = {
  name: 'Template 1',
  type: 'wedding',
  thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
  design: {
    backgroundColor: '#FFF5F5',
    textStyles: {
      title: {
        fontFamily: 'serif',
        fontSize: 36,
        color: '#2C2C2C',
        fontWeight: 'bold',
        position: { x: 15, y: 10 },
      },
      groomFamilyTitle: {
        fontFamily: 'sans-serif',
        fontSize: 18,
        color: '#2C2C2C',
        fontWeight: 'bold',
        position: { x: 10, y: 25 },
      },
      groomFamilyName1: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        color: '#2C2C2C',
        fontWeight: 'normal',
        position: { x: 10, y: 28 },
      },
      groomFamilyName2: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        color: '#2C2C2C',
        fontWeight: 'normal',
        position: { x: 10, y: 30 },
      },
      groomFamilyAddress: {
        fontFamily: 'sans-serif',
        fontSize: 14,
        color: '#666666',
        fontWeight: 'normal',
        position: { x: 10, y: 32 },
      },
      brideFamilyTitle: {
        fontFamily: 'sans-serif',
        fontSize: 18,
        color: '#2C2C2C',
        fontWeight: 'bold',
        position: { x: 10, y: 40 },
      },
      brideFamilyName1: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        color: '#2C2C2C',
        fontWeight: 'normal',
        position: { x: 10, y: 43 },
      },
      brideFamilyName2: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        color: '#2C2C2C',
        fontWeight: 'normal',
        position: { x: 10, y: 45 },
      },
      brideFamilyAddress: {
        fontFamily: 'sans-serif',
        fontSize: 14,
        color: '#666666',
        fontWeight: 'normal',
        position: { x: 10, y: 47 },
      },
      announcement: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        color: '#2C2C2C',
        fontWeight: 'normal',
        position: { x: 50, y: 55 },
      },
      groomName: {
        fontFamily: 'cursive',
        fontSize: 32,
        color: '#2C2C2C',
        fontWeight: 'normal',
        position: { x: 35, y: 65 },
      },
      brideName: {
        fontFamily: 'cursive',
        fontSize: 32,
        color: '#2C2C2C',
        fontWeight: 'normal',
        position: { x: 65, y: 65 },
      },
    },
    imagePlaceholders: [],
  },
  isActive: true,
};

async function createTemplate1() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventcard');
    console.log('Connected to MongoDB');

    // Delete existing Template 1 if exists
    await Template.deleteOne({ name: 'Template 1' });
    console.log('Deleted existing Template 1 if exists');

    // Create new Template 1
    await Template.create(template1);
    console.log('✅ Created Template 1 successfully!');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating Template 1:', error);
    process.exit(1);
  }
}

createTemplate1();



