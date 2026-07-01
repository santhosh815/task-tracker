import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

function ProjectPage() {

    return (

        <div className="container mt-4">

            <div className="row">

                <div className="col-md-4">

                    <ProjectForm />

                </div>

                <div className="col-md-8">

                    <ProjectList />

                </div>

            </div>

        </div>

    );

}

export default ProjectPage;