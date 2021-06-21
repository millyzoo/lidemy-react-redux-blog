import React, { useState } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Wrapper, Container } from "../../layout/mainLayout";
import { useHistory, Link } from "react-router-dom";
import {
  login,
  selectErrorMessage,
  setErrorMessage,
} from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillEye as VisibilityIcon,
  AiFillEyeInvisible as VisibilityOffIcon,
} from "react-icons/ai";
import { FaUser as PersonIcon, FaLock as LockIcon } from "react-icons/fa";

const LoginForm = styled.form`
  position: relative;
  margin: 0 auto;
  padding: 40px 40px 50px 40px;
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};

  ${MEDIA_QUERY_SM} {
    margin-top: 30px;
    padding: 30px 30px 40px 30px;
  }
`;

const Title = styled.p`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.button.submit};
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;

  & > svg {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.button.submit};
  }
`;
const InputField = styled.input`
  width: 100%;
  padding: 5px 10px 5px 40px;
  height: 45px;
  border: solid 1px transparent;
  border-radius: 3px;
  font-size: 16px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.body};
  transition: 0.3s;

  &:focus {
    border: solid 1px ${({ theme }) => theme.primary};
  }
`;

const ShowPasswordIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.button.submit};
    width: 100%;
    height: auto;
  }
`;

const PasswordInputField = styled(InputField)`
  padding: 5px 40px 5px 40px;
`;

const RegisterLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.text.remind};
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 0;
  color: ${({ theme }) => theme.text.negative};
  background-color: ${({ theme }) => theme.button.submit};
  border: transparent;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.div`
  position: absolute;
  bottom: 12px;
  color: ${({ theme }) => theme.error};
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("Lidemy");
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setErrorMessage(null));

    if (!username || !password) {
      e.preventDefault();
      return dispatch(setErrorMessage("資料尚未填寫齊全"));
    }

    dispatch(login(username, password)).then((response) => {
      if (response) {
        history.push("/");
      }
    });
  };

  const handleInputChange = (e) => {
    dispatch(setErrorMessage(null));
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handlePasswordShow = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  return (
    <Wrapper>
      <Container>
        <LoginForm onSubmit={handleSubmit}>
          <Title>登入</Title>
          <InputContainer>
            <PersonIcon />
            <InputField
              type="text"
              name="username"
              value={username}
              placeholder="帳號"
              onChange={handleInputChange}
            />
          </InputContainer>
          <InputContainer>
            <LockIcon />
            <PasswordInputField
              type={isPasswordShow ? "text" : "password"}
              name="password"
              value={password}
              placeholder="密碼"
              onChange={handleInputChange}
            />
            <ShowPasswordIcon onClick={handlePasswordShow}>
              {isPasswordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </ShowPasswordIcon>
          </InputContainer>
          <RegisterLink to="/register">還沒有帳號嗎？按此註冊</RegisterLink>
          <SubmitButton>登入</SubmitButton>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </LoginForm>
      </Container>
    </Wrapper>
  );
}
