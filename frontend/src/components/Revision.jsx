// Подключение основных модулей

import {ChakraProvider, Spacer} from '@chakra-ui/react'

import { Text, Center, Box } from "@chakra-ui/react"

import { Link, Stack, Input, Button } from "@chakra-ui/react";
import { UnorderedList, ListItem } from "@chakra-ui/react";
import Menu from "./Menu.jsx"
import { FormControl, FormErrorMessage } from "@chakra-ui/react"
import { Checkbox } from "@chakra-ui/react";

import theme from "./Font.jsx"

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"

import api from "../../api.js"

export default function Revision() {
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
    let text_value;
    if (isAdmin.isAdmin){
        text_value = "Ревизия заметок"
    }else {
        text_value = "Вы не имеете доступ к этой функции"
    }
    const [note, setNotes] = useState([]);
    useEffect(() => {
        getNotes();
        }, []);
    const getNotes = (props="ASC") => {
        api.get("/get_notes")
        .then(
            (res) =>  setNotes(res.data)
            )
    }
    let btn_id;
    const handleClick = event => {
        btn_id = event.currentTarget.id;
    };
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const str_data = JSON.stringify(values, null)
                const data = JSON.parse(str_data)
                api.put(`/items/rev_note`, {
                    "note_id": btn_id,
                    "was_checked": String(data[btn_id])
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },}, )
                .then(
                    function (response) {
                        console.log(response)
                        location.reload()
                    }
                    ).catch(function (error) {
                        console.log(error)
                    });
                resolve();
                }, 1000)
        })
    }
    return (
        <ChakraProvider theme={theme}>
            <Menu />
            <Center>
                <Stack>
                    <Text fontSize={"4xl"}>
                        {text_value}
                    </Text>
                    <Link hidden={isAdmin.isAdmin} href={"/"}>
                        Вернуться на главную
                    </Link>
                </Stack>
            </Center>

            <Box hidden={!isAdmin.isAdmin} ml={"4rem"} mt={"2rem"}>
                <Text fontSize={"2xl"}>Все заметки</Text>
                <Box mt={"1rem"} display={"flex"} flex-direction={"row"}>

                    <ChakraProvider>
                        <UnorderedList>
                            {note.map((item) => (
                                <ListItem mr={"5rem"} padding={"1rem"} pt={"1rem"} minW={"200px"} maxW={"700px"}
                                    key={item.user_id} border={"1px"} borderColor={"gray.300"} mb={"0.5rem"} rounded="md">
                                    Автор: {item.author}
                                    <br/>Название: {item.note_name}
                                    <br/>Текст:
                                    <br/>&emsp; {item.text}
                                    <br/>Дата: {item.date}
                                    <br/>Проверена? - {item.was_checked.toString()}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <FormControl>
                                            <Checkbox
                                                id={btn_id}
                                                {...register(item.note_id, {
                                                    minLength: { value: 2, message: 'Минимальная длина заметки - 2' },
                                                })}
                                                >Проверена</Checkbox>
                                            <FormErrorMessage>
                                                {errors.name && errors.name.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <Button w={"20rem"} id={item.note_id} mt={4} isLoading={isSubmitting}
                                            onClick={handleClick} type={"submit"} _hover={{ bg: "green", color: "white"}}> Обновить состояние проверки </Button>
                                    </form>
                                </ListItem>
                                ) )}
                        </UnorderedList>
                    </ChakraProvider>

                </Box>
            </Box>
            <Spacer mt={"5rem"}></Spacer>
        </ChakraProvider>
        )
}