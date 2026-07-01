import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function TaskList() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {

        try {

            const response = await API.get("/tasks");

            setTasks(response.data.content || []);

        } catch (error) {

            console.error(error);

        }

    };

    const editTask = (task) => {

        localStorage.setItem("editTask", JSON.stringify(task));

        navigate("/tasks/edit");

    };

    const deleteTask = async (id) => {

        if (!window.confirm("Delete this task?")) return;

        try {

            await API.delete(`/tasks/${id}`);

            alert("Task Deleted Successfully");

            loadTasks();

        } catch (error) {

            console.error(error);

        }

    };

    const filteredTasks = tasks.filter(task => {

        const matchSearch =
            task.title.toLowerCase().includes(search.toLowerCase());

        const matchStatus =
            statusFilter === "ALL" || task.status === statusFilter;

        const matchPriority =
            priorityFilter === "ALL" || task.priority === priorityFilter;

        return matchSearch && matchStatus && matchPriority;

    });

    return (

        <div className="card shadow mt-4">

            <div className="card-header bg-success text-white">

                Task List

            </div>

            <div className="card-body">

                <div className="row mb-3">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Task..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >

                            <option value="ALL">All Status</option>
                            <option value="TODO">TODO</option>
                            <option value="DOING">DOING</option>
                            <option value="DONE">DONE</option>

                        </select>

                    </div>

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                        >

                            <option value="ALL">All Priority</option>
                            <option value="HIGH">HIGH</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="LOW">LOW</option>

                        </select>

                    </div>

                </div>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Due Date</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredTasks.map((task) => (

                            <tr key={task.id}>

                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                                <td>{task.dueDate}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editTask(task)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default TaskList;