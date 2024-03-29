import React, { useState } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Wrapper, Container } from "../../layout/mainLayout";
import { useHistory, Link } from "react-router-dom";
import {
  AiFillEye as VisibilityIcon,
  AiFillEyeInvisible as VisibilityOffIcon,
} from "react-icons/ai";
import { register } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

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

const RegisterButton = styled.div`
  padding: 15px 0;
  width: 50%;
  border-radius: 0 10px 0 0;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.button.submit};
`;

const LoginButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border-radius: 10px 0 0 0;
  background-color: ${({ theme }) => theme.button.loginRegister};
  color: ${({ theme }) => theme.button.submit};
  text-decoration: none;
`;

const RegisterForm = styled.form`
  position: relative;
  margin: 0 auto;
  width: 100%;
  border-radius: 0 0 10px 10px;
  padding: 40px 40px 50px 40px;
  background-color: ${({ theme }) => theme.background.primary};

  ${MEDIA_QUERY_SM} {
    padding: 30px 30px 40px 30px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
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
  margin-bottom: 0;
  padding: 10px 40px 5px 10px;
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

const RemindMessage = styled.p`
  margin: 0px 0 20px 0;
  color: ${({ theme }) => theme.text.remind};
  font-size: 15px;
`;

const ErrorText = styled.div`
  position: absolute;
  bottom: 12px;
  color: ${({ theme }) => theme.error};
`;

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("Lidemy");
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!username || !nickname) {
      return setErrorMessage("資料尚未填寫齊全");
    }
    dispatch(register(username, password, nickname)).then((response) => {
      if (response.ok) {
        history.push("/");
      }
    });
  };

  const handleInputChange = (e) => {
    setErrorMessage("");
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "nickname") {
      setNickname(e.target.value);
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
            <LoginButton to="/login">登入</LoginButton>
            <RegisterButton>註冊</RegisterButton>
          </FormToggle>
          <RegisterForm onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="username"
              value={username}
              placeholder="帳號"
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="nickname"
              value={nickname}
              placeholder="暱稱"
              onChange={handleInputChange}
            />
            <InputContainer>
              <PasswordInputField
                type={isPasswordShow ? "text" : "password"}
                name="password"
                value={"Lidemy"}
                placeholder="密碼"
                onChange={handleInputChange}
              />
              <ShowPasswordIcon onClick={handlePasswordShow}>
                {isPasswordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </ShowPasswordIcon>
            </InputContainer>
            <RemindMessage>為了進行測試，密碼設定皆為默認值</RemindMessage>
            <SubmitButton>註冊</SubmitButton>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          </RegisterForm>
        </FormContainer>
      </Container>
    </Wrapper>
  );
}
