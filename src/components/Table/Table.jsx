
import PropTypes from 'prop-types';
import { Table as MUITable, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";

// COMPONENTS
import Select from '../Select/Select';
import BodyContent from './Body/Body';
import HeadContent from './Head/Head';

// CONTEXT
import { useAuth } from "../../context/AuthContext";
import { useActivities } from '../../context/ActivitiesContext';

const SORT_OPTIONS = [
  { value: 'owner_email', label: 'Email' },
  { value: 'workload', label: 'Periodo' },
  { value: 'kind', label: 'Tipo' },
  { value: 'state', label: 'Estado' },
  { value: 'updated_time', label: 'Data atualização' }
]

export const TableVariants = {
  closed: 'closed',
  opened: 'opened'
};

const Table = ({ variant, activities, activitiesCount }) => {
  const { user } = useAuth();
  const { activitiesPagination, setActivitiesPagination } = useActivities();

  const handleChangePage = (event, newPage) => {
    setActivitiesPagination(previousState => ({ ...previousState, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    const rows = +event.target.value;
    setActivitiesPagination(previousState => ({ ...previousState, page: 0, size: rows }));
  };

  const handleChangeSort = (sort) => {
    setActivitiesPagination(previousState => ({ ...previousState, sortField: sort }));
  };

  return (
    // TODO: Add the css into a styled component 
    <main style={{ marginBottom: 3 }}>
      <section style={{
        width: '100%',
        height: '75vh',
        border: 'solid 3px #004A8F',
        overflow: 'auto'
      }}
      >
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
                <TableCell align="center" colSpan={8}>
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

      <section style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'revert',
        justifyContent: 'flex-end'
      }}>
        <Select
          onChange={handleChangeSort}
          options={SORT_OPTIONS}
        />

        <TablePagination
          component="div"
          count={activitiesCount}
          rowsPerPageOptions={[10, 15, 20]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          page={activitiesPagination.page}
          rowsPerPage={activitiesPagination.size}
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