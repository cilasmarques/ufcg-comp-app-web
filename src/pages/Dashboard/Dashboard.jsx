import { useEffect } from "react";
import { useState } from "react";

// COMPONENTS
import Sidebar from "../../components/Sidebar/Sidebar";
import Select from "../../components/Select/Select";
import Table from "../../components/Table/Table";

// CONTEXT
import { useAuth } from "../../context/AuthContext";
import { useActivities } from "../../context/ActivitiesContext";

// SERVICE
import { fetchActivities, fetchActivitiesCount } from "../../services/ActivityService";

// STYLE
import { Title, Head } from "./style.component";
import { Grid, GridContent, GridSidebar } from "../../styles/global/Grid";

const ADMIN_VIEW_OPTIONS = [
  { value: "opened", label: "Em aberto" },
  { value: "closed", label: "Atribuído" },
];

const REVIEWER_VIEW_OPTIONS = [
  { value: "opened", label: "Em aberto" },
  { value: "closed", label: "Validado" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { activities, activitiesPagination, activitiesCount, setActivitiesCount, setActivities } = useActivities();
  const [variant, setVariant] = useState('opened');

  useEffect(() => {
    const loadActivitiesData = async () => {
      let query = new FormData();
      if (variant === "closed") {
        const states = user.isAdmin ? ["APPROVED", "REJECTED", "ASSIGNED"] : ["APPROVED", "REJECTED"];
        query.append('states', states);
      } else {
        const states = user.isAdmin ? ["CREATED"] : ["ASSIGNED"];
        query.append('states', states);
      }

      if (query) {
        const activitiesResponse = await fetchActivities(
          query,
          activitiesPagination.page,
          activitiesPagination.size,
          activitiesPagination.sortField,
          activitiesPagination.sortOrder);

        const activitiesCountResponse = await fetchActivitiesCount(query);
        setActivities(activitiesResponse.data.activities);
        setActivitiesCount(activitiesCountResponse.data.activities_count);
      }
    }
    loadActivitiesData();
  }, [user, variant, activitiesPagination, setActivities, setActivitiesCount]);

  const handleChangeVariant = (value) => {
    setVariant(value);
  };

  return (
    <Grid>
      <GridSidebar>
        <Sidebar />
      </GridSidebar>

      <GridContent>
        <Head>
          <Title>Atividades complementares</Title>
            <Select 
              options={ user?.isAdmin ? ADMIN_VIEW_OPTIONS : REVIEWER_VIEW_OPTIONS}
              onChange={handleChangeVariant}
            />
        </Head>

        {(variant === "opened") ?
          <Table variant="opened" activities={activities} activitiesCount={activitiesCount} /> :
          <Table variant="closed" activities={activities} activitiesCount={activitiesCount} /> 
        }
      </GridContent>
    </Grid>
  )
};

export default Dashboard;