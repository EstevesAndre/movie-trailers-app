import { useState } from 'react'
import clsx from "clsx"

const ImageComponent = ({ className, isLoading, img_low_res, img_high_res, genres }) => {
  const [imageLoading, setImageLoading] = useState(true)
  const mockData = [1, 2, 3, 4]

  const imageClassName = "w-full ratio mx-auto rounded-xl border-2 border-gray-600"
  const onError = (e) => {
    e.target.onerror = null; e.target.src = "./logo.png"; e.target.classList.add("onErrorSize")
  }

  return (
    <div className={clsx(className, "max-w-md")}>
      <img
        src={img_low_res}
        className={imageClassName}
        onError={onError}
        style={{ display: imageLoading ? "block" : "none" }}
      />
      <img
        src={img_high_res}
        className={imageClassName}
        onError={onError}
        onLoadStart={() => setImageLoading(true)}
        onLoad={() => setImageLoading(false)}
        style={{ display: imageLoading ? "none" : "block" }}
      />
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-2 items-center">
        {
          isLoading ? (
            mockData.map((_, index) => (
              <div key={index} className="px-3 py-4 border-2 border-gray-600 rounded-xl skeleton skeleton-text" />
            ))
          ) : (
            genres.slice(0, 4).map((genre, index) => (
              <div key={index}>
                <p className="px-3 py-1 text-center font-thin border-2 border-red-500 rounded-xl">{genre}</p>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

const KeyValueLabel = ({ className, classNameCh1 = "mr-2", classNameCh2 = "inline-block", isLoading, label, value, color }) => {
  if (isLoading) {
    return (
      <div className={clsx(className, "w-11/12 rounded-xl skeleton")} />
    )
  }
  return (
    <div className={className}>
      <p className={clsx("text-gray-200 inline-block py-1 px-2 border-2 rounded-xl", classNameCh1, color)}>{label}</p>
      <p className={clsx("text-gray-300 font-light", classNameCh2)}>{value}</p>
    </div>
  )
}

export const Header = ({ className = "", isLoading = false, basicContent, content }) => {
  const mockData = [1, 2, 3, 4]

  if (!isLoading && (content === undefined || (!content.title && !content.year))) {
    return (
      <div className={clsx("flex flex-col md:flex-row justify-start gap-x-5", className)}>
        <ImageComponent
          className="h-104 mx-auto md:mr-0 mb-4 md:mb-0 self-center flex items-center md:items-start"
          isLoading={isLoading}
          img_low_res={basicContent.image_url}
          img_high_res={basicContent.banner}
          genres={content?.genres || []}
        />
        <div className="flex-1 flex flex-col justify-between max-w-screen-md space-y-3 md:space-y-2 w-11/12 mx-auto md:ml-0">
          <div className="flex-1 text-center md:text-left">
            <p className="text-3xl inline-block font-semibold mr-4">{basicContent.title}</p>
            <p className="text-3xl inline-block font-light">{`(${basicContent.year})`}</p>
          </div>
          <div className="flex-grow">
            <p className="text-center text-3xl">Unable to retrieve data {`:(`}</p>
            <p className="text-center text-gray-400 text-xl mt-5">Possibly due to maximum daily API requests!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx("flex flex-col md:flex-row justify-start gap-x-5", className)}>
      <ImageComponent
        className="h-104 mx-auto md:mr-0 mb-4 md:mb-0 self-center"
        isLoading={isLoading}
        img_low_res={basicContent.image_url}
        img_high_res={basicContent.banner}
        genres={content?.genres || []}
      />
      <div className="flex-1 flex flex-col justify-between max-w-screen-md space-y-3 md:space-y-2 w-11/12 mx-auto md:ml-0">
        <div className="flex-1 text-center md:text-left">
          <p className="text-3xl inline-block font-semibold mr-4">{basicContent.title}</p>
          <p className="text-3xl inline-block font-light">{`(${basicContent.year})`}</p>
        </div>
        {isLoading ? (
          <div className="flex-1 flex flex-row flex-wrap gap-x-5 gap-y-3 items-center justify-center md:justify-start">
            {mockData.map((_, index) => (
              <div key={index} className="px-3 py-4 w-32 rounded-xl skeleton skeleton-text" />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-row flex-wrap gap-x-5 gap-y-3 items-center justify-start">
            <KeyValueLabel className="" label="Directors" color="border-green-700" value={content?.directors} />
            <KeyValueLabel className="" label="Premiere" color="border-indigo-700" value={content?.releaseDate} />
            <KeyValueLabel className="" label="Time" color="border-pink-400" value={content?.runtimeStr} />
            <KeyValueLabel className="" label="IMDb" color="border-yellow-400" value={content?.imDbRating} />
          </div>
        )}
        <KeyValueLabel className={clsx(isLoading ? "flex-0 h-24 w-full" : "flex-1")} isLoading={isLoading} classNameCh2="" label="Writers" color="border-red-400" value={content?.writers} />
        <KeyValueLabel className={clsx(isLoading ? "flex-0 h-20 w-full" : "flex-1 flex flex-col justify-end")} classNameCh1="mr-auto" classNameCh2="overflow-hidden" isLoading={isLoading} label="Plot" color="border-blue-400" value={content?.plot} />
        <KeyValueLabel className={clsx(isLoading ? "w-full h-10" : "", "flex-0 pt-5")} isLoading={isLoading} label="Awards" color="border-yellow-200" value={content?.awards} />
      </div>
    </div>
  )
}