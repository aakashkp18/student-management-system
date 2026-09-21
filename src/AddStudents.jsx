import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function AddStudent({ students = [], onAdd, onUpdate }) {
  const navigate = useNavigate()
  const { studentId } = useParams()
  const existingStudent = students.find((student) => String(student.id) === studentId)
  const isEditing = Boolean(studentId)
  const [form, setForm] = useState({ name: '', email: '', age: '', department: '' })
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (existingStudent) setForm(existingStudent)
  }, [existingStudent])

  const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submitForm = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.age || !form.department) { setError('Please complete every field before saving.'); return }
    setIsSaving(true)
    const studentData = { ...form, name: form.name.trim(), age: Number(form.age) }
    const saveRequest = isEditing ? onUpdate(studentId, studentData) : onAdd(studentData)
    saveRequest
      .then(() => navigate('/students'))
      .catch(() => setError('Unable to save the student. Please try again.'))
      .finally(() => setIsSaving(false))
  }
  return (
    <div className="page add-page">
      <section className="page-heading compact-heading"><div><p className="eyebrow">Directory / {isEditing ? 'Edit record' : 'New record'}</p><h1>{isEditing ? 'Edit student' : 'Add a student'}</h1><p className="subheading">{isEditing ? 'Update this student profile.' : 'Create a complete profile for your student directory.'}</p></div></section>
      <form className="student-form" onSubmit={submitForm}><div className="form-intro"><span className="form-icon">{isEditing ? '✎' : '+'}</span><div><h2>Student information</h2><p>All fields are required.</p></div></div><div className="form-grid"><label>Full name<input name="name" value={form.name} onChange={updateField} placeholder="e.g. Maya Patel" /></label><label>Email address<input type="email" name="email" value={form.email} onChange={updateField} placeholder="maya@example.com" /></label><label>Age<input type="number" name="age" min="1" max="100" value={form.age} onChange={updateField} placeholder="21" /></label><label>Department<select name="department" value={form.department} onChange={updateField}><option value="">Select department</option><option>Information Technology</option><option>Computer Science</option><option>Electronics</option><option>Mechanical</option><option>Business Administration</option></select></label></div>{error && <p className="form-error">{error}</p>}<div className="form-actions"><Link className="secondary-button" to="/students">Cancel</Link><button className="primary-button" type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : isEditing ? 'Update student' : 'Save student'}</button></div></form>
    </div>
  )
}

export default AddStudent;