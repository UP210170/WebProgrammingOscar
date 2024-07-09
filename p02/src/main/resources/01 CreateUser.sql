CREATE DATABASE IF NOT EXISTS TASK;

-- drop user 'task'@'localhost';     sensible a Mayusculas
-- SET PASSWORD FOR  'task'@'localhost' = PASSWORD ('task')

CREATE USER 'task'@'localhost' IDENTIFIED BY 'task';

GRANT ALL PRIVILEGES ON TASK.* TO 'task'@'localhost' [identified by 'task'];

flush privileges;


