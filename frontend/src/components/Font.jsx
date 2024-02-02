import { extendTheme } from '@chakra-ui/react'
import '@fontsource/open-sans'
import '@fontsource/raleway'

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: {
      body: {
        w: "device-width",
        h: "fit-content",
      }
    }
  }
})

export default theme