export class GameResult {
  constructor(
    public categoryId: string,
    public gameId: number,
    public date: Date,
    public points: number
  ) {}
}
