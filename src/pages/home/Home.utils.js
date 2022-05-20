import {forwardRef} from 'react'
import {Box} from '@mui/material'
import {CustomCard} from "./Home.styles";

export const TransitionComponent = forwardRef((props, ref) => (
    <Box ref={ref}><CustomCard {...props}/></Box>
))