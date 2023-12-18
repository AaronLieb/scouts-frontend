import './app.css'
import App from './App.svelte'


const app_target = document.getElementById("app");
if (!app_target) {
  throw new Error("Could not find app target in DOM.");
}

const app = new App({
  target: app_target,
})

export default app
