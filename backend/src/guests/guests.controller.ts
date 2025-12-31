import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GuestsService } from './guests.service';
import { CreateGuestDto, CreateBulkGuestsDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Post()
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestsService.create(createGuestDto);
  }

  @Post('bulk')
  createBulk(@Body() createBulkGuestsDto: CreateBulkGuestsDto) {
    return this.guestsService.createBulk(createBulkGuestsDto);
  }

  @Get()
  findAll(@Query('cardId') cardId: string) {
    return this.guestsService.findAll(cardId);
  }

  @Get('statistics/:cardId')
  getStatistics(@Param('cardId') cardId: string) {
    return this.guestsService.getStatistics(cardId);
  }

  @Get('view/:cardId/:name')
  markAsViewed(
    @Param('cardId') cardId: string,
    @Param('name') name: string,
  ) {
    return this.guestsService.markAsViewed(cardId, name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestDto: UpdateGuestDto) {
    return this.guestsService.update(id, updateGuestDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.guestsService.remove(id);
    return { message: 'Guest deleted successfully' };
  }
}



