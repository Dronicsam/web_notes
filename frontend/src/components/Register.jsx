// Основные модули

import {ChakraProvider} from '@chakra-ui/react'

import { Center, Stack } from "@chakra-ui/react"

import RegisterHook from "./RegisterHook.jsx";

import Menu from "./Menu.jsx"

import theme from "./Font.jsx"

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            
            <Menu />
            
            <Center marginTop={"2rem"}>
                <Stack>
                    <RegisterHook />
                </Stack>
            </Center>
        </ChakraProvider>
        )
}
