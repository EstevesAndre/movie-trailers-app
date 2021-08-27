import clsx from 'clsx'
import { useState } from 'react'
// import { Button } from '@/components/Elements/Button'

const sizes = {
  sm: 'h-80 sm:w-60 sm:h-80 max-h-80',
  md: 'h-96 sm:w-64 sm:h-96 max-h-96',
  lg: 'h-96 sm:w-80 sm:h-96 max-h-96',
}

export const Card = ({ size = "md", content, mock = false, defaultElement = false, setSelected = () => { } }) => {
  const [isLoading, setIsLoading] = useState(true)

  if (defaultElement) {
    return (
      <div className="flex justify-center md:justify-start w-full h-full sm:w-auto sm:h-auto items-center">
        {/* <div className="mx-5 sm:mx-auto rounded-full skeleton relative w-96 h-48"> */}
        {/* </div> */}
      </div>
    )
  }

  if (mock) {
    return (
      <div className="flex justify-center md:justify-start w-full h-full sm:w-auto sm:h-auto items-center">
        <div
          className={clsx("mx-5 sm:mx-auto rounded-xl relative skeleton", sizes[size])}
        />
      </div>
    )
  }

  if (!content) return <div>Error</div>

  return (
    <div className="flex justify-center md:justify-start w-full h-full sm:w-auto sm:h-auto items-center">
      <div
        className={clsx(
          "mx-5 sm:mx-auto rounded-xl relative",
          sizes[size],
          "cursor-pointer"
        )}
        onClick={setSelected}
      >
        <>
          <img
            src={content.image_url}
            className="sm:object-fill h-full w-full rounded-xl border-2 border-gray-600"
            onError={(e) => { e.target.onerror = null; e.target.src = "./logo.png"; e.target.classList.add("onErrorSize") }}
            style={{ display: isLoading ? "block" : "none" }}
          />
          <img
            src={content.banner}
            className="sm:object-fill h-full w-full rounded-xl border-2 border-gray-600"
            onError={(e) => { e.target.onerror = null; e.target.src = "./logo.png"; e.target.classList.add("onErrorSize") }}
            onLoadStart={() => setIsLoading(true)}
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </>
        {/* <Button className="absolute w-full pb-2 bottom-0 rounded-t-none opacity-90">See details</Button> */}
        {/* <Button className="absolute w-1/2 pb-2 left-1/4 -bottom-3 opacity-90">See details</Button> */}
        <div className="absolute w-full bottom-0 h-9 pb-2 px-3 bg-gray-900 opacity-70 border-2 border-t-0 border-gray-600 rounded-b-xl"></div>
        <div className="absolute w-full bottom-0 pb-2 px-3 truncate">
          <p className="text-bold align-bottom text-white rounded-b-xl inline-block mr-2 overflow-hidden limit-18ch">{content.title}</p>
          <p className="text-bold align-bottom text-gray-400 rounded-b-xl inline-block overflow-hidden">{`(${content.year})`}</p>
        </div>
      </div>
    </div>
  )
}