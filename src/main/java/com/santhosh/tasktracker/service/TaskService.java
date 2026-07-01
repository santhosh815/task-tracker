package com.santhosh.tasktracker.service;

import com.santhosh.tasktracker.entity.Task;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface TaskService {

    Task createTask(Task task);

    Page<Task> getAllTasks(int page, int size, String sortBy);

    Optional<Task> getTaskById(Long id);

    Task updateTask(Long id, Task task);

    void deleteTask(Long id);

    Page<Task> getTasksByStatus(String status, int page, int size);

    Page<Task> getTasksByPriority(String priority, int page, int size);

}