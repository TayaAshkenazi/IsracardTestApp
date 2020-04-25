import { MOVIE_CHANGE, ADD_FAVORITE, REMOVE_FAVORITE } from '../constans/index';

// export function changeCount(movie) {
//     return {
//         type: MOVIE_CHANGE,
//         payload: movie
//     }
// }

export function changeMovie(movie) {
    return dispatch => {
        dispatch({
            type: MOVIE_CHANGE,
            payload: movie,
        });
    };
}

export function addMovieToFavorites(movie) {
    return dispatch => {
        dispatch({
            type: ADD_FAVORITE,
            payload: movie,
        });
    };
}

export function removeMovieFromFavorites(movie) {
    return dispatch => {
        dispatch({
            type: REMOVE_FAVORITE,
            payload: movie,
        });
    };
}
