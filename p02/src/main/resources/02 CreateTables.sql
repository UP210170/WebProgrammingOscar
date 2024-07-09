-- Base de datos: task
use TASK;

CREATE TABLE Tasks (
  id_task int(10) AUTO_INCREMENT PRIMARY KEY,
  task_name varchar(20) NOT NULL,
  task_description varchar(100)
);

