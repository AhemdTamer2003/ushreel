import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import UsherRegister from './Pages/Auth/UsherRegister'
import ContentCreatorRegister from './Pages/Auth/ContentCreatorRegister'
import CompanyRegister from './Pages/Auth/CompanyRegister'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/usherregister' element={<UsherRegister />} />
        <Route path='/contentcreatorregister' element={<ContentCreatorRegister />} />
        <Route path='/companyrtegister' element={<CompanyRegister />} />
      </Routes>
    </>
  )
}

export default App
