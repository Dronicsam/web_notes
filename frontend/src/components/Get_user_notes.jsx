import api from "../../api.js";
import { useEffect, useState } from "react"
import {Box, ChakraProvider} from "@chakra-ui/react"
import { UnorderedList, ListItem, Button, Input, Link, Text } from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from "@chakra-ui/react"
import { useForm } from "react-hook-form"


export default function GetUserNotes() {
    const [note, setNotes] = useState([]);
    let token = localStorage.getItem("access_token")
    
    useEffect(() => {
        getNotes();
        }, []);
    
    const getNotes = (props="ASC") => {
        api.get("/users/me/items/", {
            headers: {
                'Authorization': 'Bearer ' + token 
            }}, )
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
                api.put(`/items/update_note`, {
                    "note_id": btn_id,
                    "new_text": String(data[btn_id])
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
        <ChakraProvider>
            <Box>
                <Text fontSize={"2xl"} mr={"5rem"}>Все заметки</Text>
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
                                    <Input
                                        id={btn_id}
                                        placeholder={"Новый текст заметки:"}
                                        {...register(item.note_id, {
                                            minLength: { value: 2, message: 'Минимальная длина заметки - 2' },
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.name && errors.name.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button w={"20rem"} id={item.note_id} mt={4} isLoading={isSubmitting}
                                    onClick={handleClick} type={"submit"} _hover={{ bg: "orange", color: "white"}}> Обновить заметку </Button>
                            </form>
                            <Link href={"/delete_notes"}>
                                <Button w={"20rem"} id={String(item.note_id).slice(0, 10)} mt={4}
                                    type={"submit"} _hover={{ bg: "red", color: "white"}}> Удалить заметку </Button>
                            </Link>
                        </ListItem>
                        ) )}
                </UnorderedList>
                <Text hidden={note.length !== 0}>Нет заметок</Text>
            </Box>
        </ChakraProvider>
        )
}