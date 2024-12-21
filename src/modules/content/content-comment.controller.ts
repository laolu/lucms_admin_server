import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContentCommentService } from './content-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ContentComment } from './entities/content-comment.entity';

@Controller('content-comments')
export class ContentCommentController {
  constructor(private readonly commentService: ContentCommentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createDto: CreateCommentDto, @Request() req): Promise<ContentComment> {
    return await this.commentService.create(createDto, req.user.id);
  }

  @Get()
  async findAll(@Query('contentId') contentId: number): Promise<ContentComment[]> {
    return await this.commentService.findAll(contentId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ContentComment> {
    return await this.commentService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
    @Body('content') content: string,
    @Request() req
  ): Promise<ContentComment> {
    return await this.commentService.update(id, content, req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: number, @Request() req): Promise<void> {
    await this.commentService.delete(id, req.user.id);
  }
} 