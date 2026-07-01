import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import TaskPage from "./pages/TaskPage";
import EditTask from "./pages/EditTask";
import EditProject from "./pages/EditProject";

import "./App.css";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <div className="container mt-4">

                <Routes>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/projects"
                        element={<ProjectPage />}
                    />

                    <Route
                        path="/projects/edit"
                        element={<EditProject />}
                    />

                    <Route
                        path="/tasks"
                        element={<TaskPage />}
                    />

                    <Route
                        path="/tasks/edit"
                        element={<EditTask />}
                    />

                </Routes>

            </div>

        </BrowserRouter>

    );

}

export default App;