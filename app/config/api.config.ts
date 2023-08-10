export const API_URL = `${process.env.APP_URL}/api`

//with pathname
export const getAuthUrl = (pathname: string) => `/auth/${pathname}`
export const getUsersUrl = (pathname: string) => `/users/${pathname}`
export const getMoviesUrl = (pathname: string) => `/movies/${pathname}`
export const getGenresUrl = (pathname: string) => `/genres/${pathname}`
export const getActorsUrl = (pathname: string) => `/actors/${pathname}`
export const getRatingshUrl = (pathname: string) => `/ratings/${pathname}`

// nno one pathname
export const getAuthUrls = () => `/auth`
export const getUsersUrls = () => `/users`
export const getMoviesUrls = () => `/movies`
export const getGenresUrls = () => `/genres`
export const getActorsUrls = () => `/actors`
export const getRatingshUrls = () => `/ratings`
