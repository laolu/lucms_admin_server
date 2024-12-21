import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../guards/admin.guard';
import { FriendLinkService } from './friend-link.service';
import { CreateFriendLinkDto, UpdateFriendLinkDto } from './dto/friend-link.dto';
import { FriendLink } from './entities/friend-link.entity';

@Controller('friend-links')
export class FriendLinkController {
  constructor(private readonly friendLinkService: FriendLinkService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(@Body() createFriendLinkDto: CreateFriendLinkDto): Promise<FriendLink> {
    return await this.friendLinkService.create(createFriendLinkDto);
  }

  @Get()
  async findAll(): Promise<FriendLink[]> {
    return await this.friendLinkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FriendLink> {
    return await this.friendLinkService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(
    @Param('id') id: number,
    @Body() updateFriendLinkDto: UpdateFriendLinkDto,
  ): Promise<FriendLink> {
    return await this.friendLinkService.update(id, updateFriendLinkDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async remove(@Param('id') id: number): Promise<void> {
    await this.friendLinkService.remove(id);
  }
} 