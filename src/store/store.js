const initialState = {
  isModalOpened: false,
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
const DELETE_TASK = 'DELETE_TASK';
const UPDATE_STATUS = 'UPDATE_STATUS';
const CHANGE_ID = 'CHANGE_ID';

export const updateStatusModal = (status) => ({ 
    type: UPDATE_STATUS, 
    status,
  }
)

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
          item => item.id === action.id
            ? {
              ...item,
              title: action.title,
              quantity: action.quantity,
              time: action.time,
            }
            : item
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        toDoList: state.toDoList.filter(
          item => item.id !== action.id
        )
      };
    case UPDATE_STATUS: 
      return {
        ...state,
        isModalOpened: action.status,
      };
    case CHANGE_ID:
      return {
        ...state,
        toDoList: action.toDoList
      }
    default:
      return state; 
  };
}
