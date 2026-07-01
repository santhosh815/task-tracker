import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function TaskPage() {
  return (
    <div className="container mt-4">
      <div className="row">

        <div className="col-md-4">
          <TaskForm />
        </div>

        <div className="col-md-8">
          <TaskList />
        </div>

      </div>
    </div>
  );
}

export default TaskPage;