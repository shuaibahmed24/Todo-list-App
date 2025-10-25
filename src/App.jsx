import Todo from "./components/Todo";
import Toggle from "./components/Toggle";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-end p-4">
        <Toggle />
      </div>

      
      <div className="flex justify-center items-center">
        <Todo />
      </div>

    </div>
  );
}

export default App;
