const storagePrefix = 'dept_the_case_'

const storage = {
  getSearches: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}searches`))
  },
  setSearches: (searches) => {
    window.localStorage.setItem(`${storagePrefix}searches`, JSON.stringify(searches))
  },
  clearSearches: () => {
    window.localStorage.removeItem(`${storagePrefix}searches`)
  },
}

export default storage