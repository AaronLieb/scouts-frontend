import { load } from "scouts-wasm";
import wasmURL from "scouts-wasm/dist/scouts.wasm?url";


await load(wasmURL);
await Scouts.resetGame();

await Scouts.makeMove(1, "place_scout 0,9");
await Scouts.makeMove(2, "place_scout 0,0");

const moves = await Scouts.possibleMoves(1);
console.log("Possible moves for player 2:", moves);
