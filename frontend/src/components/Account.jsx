// Подключение основных модулей

import { useState, useEffect } from "react";

import { ChakraProvider } from '@chakra-ui/react'

import { Text, Center, Box, Stack, Spacer } from "@chakra-ui/react"

import { Link } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Menu from "./Menu.jsx"

import theme from "./Font.jsx"

import GetUserNotes from "./Get_user_notes.jsx"
import GetCheckedUserNotes from "./Get_user_checked_notes.jsx";
import GetUncheckedUserNotes from "./Get_user_unchecked_notes.jsx";

import api from "../../api.js"

export default function Account() {
    const [username, setUsername] = useState([]);
    const [all, setAll] = useState([])
    const [show_checked, setShowChecked] = useState(false)
    const [show_unchecked, setShowUnchecked] = useState(false)
    
    
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
            (res) =>  setUsername(res.data)
            )
    }
    return (
        <ChakraProvider theme={theme}>
            <Box display={"flexbox"}>

                <Menu />

                <Link _hover={{ textDecoration: "none" }} href={"/note"}>
                    <Button mt={"1rem"} mr={"1rem"} float={"right"}>Новая заметка</Button>
                </Link>
                <Button onClick={()=>{
                    setShowChecked(false);
                    setShowUnchecked(false);
                    setAll(true)
                }} mt={"1rem"} mr={"1rem"} float={"right"}>Все заметки</Button>
                <Button onClick={()=>{
                    setShowChecked(true);
                    setShowUnchecked(false)
                    setAll(false)
                }} mt={"1rem"} mr={"1rem"} float={"right"}>Проверенные заметки</Button>
                <Button onClick={()=>{
                    setShowUnchecked(true)
                    setShowChecked(false)
                    setAll(false)
                }} mt={"1rem"} mr={"1rem"} float={"right"}>Непроверенные заметки</Button>
            </Box>
            <Center>
                <Stack>
                    <Text mb={0} fontSize={"4xl"}>
                        {username.second_name} {username.first_name} {username.third_name}
                    </Text>
                    <Center>
                        <Text mt={0} fontsize={"xs"}>
                            {username.username}
                        </Text>
                    </Center>
                </Stack>
            </Center>
            <Box ml={"4rem"} mt={"2rem"}>
                <Box hidden={!all} mt={"1rem"} display={"flex"} flex-direction={"row"}>
                    <GetUserNotes/>
                </Box>
                <Box hidden={!show_checked} mt={"1rem"} display={"flex"} flex-direction={"row"}>
                    <GetCheckedUserNotes/>
                </Box>
                <Box hidden={!show_unchecked} mt={"1rem"} display={"flex"} flex-direction={"row"}>
                    <GetUncheckedUserNotes />
                </Box>
            </Box>
            <Spacer mt={"5rem"}></Spacer>
        </ChakraProvider>
        )
}