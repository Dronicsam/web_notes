// Подключение основных модулей

import { useState, useEffect } from "react";

import { ChakraProvider } from '@chakra-ui/react'

import { Text, Center, Box, Stack, Spacer } from "@chakra-ui/react"

import { Link } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Menu from "./Menu.jsx"

import theme from "./Font.jsx"

import DeleteUserNotes from "./DeleteNotesAlg.jsx";

import api from "../../api.js"


export default function DeleteNotes() {
    const [username, setUsername] = useState([]);

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
                <Text fontSize={"2xl"}>Удаление заметок</Text>
                <Box mt={"1rem"} display={"flex"} flex-direction={"row"}>
                    <DeleteUserNotes display={"flex"} />
                </Box>
            </Box>
            <Spacer mt={"5rem"}></Spacer>
        </ChakraProvider>
        )
}