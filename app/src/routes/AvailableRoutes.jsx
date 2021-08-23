import { Navigate, Route, Routes } from 'react-router-dom'

import { Landing } from '@/features/misc'

export const AvailableRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing title="Home" />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}