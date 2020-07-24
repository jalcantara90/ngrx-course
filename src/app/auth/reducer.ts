import {
  createReducer,
  on,
} from '@ngrx/store';
import { User } from './model/user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => ({ user: action.user })),
  on(AuthActions.logout, (state, action) => ({ user: undefined }))
);
