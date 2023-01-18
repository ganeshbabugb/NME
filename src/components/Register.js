import React from 'react';
import {
    Box,
    Button,
    Heading,
    FormControl,
    Input,
    FormLabel,
    Select,
    RadioGroup,
    Radio,
    Center,
    FormHelperText
} from '@chakra-ui/react';

import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../Constants/URL";

const Register = () => {

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [type, setType] = useState("")
    const [department, setDepartment] = useState("")
    const [course, setCourse] = useState("")
    const [whatsappNumber, setWhatsappNumber] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};
        if (!id) newErrors.id = "Register Number is required";
        if (!name) newErrors.name = "Name is required";
        if (!email) newErrors.email = "Email is required";
        if (!dob) newErrors.dob = "DOB is required";
        if (!type) newErrors.type = "Type is required";
        if (!department) newErrors.department = "Department is required";
        if (!course) newErrors.course = "Course is required";
        if (!whatsappNumber) newErrors.whatsappNumber = "Whatsapp number is required";
        if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const createUser = (e) => {
        e.preventDefault()
        if (validate()) {
            let student = {
                id,
                name,
                email,
                dob,
                department,
                type,
                course,
                whatsappNumber,
                phoneNumber
            }
            fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(student)
            }).then((res) => {
                console.log(res)
                navigate('/login');
                console.log("USER CREATED")
            }).catch((err) => {
                console.log(err.message)
            });
        }
        else {
            console.log("Enter login credientials")
        }
    }

    const aidedDept = [
        "B.A.History",
        "B.A.English Literature",
        "B.Sc.Mathematics",
        "B.Sc.Physics",
        "B.Sc.Chemistry",
        "B.Sc.Botany",
        "B.Sc.Zoology",
        "B.Sc.Computer Science",
        "B.Sc.Nutrition & Dietetics",
        "B.Com.Commerce"
    ]

    const unaidedDept = [
        "B.A.Tamil Literature",
        "B.A.English Literature ",
        "B.Sc.Mathematics",
        "B.Sc.Physics",
        "B.Sc.Biochemistry",
        "B.C.A",
        "B.Sc.Computer Science",
        "B.Sc.Information Technology",
        "B.Sc Computer Technology",
        "B.Sc.Computer Science with Data Analytics",
        "B.Sc.Costume Design and Fashion",
        "B.Com",
        "B.Com.Corporate Secretaryship",
        "B.Com.Cooperation",
        "B.Com.Commerce with Computer Applications",
        "B.Com.E-Commerce",
        "B.B.A.(CA)",
        "B.Com.Professional Accounting",
        "B.Com.with Accounting & Finance",
        "B.Com.(Banking & Insurance)",
        "B.Sc.Geography"
    ]

    const adidedCourse = [
        "English - Corporate English",
        "History - History for Competitive Examinations",
        "Mathematics - Mathematics for Data Science",
        "Physics - Physics in Everyday Life",
        "Chemistry - Water Management an Environmental Perspective",
        "Botany - Ornamental Horticulture",
        "Zoology - Wild Life Diversity and Conservation",
        "Nutrition And Dietetics - Basic Cookery",
        "Computer Science - Data Processing through Excel Lab",
        "Commerce - Fundamentals of Accounting"
    ]

    const unadidedCourse = [
        "Tamil - Pechukkalai",
        "English - Corporate English",
        "Mathematics - Mathematics for Data Science",
        "Physics - Physics in Everyday Life",
        "Computer Science - Data Processing through Excel Lab",
        "Computer Applications - Data Processing through Excel Lab",
        "Information Technology - Data Processing through Excel Lab",
        "Computer Technology - Data Processing through Excel Lab",
        "Computer Science with Data Analytics - Data Processing through Excel Lab",
        "Commerce - Fundamentals of Accounting",
        "Commerce [CA] - Occupational Health and Safety Measures",
        "Commerce [E-Commerce] - Brand Management",
        "Commerce [CS] - Modern Retail Techniques",
        "Commerce [PA] - Cyber Law",
        "Commerce [A&F] - Production Management",
        "Commerce [B&I] - Banking Practice",
        "Commerce [Cooperation] - Dynamics of Cooperation",
        "Business Administration [CA] - Soft Skill Development",
        "Biochemistry - Health & Hygiene",
        "Costume Design & Fashion - Fashion Concepts",
        "Geography - Climate Change and Global Warming"
    ]

    return (
        <>
            <Box
                borderWidth="1px"
                rounded="lg"
                boxShadow={'lg'}
                maxWidth={700}
                p={5}
                m="10px auto"
                as="form">
                <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
                    Online NME Registeration Form
                </Heading>

                <FormControl mr="2%">
                    <FormLabel fontWeight={'normal'} mt="2%">
                        Name :
                    </FormLabel>
                    <Input type='text' value={name} id='name' onChange={e => setName(e.target.value)} />
                    {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
                </FormControl>

                <FormControl mr="2%">
                    <FormLabel fontWeight={'normal'} mt="2%">
                        Register Number :
                    </FormLabel>
                    <Input type='text' value={id} id='id' onChange={e => setId(e.target.value)} />
                    {errors.id && <FormHelperText>{errors.id}</FormHelperText>}
                </FormControl>

                <FormControl mr="2%">
                    <FormLabel fontWeight={'normal'} mt="2%">
                        Email :
                    </FormLabel>
                    <Input type='email' value={email} id='email' onChange={e => setEmail(e.target.value)}></Input>
                    {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                </FormControl>

                <FormControl mr="2%">
                    <FormLabel fontWeight={'normal'} mt="2%">
                        DOB :
                    </FormLabel>
                    <Input type="text" value={dob} id='dob' onChange={e => setDob(e.target.value)}></Input>
                    {errors.dob && <FormHelperText>{errors.dob}</FormHelperText>}
                </FormControl>

                <Box my="2%">
                    <RadioGroup onChange={setType} value={type}>
                        <Center>
                            <Radio colorScheme='green' value='aided' >
                                Aided
                            </Radio>
                            <Radio colorScheme='green' value='unaided' mx={10}>
                                Unaided
                            </Radio>
                        </Center>
                    </RadioGroup>
                </Box>

                <FormControl mt="2%">
                    <FormLabel fontWeight={'normal'} mt="2%">
                        Department :
                    </FormLabel>
                    <Select
                        placeholder="Select option"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        value={department}
                        onChange={e => setDepartment(e.target.value)}>

                        {type === "aided" && aidedDept.map((item) => (
                            <option key={item}>{item}</option>
                        ))}

                        {type === "unaided" && unaidedDept.map((item) => (
                            <option key={item}>{item}</option>
                        ))}

                    </Select>
                    {errors.department && <FormHelperText>{errors.department}</FormHelperText>}
                </FormControl>

                <FormControl mt="2%">
                    <FormLabel fontWeight={'normal'} mt="2%">
                        Name of the course offered :
                    </FormLabel>
                    <Select
                        placeholder="Select option"
                        shadow="sm"
                        size="md"
                        w="full"
                        rounded="md"
                        value={course}
                        onChange={e => setCourse(e.target.value)}>

                        {type === "aided" && adidedCourse.map((item) => (
                            <option key={item}>{item}</option>
                        ))}

                        {type === "unaided" && unadidedCourse.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </Select>
                    {errors.course && <FormHelperText>{errors.course}</FormHelperText>}
                </FormControl>

                <FormControl mt="2%">
                    <FormLabel fontWeight={'normal'} mt="2%">
                        Phone Number :
                    </FormLabel>
                    <Input type='tel' id='phoneNumber' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}></Input>
                    {errors.phoneNumber && <FormHelperText>{errors.phoneNumber}</FormHelperText>}
                </FormControl>

                <FormControl mt="2%">
                    <FormLabel fontWeight={'normal'} mt="2%">
                        Whatsapp Number :
                    </FormLabel>
                    <Input type='text' id='whatsappNumber' value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} ></Input>
                    {errors.whatsappNumber && <FormHelperText>{errors.whatsappNumber}</FormHelperText>}
                </FormControl>

                <Center mt="2%">
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        onClick={createUser}>
                        SUBMIT
                    </Button>
                </Center>
            </Box>
        </>
    );
};

export default Register 
