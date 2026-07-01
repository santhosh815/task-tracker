package com.santhosh.tasktracker.service.impl;

import com.santhosh.tasktracker.entity.Project;
import com.santhosh.tasktracker.entity.Task;
import com.santhosh.tasktracker.repository.ProjectRepository;
import com.santhosh.tasktracker.repository.TaskRepository;
import com.santhosh.tasktracker.service.TaskService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskServiceImpl(TaskRepository taskRepository,
                           ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public Task createTask(Task task) {

        if (task.getProject() != null && task.getProject().getId() != null) {

            Project project = projectRepository.findById(task.getProject().getId())
                    .orElseThrow(() -> new RuntimeException("Project Not Found"));

            task.setProject(project);
        }

        return taskRepository.save(task);
    }

    @Override
    public Page<Task> getAllTasks(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        return taskRepository.findAll(pageable);
    }

    @Override
    public Optional<Task> getTaskById(Long id) {

        return taskRepository.findById(id);
    }

    @Override
    public Task updateTask(Long id, Task task) {

        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task Not Found"));

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setStatus(task.getStatus());
        existingTask.setPriority(task.getPriority());
        existingTask.setDueDate(task.getDueDate());

        if (task.getProject() != null && task.getProject().getId() != null) {

            Project project = projectRepository.findById(task.getProject().getId())
                    .orElseThrow(() -> new RuntimeException("Project Not Found"));

            existingTask.setProject(project);
        }

        return taskRepository.save(existingTask);
    }

    @Override
    public void deleteTask(Long id) {

        taskRepository.deleteById(id);
    }

    @Override
    public Page<Task> getTasksByStatus(String status, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return taskRepository.findByStatus(status, pageable);
    }

    @Override
    public Page<Task> getTasksByPriority(String priority, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return taskRepository.findByPriority(priority, pageable);
    }
}