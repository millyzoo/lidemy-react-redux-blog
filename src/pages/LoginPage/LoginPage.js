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

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
`;

const FormToggle = styled.div`
  display: flex;
  text-align: center;

  ${MEDIA_QUERY_SM} {
    margin-top: 20px;
  }
`;

const LoginButton = styled.div`
  padding: 15px 0;
  width: 50%;
  border-radius: 10px 0 0 0;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.button.submit};
`;

const RegisterButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border-radius: 0 10px 0 0;
  background-color: ${({ theme }) => theme.button.loginRegister};
  color: ${({ theme }) => theme.button.submit};
  text-decoration: none;
`;

const LoginForm = styled.form`
  position: relative;
  padding: 40px 40px 50px 40px;
  width: 100%;
  border-radius: 0 0 10px 10;
  background-color: ${({ theme }) => theme.background.primary};

  ${MEDIA_QUERY_SM} {
    padding: 30px 30px 40px 30px;
  }
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

const RemindMessage = styled.p`
  margin: 0px 0 20px 0;
  color: ${({ theme }) => theme.text.remind};
  font-size: 15px;
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
        <FormContainer>
          <FormToggle>
            <LoginButton>登入</LoginButton>
            <RegisterButton to="/register">註冊</RegisterButton>
          </FormToggle>
          <LoginForm onSubmit={handleSubmit}>
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
            <RemindMessage>為了進行測試，密碼設定皆為默認值</RemindMessage>
            <SubmitButton>登入</SubmitButton>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          </LoginForm>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}
