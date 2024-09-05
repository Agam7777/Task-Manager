package dev.agam.TaskManager.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@JsonIgnoreProperties(value = { "_class" })
@Data
@Document(collection = "tasks")
public class Task {
    @Id
    private ObjectId id;

    @Field("task_id")
    private String taskId;

    private String title;
    private String description;

    @Field("due_date")
    private String dueDate;

    private String status;

    @Field("created_at")
    private String createdAt;

    @Field("updated_at")
    private String updatedAt;

    private String comments;
}
