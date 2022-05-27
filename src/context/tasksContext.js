import React from 'react'
import {useTasksData} from '../hooks/useTasksData';

export const tasksContext = React.createContext([]);

export function TasksContextProvider({children}) {
  const [tasks] = useTasksData();

  return (
    <tasksContext.Provider value={tasks}>
      {children}
    </tasksContext.Provider>
  )
}