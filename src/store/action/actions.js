export const handle_search = (query) => {
    return {
      type: "SEARCH",
      payload: query,
    };
  };


export const handle_authentication = (query) => {
  return {
    type: "AUTH",
    payload: query,
  };
};