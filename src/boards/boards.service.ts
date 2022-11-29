import { Injectable } from '@nestjs/common';

interface Board {
  title: string;
}

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards() {
    return this.boards;
  }

  addBoard(board: Board): void {
    this.boards.push(board);
  }
}
