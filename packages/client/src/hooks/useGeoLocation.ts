import { useState } from 'react'
import { LocationState } from './types'

const useGeoLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
  })

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          })
        },
        error => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          })
        }
      )
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Геолокация не поддерживается вашим браузером',
      })
    }
  }

  return { location, getLocation }
}

export default useGeoLocation
