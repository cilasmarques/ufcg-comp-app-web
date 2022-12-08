import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export const useActivities = () => {
  const activitiesContext = useContext(ActivitiesContext);
  return activitiesContext;
};

export const ActivitiesContext = createContext({
  openedActivities: null,
  closedActivities: null,
  closedActivitiesPagination: null,
  openedActivitiesPagination: null,
  setOpenedActivities: () => { },
  setClosedActivities: () => { },
  handleCloseActivity: () => { },
  setClosedActivitiesPagination: () => { },
  setOpenedActivitiesPagination: () => { },
});

export const ActivitiesProvider = ({ children }) => {
  const initialPageConfiguration = { page: 0, size: 3, sortField: 'status', sortOrder: 'asc' };
  const [openedActivities, setOpenedActivities] = useState([]);
  const [closedActivities, setClosedActivities] = useState([]);
  const [closedActivitiesPagination, setClosedActivitiesPagination] = useState(initialPageConfiguration);
  const [openedActivitiesPagination, setOpenedActivitiesPagination] = useState(initialPageConfiguration);

  const handleCloseActivity = useCallback((openedActivityId, updatedField) => {
    const newOpenedActivities = openedActivities.filter(activity => activity._id !== openedActivityId);
    setOpenedActivities(newOpenedActivities)

    let newClosedActivity = openedActivities.find(activity => activity._id === openedActivityId);
    newClosedActivity = { ...newClosedActivity, ...updatedField };
    setClosedActivities([...closedActivities, newClosedActivity]);
  }, [openedActivities, closedActivities]);

  const activitiesProviderData = useMemo(() => ({
    openedActivities,
    closedActivities,
    closedActivitiesPagination,
    openedActivitiesPagination,
    setOpenedActivities,
    setClosedActivities,
    handleCloseActivity,
    setClosedActivitiesPagination,
    setOpenedActivitiesPagination,
  }), [
    openedActivities, closedActivities,
    closedActivitiesPagination, openedActivitiesPagination,
    setOpenedActivities, setClosedActivities, handleCloseActivity,
  ]);

  return (
    <ActivitiesContext.Provider value={activitiesProviderData}>
      {children}
    </ActivitiesContext.Provider>
  );
};


