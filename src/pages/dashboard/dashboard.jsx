import { useEffect } from "react";

// COMPONENTS
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "../../components/Table/Table";

// CONTEXT
import { useActivities } from "../../context/activitiesContext";

// STYLE
import { Title, Head } from "./style.component";
import { Grid, GridContent, GridSidebar } from "../../styles/global/Grid";
import { fetchActivities, fetchActivitiesCount } from "../../services/activityService";
import { useAuth } from "../../context/authContext";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const Dashboard = () => {
  const { user } = useAuth();
  const { closedActivities, openedActivities, closedActivitiesPagination,
    openedActivitiesPagination, openedActivitiesCount, closedActivitiesCount,
    setOpenedActivitiesCount, setClosedActivitiesCount, setOpenedActivities, setClosedActivities
  } = useActivities();

  const [variant, setVariant] = useState('opened');

  useEffect(() => {
    const loadActivitiesData = async () => {
      const queryOpened = user.isAdmin ? { 'status': ["CREATED"] } : { 'status': ["ASSIGNED"] };

      if (queryOpened) {
        const openedActivities = await fetchActivities(
          queryOpened,
          openedActivitiesPagination.page,
          openedActivitiesPagination.size,
          openedActivitiesPagination.sortField,
          openedActivitiesPagination.sortOrder);

        const openedActivitiesCount = await fetchActivitiesCount(queryOpened);
        setOpenedActivities(openedActivities.data.activities);
        setOpenedActivitiesCount(openedActivitiesCount.data.activities_count);
      }
    }
    loadActivitiesData();
  }, [user, openedActivitiesPagination, setOpenedActivities, setOpenedActivitiesCount]);

  useEffect(() => {
    const loadActivitiesData = async () => {
      const queryClosed = user.isAdmin ? { 'status': ["VALIDATED", "REJECTED", "ASSIGNED"] } : { 'status': ["VALIDATED", "REJECTED"] };

      if (queryClosed) {
        const closedActivities = await fetchActivities(
          queryClosed,
          closedActivitiesPagination.page,
          closedActivitiesPagination.size,
          closedActivitiesPagination.sortField,
          closedActivitiesPagination.sortOrder);

        const closedActivitiesCount = await fetchActivitiesCount(queryClosed);
        setClosedActivities(closedActivities.data.activities);
        setClosedActivitiesCount(closedActivitiesCount.data.activities_count);
      }
    }
    loadActivitiesData();
  }, [user, closedActivitiesPagination, setClosedActivities, setClosedActivitiesCount]);


  const handleChangeVariant = (e) => {
    setVariant(e.target.value);
  };

  return (
    <Grid>
      <GridSidebar>
        <Sidebar />
      </GridSidebar>

      <GridContent>
        <Head>
          <Title>Horas complementares</Title>
          <Select value={variant} onChange={handleChangeVariant}>
            <MenuItem value={'closed'}>Validado</MenuItem>
            <MenuItem value={'opened'}>Em aberto</MenuItem>
          </Select>
        </Head>

        {(variant === "closed") ?
          <Table variant="closed" activities={closedActivities} activitiesCount={closedActivitiesCount} /> :
          <Table variant="opened" activities={openedActivities} activitiesCount={openedActivitiesCount} />
        }
      </GridContent>
    </Grid>
  )
}