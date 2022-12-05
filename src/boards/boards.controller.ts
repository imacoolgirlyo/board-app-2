import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { BoardsService, Board } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  async addBoard(@Req() request: Request): Promise<Board> {
    const { title, description } = request.body;
    return this.boardsService.addBoard({ title, description });
  }
}
