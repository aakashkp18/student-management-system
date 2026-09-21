import { Link } from 'react-router-dom'

const Dashboard = ({ students }) => {
  const departments = new Set(students.map((student) => student.department)).size
  return (
    <div className="page dashboard-page">
      <section className="page-heading"><div><h2>Welcome to Campus Track </h2><p className="subheading">Here  You can manage students datas...</p></div><Link className="primary-button" to="/add-student">+ Add student</Link></section>
      <section className="stat-grid"><div className="stat-card"><span className="stat-icon coral">◎</span><div><strong>{students.length}</strong><span>Total students</span></div></div><div className="stat-card"><span className="stat-icon blue">⌁</span><div><strong>{departments}</strong><span>Departments</span></div></div><div className="stat-card"><span className="stat-icon green">✓</span><div><strong>100%</strong><span>Records complete</span></div></div></section>
      <section className="section-header"><div><p className="eyebrow">Directory</p><h2>Recently added students</h2></div><Link className="text-link" to="/students">View all students →</Link></section>
      <div className="recent-list">{students.slice(-3).reverse().map((student) => <StudentPreview key={student.id} student={student} />)}</div>
    </div>
  )
}

function StudentPreview({ student }) {
  return <div className="student-preview"><span className="avatar">{student.name.slice(0, 2).toUpperCase()}</span><div><strong>{student.name}</strong><span>{student.department}</span></div><span className="student-age">Age {student.age}</span></div>
}

export default Dashboard