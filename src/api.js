import axios from 'axios'

const studentsApi = axios.create({
  baseURL: 'https://6aafc3ccee9c55c910bf68f1.mockapi.io',
  headers: { 'Content-Type': 'application/json' },
})

const departments = ['Information Technology', 'Computer Science', 'Electronics', 'Mechanical']
const locallyCreatedStudentIds = new Set()

const toStudent = (user, index = 0) => ({
  id: Number(user.id),
  name: user.name,
  age: Number(user.age ?? 18 + ((Number(user.id) + index) % 8)),
  department: user.dept || user.department || departments[index % departments.length],
  email: user.gmail || user.email || '',
})

const normalizeStudentPayload = (student) => ({
  name: student.name,
  dept: student.department,
  gmail: student.email,
  age: Number(student.age),
})

export async function fetchStudents() {
  const response = await studentsApi.get('/data')
  return response.data.map(toStudent)
}

export async function createStudent(student) {
  const response = await studentsApi.post('/data', normalizeStudentPayload(student))
  const createdStudentId = response.data.id
  locallyCreatedStudentIds.add(Number(createdStudentId))
  return toStudent({ ...response.data, ...student, id: createdStudentId, dept: student.department, gmail: student.email, age: Number(student.age) })
}

export async function updateStudent(studentId, student) {
  if (locallyCreatedStudentIds.has(Number(studentId))) {
    return { id: Number(studentId), ...student }
  }

  try {
    const response = await studentsApi.put(`/data/${studentId}`, normalizeStudentPayload(student))
    return toStudent({ ...response.data, ...student, dept: student.department, gmail: student.email, age: Number(student.age) })
  } catch (error) {
    if (!locallyCreatedStudentIds.has(Number(studentId))) throw error
    return { id: Number(studentId), ...student }
  }
}

export async function deleteStudent(studentId) {
  await studentsApi.delete(`/data/${studentId}`)
}
