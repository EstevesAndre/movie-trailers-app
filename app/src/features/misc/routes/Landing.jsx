import { MainLayout } from '@/components/Layout/MainLayout'
import { RightSideBar } from '@/features/popular/components/RightSideBar'
import { SearchBar } from '@/features/search'
import { FilmIcon } from '@heroicons/react/outline'

export const Landing = ({ title }) => {
  return (
    <MainLayout>
      <div className="flex-grow max-w-7xl">
        <SearchBar styles="py-10" />
        <div className="p-20">
          <p className="text-2xl font-mono font-semibold text-gray-200">{title}</p>
          <FilmIcon className="h-32" />
        </div>
      </div>
      <RightSideBar />
    </MainLayout>
  )
}