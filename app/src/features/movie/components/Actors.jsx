

export const Actors = ({ actors }) => {
  return (
    <div className="mx-auto max-w-screen-lg w-full">
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-row lg:flex-wrap gap-y-5 gap-x-2 justify-center lg:justify-center">
        {
          actors.map((actor, index) => (
            <div key={index} className="text-center max-w-xxs xl:flex-1">
              <img
                src={actor.image}
                className="ratio mx-auto rounded-2xl border-2 border-gray-600"
                onError={(e) => {
                  e.target.onerror = null; e.target.src = "./logo.png"; e.target.classList.add("onErrorSize")
                }}
              />
              <p className="text-gray-200 font-thin mt-2">{actor.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}