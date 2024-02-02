import api from "../../api.js";
import { useEffect, useState } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { UnorderedList, ListItem, Button, Input, Link, Text, Box } from "@chakra-ui/react";
import { FormControl, FormErrorMessage } from "@chakra-ui/react"
import { useForm } from "react-hook-form"


export default function GetCheckedUserNotes() {
    const [note, setNotes] = useState([]);
    const token = localStorage.getItem("access_token")

    useEffect(() => {
        getNotes();
        }, []);

    const getNotes = (props="ASC") => {
        api.get(`/users/me/items?type_of_notes=${1}`,  {
            headers: {
                'Authorization': 'Bearer ' + token 
            }}, )
        .then(
            (res) =>  {
                setNotes(res.data)
            }
            )
        .catch((error) => {
            console.log(error)
            console.log(token)
        })
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
    let new_note = []
    for (let key in note){
        console.log(note[key])
        if (note[key].was_checked){
            new_note.push(note[key])
        }
    }
    return (
        <ChakraProvider>
            <Box>
                <Text fontSize={"2xl"} mr={"5rem"}>Проверенные заметки</Text>
                <UnorderedList>
                    {new_note.map((item) => (
                        <ListItem mr={"5rem"} padding={"1rem"} pt={"1rem"} minW={"200px"} maxW={"700px"}
                            key={item.user_id} border={"1px"} borderColor={"gray.300"} mb={"0.5rem"} rounded="md">
                            Автор: {item.author}
                            <br/>Название: {item.note_name}
                            <br/>Текст:
                            <br/>&emsp; {item.text}
                            <br/>Дата: {item.date}
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
            </Box>
            <Text fontSize={"ml"} hidden={note.length !== 0}>Проверенных заметок нет</Text>
        </ChakraProvider>
        )
}