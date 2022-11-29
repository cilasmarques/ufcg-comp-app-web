import { useAuth } from "../../context/authContext.jsx";

import {
  Title,
  MenuItemLink,
  MenuContainer,
} from "./style.component.js";

const Sidebar = () => {
  const { handleSignOut } = useAuth();

  return (
    <>
      <Title>Computação UFCG</Title>

      <MenuContainer>
        <MenuItemLink to={"/"}> Horas complementares </MenuItemLink>
        <MenuItemLink onClick={handleSignOut}> Sair </MenuItemLink>
      </MenuContainer>
    </>
  );
};

export default Sidebar;