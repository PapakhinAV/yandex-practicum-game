import React, { memo, PropsWithChildren } from 'react'
import { Button } from '../index'
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../core/Router/ERoutes'
import { ENavButtonDirection, INavButtonProps } from './types'
import { FiArrowLeft, FiHome } from 'react-icons/fi'
import styles from './NavButton.module.scss'
const NavButton: React.FC<PropsWithChildren<INavButtonProps>> = props => {
  const { direction, customRoute, CustomIcon, children, size, colorScheme='blackAlpha' } = props
  const navigate = useNavigate()

  const NavIcon: React.FC<{ direction: ENavButtonDirection }> = ({ direction }) => {
    switch (direction) {
      case ENavButtonDirection.HOME:
        return <FiHome />
      case ENavButtonDirection.BACK:
        return <FiArrowLeft />
      case ENavButtonDirection.CUSTOM:
        return CustomIcon? <CustomIcon /> : null
      default:
        return null
    }
  }


  const handleClick = () => {
    switch (direction) {
      case ENavButtonDirection.HOME:
        navigate(ERoutes.HOME)
        break
      case ENavButtonDirection.BACK:
        navigate(-1)
        break
      case ENavButtonDirection.CUSTOM:
        if (customRoute) {
          navigate(customRoute)
        } else {
          console.warn('Custom route not provided for NavButton with direction CUSTOM')
        }
        break
      default:
        console.warn(`Unknown navigation direction: ${direction}`)
        break
    }
  }

  return <Button colorScheme={colorScheme} size={size} className={styles.button} onClick={handleClick}>
    <NavIcon direction={direction}/>
    {children}
  </Button>
}

export default memo(NavButton)
