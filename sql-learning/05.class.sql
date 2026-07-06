select *
from student
  full outer join internships on student.id = internships.student_id
select *
from student
  inner join internships on student.id = internships.student_id



  --  primary and foreign key
  create table student (
    id int primary key,
    name varchar(100) not null,
    email varchar(100) unique
  )

   create table courses(
    id int primary key,
    name varchar(100) not null,
    student_id int,
    foreign key (student_id) references student(id)
  )
