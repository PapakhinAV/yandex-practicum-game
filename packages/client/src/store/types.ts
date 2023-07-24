import { IGameState } from '../pages/Game/gameSlice'
import { IAppState } from './appReducer'

export interface IRootState {
  app: IAppState
  game: IGameState
}
