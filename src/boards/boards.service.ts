import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

export interface Board {
  id: string;
  title: string;
  description: string;
}

@Injectable()
export class BoardsService {
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
