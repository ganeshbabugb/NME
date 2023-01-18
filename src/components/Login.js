import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Alert,
    AlertIcon,
    FormHelperText
} from '@chakra-ui/react';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Constants/URL";

const Login = () => {

    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [userNotFound, setUserNotFound] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const validate = () => {
        let newErrors = {};
        let result = false;
        if (!username) newErrors.username = "User name is required";
        if (!password) newErrors.password = "Password is required";
        if (username === 'ADMIN' && password === 'ADMIN') {
            result = true;
            sessionStorage.setItem('user', 'ADMIN');
            usenavigate('/admin');
        }
        setErrors(newErrors);
        (Object.keys(newErrors).length === 0) ? result = true : result = false
        return result
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch(API_URL + "/" + username)
                .then((res) => res.json())
                .then((resp) => {
                    if (Object.keys(resp).length === 0) {
                        setUserNotFound(true);
                        setTimeout(() => setUserNotFound(false), 2000)
                    } else {
                        if (resp.dob === password) {
                            sessionStorage.setItem('username', username);
                            usenavigate('/home')
                        } else {
                            setInvalidPassword(true);
                            setTimeout(() => setInvalidPassword(false), 2000)
                        }
                    }
                })
                .catch((err) => console.log(err.message))
        }
    }

    return (
        <>

            {userNotFound
                ? (
                    <Alert status='error'>
                        <AlertIcon />
                        USER NOT FOUND!
                    </Alert>
                ) : null
            }

            {invalidPassword
                ? (
                    <Alert status='error'>
                        <AlertIcon />
                        PLEASE ENTER VALID DOB.
                    </Alert>
                ) : null
            }

            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={'gray.50'}>
                <Stack
                    m={'5'}
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={'white'}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <FormControl>
                        <FormLabel>USER NAME</FormLabel>
                        <Input
                            type="text"
                            _placeholder={{ color: 'gray.500' }}
                            value={username}
                            onChange={e => setUser(e.target.value)}
                        />
                        {errors.username && <FormHelperText>{errors.username}</FormHelperText>}
                    </FormControl>
                    <FormControl>
                        <FormLabel>PASSWORD</FormLabel>
                        <Input
                            type="password"
                            _placeholder={{ color: 'gray.500' }}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                    </FormControl>
                    <Stack spacing={6}>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            onClick={handleSubmit}>
                            SUBMIT
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </>
    );
};

export default Login 
