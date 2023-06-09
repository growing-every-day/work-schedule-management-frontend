import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormContainer } from 'components/Common/FormContainer';
import { RegisterStyle, InputBox } from './style';
import React, { useState } from 'react';
import axios from 'axios';
import useRegisterStore from 'store/useRegisterStore';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  //보관되어있는 zustand 데이터를 가지고옴
  // id == username , username = 이름
  const {
    username,
    name,
    email,
    password,
    confirmPwd,
    setUsername,
    setName,
    setEmail,
    setPassword,
    setConfirmPwd,
  } = useRegisterStore();

  const navi = useNavigate();
  const loginNavi = () => {
    navi('/');
  };
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const onChangeUserId = (e) => {
    const userIdRegex = /^[a-z0-9]{5,10}$/;
    if (!e.target.value || userIdRegex.test(e.target.value))
      setUsernameError(false);
    else setUsernameError(true);
    setUsername(e.target.value);
  };
  const onChangeName = (e) => {
    //이름은 2~5글자 한글로 입력
    const nameRegex = /^[가-힣]{2,5}$/;
    if (!e.target.value || nameRegex.test(e.target.value)) setNameError(false);
    else setNameError(true);
    setName(e.target.value);
  };
  //비밀번호 유효성 검사
  const checkPassword = (e) => {
    //  8 ~ 16자 영문, 숫자,특수문자 조합
    var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    // 형식에 맞는 경우 true 리턴
    if (!e.target.value || regExp.test(e.target.value)) setPasswordError(false);
    else setPasswordError(true);
    setPassword(e.target.value);
  };
  // 이메일 유효성 검사
  const checkEmail = (e) => {
    var regExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // 형식에 맞는 경우 true 리턴
    if (!e.target.value || regExp.test(e.target.value)) setEmailError(false);
    else setEmailError(true);
    setEmail(e.target.value);
  };

  const validation = () => {
    if (!username) setUsername(true);
    if (!password) setPasswordError(true);
    if (!email) setEmailError(true);
    if (username && password && email) return true;
    else return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //비밀헌호가 일치할때 값을 넘기고 일치하지않으면 alert창이 뜨게
    if (password === confirmPwd && validation()) {
      axios
        .post('http://54.180.9.59:8080/api/users/signup', {
          username: username,
          name: name,
          email: email,
          password: password,
          confirmPwd: confirmPwd,
        })
        .then((response) => {
          console.log(response);
          alert('회원가입에 성공하였습니다');
          loginNavi();
        })
        .catch((error) => {
          console.log(error);
          console.log('가입실패');
          alert('회원가입에 성공하였습니다');
        });
      return;
    } else {
      alert('비밀번호가 일치하지 않습니다');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <RegisterStyle>
        <FormContainer
          style={{
            width: 800,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Form.Group className="mb-3">
            <InputBox>
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="username"
                placeholder="5글자 이상으로 만들어 주세요"
                value={username}
                onChange={onChangeUserId}
              />
              {usernameError && <span>형식이 맞지 않습니다</span>}
              {/* <Button onClick={handleCheckID}>id 중복확인</Button> */}
            </InputBox>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputBox>
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="name"
                placeholder="이름을 기입해 주세요."
                value={name}
                onChange={onChangeName}
              />
              {nameError && <span>이름 형식이 맞지 않습니다.</span>}
            </InputBox>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputBox>
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email을 기입해 주세요"
                value={email}
                onChange={checkEmail}
              />
              {emailError && <span>이메일 형식이 맞지 않습니다</span>}
            </InputBox>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputBox>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="8 ~ 16자 영문, 숫자,특수문자 조합"
                value={password}
                onChange={checkPassword}
              />
              {passwordError && <span>비밀번호 형식이 맞지 않습니다</span>}
            </InputBox>
          </Form.Group>
          <Form.Group className="mb-3">
            <InputBox>
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="상기 비밀번호와 동일하게 기입해 주세요"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
            </InputBox>
          </Form.Group>
          <Button
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '20px',
            }}
            type="submit"
          >
            회원가입
          </Button>
        </FormContainer>
      </RegisterStyle>
    </form>
  );
};

export default SignUpForm;
