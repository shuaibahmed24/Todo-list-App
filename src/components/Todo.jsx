import React, { useState, useEffect } from "react";
import TodoItems from "./Todoitems";

const Todo = () => {
  const [taskText, setTaskText] = useState("");
  const [category, setCategory] = useState("Study");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("todos"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskText.trim() === "") return;

    if (editId) {
      setTasks(
        tasks.map((t) =>
          t.id === editId ? { ...t, text: taskText, category } : t
        )
      );
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: taskText,
        category,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setTaskText("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleEdit = (task) => {
    setTaskText(task.text);
    setCategory(task.category);
    setEditId(task.id);
  };

  // Pagination Logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  return (
    <div className="bg-white shadow-lg rounded-md w-11/12 max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold text-center mb-5">
        Todo App ✅
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Enter task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div className="mt-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No tasks yet...
          </p>
        ) : (
          currentTasks.map((task) => (
            <TodoItems
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onComplete={handleComplete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
