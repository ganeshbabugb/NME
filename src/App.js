import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login'
import Admin from './components/Admin';

const App = () => {
    return (
        <>
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Register />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/admin' element={<Admin />}></Route>
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </>
    )
}

export default App
