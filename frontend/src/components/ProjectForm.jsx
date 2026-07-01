import { useState } from "react";
import API from "../services/api";

function ProjectForm() {

    const [project, setProject] = useState({
        name: "",
        description: ""
    });

    const handleChange = (e) => {

        setProject({
            ...project,
            [e.target.name]: e.target.value
        });

    };

    const saveProject = async (e) => {

        e.preventDefault();

        try {

            await API.post("/projects", project);

            alert("Project Created Successfully");

            setProject({
                name: "",
                description: ""
            });

            window.location.reload();

        } catch (error) {

            console.error(error);

            alert("Unable to Create Project");

        }

    };

    return (

        <div className="card shadow">

            <div className="card-header bg-primary text-white">
                Create Project
            </div>

            <div className="card-body">

                <form onSubmit={saveProject}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Project Name"
                        name="name"
                        value={project.name}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Project Description"
                        name="description"
                        value={project.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                    >
                        Save Project
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ProjectForm;