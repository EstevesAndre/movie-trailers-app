
import * as React from 'react'
import { Footer } from '../Footer'
import { Head } from '../Head'

export const MainLayout = ({ children, title }) => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Head title={title} />
      <div className="flex flex-col lg:flex-row h-full mx-auto justify-center">
        {children}
      </div>
      <Footer />
    </div >
  )
}