-- CREATE TABLE students(
--   student_id SERIAL PRIMARY KEY,
--   first_name VARCHAR(50) NOT NULL,
--   last_name VARCHAR(50) NOT NULL,
--   email VARCHAR(300) NOT NULL UNIQUE,
--   enrollment_date DATE DEFAULT CURRENT_DATE,
--   major VARCHAR(100) NOT NULL,
--   country VARCHAR(100) NOT NULL,
--   country_code VARCHAR(10) NOT NULL,
--   age INT CHECK (age > 12),
--   current_status VARCHAR(20) DEFAULT 'active' CHECK (
--     current_status IN ('active', 'graduated', 'dropped')
--   ),
--   masterji VARCHAR(100) UNIQUE,
--   masterji_joined BOOLEAN DEFAULT FALSE
-- );

ALTER TABLE students
ADD COLUMN batch_name VARCHAR(50) DEFAULT 'Batch 1';
