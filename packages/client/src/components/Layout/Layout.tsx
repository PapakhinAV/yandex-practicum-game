import { FC, PropsWithChildren } from 'react'
import styles from './Layout.module.scss'
import { Button } from '..'
import { IconEnterFullScreen, IconExitFullScreen } from './components'
import { useFullScreen } from '../../hooks'


const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { isFullScreen, toggleFullScreen } = useFullScreen(null)

  return (
    <div className={styles.layout__wrapper}>
      <Button 
        onClick={toggleFullScreen} 
        colorScheme='blackAlpha' 
        pos='absolute' 
        right='10px' 
        bottom='10px' 
        zIndex={10}
      >
        {isFullScreen ? <IconExitFullScreen/> : <IconEnterFullScreen/> }
      </Button>
      {children}
    </div>)
}

export default Layout
