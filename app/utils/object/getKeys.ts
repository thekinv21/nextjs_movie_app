// bu fonksyon objeden keyleri alır

export const getKeys = <T>(obj: object) => Object.keys(obj) as Array<keyof T>
