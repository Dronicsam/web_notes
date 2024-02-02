// Основные модули

import {ChakraProvider, FormControl, FormErrorMessage, FormLabel} from '@chakra-ui/react'

import { Center } from "@chakra-ui/react"

import { Input } from '@chakra-ui/react'
import { Button, Link } from "@chakra-ui/react"

import Menu from "./Menu.jsx"

import theme from "./Font.jsx"
import api from "../../api.js"
import {useForm} from "react-hook-form";

export default function App() {
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
                api.post("/token", {
                    "username": data.username,
                    "password": data.password
                },{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
                    localStorage.setItem('access_token', response.data["access_token"])
                    window.location.href='/';
                }).catch(function (error) {
                    console.log(error);
                    let message = String(error);
                    if (String(error).includes("401")) {
                        message = "Вход не выполнен. Данные не верны"
                    }else {
                        message = "Произошла ошибка"
                    }
                    
                    alert(message)
                    
                });
                resolve();
                }, 1000)
        })
    }
    return (
        <ChakraProvider theme={theme}>
            
            <Menu />
            
            <Center marginTop={"5rem"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormLabel>Логин</FormLabel>
                        <Input
                            isRequired={true}
                            id={"username"}
                            placeholder={"Логин"}
                            {...register('username', {
                                required: 'Это поле обязательно!',
                                minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                        <FormLabel mt={"0.5rem"}>Пароль</FormLabel>
                        <Input
                            isRequired={true}
                            id={"password"}
                            placeholder={"Пароль"}
                            {...register('password', {
                                required: 'Это поле обязательно!',
                                minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button mt={4} isLoading={isSubmitting} type={"submit"} _hover={{ bg: "green", color: "white"}}> Войти </Button>
                </form>
            </Center>
            <Center mt={"1rem"}>
                <Link href={"/register"}>
                    Нет учётной записи?
                </Link>
            </Center>
        </ChakraProvider>
        )
}