import {styled} from '@mui/material/styles'
import {Alert, Box} from '@mui/material'
import {forwardRef} from "react";

export const CustomBox = styled(Box)`
  position: relative;
  top: -100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 115px);
`

export const CustomAlert = forwardRef((props, ref) => {
    return <Alert elevation={6} ref={ref} variant={'filled'} {...props}/>
})