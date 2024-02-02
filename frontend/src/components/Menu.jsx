import { ChakraProvider } from '@chakra-ui/react'

import { Menu, MenuButton, MenuList, MenuItem, Link, IconButton } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons";
import api from "../../api.js"
import { useState, useEffect } from "react"

export default function Menu() {
    let UserIn = localStorage.getItem("access_token")
    var label_text;
    var ref_link;
    var btn_clr;
    if (!UserIn) {
        ref_link = "/login"
        label_text = "Войти"
    }else {
        ref_link = "/logout"
        label_text = "Выйти"
    }
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
        <ChakraProvider>
            <Menu>
                <MenuButton mt={"1rem"} ml={"1rem"} as={ IconButton } icon={<HamburgerIcon />} variant={"outline"}></MenuButton>
                <MenuList>
                    <Link href={"/"} _hover={{ textDecoration: "none" }}>
                        <MenuItem>Все заметки</MenuItem>
                    </Link>
                    <Link href={"/users"} _hover ={{ textDecoration: "none" }}>
                        <MenuItem>Все пользователи</MenuItem>
                    </Link>
                    <Link hidden={!UserIn} href={"/note"} _hover={{ textDecoration: "none" }}>
                        <MenuItem>Написать заметку</MenuItem>
                    </Link>
                    <Link hidden={!UserIn} href={"/account"} _hover ={{ textDecoration: "none" }}>
                        <MenuItem>Учётная запись</MenuItem>
                    </Link>
                    <Link hidden={!isAdmin.isAdmin} href={"/rev"} _hover ={{ textDecoration: "none" }}>
                        <MenuItem>Ревизия заметок</MenuItem>
                    </Link>
                    <Link href={ref_link} _hover={{ textDecoration: "none" }}>
                        <MenuItem>{label_text}</MenuItem>
                    </Link>
                </MenuList>
            </Menu>
        </ChakraProvider>
    )
}