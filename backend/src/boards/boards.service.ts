import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async addBoard({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): Promise<Board> {
    const board = { title, description };
    const savedBoard = await this.boardRepository.save(board);

    return savedBoard;
  }
}
