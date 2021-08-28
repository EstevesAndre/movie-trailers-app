

export const Images = ({ images }) => {

  return (
    <div className="mx-auto max-w-screen-lg w-full pt-3 pb-8">
      <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center gap-y-5 lg:gap-x-10">
        {
          images.map((value, index) => (
            <div key={index} className="text-center max-w-md lg:max-w-md">
              <img
                src={value.image}
                className="ratio mx-auto rounded-xl border-2 border-gray-600"
                onError={(e) => {
                  e.target.onerror = null; e.target.src = "./logo.png"; e.target.classList.add("onErrorSize")
                }}
              />
              <p className="text-gray-200 font-thin mt-2 truncate px-2">{value.title}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}