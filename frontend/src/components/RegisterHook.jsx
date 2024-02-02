import { useForm } from 'react-hook-form'
import { useState } from 'react';

import { Input, Box } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react"
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'

import { PhoneInput } from 'react-international-phone';

import api from "../../api.js"

import libphonenumber from 'google-libphonenumber';

import {v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcryptjs'

export default function RegisterHook() {
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
                
                const hashed_password = bcrypt.hashSync(data.password, 13)
                const user_uuid = uuidv4()
                api.post("/register_complete", {
                    "user_id": user_uuid,
                    "username": data.username,
                    "hashed_pass": String(hashed_password),
                    "name": data.name,
                    "second_name": data.second_name,
                    "third_name": data.third_name,
                    "phonenumber": String(phone),
                    "position": data.position,
                    "isAdmin": "False"
                }).then(function (response) {
                    window.alert("Вы успешно зарегистрованы! Теперь вы можете войти в сервис.");
                    window.location.href='/login';
                    
                }).catch(function (error) {
                    console.log(error["message"])
                    if ( String(error["message"]).includes("409") ){
                        alert("Пользователь уже существует")
                    }
                });
                resolve();
            }, 1000)
        })
    }

    const [phone, setPhone] = useState('');
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const isPhoneValid = (phone) => {
        try {
            return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
        } catch (error) {
            return false;
        }
    };
    const isValid = isPhoneValid(phone);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <FormLabel>Логин</FormLabel>
                <Input
                    isRequired={true}
                    id={"username"}
                    placeholder={"Логин"}
                    {...register('username', {
                        required: 'Это поле обязательно!',
                        minLength: { value: 2, message: 'Минимальная длина логина - 2' },
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
                        minLength: { value: 6, message: 'Минимальная величина пароля - 6' },
                    })}
                />
                <FormHelperText>Минимальная длина пароля - 6</FormHelperText>
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormLabel mt={"0.5rem"}>Фамилия</FormLabel>
                <Input
                    isRequired={true}
                    id={"second_name"}
                    placeholder={"Петров"}
                    {...register('second_name', {
                        required: 'Это поле обязательно!',
                        minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormLabel mt={"0.5rem"}>Имя</FormLabel>
                <Input
                    isRequired={true}
                    id='name'
                    placeholder='Петр'
                    {...register('name', {
                        required: 'Это поле обязательно!',
                        minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormLabel mt={"0.5rem"}>Отчество</FormLabel>
                <Input
                    isRequired={true}
                    id={"third_name"}
                    placeholder={"Петрович"}
                    {...register('third_name', {
                        minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormLabel mt={"0.5rem"}>Номер телефона</FormLabel>
                <Box m={0} borderWidth='1px' borderRadius='lg' height={"min"} display={"flex"}>
                    <PhoneInput
                        defaultCountry="ru"
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                    />
                </Box>
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
                <FormLabel mt={"0.5rem"}>Должность</FormLabel>
                <Input
                    isRequired={true}
                    id={"spec"}
                    placeholder={"Инженер"}
                    {...register('position', {
                        required: 'Это поле обязательно!',
                        minLength: { value: 2, message: 'Минимальная длина слова - 2' },
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>
            <Button isDisabled={!isValid} mt={4} isLoading={isSubmitting} type={"submit"} _hover={{ bg: "green", color: "white"}}> Зарегистрироваться </Button>
        </form>
        )
}