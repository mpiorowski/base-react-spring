import React, { createContext, useReducer, useContext } from 'react';

/* Action Types */
const SET_DOGGIE = 'SET_DOGGIE';

/* Define a context and a reducer for updating the context */
const GlobalStateContext = createContext();

const initialState = {
  doggie: {
    name: null,
    breed: null,
    isGoodBoy: true,
  },
};

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case SET_DOGGIE:
      return {
        ...state,
        doggie: { ...action.payload },
      };

    default:
      return state;
  }
};

/* Export a component to provide the context to its children. This is used in our _app.js file */

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    globalStateReducer,
    initialState
  );

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

/*
Default export is a hook that provides a simple API for updating the global state.
This also allows us to keep all of this state logic in this one file
*/

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  const setDoggie = ({ name, breed, isGoodBoy }) => {
    dispatch({
      type: SET_DOGGIE,
      payload: {
        name,
        breed,
        isGoodBoy
      }
    });
  };

  return {
    setDoggie,
    doggie: { ...state.doggie },
  };
};

export default useGlobalState;

export const Test = () => {
  const globalState = useGlobalState();
  const currentUserName = globalState.userName;
  return <p>{currentUserName}</p>;
};
