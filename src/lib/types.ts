import { BOARD_WIDTH } from "./constants"

export type Player = {
  side: number
  name: string,
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

  constructor(idx: number) {
    this.id = idx
    this.x = idx % BOARD_WIDTH;
    this.y = Math.floor(idx / BOARD_WIDTH);
  }
}
