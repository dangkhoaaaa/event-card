import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CardType } from './schemas/template.schema';

@Controller('templates')
export class TemplatesController {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  async create(
    @Body() createTemplateDto: CreateTemplateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif|webp)/ }),
        ],
        fileIsRequired: false,
      }),
    )
    thumbnail?: Express.Multer.File,
  ) {
    if (thumbnail) {
      const thumbnailUrl = await this.cloudinaryService.uploadImage(thumbnail);
      createTemplateDto.thumbnail = thumbnailUrl;
    }
    return this.templatesService.create(createTemplateDto);
  }

  @Get()
  async findAll(@Query('type') type?: CardType) {
    return this.templatesService.findAll(type);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }
}



