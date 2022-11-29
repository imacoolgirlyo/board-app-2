import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { BoardsService, Board } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  addBoard(@Req() request: Request): Board {
    const { title, description } = request.body;
    return this.boardsService.addBoard({ title, description });
  }
}
