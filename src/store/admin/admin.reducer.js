import { createContext, useReducer } from "react";

export const AdminContext = createContext(null);

const ADMIN_INITIAL_STATE = {
  isAdminLoggedIn: false,
  adminRef: null,
};

export const ADMIN_ACTION_TYPES = {
  LOG_IN_ADMIN: "LOG_IN_ADMIN",
  LOG_OUT_ADMIN: "LOG_OUT_ADMIN",
};

const adminReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_ACTION_TYPES.LOG_IN_ADMIN:
      return {
        isAdminLoggedIn: true,
        adminRef: payload,
      };
    case ADMIN_ACTION_TYPES.LOG_OUT_ADMIN:
      return {
        isAdminLoggedIn: false,
        adminRef: null,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, ADMIN_INITIAL_STATE);
  const { isAdminLoggedIn, adminRef } = state;

  const logInAdmin = (adminRef) => {
    if (!adminRef) return;
    dispatch({
      type: ADMIN_ACTION_TYPES.LOG_IN_ADMIN,
      payload: adminRef,
    });
  };

  const logOutAdmin = () => {
    dispatch({
      type: ADMIN_ACTION_TYPES.LOG_OUT_ADMIN,
    });
  };

  const value = {
    adminRef,
    isAdminLoggedIn,
    logInAdmin,
    logOutAdmin,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
