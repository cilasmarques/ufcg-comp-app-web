import { useAuth } from "../../context/authContext.jsx";

import {
  Title,
  Container,
  MenuItemLink,
  MenuContainer,
} from "./style.component.js";

const Sidebar = () => {
  const { handleSignOut } = useAuth();

  return (
    <Container>
      <Title>Computação UFCG</Title>

      <MenuContainer>
        <MenuItemLink to={"/"}> Horas complementares </MenuItemLink>
        <MenuItemLink onClick={handleSignOut}> Sair </MenuItemLink>
      </MenuContainer>
    </Container>
  );
};

export default Sidebar;