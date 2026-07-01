package com.santhosh.tasktracker.repository;

import com.santhosh.tasktracker.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByStatus(String status, Pageable pageable);

    Page<Task> findByPriority(String priority, Pageable pageable);

}