import { useEffect } from "react";

// COMPONENTS
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "../../components/Table/Table";

// CONTEXT
import { useActivities } from "../../context/activitiesContext";

// STYLE
import { Title } from "./style.component";
import { Grid, GridContent, GridSidebar } from "../../styles/global/Grid";
import { fetchActivities, fetchActivitiesCount } from "../../services/activityService";
import { useAuth } from "../../context/authContext";

export const Dashboard = () => {
  const { user } = useAuth();
  const { closedActivities, openedActivities, closedActivitiesPagination,
    openedActivitiesPagination, openedActivitiesCount, closedActivitiesCount,
    setOpenedActivitiesCount, setClosedActivitiesCount, setOpenedActivities, setClosedActivities 
  } = useActivities();

  useEffect(() => {
    const loadActivitiesData = async () => {
      const queryOpened = user.isAdmin ? { 'status': ["CREATED"] } : { 'status': ["ASSIGNED"] };
      const queryClosed = user.isAdmin ? { 'status': ["VALIDATED", "REJECTED", "ASSIGNED"] } : { 'status': ["VALIDATED", "REJECTED"] };

      if (queryOpened && queryClosed) {
        const openedActivities = await fetchActivities(
          queryOpened,
          openedActivitiesPagination.page,
          openedActivitiesPagination.size,
          openedActivitiesPagination.sortField,
          openedActivitiesPagination.sortOrder);

        const closedActivities = await fetchActivities(
          queryClosed,
          closedActivitiesPagination.page,
          closedActivitiesPagination.size,
          closedActivitiesPagination.sortField,
          closedActivitiesPagination.sortOrder);

        const openedActivitiesCount = await fetchActivitiesCount(queryOpened);
        const closedActivitiesCount = await fetchActivitiesCount(queryClosed);

        setOpenedActivities(openedActivities.data.activities);
        setClosedActivities(closedActivities.data.activities);
        setOpenedActivitiesCount(openedActivitiesCount.data.activities_count);
        setClosedActivitiesCount(closedActivitiesCount.data.activities_count);
      }
    }
    loadActivitiesData();
  }, [
    user, openedActivitiesPagination, closedActivitiesPagination,
    setOpenedActivities, setClosedActivities,
    setClosedActivitiesCount, setOpenedActivitiesCount
  ]);

  return (
    <Grid>
      <GridSidebar>
        <Sidebar />
      </GridSidebar>

      <GridContent>
        <Title>Horas complementares</Title>

        <Table variant="closed" activities={closedActivities} activitiesCount={closedActivitiesCount} />
        <Table variant="opened" activities={openedActivities} activitiesCount={openedActivitiesCount} />
      </GridContent>
    </Grid>
  )
}