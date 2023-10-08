import { FC, SVGProps } from 'react'

const IconLocation: FC<SVGProps<SVGSVGElement>> = ({...props}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" {...props}>
      <path fill="#fff" fill-rule="evenodd" clip-rule="evenodd" d="M13.992 17.9331L7 15.1066V14.0489L24.3251 7.6001L17.8763 24.9252H16.8186L13.992 17.9331ZM15.1575 16.7676L17.308 22.1714L21.7744 10.1508L9.75376 14.6172L15.1575 16.7676Z"/>
    </svg>
  )
}

export default IconLocation
