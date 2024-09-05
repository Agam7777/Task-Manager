package dev.agam.TaskManager.service;

import dev.agam.TaskManager.model.Task;
import dev.agam.TaskManager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    private static final DateTimeFormatter ISO_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(String taskId) {
        return taskRepository.findByTaskId(taskId).orElse(null);
    }

    public Task updateTask(Task updatedTask) {
        Optional<Task> existingTaskOpt = taskRepository.findByTaskId(updatedTask.getTaskId());
        if (existingTaskOpt.isPresent()) {
            Task existingTask = existingTaskOpt.get();

            existingTask.setTitle(updatedTask.getTitle());
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setDueDate(LocalDateTime.parse(updatedTask.getDueDate()).format(ISO_FORMATTER));
            existingTask.setStatus(updatedTask.getStatus());
            existingTask.setComments(updatedTask.getComments());
            existingTask.setUpdatedAt(LocalDateTime.now().format(ISO_FORMATTER));

            return taskRepository.save(existingTask);
        } else {
            return null;
        }
    }

    public boolean deleteTask(String taskId) {
        Optional<Task> task = taskRepository.findByTaskId(taskId);
        if (task.isPresent()) {
            taskRepository.delete(task.get());
            return true;
        }
        return false;
    }

    public Task createTask(Task task) {
        Optional<Task> maxTask = taskRepository.findFirstByOrderByTaskIdDesc();

        String nextTaskId = "1";
        if (maxTask.isPresent()) {
            int maxId = Integer.parseInt(maxTask.get().getTaskId());
            nextTaskId = String.valueOf(maxId + 1);
        }

        task.setTaskId(nextTaskId);
        task.setCreatedAt(LocalDateTime.now().format(ISO_FORMATTER));
        task.setUpdatedAt(LocalDateTime.now().format(ISO_FORMATTER));

        task.setDueDate(LocalDateTime.parse(task.getDueDate()).format(ISO_FORMATTER));

        return taskRepository.save(task);
    }
}
