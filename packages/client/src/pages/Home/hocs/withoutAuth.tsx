import { FC, ComponentType } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../store/types'

const withoutAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P> => props => {
  const user = useSelector((state: IRootState) => state.app.user)
  return user ? null : <WrappedComponent {...props as P}/>
}

export default withoutAuth
