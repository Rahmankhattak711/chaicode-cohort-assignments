CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
) CREATE TABLE internships(
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES student(id),
  company_name VARCHAR(100) NOT NULL,
  stipends DECIMAL(10, 2) NOT NULL,
  start_date DATE NOT NULL
)
insert into student (name, email)
values ('Alice', 'HxK0G@example.com'),
  ('Bob', 'MlKx1@example.com'),
  ('Charlie', 'kMlN5@example.com'),
  ('David', 'rVU8o@example.com'),
  ('Eve', 'bVZl2@example.com');
select *
from student;
insert into internships (student_id, company_name, stipends, start_date)
values (1, 'TechCorp', 1500.00, '2024-06-01'),
  (2, 'InnovateX', 1200.00, '2024-07-01'),
  (3, 'FutureWorks', 1800.00, '2024-08-01'),
  (4, 'NextGen Solutions', 1600.00, '2024-09-01'),
  (5, 'GlobalTech', 1400.00, '2024-10-01');

select *
from internships;

select student.name, internships.company_name, internships.stipends
from student
INNER JOIN internships ON student.id = internships.id;
