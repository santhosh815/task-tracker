import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ProjectList() {

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {

        try {

            const response = await API.get("/projects");

            setProjects(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const editProject = (project) => {

        localStorage.setItem("editProject", JSON.stringify(project));

        navigate("/projects/edit");

    };

    const deleteProject = async (id) => {

        if (!window.confirm("Delete this project?")) return;

        try {

            await API.delete(`/projects/${id}`);

            alert("Project Deleted Successfully");

            loadProjects();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }

    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="card shadow">

            <div className="card-header bg-dark text-white">
                Project List
            </div>

            <div className="card-body">

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search Project..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Tasks</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredProjects.length === 0 ? (

                            <tr>

                                <td colSpan="5" className="text-center">
                                    No Projects Found
                                </td>

                            </tr>

                        ) : (

                            filteredProjects.map((project) => (

                                <tr key={project.id}>

                                    <td>{project.id}</td>

                                    <td>{project.name}</td>

                                    <td>{project.description}</td>

                                    <td>
                                        <span className="badge bg-info">
                                            {project.tasks ? project.tasks.length : 0}
                                        </span>
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => editProject(project)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteProject(project.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ProjectList;