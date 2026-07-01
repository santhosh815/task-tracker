package com.santhosh.tasktracker.controller;

import com.santhosh.tasktracker.entity.Project;
import com.santhosh.tasktracker.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Project updateProject(
            @PathVariable Long id,
            @RequestBody Project project) {

        return projectService.updateProject(id, project);

    }

    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id) {

        projectService.deleteProject(id);

        return "Project Deleted Successfully";
    }

}