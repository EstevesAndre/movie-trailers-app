import { ChevronLeftIcon } from "@heroicons/react/outline"
import { useState } from 'react'
import clsx from "clsx"
import { useMovieInformation } from "../hooks/useMovieInformation"

const Header = ({ className = "", basicContent, content }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={clsx("flex flex-col md:flex-row justify-start gap-x-5", className)}>
      <div className="h-104 mx-auto md:mr-0 mb-4 md:mb-0 self-center">
        <img
          src={basicContent.image_url}
          className="w-full ratio mx-auto rounded-xl border-2 border-gray-600"
          onError={(e) => { e.target.onerror = null; e.target.src = "./logo.png"; e.target.classList.add("onErrorSize") }}
          style={{ display: isLoading ? "block" : "none" }}
        />
        <img
          src={basicContent.banner}
          className="w-full ratio mx-auto rounded-xl border-2 border-gray-600"
          onError={(e) => { e.target.onerror = null; e.target.src = "./logo.png"; e.target.classList.add("onErrorSize") }}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? "none" : "block" }}
        />
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-2">
          {content?.genres.map((genre, index) => (
            <div key={index}>
              <p className="px-3 py-1 text-center font-thin border-2 border-red-500 rounded-xl">{genre}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between max-w-screen-md space-y-3 md:space-y-2 w-11/12 mx-auto md:ml-0">
        <div className="flex-1 text-center md:text-left">
          <p className="text-3xl inline-block font-semibold mr-4">{basicContent.title}</p>
          <p className="text-3xl inline-block font-light">{`(${basicContent.year})`}</p>
        </div>
        <div className="flex-1 flex flex-row flex-wrap gap-x-5 gap-y-3 items-center">
          <div>
            <p className="text-gray-200 inline-block mr-2 py-1 px-2 border-2 rounded-xl border-green-700">Directors</p>
            <p className="text-gray-300 font-light inline-block">{content?.directors}</p>
          </div>
          <div>
            <p className="text-gray-200 inline-block mr-2 py-1 px-2 border-2 rounded-xl border-indigo-700">Premiere</p>
            <p className="text-gray-300 font-light inline-block">{content?.releaseDate}</p>
          </div>
          <div>
            <p className="text-gray-200 inline-block mr-2 py-1 px-2 border-2 rounded-xl border-pink-400">Time</p>
            <p className="text-gray-300 font-light inline-block">{content?.runtimeStr}</p>
          </div>
          <div>
            <p className="text-gray-200 inline-block mr-2 py-1 px-2 border-2 rounded-xl border-yellow-400">IMDb</p>
            <p className="text-gray-300 font-light inline-block">{content?.imDbRating}</p>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-gray-200 inline-block mr-2 py-1 px-2 border-2 rounded-xl border-red-400">Writers</p>
          <p className="text-gray-300 font-light">{content?.writers}</p>
        </div>
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-gray-200 inline-block mr-auto py-1 px-2 border-2 rounded-xl border-blue-400">Plot</p>
          <p className="text-gray-300 font-light overflow-hidden">{content?.plot}</p>
        </div>
        <div className="flex-0 pt-5">
          <p className="text-gray-200 inline-block mr-2 py-1 px-2 border-2 rounded-xl border-yellow-200">Awards</p>
          <p className="text-gray-300 font-light inline-block">{content?.awards}</p>
        </div>
      </div>
    </div>
  )
}

const Actors = ({ actors }) => {
  return (
    <div className="mx-auto max-w-screen-lg w-full">
      <p className="text-2xl text-center md:text-left py-5">Main Actors</p>
      <div className="flex flex-row flex-wrap gap-y-5 justify-center md:justify-start">
        {
          actors.map((actor, index) => (
            <div key={index} className="w-24 text-center">
              <img className="max-w-64px ratio mx-auto rounded-2xl border-2 border-gray-600" src={actor.image} />
              <p className="text-gray-200 font-thin mt-2">{actor.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const Trailers = () => {


  return (
    <div className="mx-auto max-w-screen-lg w-full">
      123
    </div>
  )
}

const Images = () => {
  return (
    <div className="mx-auto max-w-screen-lg w-full">
      123
    </div>
  )
}

const Similars = () => {
  return (
    <div className="mx-auto max-w-screen-lg w-full">
      123
    </div>
  )
}

export const MovieModal = ({ className, basicContent, onClose }) => {

  const content = useMovieInformation(basicContent?.imdb_id || null)
  console.log(content?.data?.info)
  console.log(basicContent)

  if (!basicContent) return (<></>)

  if (content.isLoading) {
    return (
      <div>TODO</div>
    )
  }

  return (
    <div className={clsx(
      "z-10 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-90 transform transition-transform duration-300",
      className
    )}
    >
      <div
        className="z-20 bg-gray-900 max-w-screen-2xl w-11/12 md:max-h-screen h-5/6 rounded-xl overflow-y-scroll relative"
      >
        <div className="absolute z-30 opacity-10 w-full h-full flex items-start overflow-hidden">
          <img src={content?.data?.info?.backdrop} className="h-full opacity-70 adjust-img-ratio" />
        </div>
        <div className="flex flex-col w-full md:h-full gap-y-4 absolute z-40 px-10 lg:px-4 py-6">
          <div className="">
            <ChevronLeftIcon className="h-8 w-8 cursor-pointer duration-100 ease-linear hover:text-red-600 text-gray-100" onClick={onClose} />
          </div>
          <Header basicContent={basicContent} content={content?.data?.info} />
          <Trailers />
          <Actors actors={content?.data?.info?.actorList} />
          <Images images={content?.data?.info?.images} />
          <Similars images={content?.data?.info?.similars} />
        </div>
      </div>
    </div>
  )
}