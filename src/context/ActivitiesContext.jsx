import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export const useActivities = () => {
  const activitiesContext = useContext(ActivitiesContext);
  return activitiesContext;
};

export const ActivitiesContext = createContext({
  activities: null,
  activitiesCount: 0,
  activitiesFilter: null,
  activitiesPagination: null,
  handleCloseActivity: () => { },
  setActivities: () => { },
  setActivitiesCount: () => { },
  setActivitiesFilter: () => { },
  setActivitiesPagination: () => { },
});

export const ActivitiesProvider = ({ children }) => {
  const initialPaginationConfig = { page: 0, size: 10, sortField: 'state', sortOrder: 'asc' };
  const [activities, setActivities] = useState([]);
  const [activitiesCount, setActivitiesCount] = useState(0);
  const [activitiesFilter, setActivitiesFilter] = useState("");
  const [activitiesPagination, setActivitiesPagination] = useState(initialPaginationConfig);

  const handleCloseActivity = useCallback((openedActivityId) => {
    setActivities(previousState => previousState.filter(activity => activity.id !== openedActivityId))
  }, []);

  const activitiesProviderData = useMemo(() => ({
    activities,
    activitiesCount,
    activitiesFilter,
    activitiesPagination,
    handleCloseActivity,
    setActivities,
    setActivitiesCount,
    setActivitiesFilter,
    setActivitiesPagination,
  }), [
    activities, activitiesFilter, activitiesCount, activitiesPagination,
    setActivitiesFilter, setActivitiesCount, setActivities, handleCloseActivity,
  ]);

  return (
    <ActivitiesContext.Provider value={activitiesProviderData}>
      {children}
    </ActivitiesContext.Provider>
  );
};


