import { Link } from 'react-router-dom'

function StudentCard({ student, onDelete }) {
  return (
    <article className="student-card"><div className="card-top"><span className="avatar large">{student.name.slice(0, 2).toUpperCase()}</span><div className="card-actions"><Link className="edit-button" to={`/edit-student/${student.id}`}>Edit</Link><button className="delete-button" aria-label={`Remove ${student.name}`} onClick={() => onDelete(student.id)}>×</button></div></div><h2>{student.name}</h2><p className="student-email">{student.email}</p><div className="card-details"><span><small>Department</small>{student.department}</span><span><small>Age</small>{student.age} years</span></div></article>
  )
}

export default StudentCard;