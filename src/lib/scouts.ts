import { load } from "scouts-wasm";
import wasmURL from "scouts-wasm/dist/main.wasm?url";

await load(wasmURL);
await Scouts.resetGame();
