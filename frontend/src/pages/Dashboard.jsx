import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        totalProjects: 0,
        totalTasks: 0,
        todoTasks: 0,
        doingTasks: 0,
        doneTasks: 0
    });

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const projectResponse = await API.get("/projects");
            const taskResponse = await API.get("/tasks");

            const projectList = projectResponse.data;
            const taskList = taskResponse.data.content || taskResponse.data;

            setProjects(projectList);

            setStats({

                totalProjects: projectList.length,
                totalTasks: taskList.length,
                todoTasks: taskList.filter(task => task.status === "TODO").length,
                doingTasks: taskList.filter(task => task.status === "DOING").length,
                doneTasks: taskList.filter(task => task.status === "DONE").length

            });

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="container mt-4">

            <div className="bg-dark text-white rounded shadow p-4 mb-4">

                <h2>📊 Task Tracker Dashboard</h2>

                <p className="mb-0">
                    Welcome! Manage your Projects and Tasks efficiently.
                </p>

            </div>

            <div className="row g-3">

                <div className="col-md-4">

                    <div className="card bg-primary text-white shadow border-0">

                        <div className="card-body text-center">

                            <h5>Total Projects</h5>

                            <h1>{stats.totalProjects}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card bg-success text-white shadow border-0">

                        <div className="card-body text-center">

                            <h5>Total Tasks</h5>

                            <h1>{stats.totalTasks}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card bg-warning shadow border-0">

                        <div className="card-body text-center">

                            <h5>TODO Tasks</h5>

                            <h1>{stats.todoTasks}</h1>

                        </div>

                    </div>

                </div>
                                <div className="col-md-6">

                                    <div className="card bg-info text-white shadow border-0">

                                        <div className="card-body text-center">

                                            <h5>DOING Tasks</h5>

                                            <h1>{stats.doingTasks}</h1>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <div className="card bg-dark text-white shadow border-0">

                                        <div className="card-body text-center">

                                            <h5>DONE Tasks</h5>

                                            <h1>{stats.doneTasks}</h1>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="card shadow border-0 mt-5">

                                <div className="card-header bg-primary text-white">

                                    <h4 className="mb-0">
                                        📁 Projects Overview
                                    </h4>

                                </div>

                                <div className="card-body">

                                    <table className="table table-hover table-bordered">

                                        <thead className="table-dark">

                                            <tr>

                                                <th>ID</th>
                                                <th>Project Name</th>
                                                <th>Description</th>
                                                <th>Total Tasks</th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {projects.length > 0 ? (

                                                projects.map(project => (

                                                    <tr key={project.id}>

                                                        <td>{project.id}</td>

                                                        <td>{project.name}</td>

                                                        <td>{project.description}</td>

                                                        <td>

                                                            <span className="badge bg-success">

                                                                {project.tasks ? project.tasks.length : 0}

                                                            </span>

                                                        </td>

                                                    </tr>

                                                ))

                                            ) : (

                                                <tr>

                                                    <td colSpan="4" className="text-center">

                                                        No Projects Found

                                                    </td>

                                                </tr>

                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                            <div className="text-center mt-4 text-secondary">

                                <hr />



                            </div>

                        </div>

                    );

                }

                export default Dashboard;