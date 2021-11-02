const initialState = {
    matches: [],
    currMatch: '',
    newMatchCnt: 0
}

export function matchReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_MATCHES':
            return { ...state, matches: action.matches };
        case 'SET_MATCH':
            return { ...state, currMatch: action.match };
        case 'MATCH_REMOVE':
            return {
                ...state,
                matches: state.matches.filter(match => match._id !== action.matchId)
            }
        case 'MATCH_ADD':
            return {
                ...state,
                matches: [action.match, ...state.matches]
            }
        case 'ADD_NEW_MATCH_NOTIFY':
            return {
                ...state,
                newMatchCnt: 1 
            }
        case 'UPDATE_MATCH':
            return {
                ...state,
                matches: state.matches.map(match => {
                    if (match._id === action.match._id) return action.match;
                    return match;
                })
            }
        case 'CLOSE_CHAT':
            return {
                ...state,
                currMatch: ''
            }
        case 'MSG_ADD':
            return {
                ...state,
                matches: state.matches.map(match => {
                    if (match._id === action.data.matchId) {
                       match.msgs = [...match.msgs, action.data.msg]
                    }
                    return match;
                }),
                currMatch: {...state.currMatch, msgs: [...state.currMatch.msgs, action.data.msg]}
            }
        default:
            return state;
    }
}
