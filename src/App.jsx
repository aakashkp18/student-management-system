
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import Students from './Students'
import AddStudent from './AddStudents'
import Login from './Login'
import { createStudent, deleteStudent, fetchStudents, updateStudent } from './api'

function App() {
  const location = useLocation()
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    fetchStudents()
      .then(setStudents)
      .catch(() => setApiError('Unable to load students. Please try again.'))
      .finally(() => setIsLoading(false))
  }, [])

  const addStudent = async (student) => {
    const newStudent = await createStudent(student)
    setStudents((currentStudents) => [...currentStudents, newStudent])
  }

  const removeStudent = async (studentId) => {
    await deleteStudent(studentId)
    setStudents((currentStudents) => currentStudents.filter((student) => String(student.id) !== String(studentId)))
  }

  const editStudent = async (studentId, student) => {
    const savedStudent = await updateStudent(studentId, student)
    setStudents((currentStudents) => currentStudents.map((currentStudent) => currentStudent.id === Number(studentId) ? savedStudent : currentStudent))
  }

  if (location.pathname === '/' || location.pathname === '/login') {
    return <Routes><Route path="*" element={<Login />} /></Routes>
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/dashboard"><span className="brand-mark">S</span><span>Campus<span className="brand-accent">Track</span></span></Link>
        <Navigation />
        <div className="profile-chip"><span>AK</span> Admin</div>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard students={students} isLoading={isLoading} />} />
          <Route path="/students" element={<Students students={students} isLoading={isLoading} apiError={apiError} onDelete={removeStudent} />} />
          <Route path="/add-student" element={<AddStudent onAdd={addStudent} />} />
          <Route path="/edit-student/:studentId" element={<AddStudent students={students} onUpdate={editStudent} />} />
        </Routes>
      </main>
      <footer>CampusTrack <span>•</span> Student records made simple</footer>
    </div>
  )
}


function Navigation() {
  const location = useLocation()
  return <nav className="navigation"><Link className={location.pathname === '/dashboard' ? 'active' : ''} to="/dashboard">Overview</Link><Link className={location.pathname === '/students' ? 'active' : ''} to="/students">Students</Link><Link className={location.pathname === '/add-student' ? 'active' : ''} to="/add-student">Add student</Link></nav>
}
export default App
