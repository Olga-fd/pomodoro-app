const initialState = {
  lightTheme: true,
  isModalOpened: false,
  isTitled: false,
  isGotten: false,
  isFound: false,
  selectedTitle: '',
  selectedDay: '',
  currentDay: '',
  selectedWeek: 0,
  countClick: 0,
  numberOfWeek: [28],
  numOfTask: 1,
  indexTask: 0,
  limit: false,
  toDoList: [],
  statData: [
    // {id: 0,
    //   'Пн': {
    //     time: 40,
    //     tomato: 1,
    //     focus: 62,
    //     pause: 10,
    //     stops: 1,
    //   },
    //   'Вт': {
    //     time: 10,
    //     tomato: 1,
    //     focus: 10,
    //     pause: 10,
    //     stops: 1,
    //   },
    // }
  ]  
}

const ADD_STOP = 'ADD_STOP';
const ADD_TIME = 'ADD_TIME';
const ADD_PAUSE = 'ADD_PAUSE';
const CREATE_TASK = 'CREATE_TASK';
const CREATE_DATA = 'CREATE_DATA';
const CHANGE_WEEK = 'CHANGE_WEEK';
const DELETE_TASK = 'DELETE_TASK';
const GET_DAY = 'GET_DAY';
const GET_CURRENT_DAY = 'GET_CURRENT_DAY';
const GET_TOMATO = 'GET_TOMATO';
const GET_NAME_DAY = 'GET_NAME_DAY';
const MINUS_QUANTITY = 'MINUS_QUANTITY';
const SAVE_WEEK = 'SAVE_WEEK';
const SET_LIMIT = 'SET_LIMIT';
const SAVE_ID = 'SAVE_ID';
const SAVE_COUNT = 'SAVE_COUNT';
const SET_INIT = 'SET_INIT';
const SET_INIT_TODO = 'SET_INIT_TODO';
const SET_WEEK = 'SET_WEEK';
const SET_GOTTEN ='SET_GOTTEN';
const SET_DROPDOWN ='SET_DROPDOWN';
const SET_FOUND ='SET_FOUND';
const SET_FOCUS = 'SET_FOCUS';
const SET_THEME = 'SET_THEME';
const SET_NUM_TASK = 'SET_NUM_TASK';
const SET_SEL_TITLE = 'SET_SEL_TITLE';
const SET_NAME = 'SET_NAME';
const SET_SEL_DAY = 'SET_SEL_DAY';
const UPDATE_TASK = 'UPDATE_TASK';
const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_STATUS = 'UPDATE_STATUS';
const UPDATE_DATA_DAY = 'UPDATE_DATA_DAY';

export const updateStatusModal = (status) => ({ 
  type: UPDATE_STATUS, 
  status,
})

export const setSelectedDay = (day) => ({
  type: SET_SEL_DAY, 
  day,
})

export const setSelectedTitle = (title) => ({
  type: SET_SEL_TITLE, 
  title,
})

export const setName = (status) => ({
  type: SET_NAME, 
  status,
})

export const setInitData = (base) => ({
  type: SET_NAME, 
  base,
})

export const setInitToDo = (base) => ({
  type: SET_INIT_TODO, 
  base,
})

export const setNumTask = (num) => ({
  type: SET_NUM_TASK, 
  num,
})

export const saveId = (id) => ({
  type: SAVE_ID, 
  id,
})

export const saveNumberOfWeek = (weekNum) => ({ 
  type: SAVE_WEEK, 
  weekNum,
})

export const setLimit = (limit) => ({ 
  type: SET_LIMIT, 
  limit,
})

export const saveCountClick = (click) => ({ 
  type: SAVE_COUNT, 
  click,
})

export const setIsFound = (status) => ({ 
  type: SET_FOUND, 
  status,
})

export const setIsOpen = (status) => ({ 
  type: SET_DROPDOWN, 
  status,
})

export const setIsGotten = (status) => ({ 
  type: SET_GOTTEN, 
  status,
})

export const deleteTask= (id) => ({ 
  type: DELETE_TASK, 
  id,
})

export const setNumberOfWeek = (weekNum) => ({ 
  type: SET_WEEK, 
  weekNum,
})

export const changeNumberOfWeek = (arr) => ({ 
    type: CHANGE_WEEK, 
    arr,
  }
)

export const createData = (id, day, time, tomato, focus, pause, stops) => ({ 
    type: CREATE_DATA, 
    id,
    day,
    time,
    tomato,
    focus,
    pause,
    stops
  }
)

export const updateDataDay = (id, day, time, tomato, focus, pause, stops) => ({ 
    type: UPDATE_DATA_DAY, 
    id,
    day,
    time,
    tomato,
    focus,
    pause,
    stops
  }
)

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STOP:
      return {
        ...state,
        statData: state.statData.map(
          item => item.id == action.id
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
          item => item.id == action.id
            ? { ...item,
                [action.day]: {
                  ...item[action.day],
                  pause: action.pause
                },
              }
            : item
        ),
      }
    case ADD_TIME:
      return {
        ...state,
        toDoList: state.toDoList.map(
          item => item.id == action.id
            ? { ...item,
                time: action.time
              }
            : item
        ),
      }
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
    case CREATE_DATA:
      return {
        ...state,
        statData: state.statData.concat([{
          id: action.id,
          [action.day]: {
            time: action.time,
            tomato: action.tomato,
            focus: action.focus,
            pause: action.pause,
            stops: action.stops,
          }
        }]),
      };
    case CHANGE_WEEK:
      return {
        ...state,
        numberOfWeek: action.arr
      }
    case DELETE_TASK:
      return {
        ...state,
        toDoList: state.toDoList.filter(
          item => item.id != action.id
        )
      };
    case GET_NAME_DAY: 
      return {
        ...state,
        nameOfDay: action.name,
      };
    case GET_DAY:
      return {
        ...state,
        selectedDay: action.day
      }
    case GET_CURRENT_DAY:
      return {
        ...state,
        currentDay: action.day
    }
    case GET_TOMATO:
      return {
        ...state,
        statData: state.statData.map(
          item => item.id == action.id
            ? { ...item,
                [action.day]: {
                  ...item[action.day],
                  time: action.time,
                  tomato: action.tomato,
                },
              }
            : item
        ),
      }
    case MINUS_QUANTITY:
      return {
        ...state,
        toDoList: state.toDoList.map(
          item => item.id == action.id
            ? { ...item,
                quantity: action.quantity,
                time: action.time
              }
            : item
        ),
      }
    case SET_THEME:
      return {
        ...state,
        lightTheme: action.theme,
      }
    case SET_NAME: 
      return {
        ...state,
        isTitled: action.status,
      };
    case SAVE_ID: 
      return {
        ...state,
        indexTask: action.id,
      };
    case SAVE_COUNT: 
      return {
        ...state,
        countClick: action.click,
      };
    case SAVE_WEEK:
      return {
        ...state,
        numberOfWeek: state.numberOfWeek.concat(action.weekNum),
      };
    case SET_SEL_DAY:
      return {
        ...state,
        selectedDay: action.day,
      };
    case SET_SEL_TITLE:
      return {
        ...state,
        selectedTitle: action.title,
      };
    case SET_INIT:
      return {
        ...state,
        statData: action.base
      }
    case SET_GOTTEN:
      return {
        ...state,
        isGotten: action.status
      }
    case SET_DROPDOWN:
      return {
        ...state,
        isDropOpened: action.status
      }
    case SET_FOUND:
      return {
        ...state,
        isFound: action.status
      }
    case SET_NUM_TASK:
      return {
        ...state,
        numOfTask: action.num
      }
    case SET_LIMIT:
      return {
        ...state,
        limit: action.limit
      }
    case SET_INIT_TODO:
      return {
        ...state,
        toDoList: action.base
      }
    case SET_WEEK:
      return {
        ...state,
        selectedWeek: action.weekNum
      }
    case SET_FOCUS:
      return {
        ...state,
        statData: state.statData.map(
          item => item.id == action.id
            ? { ...item,
                [action.day]: {
                  ...item[action.day],
                  focus: action.focus
                },
              }
            : item
        ),
      }
    case UPDATE_TASK:
      return {
        ...state,
        toDoList: state.toDoList.map(
          item => item.id == action.id
            ? {
              ...item,
              quantity: action.quantity,
              time: action.time,
            }
            : item
        ),
      };
    case UPDATE_DATA_DAY:
      return {
        ...state,
        statData: state.statData.map(
          item => item.id == action.id
            ? {
              ...item,
              [action.day]: {
                time: 0,
                tomato: 0,
                focus: 0,
                pause: 0,
                stops: 0,
              },
            }
            : item
        ),
      };
    case UPDATE_TITLE:
      return {
        ...state,
        toDoList: state.toDoList.map(
          item => item.id == action.id
            ? {
              ...item,
              title: action.title,
            }
            : item
        ),
      };
    case UPDATE_STATUS: 
      return {
        ...state,
        isModalOpened: action.status,
      };
    default:
      return state; 
  };
}
