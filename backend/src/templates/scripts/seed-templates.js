// Simple Node.js script to seed templates
// Run with: node src/templates/scripts/seed-templates.js

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

const templates = [
  {
    name: 'Template 1',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    design: {
      backgroundColor: '#FFF5F5',
      backgroundImage: null,
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
  },
  {
    name: 'Thư Mời Cưới Mẫu Đỏ Trắng',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    design: {
      backgroundColor: '#F8E8F0',
      textStyles: {
        title: {
          fontFamily: 'serif',
          fontSize: 32,
          color: '#2C2C2C',
          fontWeight: 'bold',
          position: { x: 50, y: 10 },
        },
        groomFamily: {
          fontFamily: 'sans-serif',
          fontSize: 16,
          color: '#2C2C2C',
          fontWeight: 'normal',
          position: { x: 10, y: 25 },
        },
        brideFamily: {
          fontFamily: 'sans-serif',
          fontSize: 16,
          color: '#2C2C2C',
          fontWeight: 'normal',
          position: { x: 10, y: 40 },
        },
        announcement: {
          fontFamily: 'sans-serif',
          fontSize: 14,
          color: '#666666',
          fontWeight: 'normal',
          position: { x: 50, y: 55 },
        },
        groomName: {
          fontFamily: 'cursive',
          fontSize: 28,
          color: '#2C2C2C',
          fontWeight: 'normal',
          position: { x: 30, y: 70 },
        },
        brideName: {
          fontFamily: 'cursive',
          fontSize: 28,
          color: '#2C2C2C',
          fontWeight: 'normal',
          position: { x: 70, y: 70 },
        },
      },
      imagePlaceholders: [],
    },
    isActive: true,
  },
  {
    name: 'Thư Mời Cưới Mẫu Đồ Trắng',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
    design: {
      backgroundColor: '#F8E8F0',
      textStyles: {
        title: {
          fontFamily: 'serif',
          fontSize: 24,
          color: '#2C2C2C',
          fontWeight: 'bold',
          position: { x: 50, y: 5 },
        },
        coupleNames: {
          fontFamily: 'cursive',
          fontSize: 32,
          color: '#2C2C2C',
          fontWeight: 'normal',
          position: { x: 50, y: 20 },
        },
        invitation: {
          fontFamily: 'cursive',
          fontSize: 20,
          color: '#2C2C2C',
          fontWeight: 'normal',
          position: { x: 50, y: 60 },
        },
      },
      imagePlaceholders: [
        {
          id: 'mainPhoto',
          position: { x: 50, y: 35 },
          size: { width: 300, height: 400 },
        },
        {
          id: 'photo1',
          position: { x: 20, y: 75 },
          size: { width: 100, height: 120 },
        },
        {
          id: 'photo2',
          position: { x: 50, y: 75 },
          size: { width: 100, height: 120 },
        },
        {
          id: 'photo3',
          position: { x: 80, y: 75 },
          size: { width: 100, height: 120 },
        },
      ],
    },
    isActive: true,
  },
  {
    name: 'Thiệp Mời Cưới Phong Bì Đỏ',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400',
    design: {
      backgroundColor: '#F8E8F0',
      backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      textStyles: {
        invitationTitle: {
          fontFamily: 'serif',
          fontSize: 24,
          color: '#2C2C2C',
          fontWeight: 'bold',
          position: { x: 50, y: 10 },
        },
        invitationSubtitle: {
          fontFamily: 'cursive',
          fontSize: 28,
          color: '#2C2C2C',
          fontWeight: 'normal',
          position: { x: 50, y: 18 },
        },
        groomName: {
          fontFamily: 'cursive',
          fontSize: 24,
          color: '#2C2C2C',
          fontWeight: 'normal',
          position: { x: 35, y: 50 },
        },
        brideName: {
          fontFamily: 'cursive',
          fontSize: 24,
          color: '#2C2C2C',
          fontWeight: 'normal',
          position: { x: 65, y: 50 },
        },
        weddingDate: {
          fontFamily: 'sans-serif',
          fontSize: 20,
          color: '#2C2C2C',
          fontWeight: 'bold',
          position: { x: 50, y: 65 },
        },
      },
      imagePlaceholders: [
        {
          id: 'couplePhoto',
          position: { x: 50, y: 35 },
          size: { width: 250, height: 300 },
        },
      ],
    },
    isActive: true,
  },
  {
    name: 'Thiệp Cưới Classic Đỏ Đen',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    design: {
      backgroundColor: '#0d0d0d',
      textStyles: {
        title: {
          fontFamily: 'serif',
          fontSize: 36,
          color: '#ff6b6b',
          fontWeight: 'bold',
          position: { x: 50, y: 15 },
        },
        groomName: {
          fontFamily: 'cursive',
          fontSize: 28,
          color: '#ffffff',
          fontWeight: 'normal',
          position: { x: 40, y: 45 },
        },
        brideName: {
          fontFamily: 'cursive',
          fontSize: 28,
          color: '#ffffff',
          fontWeight: 'normal',
          position: { x: 60, y: 45 },
        },
        weddingDate: {
          fontFamily: 'sans-serif',
          fontSize: 18,
          color: '#ff6b6b',
          fontWeight: 'bold',
          position: { x: 50, y: 70 },
        },
        venue: {
          fontFamily: 'sans-serif',
          fontSize: 14,
          color: '#ffffff',
          fontWeight: 'normal',
          position: { x: 50, y: 80 },
        },
      },
      imagePlaceholders: [
        {
          id: 'mainPhoto',
          position: { x: 50, y: 30 },
          size: { width: 320, height: 400 },
        },
      ],
    },
    isActive: true,
  },
  {
    name: 'Thiệp Cưới Elegant Trắng Đỏ',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
    design: {
      backgroundColor: '#ffffff',
      textStyles: {
        title: {
          fontFamily: 'serif',
          fontSize: 30,
          color: '#0d0d0d',
          fontWeight: 'bold',
          position: { x: 50, y: 10 },
        },
        coupleNames: {
          fontFamily: 'cursive',
          fontSize: 34,
          color: '#ff6b6b',
          fontWeight: 'normal',
          position: { x: 50, y: 25 },
        },
        date: {
          fontFamily: 'sans-serif',
          fontSize: 20,
          color: '#0d0d0d',
          fontWeight: 'bold',
          position: { x: 50, y: 65 },
        },
        time: {
          fontFamily: 'sans-serif',
          fontSize: 16,
          color: '#666666',
          fontWeight: 'normal',
          position: { x: 50, y: 70 },
        },
        venue: {
          fontFamily: 'sans-serif',
          fontSize: 16,
          color: '#0d0d0d',
          fontWeight: 'normal',
          position: { x: 50, y: 75 },
        },
      },
      imagePlaceholders: [
        {
          id: 'mainPhoto',
          position: { x: 50, y: 40 },
          size: { width: 300, height: 350 },
        },
      ],
    },
    isActive: true,
  },
  {
    name: 'Thiệp Cưới Modern Minimalist',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400',
    design: {
      backgroundColor: '#f8f9fa',
      textStyles: {
        title: {
          fontFamily: 'sans-serif',
          fontSize: 24,
          color: '#0d0d0d',
          fontWeight: 'bold',
          position: { x: 50, y: 12 },
        },
        groomName: {
          fontFamily: 'sans-serif',
          fontSize: 22,
          color: '#ff6b6b',
          fontWeight: '600',
          position: { x: 50, y: 35 },
        },
        brideName: {
          fontFamily: 'sans-serif',
          fontSize: 22,
          color: '#ff6b6b',
          fontWeight: '600',
          position: { x: 50, y: 42 },
        },
        date: {
          fontFamily: 'sans-serif',
          fontSize: 18,
          color: '#0d0d0d',
          fontWeight: 'bold',
          position: { x: 50, y: 68 },
        },
        venue: {
          fontFamily: 'sans-serif',
          fontSize: 14,
          color: '#666666',
          fontWeight: 'normal',
          position: { x: 50, y: 75 },
        },
      },
      imagePlaceholders: [
        {
          id: 'mainPhoto',
          position: { x: 50, y: 50 },
          size: { width: 280, height: 300 },
        },
      ],
    },
    isActive: true,
  },
  {
    name: 'Thiệp Cưới Romantic Pink',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    design: {
      backgroundColor: '#FFF5F5',
      textStyles: {
        title: {
          fontFamily: 'cursive',
          fontSize: 32,
          color: '#ff6b6b',
          fontWeight: 'normal',
          position: { x: 50, y: 15 },
        },
        coupleNames: {
          fontFamily: 'cursive',
          fontSize: 36,
          color: '#0d0d0d',
          fontWeight: 'normal',
          position: { x: 50, y: 30 },
        },
        date: {
          fontFamily: 'cursive',
          fontSize: 20,
          color: '#ff6b6b',
          fontWeight: 'normal',
          position: { x: 50, y: 65 },
        },
        venue: {
          fontFamily: 'sans-serif',
          fontSize: 16,
          color: '#666666',
          fontWeight: 'normal',
          position: { x: 50, y: 72 },
        },
      },
      imagePlaceholders: [
        {
          id: 'mainPhoto',
          position: { x: 50, y: 45 },
          size: { width: 300, height: 350 },
        },
      ],
    },
    isActive: true,
  },
  {
    name: 'Thiệp Cưới Luxury Gold',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
    design: {
      backgroundColor: '#0d0d0d',
      textStyles: {
        title: {
          fontFamily: 'serif',
          fontSize: 28,
          color: '#D4AF37',
          fontWeight: 'bold',
          position: { x: 50, y: 12 },
        },
        groomName: {
          fontFamily: 'serif',
          fontSize: 26,
          color: '#ffffff',
          fontWeight: 'normal',
          position: { x: 50, y: 35 },
        },
        brideName: {
          fontFamily: 'serif',
          fontSize: 26,
          color: '#ffffff',
          fontWeight: 'normal',
          position: { x: 50, y: 42 },
        },
        date: {
          fontFamily: 'serif',
          fontSize: 20,
          color: '#D4AF37',
          fontWeight: 'bold',
          position: { x: 50, y: 68 },
        },
        venue: {
          fontFamily: 'sans-serif',
          fontSize: 14,
          color: '#ffffff',
          fontWeight: 'normal',
          position: { x: 50, y: 75 },
        },
      },
      imagePlaceholders: [
        {
          id: 'mainPhoto',
          position: { x: 50, y: 50 },
          size: { width: 300, height: 350 },
        },
      ],
    },
    isActive: true,
  },
  {
    name: 'Trang Xác Nhận Tham Dự',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400',
    design: {
      backgroundColor: '#FFFFFF',
      textStyles: {
        venueName: {
          fontFamily: 'sans-serif',
          fontSize: 20,
          color: '#2C2C2C',
          fontWeight: 'bold',
          position: { x: 50, y: 10 },
        },
        venueAddress: {
          fontFamily: 'sans-serif',
          fontSize: 14,
          color: '#666666',
          fontWeight: 'normal',
          position: { x: 50, y: 15 },
        },
        rsvpTitle: {
          fontFamily: 'sans-serif',
          fontSize: 18,
          color: '#FFFFFF',
          fontWeight: 'bold',
          position: { x: 50, y: 50 },
        },
        guestNameLabel: {
          fontFamily: 'sans-serif',
          fontSize: 14,
          color: '#FFFFFF',
          fontWeight: 'normal',
          position: { x: 50, y: 55 },
        },
        relationshipLabel: {
          fontFamily: 'sans-serif',
          fontSize: 14,
          color: '#FFFFFF',
          fontWeight: 'normal',
          position: { x: 50, y: 60 },
        },
        messageLabel: {
          fontFamily: 'sans-serif',
          fontSize: 14,
          color: '#FFFFFF',
          fontWeight: 'normal',
          position: { x: 50, y: 65 },
        },
        attendanceLabel: {
          fontFamily: 'sans-serif',
          fontSize: 14,
          color: '#FFFFFF',
          fontWeight: 'normal',
          position: { x: 50, y: 70 },
        },
      },
      imagePlaceholders: [
        {
          id: 'map',
          position: { x: 50, y: 30 },
          size: { width: 350, height: 200 },
        },
      ],
    },
    isActive: true,
  },
  {
    name: 'Trang Cảm Ơn',
    type: 'wedding',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    design: {
      backgroundColor: '#F8E8F0',
      textStyles: {
        thankyou: {
          fontFamily: 'cursive',
          fontSize: 36,
          color: '#FFFFFF',
          fontWeight: 'normal',
          position: { x: 50, y: 75 },
        },
        message: {
          fontFamily: 'cursive',
          fontSize: 20,
          color: '#2C2C2C',
          fontWeight: 'normal',
          position: { x: 50, y: 80 },
        },
      },
      imagePlaceholders: [
        {
          id: 'photo1',
          position: { x: 25, y: 15 },
          size: { width: 150, height: 150 },
        },
        {
          id: 'photo2',
          position: { x: 75, y: 15 },
          size: { width: 150, height: 150 },
        },
        {
          id: 'mainPhoto',
          position: { x: 50, y: 45 },
          size: { width: 300, height: 400 },
        },
      ],
    },
    isActive: true,
  },
];

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventcard');
    console.log('Connected to MongoDB');

    for (const template of templates) {
      const existing = await Template.findOne({ name: template.name });
      if (!existing) {
        await Template.create(template);
        console.log(`✓ Created template: ${template.name}`);
      } else {
        console.log(`- Template already exists: ${template.name}`);
      }
    }

    console.log(`\n✅ Seeding completed! Created ${templates.length} templates.`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedTemplates();
