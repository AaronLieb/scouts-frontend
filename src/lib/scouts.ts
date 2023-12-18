import * as scouts from "scouts-wasm";
import { writable, readable } from "svelte/store";
import { load as loadScoutsEngine } from "scouts-wasm";
import wasmURL from "scouts-wasm/dist/main.wasm?url";

await loadScoutsEngine(wasmURL);

export type Game = typeof Scouts;
export * from "scouts-wasm";

export const pieces = writable<scouts.Piece[]>([]);
export const pastTurns = writable<scouts.PastTurn[]>([]);
export const currentTurn = writable<scouts.CurrentTurn | null>(null);

export async function update(fn: (game: Game) => Promise<void>) {
  await fn(Scouts);
  await Promise.all([
    Scouts.pastTurns().then(pastTurns.set),
    Scouts.currentTurn().then(currentTurn.set),
    Scouts.boardPieces().then(pieces.set),
  ]);
}

export async function resetGame() {
  await update(async (game) => game.resetGame());
}

export async function makeMove(player: scouts.Player, move: scouts.Move) {
  await update(async (game) => game.makeMove(player, move));
}

export async function possibleMoves(player: scouts.Player) {
  return await Scouts.possibleMoves(player);
}

await resetGame();
