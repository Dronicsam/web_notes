// Основные модули

import { ChakraProvider } from '@chakra-ui/react'

import { Text, Center } from "@chakra-ui/react"

import Menu from "./Menu.jsx"

import theme from "./Font.jsx"

import Hookform from "./Hookform.jsx";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      
      <Menu />

      <Center mt="20px">
        <Text fontSize={"xl"} mb={"1rem"}>
          Новая заметка
        </Text>
      </Center>
      <Center>
        <Hookform />
      </Center>
    </ChakraProvider>
    )
}