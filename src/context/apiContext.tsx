import React, {createContext, useContext, ReactNode, useEffect, useState} from 'react';
import httpClient from '../networking/httpClient';
import { AppRoutes, httpRoutes } from '../utils/constants';
import { navigate } from '../utils/helper';
import { Alert } from 'react-native';
// Define the type for our context value
type ApiContextType = {
  getTaskList:()=>void,
  apiloader:boolean,
  updateList:(data:any)=>void,
  deleteTask:(id:string)=>void,
  createTaskList:(data:any)=>void
};


// Create the context with initial undefined value
const APIContext = createContext<ApiContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useAPIContext = () => {
  const context = useContext(APIContext);

  if (context === undefined) {
    throw new Error('useSQLContext must be used within a SQLProvider');
  }
  return context;
};

// Create the provider component
export const APICallProvider = ({children}: {children: ReactNode}) => {
    
  const [apiloader,setApiLoader]=useState(false)
  
  const getTaskList=async()=>{
      try {
        setApiLoader(true)
        const response =await httpClient.get(httpRoutes.tasklist)
        setApiLoader(false)
        return response.data
      }
      catch(err)
      {
        setApiLoader(false)
        return err
      }
    }
   
    const deleteTask=async(id:string)=>{
      try {
        setApiLoader(true)
        const response =await httpClient.post(httpRoutes.deletetask,{id:id})
        setApiLoader(false)
        Alert.alert('Deletion successful')
        navigate(AppRoutes.home)  
        return response.data
      }
      catch(err)
      {
        Alert.alert('Try again')
        setApiLoader(false)
        return err
      }
    }
   
    const updateList=async(data:any)=>{
      try {
        setApiLoader(true)
        const response =await httpClient.post(httpRoutes.updatetask,data)
        setApiLoader(false)
        Alert.alert('Updated successfully')
        navigate(AppRoutes.home)  
        return response.data
      }
      catch(err)
      {
        Alert.alert('Try again')
        setApiLoader(false)
        return err
      }
    }

    const createTaskList=async(data:any)=>{
      try {
        setApiLoader(true)
        const response =await httpClient.post(httpRoutes.createtask,data)
        setApiLoader(false)
        Alert.alert('Created successfully')
        navigate(AppRoutes.home)  
        return response.data
      }
      catch(err)
      {
        Alert.alert('Try again')
        setApiLoader(false)
        return err
      }
    }
   
    const apiContextValue = {
      getTaskList:getTaskList,
      apiloader:apiloader,
      deleteTask:deleteTask,
      updateList:updateList,
      createTaskList:createTaskList
    };
  return <APIContext.Provider value={apiContextValue}>{children}</APIContext.Provider>;
};

export default APICallProvider;
