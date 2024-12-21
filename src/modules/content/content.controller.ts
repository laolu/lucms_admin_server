import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/content.dto';
import { Content } from './entities/content.entity';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createContentDto: CreateContentDto): Promise<Content> {
    return await this.contentService.create(createContentDto);
  }

  @Get()
  async findAll(@Query() query: PaginationDto): Promise<Content[]> {
    return await this.contentService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Content> {
    return await this.contentService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Content>
  ): Promise<Content> {
    return await this.contentService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.contentService.delete(id);
  }
} 