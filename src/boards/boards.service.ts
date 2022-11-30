import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v1 as uuid } from 'uuid';
import { Board as BoardEntity } from './board.entity';

export interface Board {
  id: string;
  title: string;
  description: string;
}

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  addBoard({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): Board {
    const board = { id: uuid(), title, description };
    this.boards.push(board);

    return board;
  }
}
