import Taskform from "./Components/Taskform";
import Tasklist from "./Components/TaskList";
import Progresstracker from "./Components/Progresstracker";

import { useEffect, useState } from "react";

import "./App.css";

export default function App() {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [darkMode, setDarkMode] = useState(false);


  /* ==========================
     Load Tasks
  ========================== */

  useEffect(() => {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

  }, []);


  /* ==========================
     Save Tasks
  ========================== */

  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }, [tasks]);


  /* ==========================
     Add Task
  ========================== */

  const addTask = (task) => {

    setTasks([
      ...tasks,
      task
    ]);

  };


  /* ==========================
     Update Task
  ========================== */

  const updateTask = (updatedTask, index) => {

    const newTasks = [...tasks];

    newTasks[index] = updatedTask;

    setTasks(newTasks);

  };


  /* ==========================
     Delete Task
  ========================== */

  const deleteTask = (index) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmDelete) {
      return;
    }

    setTasks(
      tasks.filter(
        (_, i) => i !== index
      )
    );

  };


  /* ==========================
     Clear All
  ========================== */

  const clearTasks = () => {

    const confirmClear =
      window.confirm(
        "Delete all tasks?"
      );

    if (confirmClear) {
      setTasks([]);
    }

  };


  /* ==========================
     Clear Completed
  ========================== */

  const clearCompleted = () => {

    setTasks(
      tasks.filter(
        (task) => !task.completed
      )
    );

  };


  /* ==========================
     Filter Tasks
  ========================== */

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.text
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchesStatus =
      filter === "All" ||
      (filter === "Active" && !task.completed) ||
      (filter === "Completed" && task.completed);


    const matchesCategory =
      categoryFilter === "All" ||
      task.category === categoryFilter;


    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;


    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory &&
      matchesPriority
    );

  });


  return (

    <div className={darkMode ? "app dark" : "app"}>

      {/* ==========================
          Header
      ========================== */}

      <header className="app-header">

        <div>

          <h1>TaskMan</h1>

          <p>
            Your friendly task manager 🚀
          </p>

        </div>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

      </header>


      {/* ==========================
          Add Task
      ========================== */}

      <Taskform
        addTask={addTask}
      />


      {/* ==========================
          Search
      ========================== */}

      <div className="search-box">

        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* ==========================
          Filters
      ========================== */}

      <div className="filters">

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >

          <option value="All">
            All Tasks
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>


        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
        >

          <option value="All">
            All Categories
          </option>

          <option value="General">
            General
          </option>

          <option value="Work">
            Work
          </option>

          <option value="Personal">
            Personal
          </option>

          <option value="Study">
            Study
          </option>

          <option value="Shopping">
            Shopping
          </option>

        </select>


        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
        >

          <option value="All">
            All Priorities
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>

        </select>

      </div>


      {/* ==========================
          Task List
      ========================== */}

      <Tasklist
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />


      {/* ==========================
          Progress
      ========================== */}

      <Progresstracker
        tasks={tasks}
      />


      {/* ==========================
          Bottom Buttons
      ========================== */}

      {tasks.length > 0 && (

        <div className="bottom-actions">

          <button
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear Completed
          </button>

          <button
            className="clear-btn"
            onClick={clearTasks}
          >
            Clear All Tasks
          </button>

        </div>

      )}

    </div>

  );
}