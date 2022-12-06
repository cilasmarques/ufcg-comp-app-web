// Components
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "../../components/Table/Table";
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

        <Table variant="closed" />
        <Table variant="opened" />
      </GridContent>
    </Grid>
  )
}