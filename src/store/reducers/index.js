import { combineReducers } from "redux";
import { Authentication, handleToken, searchQuery } from "./reducer";

const allReducers = combineReducers({
  search_token: handleToken,
  search_Query: searchQuery,
  Authenticate: Authentication,
});
export default allReducers;