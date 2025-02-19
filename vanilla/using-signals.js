import { createSignal, effect } from "./signals-test.js";
const [readCount, setCount] = createSignal(0);

function increment() {
  setCount(count() + 1);
}

function decrement() {
  setCount(count() - 1);
}

effect(() => {
  document.getElementById("count-value").innerText = readCount();
});

effect(() => {
  document.getElementById("doubled-value").innerText = readCount() * 2;
});
