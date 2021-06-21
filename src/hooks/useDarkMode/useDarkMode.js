import { useEffect } from "react";
import { setLocalMode, getLocalMode } from "../../utils";
import {
  setTheme,
  setMountedComponent,
  selectTheme,
  selectMountedComponent,
} from "../../redux/reducers/themeReducer";
import { useDispatch, useSelector } from "react-redux";

export const useDarkMode = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const mountedComponent = useSelector(selectMountedComponent);

  const setMode = (mode) => {
    setLocalMode(mode);
    dispatch(setTheme(mode));
  };

  const themeToggler = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    getLocalMode() && dispatch(setTheme(getLocalMode())); // 如果 localStorage 有 theme 就 setTheme
    dispatch(setMountedComponent(true));
  }, [dispatch]);

  return [theme, themeToggler, mountedComponent]; // useDarkMode 最後回傳 theme, themeToggler
};

export default useDarkMode;
