CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
)


CREATE TABLE internships(
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES student(id),
  company_name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
)
