import { extendTheme } from '@chakra-ui/react'

export enum EColors {
  BLUE = '#0085ff',
  RED = '#FF0000',
  GREEN = '#32CD32',
  ORANGE = '#FF4500',
  WHITE = '#FFFFFF'
}

export const theme = extendTheme({
  styles: {
    global: {
      'h1, h2, h3, h4, h5, h6': {
        fontSize: 'initial',
        fontWeight: 'initial',
      },
    },
  },
})
