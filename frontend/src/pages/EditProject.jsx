import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function EditProject() {

    const navigate = useNavigate();

    const [project, setProject] = useState({
        id: "",
        name: "",
        description: ""
    });

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem("editProject"));

        if (data) {

            setProject(data);

        } else {

            navigate("/projects");

        }

    }, [navigate]);

    const handleChange = (e) => {

        setProject({
            ...project,
            [e.target.name]: e.target.value
        });

    };

    const updateProject = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/projects/${project.id}`, project);

            alert("Project Updated Successfully");

            localStorage.removeItem("editProject");

            navigate("/projects");

        } catch (error) {

            console.error(error);

            alert("Project Update Failed");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-warning text-dark">
                    Edit Project
                </div>

                <div className="card-body">

                    <form onSubmit={updateProject}>

                        <div className="mb-3">

                            <label className="form-label">
                                Project Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={project.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                name="description"
                                rows="4"
                                value={project.description}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100"
                        >
                            Update Project
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditProject;