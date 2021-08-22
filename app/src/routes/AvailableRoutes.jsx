import { Navigate, Route, Routes } from 'react-router-dom'

import { Landing } from '@/features/misc'

export const AvailableRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}