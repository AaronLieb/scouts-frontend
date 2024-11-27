import { BOARD_WIDTH } from "./constants"

export type Player = {
  side: number
  name: string,
  time: number,
  avatar?: string
}

export type Game = {
  id: string,
}

export type Turn = {
  player?: number
}

export type Piece = {
  player?: number, // same as Player.side
  type?: string
  possible: boolean
  selected: boolean
}

export enum GameState {
  Menu = 0,
  InGame = 1,
}

export class Point {

  public x: number;
  public y: number;
  public id: number;

  constructor(idx: number | string) {
    if (typeof idx == "number") {
      this.id = idx
      this.x = idx % BOARD_WIDTH;
      this.y = Math.floor(idx / BOARD_WIDTH);
    } else {
      const values: number[] = idx.split(',').map(v => +v)
      this.x = values[0]
      this.y = values[1]
      this.id = this.x + this.y * BOARD_WIDTH;
    }
  }

  equals(p: Point) {
    return this.x == p.x && this.y == p.y && this.id == p.id;
  }
}
