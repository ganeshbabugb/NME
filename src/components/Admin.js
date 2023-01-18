import { AlertIcon, Alert, Button, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Td,
} from "@chakra-ui/react";

import { API_URL } from "../Constants/URL";

const Admin = () => {

    const [data, setData] = useState([]);
    const [userLogin, setUserLogin] = useState(true);
    const usenavigate = useNavigate();

    const getData = () => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((resp) => setData(resp))
            .catch((err) => console.log('Login Failed due to :' + err.message));
    }

    useEffect(() => {
        let user = sessionStorage.getItem('user')
        if (user !== "ADMIN") usenavigate('/login')
        getData()
        setTimeout(() => setUserLogin(false), 2000)
    }, [usenavigate]);

    return (
        <>
            {userLogin
                ? (
                    <Alert status='success'>
                        <AlertIcon />
                        LOGIN SUCCESS!
                    </Alert>
                ) : null
            }

            <TableContainer>
                <Table
                    variant="striped"
                    size="md"
                    maxWidth="60%"
                    mx="auto"
                >
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>DOB</Th>
                            <Th>Email</Th>
                            <Th>type</Th>
                            <Th>Department</Th>
                            <Th>Course Selected</Th>
                            <Th>Whatsapp Number</Th>
                            <Th>Phone Number</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {data.map((item) => (
                            <Tr key={item.id}>
                                <Td>{item.id}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.dob}</Td>
                                <Td>{item.email}</Td>
                                <Td>{item.type}</Td>
                                <Td>{item.department}</Td>
                                <Td>{item.course}</Td>
                                <Td>{item.whatsappNumber}</Td>
                                <Td>{item.phoneNumber}</Td>
                            </Tr>
                        ))}

                    </Tbody>
                </Table>

                <Center my={4}>
                    <Button bg={'blue.400'} color={'white'} onClick={() => usenavigate('/login')}>
                        LOG OUT
                    </Button>
                </Center>

            </TableContainer>
        </>
    );
};

export default Admin
