import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService, Board } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  async addBoard(@Body() body: any): Promise<Board> {
    const { title, description } = body;
    return this.boardsService.addBoard({ title, description });
  }
}
