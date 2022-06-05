const initialState = {
  toDoList: [],
  statData: [{
    0: {
      'Пн': {
        time: 200,
        tomato: 2,
        focus: '40%',
        pause: 150,
        stops: 3,
      },
      'Вт': {
        time: 50,
        tomato: 2,
        focus: '100%',
        pause: 0,
        stops: 0,
      },
    }
  }]  
}

const CREATE_TASK = 'CREATE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        toDoList: state.toDoList.concat([{
          id: action.id,
          title: action.title,
          quantity: action.quantity,
          time: action.time,
        }]),
      };
    case UPDATE_TASK:
      return {
        ...state,
        toDoList: state.toDoList.map(
          item => item.id === action.payload
            ? {
              ...item,
              title: action.title
            }
            : item
        ),
      };
    default:
      return state; 
  };
}
