import { useState } from 'react';
import './App.css';
import Input from './Components/Input/Input';
import List from './Components/List/List';

function App() {
  const [students, setStudents] = useState(JSON.parse(localStorage.getItem('students')) || []);
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Input setLoading={setLoading} students={students} setStudents={setStudents}/>
      <List loading={loading} students={students} setStudents={setStudents} />
    </>
  );
}

export default App;
