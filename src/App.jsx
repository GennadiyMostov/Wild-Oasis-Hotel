import styled from 'styled-components';
import GlobalStyle from './styles/globalstyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
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
        <Input />
      </StyledApp>
    </>
  );
}

export default App;
