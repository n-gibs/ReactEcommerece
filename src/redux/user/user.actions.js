import { UserActionTypes } from './user.types'

//align action and reducer types
export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
})