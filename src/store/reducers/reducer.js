export const initialState = "";
export const searchQuery = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH":
      return action.payload;
    default:
      return state;
  }
};