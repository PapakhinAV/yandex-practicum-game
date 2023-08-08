import { useState, useCallback, useEffect } from 'react'
import { 
  FullScreen, 
  Nullable, 
  DocumentWithFullscreen, 
  DocumentElementWithFullscreen 
} from './types'

const useFullScreen = (target: Nullable<DocumentElementWithFullscreen>): FullScreen => {
  
  const isFullScreenElement = (target: Nullable<Element>): boolean => {
    const doc = document as DocumentWithFullscreen

    if (target) {
      return !!(doc.fullscreenElement === target 
        || doc.mozFullScreenElement === target 
        || doc.webkitFullscreenElement === target 
        || doc.msFullscreenElement === target)
    }

    return !!(doc.fullscreenElement 
      || doc.mozFullScreenElement 
      || doc.webkitFullscreenElement 
      || doc.msFullscreenElement)
  }

  const [isFullScreen, setFullScreen] = useState<boolean>(() =>
    isFullScreenElement(target)
  )

  const enterFullScreen = useCallback(() => {
    const element = target || document.documentElement as DocumentElementWithFullscreen

    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.mozRequestFullScreen){
      element.mozRequestFullScreen()
    }
  }, [target])

  const exitFullScreen = useCallback(() => {
    const doc = document as DocumentWithFullscreen

    if (doc.exitFullscreen) {
        doc.exitFullscreen()
    } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen()
    } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen()
    } else if(doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen()
    }
  }, [target])

  const handleChange = useCallback(() => {
    setFullScreen(isFullScreenElement(target))
  }, [target])

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleChange)
    document.addEventListener('webkitfullscreenchange', handleChange)
    document.addEventListener('mozfullscreenchange', handleChange)
    document.addEventListener('msfullscreenchange', handleChange)
    document.addEventListener('MSFullscreenChange', handleChange)
    
    return () => {
      document.removeEventListener('fullscreenchange', handleChange)
      document.removeEventListener('webkitfullscreenchange', handleChange)
      document.removeEventListener('mozfullscreenchange', handleChange)
      document.removeEventListener('msfullscreenchange', handleChange)
      document.removeEventListener('MSFullscreenChange', handleChange)
    }
  }, [target, handleChange])

  return {
    isFullScreen,
    enterFullScreen: enterFullScreen,
    exitFullScreen: exitFullScreen,
    toggleFullScreen: isFullScreen ? exitFullScreen : enterFullScreen,
  }
}

export default useFullScreen
