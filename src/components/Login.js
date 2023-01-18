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

const Login = () => {

    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [invalidCredential, setInvalidCredential] = useState(false);

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
        else {
            setInvalidCredential(true);
            setTimeout(() => setInvalidCredential(false), 2000)
        }
        setErrors(newErrors);
        (Object.keys(newErrors).length === 0) ? result = true : result = false
        return result
    }

    return (
        <>

            {invalidCredential
                ? (
                    <Alert status='error'>
                        <AlertIcon />
                        INVALID LOGIN CREDENTIAL!
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
                            onClick={validate}>
                            SUBMIT
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </>
    );
};

export default Login
