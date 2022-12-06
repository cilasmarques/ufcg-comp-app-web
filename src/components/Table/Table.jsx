import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Table as MUITable, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";

import { getActivities, getActivitiesCount } from "../../services/activityService";
import { useAuth } from "../../context/authContext";
import BodyContent from './Body';
import HeadContent from './Head';

const SORT_OPTIONS = [
  'owner_email',
  'owner_enroll',
  // 'credits',
  'period',
  'type',
  // 'description',
  'status',
  // 'reviewer',
  // 'createdTime',
  'updatedTime'
]

export const TableVariants = {
  closed: 'closed',
  opened: 'opened'
};

const Table = ({ variant }) => {
  const { user } = useAuth();
  const { isAdmin } = { ...user };

  const [sort, setSort] = useState("status");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [activities, setActivities] = useState([]);
  const [activitiesCount, setActivitiesCount] = useState(0);

  useEffect(() => {
    //FIXME resolve multiple requests
    const loadTableContent = () => {
      let activitiesStatus = null;
      switch (variant) {
        case TableVariants.closed:
          activitiesStatus = isAdmin ? ["VALIDATED", "REJECTED", "ASSIGNED"] : ["VALIDATED", "REJECTED"];
          break;
        default:
          activitiesStatus = isAdmin ? ['CREATED'] : ['ASSIGNED'];
          break;
      }

      getActivities({ "status": activitiesStatus }, page, rowsPerPage, sort, 'asc')
        .then(res => {
          setActivities(res.data.activities)
        });

      getActivitiesCount()
        .then(res => {
          setActivitiesCount(res.data.activities_count)
        });
    }
    loadTableContent();
    return;
  }, [sort, page, rowsPerPage, isAdmin, variant]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handlePrettySort = (status) => {

    switch (status) {
      case 'owner_email':
        return 'Email'
      case 'owner_enroll':
        return 'Matrícula'
      case 'type':
        return 'Tipo'
      case 'period':
        return 'Periodo'
      case 'status':
        return 'Estado'
      case 'updatedTime':
        return 'Data atualização'
      default:
        break;
    }
  };

  return (
    <main style={{ marginBottom: 3 }}>
      <section style={{ width: '100%', height: 344, border: 'solid 3px #004A8F', overflow: 'auto' }}>
        <MUITable stickyHeader>
          <TableHead>
            <HeadContent
              isAdmin={isAdmin}
              enableActionsField={variant === TableVariants.opened}
              enableReviewerField={isAdmin && variant === TableVariants.closed}
            />
          </TableHead>

          <TableBody sx={{ maxHeight: 100 }}>
            {activities.length === 0 ?
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  Nenhum dado foi encontrado
                </TableCell>
              </TableRow> :
              activities.map((data, index) =>
                <BodyContent
                  key={index}
                  data={data}
                  isAdmin={isAdmin}
                  enableActionsField={variant === TableVariants.opened}
                  enableReviewerField={isAdmin && variant === TableVariants.closed}
                />
              )}
          </TableBody>
        </MUITable>
      </section>

      <section style={{ display: "flex", alignItems: 'center', flexDirection: 'revert', justifyContent: 'flex-end' }}>
        <select style={{ height: '30px' }} onChange={handleChangeSort}>
          {SORT_OPTIONS.map((sort, index) => <option key={index} value={sort}> {handlePrettySort(sort)} </option>)}
        </select>

        <TablePagination
          rowsPerPageOptions={[3, 5]}
          component="div"
          count={activitiesCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </section>
    </main>
  );
};

Table.defaultProps = {
  type: 'table',
  children: undefined,
  variant: 'closed',
};

Table.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(TableVariants))
}

export default Table;