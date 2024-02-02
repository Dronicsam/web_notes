import { ChakraProvider, Text } from "@chakra-ui/react";


export default function Error() {
    return (
        <ChakraProvider>
            <Text>
                Данной страницы не существует
            </Text>
        </ChakraProvider>
    )
}