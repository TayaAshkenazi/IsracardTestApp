import { MOVIE_CHANGE, ADD_FAVORITE , REMOVE_FAVORITE} from '../constans/index';
const initialState = {
    movie: '',
    favorites: [],
};
const movieReducer = (state = initialState, action) => {
    switch(action.type) {
        case MOVIE_CHANGE:
            return {
                ...state,
                movie:action.payload.movie
            };
        case ADD_FAVORITE:
            if (state.favorites.some(index => index === action.payload)){
                return state;
            }
            else{
                return {
                    ...state,
                    favorites: state.favorites.concat(action.payload)
            }
            }
        case REMOVE_FAVORITE:
            if (state.favorites.some(index => index === action.payload)){
                let fav = state.favorites.splice(state.favorites.indexOf(action.payload), 1);
                return {
                    ...state,
                    favorites: fav
                }
            }
        default:
            return state;
    }
}
export default movieReducer;
