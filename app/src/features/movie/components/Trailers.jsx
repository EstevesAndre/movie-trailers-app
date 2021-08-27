import { useState, createElement } from "react"
import { PlayIcon } from "@heroicons/react/solid"
import { useMovieTrailers } from "../hooks/useMovieInformation"
import clsx from "clsx"
import { ChevronLeftIcon } from "@heroicons/react/outline"

const VideoPlayer = ({ className, videoId, onClose }) => {
  if (!videoId) return <div></div>

  return (
    <div className={clsx(
      "absolute z-50 bg-gray-900 h-full w-full top-0 left-0 px-10 lg:px-4 py-6",
      "scale-0 transform transition-transform duration-300",
      className
    )}>
      <div className="">
        <ChevronLeftIcon className="h-8 w-8 cursor-pointer duration-100 ease-linear hover:text-red-600 text-gray-100" onClick={onClose} />
      </div>
      <iframe className='video w-full h-full pl-10 pr-5 pb-10 pt-5'
        title='YouTube player'
        sandbox='allow-same-origin allow-scripts allow-presentation'
        src={`https://youtube.com/embed/${videoId}?autoplay=0`}>
      </iframe>
    </div>
  )
}

export const Trailers = ({ title }) => {
  const [videoId, setVideoId] = useState(null)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [videoTabOpen, setVideoTabOpen] = useState(false)
  const mockData = [1, 2, 3, 4]

  const renderHTML = (rawHTML) => createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } })

  const trailersData = useMovieTrailers(title)

  return (
    <div className="mx-auto max-w-screen-lg w-full">
      <p className="text-2xl text-center md:text-left py-5">Trailers</p>
      <div className="flex flex-wrap gap-5 justify-center">
        {trailersData.isLoading ?
          mockData.map((_, index) => (
            <div key={index} className="w-60">
              <div className="w-full h-44 skeleton rounded-xl" />
              <div className="w-full my-2">
                <div className="skeleton skeleton-text rounded-xl" />
                <div className="skeleton skeleton-text rounded-xl" />
              </div>
            </div>
          )) : (
            trailersData?.data?.urls.slice(0, 4).map((video, index) => (
              <div
                key={index}
                className="w-60 rounded-xl relative cursor-pointer"
                onClick={() => { setVideoTabOpen(true); setVideoId(video.videoId) }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <img src={video.thumbnail} className="rounded-xl h-44" />
                <div className="absolute top-0 flex w-full h-44 items-center justify-center">
                  <PlayIcon className={clsx("w-1/5 duration-200", hoverIndex === index ? "text-white" : "text-gray-300")} />
                </div>
                <div className={clsx("font-light", hoverIndex === index ? "underline text-white" : "text-gray-200 ")}>{renderHTML(video.title)}</div>
              </div>
            ))
          )
        }
      </div>
      <VideoPlayer className={videoTabOpen ? "scale-100" : ""} videoId={videoId} onClose={() => setVideoTabOpen(false)} />
    </div>
  )
}