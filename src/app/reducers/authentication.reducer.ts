import { UserType } from '../interfaces/user.interface';
import { All, AuthenticationActionType } from '../../actions/authentication.action';

export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: UserType | null;
  // error message
  errorMessage: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function authenticationReducer(state = initialAuthState, action: All): AuthState {
  switch (action.type) {
    case AuthenticationActionType.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email,
          password: action.payload.password,
          name: action.payload.name
        },
        errorMessage: null
      };
    }
    case AuthenticationActionType.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthenticationActionType.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email,
          password: action.payload.password,
          name: action.payload.name
        },
        errorMessage: null
      };
    }
    case AuthenticationActionType.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthenticationActionType.LOGOUT: {
      return initialAuthState;
    }
    default: {
      return state;
    }
  }
}
