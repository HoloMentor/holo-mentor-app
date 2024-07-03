import React from 'react'
import { Route, Routes } from 'react-router-dom'
import loadable from '@loadable/component'
import Layout from '@/layout';

const Home = loadable(() => import('@/pages/teacher/home'))

export default function TeacherRoutes() {
  return (
    <Routes>
        <Route path = '/' element={<Layout/>}>
            <Route path='teacher' element={<Home/>}></Route>
        </Route>
        
    </Routes>

  )
}
