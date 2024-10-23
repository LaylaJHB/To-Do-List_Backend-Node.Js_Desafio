CREATE TABLE to_do_list_users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE to_do_list_tasks (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    description VARCHAR(1024) DEFAULT "No description provided",
    deadline DATE,
    status ENUM("pending", "progress", "completed") DEFAULT "pending",
    author_id VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES to_do_list_users(id)
);

CREATE TABLE to_do_list_assignees (
    task_id VARCHAR(64),
    assignee_id VARCHAR(64),
    PRIMARY KEY (task_id, assignee_id),
    FOREIGN KEY (task_id) REFERENCES to_do_list_tasks(id),
    FOREIGN KEY (assignee_id) REFERENCES to_do_list_users(id)
);