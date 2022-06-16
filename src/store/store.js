const initialState = {
  isModalOpened: false,
  selectedDay: 'Пн',
  selectedWeek: 0,
  numberOfWeek: [23, 24],
  toDoList: [],
  statData: [
    // {id: 0,
    // 'Пн': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Вт': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Ср': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Чт': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Пт': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Сб': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Вс': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // },
    // {id: 1, 
    // 'Пн': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Вт': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Ср': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Чт': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Пт': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Сб': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // 'Вс': {
    //   time: 0,
    //   tomato: 0,
    //   focus: 0,
    //   pause: 0,
    //   stops: 0,
    // },
    // },
    // {id: 2,
    //   'Пн': {
    //     time: 0,
    //     tomato: 0,
    //     focus: 0,
    //     pause: 0,
    //     stops: 0,
    //   },
    //   'Вт': {
    //     time: 0,
    //     tomato: 0,
    //     focus: 0,
    //     pause: 0,
    //     stops: 0,
    //   },
    //   'Ср': {
    //     time: 0,
    //     tomato: 0,
    //     focus: 0,
    //     pause: 0,
    //     stops: 0,
    //   },
    //   'Чт': {
    //     time: 0,
    //     tomato: 0,
    //     focus: 0,
    //     pause: 0,
    //     stops: 0,
    //   },
    //   'Пт': {
    //     time: 0,
    //     tomato: 0,
    //     focus: 0,
    //     pause: 0,
    //     stops: 0,
    //   },
    //   'Сб': {
    //     time: 0,
    //     tomato: 0,
    //     focus: 0,
    //     pause: 0,
    //     stops: 0,
    //   },
    //   'Вс': {
    //     time: 0,
    //     tomato: 0,
    //     focus: 0,
    //     pause: 0,
    //     stops: 0,
    //   },
    // }
  ]  
}

const CREATE_TASK = 'CREATE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const UPDATE_TITLE = 'UPDATE_TITLE';
const DELETE_TASK = 'DELETE_TASK';
const UPDATE_STATUS = 'UPDATE_STATUS';
const CHANGE_ID = 'CHANGE_ID';
const CREATE_DATA = 'CREATE_DATA';
const UPDATE_DATA = 'UPDATE_DATA';
const SAVE_WEEK = 'SAVE_WEEK';
const SET_INIT = 'SET_INIT';
const SET_WEEK = 'SET_WEEK';
const GET_DAY = 'GET_DAY';
const ADD_STOP = 'ADD_STOP';
const ADD_PAUSE = 'ADD_PAUSE';
const GET_TOMATO = 'GET_TOMATO';

export const updateStatusModal = (status) => ({ 
    type: UPDATE_STATUS, 
    status,
  }
)

export const saveNumberOfWeek = (weekNum) => ({ 
    type: SAVE_WEEK, 
    weekNum,
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
              quantity: action.quantity,
              time: action.time,
            }
            : item
        ),
      };
    case UPDATE_TITLE:
      return {
        ...state,
        toDoList: state.toDoList.map(
          item => item.id === action.id
            ? {
              ...item,
              title: action.title,
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
      };
    case SAVE_WEEK:
      return {
        ...state,
        numberOfWeek: state.numberOfWeek.concat([action.weekNum]),
      };
    case CREATE_DATA:
      return {
        ...state,
        statData: state.statData.concat([{
          id: action.id,
          [action.day]: {
            time: action.time,
            tomato: 0,
            focus: 0,
            pause: 0,
            stops: 0,
          }
        }]),
      };
    case UPDATE_DATA:
      return {
        ...state,
        statData: state.statData.map(
          item => item.id === action.id 
            ? {
                ...item,
                time: action.time,
              }
          : item
        ),
      }
    case SET_INIT:
      return {
        ...state,
        statData: action.base
      }
    case SET_WEEK:
      return {
        ...state,
        selectedWeek: action.week
      }
    case GET_DAY:
      return {
        ...state,
        selectedDay: action.day
      }
    case ADD_STOP:
      return {
        ...state,
        statData: state.statData.map(
          item => item.id === action.id
            ? { ...item,
                [action.day]: {
                  ...item[action.day],
                  stops: action.stop,
                },
              }
            : item
        ),
      }
    case ADD_PAUSE:
      return {
        ...state,
        statData: state.statData.map(
          item => item.id === action.id
            ? { ...item,
                [action.day]: {
                  ...item[action.day],
                  pause: action.pause
                },
              }
            : item
        ),
    }
    case GET_TOMATO:
      return {
        ...state,
        statData: state.statData.map(
          item => item.id === action.id
            ? { ...item,
                [action.day]: {
                  ...item[action.day],
                  tomato: action.tomato
                },
              }
            : item
        ),
    }
    default:
      return state; 
  };
}
