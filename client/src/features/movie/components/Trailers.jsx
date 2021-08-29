import { useState, createElement } from "react"
import { PlayIcon } from "@heroicons/react/solid"
import { useMovieTrailers } from "../hooks/useMovieInformation"
import clsx from "clsx"
import { ChevronLeftIcon } from "@heroicons/react/outline"
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share"

const VideoPlayer = ({ className, videoId, onClose }) => {
  if (!videoId) return <div></div>

  return (
    <div className={clsx(
      "absolute z-50 bg-gray-900 w-full top-0 left-0 landscape",
      "scale-0 transform transition-transform duration-300",
      className
    )}>
      <div className="px-2 pt-12 fixed z-50">
        <ChevronLeftIcon className="h-8 w-8 cursor-pointer duration-100 ease-linear hover:text-red-600 text-gray-100" onClick={onClose} />
        <div className="md:space-y-5 flex md:flex-col justify-center mt-5 md:mt-10 space-x-3 md:space-x-0">
          <FacebookShareButton url={`https://www.youtube.com/watch?v=${videoId}`}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <FacebookMessengerShareButton url={`https://www.youtube.com/watch?v=${videoId}`}>
            <FacebookMessengerIcon size={32} round={true} />
          </FacebookMessengerShareButton>
          <TwitterShareButton url={`https://www.youtube.com/watch?v=${videoId}`}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton url={`https://www.youtube.com/watch?v=${videoId}`}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </div>
      </div>
      <iframe className='video w-full h-full py-1 lg:pl-16 lg:pr-5 lg:pb-10 lg:pt-5'
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
      <p className="text-2xl text-center lg:text-left py-5">Trailers</p>
      <div className="flex flex-wrap gap-5 justify-center">
        {trailersData.isLoading ?
          mockData.map((_, index) => (
            <div key={index} className="w-full sm:w-60">
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
                className="w-full sm:w-60 rounded-xl relative cursor-pointer"
                onClick={() => { setVideoTabOpen(true); window.scrollTo(0, 0); setVideoId(video.videoId) }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <img src={video.thumbnail} className="rounded-xl h-44 mx-auto " />
                <div className="absolute top-0 flex w-full h-44 items-center justify-center">
                  <PlayIcon className={clsx("w-12 sm:w-1/5 duration-200", hoverIndex === index ? "text-white" : "text-gray-300")} />
                </div>
                <div className={clsx("font-light text-center xs:text-left", hoverIndex === index ? "underline text-white" : "text-gray-200 ")}>{renderHTML(video.title)}</div>
              </div>
            ))
          )
        }
      </div>
      <VideoPlayer className={videoTabOpen ? "scale-100" : ""} videoId={videoId} onClose={() => { setVideoTabOpen(false); setVideoId(null) }} />
    </div>
  )
}