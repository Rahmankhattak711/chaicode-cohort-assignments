select * from student
full outer join internships on student.id = internships.student_id

select * from student
inner join internships on student.id = internships.student_id
