import styled from "styled-components";

export type ButtonVariant = 'primary'|'secondary'|'danger'|'success'|'neutral';

interface ButtonContainerProps{
    variant: ButtonVariant
}

// const buttonVariants = {
//     primary:  'purple',
//     secondary:'orange',
//     success:  'green',
//     danger:   'red'
// }

export const ButtonContainer = styled.button<ButtonContainerProps>`
width: 100px;
height: 40px;
background-color: ${props => props.theme["green-500"]};
color: ${props => props.theme.white};
border-radius: 4px;
border: 0;
margin:8px;
`
/* ${props =>{
    return css`background-color:${buttonVariants[props.variant]}`
} }
` */


