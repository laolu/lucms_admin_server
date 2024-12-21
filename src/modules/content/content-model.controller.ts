import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { ContentModelService } from './content-model.service';
import { ContentModel } from './entities/content-model.entity';
import { CreateContentModelDto, UpdateContentModelDto, ModelAttributeValueDto } from './dto/content-model.dto';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('content-models')
export class ContentModelController {
  constructor(private readonly contentModelService: ContentModelService) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createDto: CreateContentModelDto): Promise<ContentModel> {
    return await this.contentModelService.create(createDto);
  }

  @Get()
  async findAll(): Promise<ContentModel[]> {
    return await this.contentModelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ContentModel> {
    return await this.contentModelService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateContentModelDto
  ): Promise<ContentModel> {
    return await this.contentModelService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: number): Promise<void> {
    await this.contentModelService.delete(id);
  }
} 