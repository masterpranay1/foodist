// TODO : Add the actions here

// actions.js

export const setUser = (user : any) => ({
  type: "SET_USER",
  payload: user,
});

export const setLoading = (isLoading : any) => ({
  type: "SET_LOADING",
  payload: isLoading,
});
