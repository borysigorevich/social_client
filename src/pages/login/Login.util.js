import {forwardRef} from 'react'
import {Alert} from '@mui/material'

export const LoginAlert = forwardRef((props, ref) => (
    <Alert variant={'filled'} ref={ref} elevation={4} {...props}/>
))