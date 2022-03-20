import { sampleData } from "../../app/api/sampleData";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  UPDATE_EVENT,
} from "./eventConstants";

const initialState = {
  events: [],
};

export default function eventReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload], //新規登録
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((evt) => evt.id !== payload.id),
          payload,
        ], //更新
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [...state.events.filter((evt) => evt.id !== payload)],
      };
    case FETCH_EVENTS:
      return {
        ...state,
        events: payload,
      };
    default:
      return state;
  }
}
