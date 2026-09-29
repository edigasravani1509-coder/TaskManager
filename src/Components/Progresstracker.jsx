export default function ProgressTracker({ tasks }) {

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const totalTasks = tasks.length;

  const activeTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="progress-tracker">

      <div className="progress-header">
        <h3>Task Progress</h3>

        <span>
          {progress}%
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="task-stats">

        <div>
          <strong>{totalTasks}</strong>
          <span>Total</span>
        </div>

        <div>
          <strong>{activeTasks}</strong>
          <span>Active</span>
        </div>

        <div>
          <strong>{completedTasks}</strong>
          <span>Completed</span>
        </div>

      </div>

    </div>
  );
}