import styled from 'styled-components';
import GlobalStyle from './styles/globalstyles';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  font-size: 1.5rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: tomato;
  color: white;
  margin: 20px;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <H1>Heller</H1>
        <Button onClick={() => alert('Check- IN')}>Check In</Button>
        <Button onClick={() => alert('Check Out')}>Check Out</Button>
      </StyledApp>
    </>
  );
}

export default App;
