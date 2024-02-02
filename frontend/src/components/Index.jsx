// Подключение основных модулей

import {ChakraProvider, Spacer} from '@chakra-ui/react'

import { Text, Center, Box } from "@chakra-ui/react"

import { Link } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Menu from "./Menu.jsx"

import theme from "./Font.jsx"

import GetNotes from "./Get_notes.jsx"

import { useState, useEffect } from "react";

import api from "../../api.js"

let UserIn = localStorage.getItem("access_token")
let link;
let label;
if (UserIn){
    link = "/note"
    label = "Новая заметка"
}else {
    link = "/login"
    label = "Войти"
}

export default function App() {
    const [isAdmin, setStatus] = useState([]);

    let token = localStorage.getItem("access_token")

    useEffect(() => {
        getUsername();
        }, []);
    const getUsername = (props="ASC") => {
        api.get("/users/me", {
            headers: {
                'Authorization': 'Bearer ' + token 
            }}, )
        .then(
            (res) =>  setStatus(res.data)
            )
    }
    return (
        <ChakraProvider theme={theme}>
            <Box display={"flexbox"}>
                
                <Menu />
                
                <Link _hover={{ textDecoration: "none" }} href={"/rev"}>
                    <Button hidden={!isAdmin.isAdmin} mt={"1rem"} mr={"1rem"} float={"right"}>Ревизия заметок</Button>
                </Link>
                <Link _hover={{ textDecoration: "none" }} href={link}>
                    <Button mt={"1rem"} mr={"1rem"} float={"right"}>{label}</Button>
                </Link>
            </Box>
            <Center>
                <Text fontSize={"4xl"}>
                    Главная
                </Text>
            </Center>
            
            <Box ml={"4rem"} mt={"2rem"}>
                <Text fontSize={"2xl"}>Все заметки</Text>
                <Box mt={"1rem"} display={"flex"} flex-direction={"row"}>
                    
                    <GetNotes display={"flex"} />
                
                </Box>
            </Box>
            <Spacer mt={"5rem"}></Spacer>
        </ChakraProvider>
        )
}