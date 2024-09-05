package dev.agam.TaskManager.repository;

import dev.agam.TaskManager.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    Optional<Task> findByTaskId(String taskId);
    Optional<Task> findFirstByOrderByTaskIdDesc();
}
