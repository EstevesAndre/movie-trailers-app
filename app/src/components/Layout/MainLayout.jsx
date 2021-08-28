
import * as React from 'react'
import { Head } from '../Head'

export const MainLayout = ({ children, title }) => {
  return (
    <div className="bg-gray-900">
      <Head title={title} />
      <div className="flex flex-col lg:flex-row lg:w-screen lg:h-screen min-h-main-layout mx-auto justify-center">
        {children}
      </div>
    </div >
  )
}