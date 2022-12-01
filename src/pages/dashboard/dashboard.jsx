// Components
import Sidebar from "../../components/Sidebar/Sidebar";
import GeneralTable from "../../components/Table/GeneralTable";
import { Grid, GridContent, GridSidebar } from "../../styles/global/Grid";
import { Title } from "./style.component";

export const Dashboard = () => {
  return (
    <Grid>
      <GridSidebar>
        <Sidebar />
      </GridSidebar>

      <GridContent>
        <Title>Horas complementares</Title>

        <GeneralTable variant="closed" />
        <GeneralTable variant="opened" />
      </GridContent>
    </Grid>
  )
}