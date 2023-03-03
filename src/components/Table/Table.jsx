
import PropTypes from 'prop-types';
import { Table as MUITable, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";

// COMPONENTS
import Select from '../Select/Select';
import BodyContent from './Body/Body';
import HeadContent from './Head/Head';

// CONTEXT
import { useAuth } from "../../context/AuthContext";
import { useActivities } from '../../context/ActivitiesContext';

// STYLES
import { MainContainer, TableContainer, TableBodyStyled, TableFooter } from './style.table';

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

const Table = ({ variant, activities, activitiesCount, reviewersOptions }) => {
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
    <MainContainer>
      <TableContainer>
        <MUITable stickyHeader>
          <TableHead>
            <HeadContent
              isAdmin={user.isAdmin}
              enableActionsField={variant === TableVariants.opened}
              enableReviewerField={user.isAdmin && variant === TableVariants.closed}
            />
          </TableHead>

          <TableBodyStyled>
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
                  reviewersOptions={reviewersOptions}
                />
              )}
          </TableBodyStyled>
        </MUITable>
      </TableContainer>

      <TableFooter>
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
      </TableFooter>
    </MainContainer>
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