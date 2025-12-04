import {useState} from 'react';

function StudentList() {
    const [students, setStudents] = useState([
        { id : 1, name: "Adarsh", course: "ReactJs"},
        { id : 2, name: "Aditya", course: "NodeJs"},
        { id : 3, name: "Krishna", course: "VueJs"},
        { id : 4, name: "Shivani", course: "AngularJs"}
    ])

    return (
        <div>
            <h2>Students Courses</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>{student.name} - {student.course}</li>
                ))}
            </ul>
        </div>
    )
}

export default StudentList