
import * as React from 'react'
import { Head } from '../Head'
import { Sidebar } from '../Sidebar'

export const MainLayout = ({ children, title }) => {
  return (
    <div className="bg-gray-900">
      <Head title={title} />
      <div className="flex flex-col md:flex-row md:w-screen md:h-screen min-h-main-layout mx-auto justify-center">
        <Sidebar />
        {children}
      </div>
    </div >
  )
}