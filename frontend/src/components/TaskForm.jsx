import { useEffect, useState } from "react";
import API from "../services/api";

function TaskForm() {

    const [projects, setProjects] = useState([]);

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "TODO",
        priority: "HIGH",
        dueDate: "",
        project: {
            id: ""
        }
    });

    useEffect(() => {

        loadProjects();

    }, []);

    const loadProjects = async () => {

        try {

            const response = await API.get("/projects");

            setProjects(response.data);

            if (response.data.length > 0) {

                setTask(prev => ({
                    ...prev,
                    project: {
                        id: response.data[0].id
                    }
                }));

            }

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "projectId") {

            setTask({
                ...task,
                project: {
                    id: Number(value)
                }
            });

        } else {

            setTask({
                ...task,
                [name]: value
            });

        }

    };

    const saveTask = async (e) => {

        e.preventDefault();

        try {

            await API.post("/tasks", task);

            alert("Task Added Successfully");

            window.location.reload();

        } catch (error) {

            console.error(error);

            alert("Task Creation Failed");

        }

    };

    return (

        <div className="card shadow">

            <div className="card-header bg-primary text-white">
                Add Task
            </div>

            <div className="card-body">

                <form onSubmit={saveTask}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Task Title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
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
                        required
                    />

                    <select
                        className="form-control mb-3"
                        name="projectId"
                        value={task.project.id}
                        onChange={handleChange}
                    >

                        {projects.map(project => (

                            <option
                                key={project.id}
                                value={project.id}
                            >
                                {project.name}
                            </option>

                        ))}

                    </select>

                    <button
                        className="btn btn-success w-100"
                    >
                        Save Task
                    </button>

                </form>

            </div>

        </div>

    );

}

export default TaskForm;