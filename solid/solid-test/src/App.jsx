import {createSignal, onCleanup} from "solid-js";
import {render} from "solid-js/web";

const App = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <button onClick={() => setCount(count() + 1)}>Increment</button>
      <button onClick={() => setCount(count() - 1)}>Decrement</button>
      <p>Count: {count()}</p>
      <p>Doubled: {count() * 2}</p>
    </div>
  )
}
export default App;