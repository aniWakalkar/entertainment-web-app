export const handle_search = (query) => {
    return {
      type: "SEARCH",
      payload: query,
    };
  };


export const handle_token = (query) => {
    return {
      type: "TOKEN",
      payload: query,
    };
  };

export const handle_bookmark = (query) => {
    return {
      type: "BOOKMARKED",
      payload: query,
    };
  };


export const handle_authentication = (query) => {
  return {
    type: "AUTH",
    payload: query,
  };
};