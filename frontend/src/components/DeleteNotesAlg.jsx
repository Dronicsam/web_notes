import api from "../../api.js";
import { useEffect, useState } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { UnorderedList, ListItem, Button, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form"


export default function DeleteUserNotes() {
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
    function onSubmit() {
         return new Promise((resolve) => {
            setTimeout(() => {
                api.delete(`/items/delete_note/${btn_id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token 
                    }},
                    )
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
            <UnorderedList>
                {note.map((item) => (
                    <ListItem mr={"5rem"} padding={"1rem"} pt={"1rem"} minW={"200px"} maxW={"700px"}
                        key={item.user_id} border={"1px"} borderColor={"gray.300"} mb={"0.5rem"} rounded="md">
                        <br/>Название: {item.note_name}
                        <br/>Текст:
                        <br/>&emsp; {item.text}
                        <br/>Дата: {item.date}
                        <br/>Проверена? - {item.was_checked.toString()}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Button w={"20rem"} id={String(item.note_id)} mt={4} isLoading={isSubmitting}
                                onClick={handleClick} type={"submit"} _hover={{ bg: "red", color: "white"}}> Удалить заметку </Button>
                        </form>
                    </ListItem>
                    ) )}
            </UnorderedList>
        </ChakraProvider>
        )
}