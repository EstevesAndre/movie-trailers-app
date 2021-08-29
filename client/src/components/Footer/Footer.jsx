import { MailIcon, PhoneIcon } from "@heroicons/react/outline"
import { Button } from "../Elements/Button/Button"

export const Footer = () => {

  const onSubmitForm = event => {
    event.preventDefault() // don't redirect the page

    console.log("TODO send request to back-end")
  }

  return (
    <footer className="w-full border-t border-gray-800 bg-gray-950">
      <div className="flex mx-auto justify-center pb-5 py-16 min-h-80">
        <div className="hidden xl:block xl:flex-0 w-64"></div>
        <div className="flex-grow flex flex-col md:flex-row text-center sm:text-left items-center h-full justify-between max-w-7xl mx-10 xl:mx-0">
          <div className="sm:flex-1 flex flex-col justify-around h-72 space-y-5">
            <p className="text-4xl sm:text-5xl text-gray-100 font-mono">Get in touch</p>
            <p className="text-xl sm:text-2xl text-gray-400 font-mono">Fill in the form to request a trailer for a movie</p>
            <div className="space-y-3">
              <div className="flex justify-start items-center mx-auto sm:mx-0">
                <PhoneIcon className="h-8 w-8 text-gray-300 mr-3" />
                <p className="text-xl text-gray-300">+351916400642</p>
              </div>
              <div className="flex justify-start items-center mx-auto sm:mx-0">
                <MailIcon className="h-8 w-8 text-gray-300 mr-3" />
                <a href="mailto:andreesteves111@gmail.com">
                  <p className="text-xl text-gray-300">andreesteves111@gmail.com</p>
                </a>
              </div>
            </div>
          </div>
          <div className="sm:flex-1 h-full flex flex-col justify-center mt-10 md:mt-0 w-full md:w-auto">
            <div className="ml-5 lg:mx-10 xl:mx-auto xl:w-10/12">
              <form method="POST" onSubmit={onSubmitForm}>
                <div className="flex flex-col">
                  <label htmlFor="name" className="hidden">Full Name</label>
                  <input required type="name" name="name" id="name" placeholder="Full Name" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="email" className="hidden">Email</label>
                  <input required type="email" name="email" id="email" placeholder="Email" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" />
                </div>
                <div className="flex flex-col mt-2 mb-4">
                  <label htmlFor="text" className="hidden">Message</label>
                  <textarea required placeholder="Write your message here..." className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" />
                </div>
                <Button type="submit" className="mx-auto sm:mx-0">Submit</Button>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden xl:block xl:flex-0 w-72"></div>
      </div>
    </footer >
  )
}