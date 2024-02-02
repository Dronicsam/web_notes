import api from "../../api.js";
import { useEffect, useState } from "react";
import { ChakraProvider, UnorderedList, ListItem } from "@chakra-ui/react"
import "../style/style.css"

export default function GetNotes() {
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
    return (
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
                    </ListItem>
                    ) )}
            </UnorderedList>
        </ChakraProvider>
        )
}
        