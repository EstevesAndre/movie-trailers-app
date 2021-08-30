// import { Button } from "@/components/Elements/Button/Button"
import { ArrowCircleDownIcon, ChevronLeftIcon } from "@heroicons/react/outline"
import clsx from "clsx"
import { useState } from "react"
import { useMovieInformation } from "../hooks/useMovieInformation"
import { Header } from "./Header"
import { Trailers } from "./Trailers"
import { Actors } from "./Actors"
import { Images } from "./Images"
import { Similars } from "./Similars"

const BaseModalComponent = ({ className, children, onClose = () => { }, isLoading, backdrop = null }) => {

  // const handleKeyPress = useCallback(event => {
  //   if (event.key === 'Escape')
  //     onClose()
  // }, [])

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyPress)
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyPress)
  //   }
  // }, [handleKeyPress])

  return (
    <div className={clsx(
      "z-10 fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-90 transform transition-transform duration-300",
      "scale-0",
      className
    )}
    >
      <div className="z-20 bg-gray-900 max-w-screen-2xl w-full sm:w-11/12 md:max-h-screen h-full sm:h-5/6 rounded-xl relative overflow-y-scroll">
        <div className={clsx("absolute z-30 w-full h-full flex items-start overflow-hidden rounded-xl", isLoading ? "skeleton-animation opacity-20" : "opacity-10")}>
          {backdrop &&
            <img src={backdrop} className="h-full opacity-70 adjust-img-ratio" />
          }
        </div>
        <div className={clsx("flex flex-col w-full gap-y-4 absolute z-40 px-5 xs:px-10 lg:px-4 py-6 landscape-parent")}>
          <div className="fixed z-40">
            <ChevronLeftIcon className="h-8 w-8 cursor-pointer duration-100 ease-linear hover:text-red-600 text-gray-100" onClick={onClose} />
          </div>
          {children}
        </div>
      </div>
    </div >
  )
}

const Tab = ({ name, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-400 overflow-hidden">
      <div className="relative">
        <header className="flex justify-between items-center cursor-pointer select-none tab-label" onClick={() => setOpen(!open)}>
          <span className="flex-grow text-center lg:text-left py-5 text-2xl">
            {name}
          </span>
          <div
            className={clsx(
              "flex items-center justify-center",
              "transform duration-300",
              open ? "rotate-180" : "rotate-0"
            )}
          >
            <ArrowCircleDownIcon className={clsx("w-9 h-9 hover:text-gray-100 transition duration-300", open ? "text-gray-50" : "text-gray-300")} />
          </div>
        </header>
        <div className={clsx("transition-all duration-300 ease-in", open ? "max-h-auto" : "max-h-0")}>
          {children}
        </div>
      </div>
    </div >
  )
}

const Tabs = ({ content }) => {
  return (
    <div className="mx-auto max-w-screen-lg w-full">
      {content?.actorList && content?.actorList.length !== 0 &&
        <Tab name="Actors">
          <Actors actors={content?.actorList} />
        </Tab>
      }
      {content?.images && content?.images.length !== 0 &&
        <Tab name="Images">
          <Images images={content?.images} />
        </Tab>
      }
      {content?.similars && content?.similars.length !== 0 &&
        <Tab name="Related">
          <Similars movies={content?.similars} />
        </Tab>
      }
    </div>
  )
}

export const MovieModal = ({ className, basicContent, onClose }) => {

  const content = useMovieInformation(basicContent?.imdb_id || null)

  if (!basicContent) return (<BaseModalComponent className={className}></BaseModalComponent>)

  return (
    <BaseModalComponent
      className={className}
      onClose={onClose}
      isLoading={content.isLoading}
      backdrop={content.isLoading ? null : content?.data?.info?.backdrop || null}
    >
      <Header className="pt-12" isLoading={content.isLoading} basicContent={basicContent} content={content?.data?.info} />
      <Trailers title={basicContent.title} />
      <Tabs content={content?.data?.info} />
    </BaseModalComponent>
  )
}