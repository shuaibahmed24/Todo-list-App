import React from "react";

const TodoItems = ({ task, onDelete, onComplete, onEdit }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2">
      <div>
        <p
          className={`font-semibold ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.text}
        </p>
        <span className="text-xs text-blue-600">{task.category}</span>
      </div>

      <div className="flex gap-2">
        <button
          className="text-green-600 border px-2 rounded"
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? "Undo" : "Done"}
        </button>

        <button
          className="text-yellow-600 border px-2 rounded"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="text-red-600 border px-2 rounded"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItems;
