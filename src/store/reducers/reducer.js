export const initialState = "";
export const searchQuery = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH":
      return action.payload;
    default:
      return state;
  }
};

export const handleToken = (state = initialState, action) => {
  switch (action.type) {
    case "TOKEN":
      return action.payload;
    default:
      return state;
  }
};

export const Authentication = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      return action.payload;
    default:
      return state;
  }
};