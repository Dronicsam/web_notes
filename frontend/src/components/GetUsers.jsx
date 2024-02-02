import api from "../../api.js";
import { useEffect, useState } from "react";
import { ChakraProvider, UnorderedList, ListItem, Link, Box, Button } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import "../style/style.css"
export default function GetUsers() {
    const [user, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
        }, []);
    const getUsers = (props="ASC") => {
        api.get("/get_users")
        .then(
            (res) =>  setUsers(res.data)
            )
    }
    const theme = extendTheme({
        components: {
            Box: {
                baseStyle: {
                    display: "none"
                }
            },
        },
    })
    window.onload = function () {
        user.map((item) => (
            document.getElementById(String(item.user_id).slice(0, 10)).style.display = "none"
        ))
    };
    return (
        <ChakraProvider theme={theme}>
            <UnorderedList>
                {user.map((item) => (
                    <ListItem mr={"5rem"} padding={"1rem"} pt={"1rem"} minW={"200px"} maxW={"700px"}
                        key={item.user_id} border={"1px"} borderColor={"gray.300"} mb={"0.5rem"} rounded="md">
                        <Button id={String(item.user_id).slice(10, 20)} onClick={() => {
                            const box = document.getElementById(String(item.user_id).slice(0, 10));
                            const btn = document.getElementById(String(item.user_id).slice(10, 20))
                            if (box.style.display !== 'none') {
                                btn.textContent = "Показать больше";
                                box.style.display = 'none';
                            } else if (box.style.display === "none") {
                                btn.textContent = 'Скрыть';
                                box.style.display = 'block';
                            }
                        }}>Показать больше</Button>
                        <br/>Фамилия: {item.second_name}
                        <br/>Имя: {item.name}
                        <br/>Отчество: {item.third_name}
                        <div style={{display: "none"}} id={String(item.user_id).slice(0, 10)}>
                            Аккаунт: {item.username}
                            <Link href={item.phonenumber}>
                                <br/>Телефон: {String(item.phonenumber).slice(4)}
                            </Link>
                            <br/>Должность: {item.position}
                        </div>
                    </ListItem>
                    ) )}
            </UnorderedList>
        </ChakraProvider>
        )
}
        