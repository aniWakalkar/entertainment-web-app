import { combineReducers } from "redux";
import { Authentication, searchQuery } from "./reducer";

const allReducers = combineReducers({
  search_Query: searchQuery,
  Authenticate: Authentication,
});
export default allReducers;