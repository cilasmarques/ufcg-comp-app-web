import { useAuth } from "../../context/AuthContext.jsx";

import {
  Title,
  Container,
  MenuItemLink,
  MenuContainer,
} from "./style.sideBar";

const Sidebar = () => {
  const { user, handleSignOut } = useAuth();

  return (
    <Container>
      <Title>Computação UFCG</Title>

      <MenuContainer>
        <MenuItemLink to={"/"}> Atividades complementares </MenuItemLink>
        {user?.isAdmin &&
          <>
            <MenuItemLink to={"/verificarDocumentos"}> Verificação de documentos </MenuItemLink>
            <MenuItemLink to={"/cadastrarUsuarios"}> Cadastro de Usuários </MenuItemLink>
          </>
        }
        <MenuItemLink onClick={handleSignOut}> Sair </MenuItemLink>
      </MenuContainer>
    </Container>
  );
};

export default Sidebar;