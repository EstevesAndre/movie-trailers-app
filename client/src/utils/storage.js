const storagePrefix = 'dept_the_case_'

const storage = {
  getSearches: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}searches`) || "[]")
  },
  setSearches: (searches) => {
    window.localStorage.setItem(`${storagePrefix}searches`, JSON.stringify(searches))
  },
  addSearch: (search) => {
    const searches = JSON.parse(window.localStorage.getItem(`${storagePrefix}searches`) || "[]")
    window.localStorage.setItem(`${storagePrefix}searches`, JSON.stringify([search, ...searches.slice(0, 27).filter((item) => item.name !== search.name)]))
  },
  clearSearches: () => {
    window.localStorage.removeItem(`${storagePrefix}searches`)
  },
  removeSearch: (search) => {
    const searches = JSON.parse(window.localStorage.getItem(`${storagePrefix}searches`) || "[]")
    window.localStorage.setItem(`${storagePrefix}searches`, JSON.stringify(searches.slice(0, 27).filter((item) => item.name !== search.name)))
  }
}

export default storage