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
    private boardsRepository: Repository<BoardEntity>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardsRepository.find();
  }

  async addBoard({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): Promise<Board> {
    const board = { title, description };
    const saved = await this.boardsRepository.save(board);

    return saved;
  }
}
