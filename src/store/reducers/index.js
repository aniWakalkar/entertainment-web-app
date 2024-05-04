import { combineReducers } from "redux";
import { searchQuery } from "./reducer";

const allReducers = combineReducers({
  search_Query: searchQuery,
});
export default allReducers;