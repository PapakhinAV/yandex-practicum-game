import { extendTheme } from '@chakra-ui/react'
import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { EThemes } from '../types/EThemes'
import { TThemeStyles } from '../types/TThemeStyles'

export enum EColors {
  WHITE = '#FFFFFF',
  BLACK = 'rgba(0, 0, 0)',
  BUILDING_FILL = '#0085ff',
  ENEMY_FILL = '#FF2222',
  HEALTH_BAR_EMPTY = '#FF2222',
  HEALTH_BAR_FILL = '#32CD32',
  PROJECTILE_FILL = '#FF4500',
  PLACEMENT_FILL = '#FFFFFF',
  LINK = '#0085FF',
  INPUT_TEXT = '#222222',
}

const DayColors: TThemeStyles = {
  BACKGROUND: 'rgba(256, 256, 256, 0.10)',
  CONTRAST_BACKGROUND: '#FFFFFF',
  INVERTED_BACKGROUND: '#222222',
  TEXT: '#222222',
  INVERTED_TEXT: '#FFFFFF',
  USERNAME: '#FC931D',
}

const NightColors: TThemeStyles = {
  BACKGROUND: 'rgba(0, 0, 0, 0.48)',
  CONTRAST_BACKGROUND: '#222222',
  INVERTED_BACKGROUND: '#FFFFFF',
  TEXT: '#FFFFFF',
  INVERTED_TEXT: '#222222',
  USERNAME: '#9AFC1D',
}

export const getThemeColors = (themeName: string): TThemeStyles => {
  switch(themeName) {
    case EThemes.DAY:
      return DayColors
    case EThemes.NIGHT:
      return NightColors
    default:
      return DayColors
  }
}

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  overlay: {},
  dialog: {
    color: EColors.BLACK
  },
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})

export const theme = extendTheme({
  fonts: {
    heading: '"Rubik", sans-serif',
    body: '"Rubik", sans-serif',
  },
  styles: {
    global: {
      'h1, h2, h3, h4, h5, h6': {
        fontSize: 'initial',
        fontWeight: 'initial',
      },
      a: {
        color: EColors.LINK,
      },
      input: {
        color: EColors.INPUT_TEXT
      },
      textarea: {
        color: EColors.INPUT_TEXT
      }
    },
  },
  components: { Modal: modalTheme },
})

export const TEAM_NAME = '4tunas'
