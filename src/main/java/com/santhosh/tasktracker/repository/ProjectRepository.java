package com.santhosh.tasktracker.repository;

import com.santhosh.tasktracker.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}