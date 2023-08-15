// bunları neden yazdık?
// bunları yazmamızın sebebi şu ki bize map işlemi yaparken url döndürüsün

export const getGenreUrl = (slug: string) => `/genre/${slug}`
export const getMovieUrl = (slug: string) => `/movie/${slug}`
export const getActorUrl = (slug: string) => `/actor/${slug}`
export const getAdminUrl = (url: string) => `/manage/${url}`
export const getAdminUsersUrl = (url: string) => `/${url}`
export const getAdminHomeUrl = () => getAdminUrl('').slice(0, -1)
