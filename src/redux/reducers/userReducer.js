import { createSlice } from "@reduxjs/toolkit";
import {
  login as loginAPI,
  getUser as getUserAPI,
  register as registerAPI,
} from "../../WebAPI";
import { setAuthToken } from "../../utils";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
    errorMessage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const selectUser = (store) => store.user.user;
export const selectErrorMessage = (store) => store.user.errorMessage;

export const { setUser, setErrorMessage } = userReducer.actions;

export const getUser = () => (dispatch) => {
  getUserAPI().then((response) => {
    dispatch(setErrorMessage(null)); // 先清空

    if (response.ok !== 1) {
      // 錯誤處理
      setAuthToken(null); // 因為還是未登入，所以要清空
      return dispatch(setErrorMessage(response.toString()));
    }
    dispatch(setUser(response.data)); // 將資料放入 user
  });
};

export const login = (username, password) => (dispatch) => {
  return loginAPI(username, password).then((response) => {
    dispatch(setErrorMessage(null)); // 先清空

    if (response.ok === 0) {
      // 錯誤處理
      return dispatch(setErrorMessage(response.message)); // 登入失敗時就回傳錯誤訊息
    }
    setAuthToken(response.token);
    dispatch(getUser());
    return response;
  });
};

export const register = (username, password, nickname) => (dispatch) => {
  return registerAPI(username, password, nickname).then((response) => {
    dispatch(setErrorMessage(null)); // 先清空

    if (response.ok === 0 && response.code === 3) {
      // 錯誤處理
      return setErrorMessage("此帳號已有人使用");
    } else if (response.ok === 0) {
      return setErrorMessage(response.message);
    }
    setAuthToken(response.token); // 將得到的 data.token 放到 localStorage
    dispatch(getUser());
    return response;
  });
};

export default userReducer.reducer;
