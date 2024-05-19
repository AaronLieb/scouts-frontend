import { writable, readable } from "svelte/store";

const API_URL = 'http://localhost:3006/'

export enum GameState {
  Menu = 0,
  InGame = 1
}

export type Turn = {
  player?: number
}

export type Piece = {
  player?: number,
  type?: string
}

export let currentTurn: Turn = { player: 0 };

export async function createNewLobby() {
  const ENDPOINT = 'create_new_lobby'
  const res = await fetch(API_URL + ENDPOINT).then(res => res.json())
  return res
}

export async function joinLobby(joinCode: string, player: number) {
  const ENDPOINT = 'join_lobby'
  const PARAMS = `?join_code=${joinCode}&player=${player}`
  const res = await fetch(API_URL + ENDPOINT + PARAMS).then(res => res.json())
  return res
}

export async function deleteLobby(joinCode: string) {
  const ENDPOINT = 'delete_lobby'
  const PARAMS = `?join_code=${joinCode}`
  const res = await fetch(API_URL + ENDPOINT + PARAMS).then(res => res.json())
  return res
}
