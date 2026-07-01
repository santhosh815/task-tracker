package com.santhosh.tasktracker.service.impl;

import com.santhosh.tasktracker.entity.Project;
import com.santhosh.tasktracker.repository.ProjectRepository;
import com.santhosh.tasktracker.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project createProject(Project project) {

        return projectRepository.save(project);

    }

    @Override
    public List<Project> getAllProjects() {

        return projectRepository.findAll();

    }

    @Override
    public Optional<Project> getProjectById(Long id) {

        return projectRepository.findById(id);

    }

    @Override
    public Project updateProject(Long id, Project project) {

        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project Not Found"));

        existingProject.setName(project.getName());
        existingProject.setDescription(project.getDescription());

        return projectRepository.save(existingProject);

    }

    @Override
    public void deleteProject(Long id) {

        projectRepository.deleteById(id);

    }

}