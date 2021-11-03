import Container from './styles';

const MainLayout = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
