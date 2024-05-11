import styled from "styled-components";

interface ButtonInterface {
  color?: string,
  bgColor?: string,
  text: string,
  onClick?: any
}

const Container = styled.div`
  cursor: pointer;
  padding: .5rem 2rem;
  border-radius: .5rem;
  font-weight: lighter;
`

const Index = ({
                 color, bgColor, text, onClick
               }: ButtonInterface) => {
  return <Container style={{
    color: color || 'white',
    backgroundColor: bgColor || '#666666'
  }}
  onClick={(e) => onClick && onClick(e)}>
    {text}
  </Container>
}

export default Index
