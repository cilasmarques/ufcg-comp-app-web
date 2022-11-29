// Components
import Sidebar from "../../components/Sidebar/Sidebar";
import GeneralTable from "../../components/GeneralTable/GeneralTable";
import { Grid, GridContent, GridSidebar } from "../../styles/global/Grid";

export const Dashboard = () => {
  return (
    <Grid>
      <GridSidebar>
        <Sidebar />
      </GridSidebar>

      <GridContent>
        <h1>Horas complementares</h1>
        <GeneralTable variant="signed" />
        <GeneralTable variant="unsigned" />
      </GridContent>
    </Grid>
  )
}