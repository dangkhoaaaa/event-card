import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @CurrentUser() user: any,
    @Body() body: any,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|webp)/ }),
        ],
        fileIsRequired: false,
      }),
    )
    images?: Express.Multer.File[],
  ) {
    // Parse content from FormData
    let content: any = {};
    try {
      content = typeof body.content === 'string' 
        ? JSON.parse(body.content) 
        : body.content || {};
    } catch (e) {
      content = {};
    }

    const createCardDto: CreateCardDto = {
      templateId: body.templateId,
      title: body.title,
      hostName: body.hostName,
      content,
      isPublished: body.isPublished === 'true' || body.isPublished === true,
    };

    // Upload images and map them to content keys
    if (images && images.length > 0 && body.imageKeys) {
      const imageKeys: string[] = typeof body.imageKeys === 'string'
        ? JSON.parse(body.imageKeys)
        : body.imageKeys;

      const imageUploads = await Promise.all(
        images.map((file) => this.cloudinaryService.uploadImage(file)),
      );

      // Map uploaded images to their corresponding content keys
      imageKeys.forEach((key, index) => {
        if (imageUploads[index]) {
          createCardDto.content[key] = { url: imageUploads[index] };
        }
      });
      
      // Remove placeholder markers
      Object.keys(createCardDto.content).forEach((key) => {
        if (createCardDto.content[key] === '__IMAGE_PLACEHOLDER__') {
          delete createCardDto.content[key];
        }
      });
    }

    return this.cardsService.create(createCardDto, user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() user: any, @Query('hostName') hostName?: string) {
    return this.cardsService.findAll(user.userId, hostName);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    await this.cardsService.incrementViewCount(slug);
    return this.cardsService.findBySlug(slug);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const card = await this.cardsService.findOne(id);
    return card;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto, @CurrentUser() user: any) {
    const card = await this.cardsService.findOne(id);
    // Verify card belongs to user
    if (card.userId.toString() !== user.userId) {
      throw new ForbiddenException('You do not have permission to update this card');
    }
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    const card = await this.cardsService.findOne(id);
    // Verify card belongs to user
    if (card.userId.toString() !== user.userId) {
      throw new ForbiddenException('You do not have permission to delete this card');
    }
    await this.cardsService.remove(id);
    return { message: 'Card deleted successfully' };
  }
}

