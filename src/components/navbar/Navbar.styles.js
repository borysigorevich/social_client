import {NavLink} from 'react-router-dom'

const isActive = ({isActive}) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: isActive ? 'underline' : 'none',
})

export const CustomNavLink = ({to, children}) => (
    <NavLink style={isActive} to={to}>{children}</NavLink>
)