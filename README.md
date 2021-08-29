# DEPT THE CASE

## **Movie Trailers - Dept Case**

Website anb web API on which you can search for movie trailers

### **Website**

**Development Library**: `React.js` and `TailwindCSS`

**Structure**: Adapted from `Bulletproof-react` - [Github-project](https://github.com/alan2207/bulletproof-react)

* Screenshot **#1**

![Home](https://github.com/EstevesAndre/dept-the-case/blob/master/screenshots/home-view.png?raw=true)


* Screenshot **#2**

![Movie](https://github.com/EstevesAndre/dept-the-case/blob/master/screenshots/movie-view.png?raw=true)


* Screenshot **#3**

![Trailer](https://github.com/EstevesAndre/dept-the-case/blob/master/screenshots/trailer-view.png?raw=true)


### **WebAPI**

This webAPI work as middleware to retrieve the results of services (following APIs) and aggregate them

**Language**: `Node.js`

**Structure**: Adapted from `Bulletproof-nodejs` [Github-project](https://github.com/santiq/bulletproof-nodejs)

* API of **online movie database** (e.g IMDB or Rotten Tomatoes)
  - **API #1** - [Data-Imdb](https://rapidapi.com/SAdrian/api/data-imdb1/)

        GET getUpcomingMovies
        GET getMoviesOrderByPopularity 
        GET getMoviesOrderByRating
        GET getMovieIdByTitle
        GET getMovieByImdbId

  - **API #2** - [IMDb-API](https://rapidapi.com/IMDb-API/api/imdb-api1/) | [Official website](https://imdb-api.com/api)

        GET /{lang?}/API/Title/{apiKey}/{id}/{options?}
          lang    (optional): default value is "en" (English)
          apiKey  (required): for API calls. Limited to 100 requests a day (free-version)
          id      (required): valid IMDb id
          options (optional): options to get more information about: *FullActor*, *FullCast*, *Posters*, *Images*

* API of an **online video service** (e.g. YouTube or Vimeo)
  - [YouTube Data API](https://developers.google.com/youtube/v3)

        GET youtube.search
          part       (required): search resource properties
          q          (optional): query term to search for
          maxResults (optional): maximum number of items that should be returned. Default is 5

