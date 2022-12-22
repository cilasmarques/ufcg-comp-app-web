
import PropTypes from 'prop-types';
import { Table as MUITable, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";

// COMPONENTS
import BodyContent from './Body';
import HeadContent from './Head';

// CONTEXT
import { useAuth } from "../../context/authContext";
import { useActivities } from '../../context/activitiesContext';

const SORT_OPTIONS = [
  'owner_email',
  'owner_enroll',
  'period',
  'type',
  'status',
  'reviewer',
  'updatedTime'
]

export const TableVariants = {
  closed: 'closed',
  opened: 'opened'
};

const Table = ({ variant, activities, activitiesCount }) => {
  const { user } = useAuth();
  const { openedActivitiesPagination, closedActivitiesPagination, setClosedActivitiesPagination, setOpenedActivitiesPagination } = useActivities();

  const handleChangePage = (event, newPage) => {
    if (variant === TableVariants.closed) {
      setClosedActivitiesPagination(previousState => ({ ...previousState, page: newPage }));
    } else {
      setOpenedActivitiesPagination(previousState => ({ ...previousState, page: newPage }));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const rows = +event.target.value;
    if (variant === TableVariants.closed) {
      setClosedActivitiesPagination(previousState => ({ ...previousState, page: 0, size: rows }));
    } else {
      setOpenedActivitiesPagination(previousState => ({ ...previousState, page: 0, size: rows }));
    }
  };

  const handleChangeSort = (event) => {
    const sort = event.target.value;
    if (variant === TableVariants.closed) {
      setClosedActivitiesPagination(previousState => ({ ...previousState, sort: sort }));
    } else {
      setOpenedActivitiesPagination(previousState => ({ ...previousState, sort: sort }));
    }
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
      <section style={{ width: '100%', height: 800, border: 'solid 3px #004A8F', overflow: 'auto' }}>
        <MUITable stickyHeader>
          <TableHead>
            <HeadContent
              isAdmin={user.isAdmin}
              enableActionsField={variant === TableVariants.opened}
              enableReviewerField={user.isAdmin && variant === TableVariants.closed}
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
                  isAdmin={user.isAdmin}
                  enableActionsField={variant === TableVariants.opened}
                  enableReviewerField={user.isAdmin && variant === TableVariants.closed}
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
          component="div"
          count={activitiesCount}
          rowsPerPageOptions={[10, 15, 20]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={variant === TableVariants.closed ? closedActivitiesPagination.page : openedActivitiesPagination.page }
          rowsPerPage={variant === TableVariants.closed ? closedActivitiesPagination.size : openedActivitiesPagination.size}
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
};

export default Table;