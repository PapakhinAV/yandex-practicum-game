import { FC, memo, PropsWithChildren } from 'react'
import styles from './Layout.module.scss'
import { Button, Loader } from '..'
import { IconEnterFullScreen, IconExitFullScreen } from './components'
import { useFullScreen } from '../../hooks'
import Theme from './components/Theme/Theme'
import classNames from 'classnames'
import { EThemes } from '../../types/EThemes'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store/types'
import { useGetUserThemeQuery } from '../../api/theme'


const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { isFullScreen, toggleFullScreen } = useFullScreen(null)

  const userId = useSelector((state: IRootState) => state.app.user)?.id
  const currentTheme = useSelector((state: IRootState) => state.app.theme)
  const {isFetching} = useGetUserThemeQuery(userId!, { skip: !userId })

  return (
    <div className={classNames(styles.layout__wrapper,
      {
        [styles.layout__dayTheme]: currentTheme === EThemes.DAY,
        [styles.layout__nightTheme]: currentTheme === EThemes.NIGHT,
      })}>
      <Loader isLoading={isFetching} />
      <Theme />
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

export default memo(Layout)
