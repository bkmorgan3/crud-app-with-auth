// Action creator 
import grabTodos from '../apis/grabTodos';

export const fetchTodos = () => async dispatch => {
    const response = await grabTodos.get('/posts')

    dispatch({type:'FETCH_TODOS', payload: response})
}