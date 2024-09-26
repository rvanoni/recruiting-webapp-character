import styled from 'styled-components'

const Button = styled.button`
  background-color: #333;
  color: white;
  padding: ${({ small }) => (small ? '5px 10px' : '10px 20px')};
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;

  &:hover {
    background-color: #555;
  }
`

const PrimaryButton = styled(Button)`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`

const SecondaryButton = styled(Button)`
  background-color: #6b7280;
  &:hover {
    background-color: #4f5d75;
  }
`

const DangerButton = styled(Button)`
  background-color: #d35400;
  &:hover {
    background-color: #b94a48;
  }
`

export default Button
export { PrimaryButton, SecondaryButton, DangerButton }
