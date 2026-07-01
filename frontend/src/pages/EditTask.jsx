import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function EditTask() {

    const navigate = useNavigate();

    const [task, setTask] = useState({
        id: "",
        title: "",
        description: "",
        status: "TODO",
        priority: "HIGH",
        dueDate: "",
        project: {
            id: 4
        }
    });

    useEffect(() => {

        const editTask = JSON.parse(localStorage.getItem("editTask"));

        if (editTask) {

            setTask(editTask);

        } else {

            navigate("/tasks");

        }

    }, [navigate]);

    const handleChange = (e) => {

        setTask({
            ...task,
            [e.target.name]: e.target.value
        });

    };

    const updateTask = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/tasks/${task.id}`, task);

            alert("Task Updated Successfully");

            localStorage.removeItem("editTask");

            navigate("/tasks");

        } catch (error) {

            console.error(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="card shadow">

            <div className="card-header bg-warning text-dark">
                Edit Task
            </div>

            <div className="card-body">

                <form onSubmit={updateTask}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                    />

                    <textarea
                        className="form-control mb-3"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />

                    <select
                        className="form-control mb-3"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                    >
                        <option value="TODO">TODO</option>
                        <option value="DOING">DOING</option>
                        <option value="DONE">DONE</option>
                    </select>

                    <select
                        className="form-control mb-3"
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                    >
                        <option value="HIGH">HIGH</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="LOW">LOW</option>
                    </select>

                    <input
                        type="date"
                        className="form-control mb-3"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-success w-100"
                    >
                        Update Task
                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditTask;