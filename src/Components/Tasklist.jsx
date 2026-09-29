import React, { useState } from "react";

export default function TaskList({
  tasks,
  updateTask,
  deleteTask
}) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleComplete = (index) => {
    const updatedTask = {
      ...tasks[index],
      completed: !tasks[index].completed
    };

    updateTask(updatedTask, index);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = (index) => {
    if (!editText.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    const updatedTask = {
      ...tasks[index],
      text: editText.trim()
    };

    updateTask(updatedTask, index);
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <ul className="task-list">

      {tasks.length === 0 ? (
        <div className="empty-message">
          <h3>No tasks found</h3>
          <p>Add a new task to get started!</p>
        </div>
      ) : (

        tasks.map((task, index) => (

          <li
            key={task.id || index}
            className={task.completed ? "completed-task" : ""}
          >

            <div className="task-info">

              {editingIndex === index ? (

                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

              ) : (

                <span className="task-text">
                  {task.text}
                </span>

              )}

              <div className="task-details">

                <small className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </small>

                <small className="category">
                  {task.category}
                </small>

                {task.dueDate && (
                  <small className="due-date">
                    📅 {task.dueDate}
                  </small>
                )}

              </div>

            </div>

            <div className="task-actions">

              <button
                className="complete-btn"
                onClick={() => toggleComplete(index)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              {editingIndex === index ? (

                <button
                  className="save-btn"
                  onClick={() => saveEdit(index)}
                >
                  Save
                </button>

              ) : (

                <button
                  className="edit-btn"
                  onClick={() => startEdit(index)}
                >
                  Edit
                </button>

              )}

              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>

            </div>

          </li>

        ))

      )}

    </ul>
  );
}