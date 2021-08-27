import clsx from 'clsx'
import { useState } from 'react'
// import { Button } from '@/components/Elements/Button'

const sizes = {
  sm: 'h-80 sm:w-60 sm:h-80 max-h-80',
  md: 'h-96 sm:w-64 sm:h-96 max-h-96',
  lg: 'h-96 sm:w-80 sm:h-96 max-h-96',
}

const BaseComponent = ({ children }) => {
  return (
    <div className="flex justify-center md:justify-start w-full h-full sm:w-auto sm:h-auto items-center">
      {children}
    </div>
  )
}

const ImageComponent = ({ img_low_res, img_high_res, isHover }) => {
  const [isLoading, setIsLoading] = useState(true)

  const className = clsx(
    "sm:object-fill h-full w-full rounded-xl border-2",
    isHover ? "border-gray-200" : "border-gray-600",
    "duration-200"
  )

  const onError = (e) => {
    e.target.onerror = null; e.target.src = "./logo.png"; e.target.classList.add("onErrorSize")
  }

  return (
    <>
      <img
        src={img_low_res}
        className={className}
        onError={onError}
        style={{ display: isLoading ? "block" : "none" }}
      />
      <img
        src={img_high_res}
        className={className}
        onError={onError}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </>
  )
}

export const Card = ({ size = "md", content, mock = false, setSelected = () => { } }) => {
  const [isHover, setIsHover] = useState(false)

  if (mock) {
    return (
      <BaseComponent>
        <div className={clsx("mx-5 sm:mx-auto rounded-xl relative skeleton", sizes[size])} />
      </BaseComponent>
    )
  }

  if (!content) return <div></div>

  return (
    <div className="flex flex-col justify-center md:justify-start w-full h-full sm:w-auto sm:h-auto items-center">
      <div
        className={clsx(
          "mx-5 sm:mx-auto rounded-xl relative",
          sizes[size],
          "cursor-pointer"
        )}
        onClick={setSelected}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <ImageComponent
          img_low_res={content.image_url}
          img_high_res={content.banner}
          isHover={isHover}
        />
        <div className={clsx(
          "absolute w-full bottom-0 h-9 pb-2 px-3 bg-gray-900 opacity-70 border-2 border-t-0 rounded-b-xl",
          isHover ? "border-gray-200" : "border-gray-600",
          "duration-200"
        )} />
        <div className="absolute w-full bottom-0 pb-2 px-3 truncate">
          <p className="text-bold align-bottom text-white rounded-b-xl inline-block mr-2 overflow-hidden limit-18ch">{content.title}</p>
          <p className="text-bold align-bottom text-gray-400 rounded-b-xl inline-block overflow-hidden">{`(${content.year})`}</p>
        </div>
        <div className="absolute top-1 right-1 bg-gray-900 px-1 pt-1.5 opacity-90 rounded-xl flex flex-col items-center">
          <img src="./imdb-logo-transparent.png" className="w-12 rounded-xl" />
          <p className="font-semibold">{content.rating == 0 ? "N.A" : content.rating}</p>
        </div>
      </div>
    </div>
  )
}