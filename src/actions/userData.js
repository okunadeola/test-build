


import {REGISTER, SETDATA} from "./types";

    export const setUser= (data) => {
      return {
        type: REGISTER,
        payload: data
      }
      
 }


    export const setData= (data) => {
      return {
        type: SETDATA,
        payload: data
      }
      
    }

