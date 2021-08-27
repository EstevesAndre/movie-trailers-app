import { Button } from "@/components/Elements/Button/Button"
import { ChevronLeftIcon } from "@heroicons/react/outline"
import clsx from "clsx"
import { useMovieInformation } from "../hooks/useMovieInformation"
import { Header } from "./Header"
import { Trailers } from "./Trailers"
// import { Actors } from "./Actors"
// import { Images } from "./Images"
// import { Similars } from "./Similars"


const BaseModalComponent = ({ className, children, onClose, isLoading, backdrop = null, hasFail = false }) => { // 
  return (
    <div className={clsx(
      "z-10 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-90 transform transition-transform duration-300",
      "scale-0",
      className
    )}
    >
      <div
        className={clsx("z-20 bg-gray-900 max-w-screen-2xl w-11/12 md:max-h-screen h-5/6 rounded-xl relative",
          "overflow-y-scroll")}
      >
        <div className={clsx("absolute z-30 w-full h-full flex items-start overflow-hidden rounded-xl", isLoading ? "skeleton-animation opacity-20" : "opacity-10")}>
          {backdrop &&
            <img src={backdrop} className="h-full opacity-70 adjust-img-ratio" />
          }
        </div>
        <div className={clsx("flex flex-col w-full gap-y-4 absolute z-40 px-10 lg:px-4 py-6", hasFail ? "h-full" : "md:h-full")}>
          <div className="">
            <ChevronLeftIcon className="h-8 w-8 cursor-pointer duration-100 ease-linear hover:text-red-600 text-gray-100" onClick={onClose} />
          </div>
          {children}
        </div>
      </div>
    </div >
  )
}


export const MovieModal = ({ className, basicContent, onClose }) => {

  const content = useMovieInformation(basicContent?.imdb_id || null)
  console.log(content?.data?.info)
  console.log(basicContent)

  if (!basicContent) return (<BaseModalComponent className={className}></BaseModalComponent>)

  if (content.isSuccess && !content.data) {
    return (
      <BaseModalComponent className={className} onClose={onClose} hasFail={true}>
        <div className="flex-grow self-center flex flex-col justify-center">
          <p className="text-center text-4xl md:text-7xl mb-10 md:mb-32">Unable to retrieve data {`:(`}</p>
          <Button onClick={onClose} className="mx-auto" size="lg">Back</Button>
        </div>
      </BaseModalComponent>
    )
  }

  return (
    <BaseModalComponent
      className={className}
      onClose={onClose}
      isLoading={content.isLoading}
      backdrop={content.isLoading ? null : content?.data?.info?.backdrop || null}
    >
      <Header isLoading={content.isLoading} basicContent={basicContent} content={content?.data?.info} />
      <Trailers title={basicContent.title} />
      {/* <Actors actors={content?.data?.info?.actorList} /> */}
      {/* <Images images={content?.data?.info?.images} /> */}
      {/* <Similars images={content?.data?.info?.similars} /> */}
    </BaseModalComponent>
  )
}