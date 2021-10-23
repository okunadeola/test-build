import { REGISTER , SETDATA} from "../actions/types";




const initialState = {
  data: [],
  user: {},
}


export default function (state = initialState, { type, payload }) {
  switch (type) {
    case REGISTER:
      return {
        ...state,
        user: {...payload}
      };
    case SETDATA:
      return {
        ...state,
        data: [...payload]
      };
    default:
      return state;
  }
}