import { useState } from 'react'
import StudentCard from './StudentCard'

function Students({ students, isLoading, apiError, onDelete }) {
  const [query, setQuery] = useState('')
  const filteredStudents = students.filter((student) => `${student.name} ${student.department}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="page">
      <section className="page-heading compact-heading"><div><p className="eyebrow">Directory</p><h1>All students</h1><p className="subheading">Manage every student record from one place.</p></div><span className="record-count">{students.length} records</span></section>
      <div className="toolbar"><label className="search-box"><span>⌕</span><input aria-label="Search students" placeholder="Search by name or department" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
      {apiError && <p className="form-error">{apiError}</p>}
      <div className="student-grid">{isLoading ? <p className="empty-state">Loading students...</p> : filteredStudents.map((student) => <StudentCard key={student.id} student={student} onDelete={onDelete} />)}{!isLoading && !filteredStudents.length && <p className="empty-state">No students match your search.</p>}</div>
    </div>
  )
}

export default Students;