import {createTheme} from '@mui/material'

export const theme = createTheme({
    palette: {
        info: {
            main: '#009688'
        },
        secondary: {
            main: '#fff'
        }
    },
    components: {
        MuiButtonGroup: {
            styleOverrides: {
                grouped: {
                    '&:not(:last-of-type)': {
                        borderRight: 0
                    }
                }
            }
        }
    }
})