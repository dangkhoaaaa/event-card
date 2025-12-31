import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { TemplatesService } from '../templates.service';
import { CardType } from '../schemas/template.schema';

async function seedTemplates() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const templatesService = app.get(TemplatesService);

  const templates = [
    {
      name: 'Thư Mời Cưới Mẫu Đỏ Trắng',
      type: CardType.WEDDING,
      thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1/wedding-template-1.jpg',
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
      type: CardType.WEDDING,
      thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1/wedding-template-2.jpg',
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
      type: CardType.WEDDING,
      thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1/wedding-template-3.jpg',
      design: {
        backgroundColor: '#F8E8F0',
        backgroundImage: 'https://res.cloudinary.com/demo/image/upload/v1/red-envelope-bg.jpg',
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
      name: 'Trang Xác Nhận Tham Dự',
      type: CardType.WEDDING,
      thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1/rsvp-template.jpg',
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
      type: CardType.WEDDING,
      thumbnail: 'https://res.cloudinary.com/demo/image/upload/v1/thankyou-template.jpg',
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

  console.log('Seeding templates...');
  
  for (const template of templates) {
    try {
      const existing = await templatesService.findAll(template.type as CardType);
      const exists = existing.some((t) => t.name === template.name);
      
      if (!exists) {
        await templatesService.create(template as any);
        console.log(`✓ Created template: ${template.name}`);
      } else {
        console.log(`- Template already exists: ${template.name}`);
      }
    } catch (error) {
      console.error(`✗ Error creating template ${template.name}:`, error);
    }
  }

  console.log('Seeding completed!');
  await app.close();
}

seedTemplates().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});



