import { useEffect } from "react";

// COMPONENTS
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "../../components/Table/Table";

// CONTEXT
import { useActivities } from "../../context/activitiesContext";

// STYLE
import { Title } from "./style.component";
import { Grid, GridContent, GridSidebar } from "../../styles/global/Grid";
import { getActivities, getActivitiesCount } from "../../services/activityService";
import { useAuth } from "../../context/authContext";

export const Dashboard = () => {
  const { user } = useAuth();
  const { closedActivities, openedActivities, closedActivitiesPagination, openedActivitiesPagination, setOpenedActivities, setClosedActivities } = useActivities();

  useEffect(() => {
    const fetchAllActivities = async () => {
      const queryOpened = user.isAdmin ? { 'status': ["CREATED"] } : { 'status': ["ASSIGNED"] };
      const queryClosed = user.isAdmin ? { 'status': ["VALIDATED", "REJECTED", "ASSIGNED"] } : { 'status': ["VALIDATED", "REJECTED"] };

      if (queryOpened && queryClosed) {
        const openedActivities = await getActivities(
          queryOpened,
          openedActivitiesPagination.page,
          openedActivitiesPagination.size,
          openedActivitiesPagination.sortField,
          openedActivitiesPagination.sortOrder);

        const closedActivities = await getActivities(
          queryClosed,
          closedActivitiesPagination.page,
          closedActivitiesPagination.size,
          closedActivitiesPagination.sortField,
          closedActivitiesPagination.sortOrder);

        setOpenedActivities(openedActivities.data.activities);
        setClosedActivities(closedActivities.data.activities);
      }

      getActivitiesCount()
        .then(res => {
          console.log(res.data.activities_count)
        });
    }
    fetchAllActivities();
  }, [user, openedActivitiesPagination, closedActivitiesPagination, setOpenedActivities, setClosedActivities]);

  return (
    <Grid>
      <GridSidebar>
        <Sidebar />
      </GridSidebar>

      <GridContent>
        <Title>Horas complementares</Title>

        <Table variant="closed" activities={closedActivities} />
        <Table variant="opened" activities={openedActivities} />
      </GridContent>
    </Grid>
  )
}