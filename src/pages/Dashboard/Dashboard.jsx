import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

// COMPONENTS
import Sidebar from "../../components/Sidebar/Sidebar";
import Select from "../../components/Select/Select";
import Table from "../../components/Table/Table";

// CONTEXT
import { useAuth } from "../../context/AuthContext";
import { useActivities } from "../../context/ActivitiesContext";

// SERVICE
import { userFindByRole } from "../../services/UserService";
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
  const [isLoading, setIsLoading] = useState(false);
  const [reviewersOptions, setReviewersOptions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      let query = new FormData();
      if (variant === "closed") {
        const states = user.isAdmin ? ["APPROVED", "REJECTED", "ASSIGNED"] : ["APPROVED", "REJECTED"];
        query.append('states', states);
      } else {
        const states = user.isAdmin ? ["CREATED"] : ["ASSIGNED"];
        query.append('states', states);
      }

      setIsLoading(true);
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
      setIsLoading(false);
    }
    loadData();
  }, [user, variant, activitiesPagination, setActivities, setActivitiesCount]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const response = await userFindByRole('REVIEWER');
      if (response?.status === 200) {
        const reviewers = response.data.users.map((user) => {
          return { value: user.email, label: user.email }
        });
        setReviewersOptions(reviewers);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

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
            options={user?.isAdmin ? ADMIN_VIEW_OPTIONS : REVIEWER_VIEW_OPTIONS}
            onChange={handleChangeVariant}
          />
        </Head>

        {isLoading ?
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
            <p>Carregando Atividades ...</p>
            <CircularProgress />
          </div> :
          (variant === "opened") ?
            <Table variant="opened" activities={activities} activitiesCount={activitiesCount} reviewersOptions={reviewersOptions} /> :
            <Table variant="closed" activities={activities} activitiesCount={activitiesCount} reviewersOptions={reviewersOptions} />
        }
      </GridContent>
    </Grid>
  )
};

export default Dashboard;