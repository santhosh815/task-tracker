import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/"
                >
                    Task Tracker
                </Link>

                <div className="navbar-nav">

                    <Link
                        className="nav-link"
                        to="/"
                    >
                        Dashboard
                    </Link>

                    <Link
                        className="nav-link"
                        to="/projects"
                    >
                        Projects
                    </Link>

                    <Link
                        className="nav-link"
                        to="/tasks"
                    >
                        Tasks
                    </Link>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;