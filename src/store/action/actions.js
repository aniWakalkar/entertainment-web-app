export const handle_search = (query) => {
    return {
      type: "SEARCH",
      payload: query,
    };
  };