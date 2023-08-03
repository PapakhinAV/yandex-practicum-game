import { extendTheme } from '@chakra-ui/react'

export enum EColors {
  BLUE = '#0085ff',
  RED = '#FF0000',
  GREEN = '#32CD32',
  ORANGE = '#FF4500',
  WHITE = '#FFFFFF',
  LIME = '#9AFC1D',
  BLACK_ALPHA = 'rgba(0, 0, 0, 0.4)'
}

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
        color: EColors.BLUE,
      },
    },
  },
})

export const TEAM_NAME = '4tunas'
