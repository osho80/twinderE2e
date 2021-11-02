let loggedInUser = sessionStorage.getItem('user')
loggedInUser = (loggedInUser) ? JSON.parse(loggedInUser) : null
const initialState = {
  loggedInUser,
  users: [],
  currUser: '',
  isBgScreenActive: false
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_LOGGEDIN_USER':
      return { ...state, loggedInUser: action.user };
    case 'SET_USER':
      return { ...state, currUser: action.user };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      }
    case 'LOGGEDIN_USER_REMOVE':
      return { ...state, loggedInUser: '' }
    case 'SET_USERS':
      return { ...state, users: action.users };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => {
          if (user._id === action.user._id) return action.user;
          return user;
        })
      }
    case 'LOGGEDIN_USER_UPDATE':
      return { ...state, loggedInUser: action.user };
    case 'ADD_REACTIONS':
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          reactions: [...state.loggedInUser.reactions, action.newReaction]
        }
      }
    case 'ADD_POST':
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          posts: [action.post, ...state.loggedInUser.posts]
        }
      }
    case 'ADD_USER_IMG':
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          imagesUrls: [action.img, ...state.loggedInUser.imagesUrls]
        }
      }
    case 'ACTIVE_BG_SCREEN':
      return {
        ...state,
        isBgScreenActive: true
      }
    case 'CLOSE_BG_SCREEN':
      return {
        ...state,
        isBgScreenActive: false 
      }
    default:
      return state;
  }
}
