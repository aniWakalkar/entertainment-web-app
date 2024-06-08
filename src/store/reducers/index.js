import { combineReducers } from "redux";
import { Authentication, handleBookmark, handleToken, searchQuery } from "./reducer";

const allReducers = combineReducers({
  notifyBookmark: handleBookmark,
  search_token: handleToken,
  search_Query: searchQuery,
  Authenticate: Authentication,
});
export default allReducers;