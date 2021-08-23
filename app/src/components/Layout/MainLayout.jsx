
import * as React from 'react'
import { Head } from '../Head'
import { Sidebar } from '../Sidebar'

export const MainLayout = ({ children, title }) => {
  return (
    <div className="bg-gray-900">
      <Head title={title} />
      <div className="flex w-screen h-screen mx-auto justify-center">
        <Sidebar />
        {children}
      </div>
    </div >
  )
}