import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormContainer } from 'components/Common/FormContainer';
import { RegisterStyle, InputBox } from "./style";
import React, { useState } from "react";
import axios from "axios";
import useRegisterStore from "store/useRegisterStore";

const SignUpForm = () => {

    //보관되어있는 zustand 데이터를 가지고옴
    const {
        id,
        username,
        email,
        password,
        confirmPwd,
        setId,
        setUsername,
        setEmail,
        setPassword,
        setConfirmPwd,
    } = useRegisterStore();


    const [userIdError, setUserIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);



    const [isCheckId, setIsCheckId] = useState(false); //id중복검사 state


    const handleCheckID = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`api/auth/checkId?isCheckId=${isCheckId}`);
            const data = await response.json();
            setIsCheckId(data.isCheckId);
        } catch (error) {
            console.log(error);
            console.log("중복");
        }
        return;
    }

    const onChangeUserId = (e) => {
        const userIdRegex = /^[A-Za-z0-9+]{5,}$/;
        if ((!e.target.value || (userIdRegex.test(e.target.value)))) setUserIdError(false);
        else setUserIdError(true);
        setId(e.target.value);
        console.log(userIdError);
    };
    //비밀번호 유효성 검사
    const checkPassword = (e) => {
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
        // 형식에 맞는 경우 true 리턴
        if ((!e.target.value || (regExp.test(e.target.value)))) setPasswordError(false);
        else setPasswordError(true);
        setPassword(e.target.value);
    }
    // 이메일 유효성 검사
    const checkEmail = (e) => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // 형식에 맞는 경우 true 리턴
        if ((!e.target.value || (regExp.test(e.target.value)))) setEmailError(false)
        else setEmailError(true);
        setEmail(e.target.value);
    }

    const validation = () => {
        if (!id) setUserIdError(true);
        if (!username) setPasswordError(true);
        if (!password) setEmailError(true);
        if (id && username && password) return true;
        else return false;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //비밀헌호가 일치할때 값을 넘기고 일치하지않으면 alert창이 뜨게
        if (password === confirmPwd && validation()) {
            axios.post("/api/auth/signup",
                {
                    username: username,
                    email: email,
                    password: password,
                })
                .then((response) => {
                    console.log(response);
                    console.log("dfdfdf")
                })
                .catch((error) => {
                    console.log(error);
                    console.log("가입실패");
                })
            return;
        } else {
            alert("비밀번호가 일치하지 않습니다")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <RegisterStyle>
                <FormContainer style={{ width: 800, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Form.Group className='mb-3'>
                        <InputBox>
                            <Form.Label>
                                ID
                            </Form.Label>
                            <Form.Control
                                type='id'
                                placeholder="Id (5글자 이상)"
                                value={id}
                                onChange={onChangeUserId}
                            />
                            {userIdError && <span>형식이 맞지 않습니다</span>}
                            <Button onClick={handleCheckID}>id 중복확인</Button>
                        </InputBox>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <InputBox>
                            <Form.Label>
                                username
                            </Form.Label>
                            <Form.Control
                                type='username'
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </InputBox>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <InputBox>
                            <Form.Label>
                                email
                            </Form.Label>
                            <Form.Control
                                type='email'
                                placeholder="email"
                                value={email}
                                onChange={checkEmail}
                            />
                            {emailError && <span>이메일 형식이 맞지 않습니다</span>}
                        </InputBox>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <InputBox>
                            <Form.Label>
                                password
                            </Form.Label>
                            <Form.Control
                                type='password'
                                placeholder="password"
                                // onBlur={checkPassword}
                                value={password}
                                onChange={checkPassword}
                            />
                            {passwordError && <span>비밀번호 형식이 맞지 않습니다</span>}
                        </InputBox>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <InputBox>
                            <Form.Label>
                                confirmPwd
                            </Form.Label>
                            <Form.Control
                                type='password'
                                placeholder="confirmPwd"
                                value={confirmPwd}
                                onChange={(e) => setConfirmPwd(e.target.value)}
                            />
                        </InputBox>
                    </Form.Group>
                    <Button type="submit">회원가입</Button>
                </FormContainer>
            </RegisterStyle>
        </form >
    )
};

export default SignUpForm;