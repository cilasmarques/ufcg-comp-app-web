import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

import { getActivities } from "../../services/activityService";
import { useAuth } from "../../context/authContext";

const GENERAL_TABLE_CLOSED_REVIEWER = ["Usuário", "Status", "Tipo", "Total", "Descrição", "Comprovação"];
const GENERAL_TABLE_CLOSED_ADMIN = ["Usuário", "Status", "Tipo", "Total", "Descrição", "Comprovação", "Revisor"];
const GENERAL_TABLE_OPENED = ["Usuário", "Status", "Tipo", "Total", "Descrição", "Comprovação", "Opções"];

const REVIEWERS_OPTIONS = ["fubica@computacao", "klebia@computcao"]

export const TableVariants = {
  closed: 'closed',
  opened: 'opened'
};

const GeneralTable = ({ variant }) => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [headFields, setHeadFields] = useState([]);
  const [activities, setActivities] = useState([]);
  const [enableActionsField, setEnableActionsField] = useState(false);
  const [enableReviewerField, setEnableReviewerField] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    //TODO Remover variaveis magicas e requests consecultivos
    const loadTableContent = () => {
      const admin = user.role === 'admin';
      setisAdmin(admin)

      switch (variant) {
        case 'closed':
          getActivities({ "status": ["VALIDATED", "REJECTED"] })
            .then(res => {
              setActivities(res.data.activities)
            });

          setEnableReviewerField(admin);
          admin ? setHeadFields(GENERAL_TABLE_CLOSED_ADMIN) : setHeadFields(GENERAL_TABLE_CLOSED_REVIEWER);
          break;
        default:
          getActivities({ "status": ["CREATED", "ASSIGNED"] })
            .then(res => {
              setActivities(res.data.activities)
            });

          setEnableActionsField(true);
          setHeadFields(GENERAL_TABLE_OPENED);
          break;
      }
    }
    loadTableContent();
  }, [user.role, variant]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper >
      <TableContainer sx={{ width: '100%', border: 'solid 3px #004A8F' }}>
        <Table>
          <TableHead>
            <TableRow>
              {headFields.map(field => <TableCell key={field} align="center"> {field} </TableCell>)}
            </TableRow>
          </TableHead>

          <TableBody sx={{ height: 300 }}>
            {activities.map((data, index) =>
              <TableRow key={index}>
                <TableCell align="center"> <p>{data.owner_email}</p> <p>{data.owner_enroll}</p> </TableCell>
                <TableCell align="center"> <p>{data.status}</p> <p>{data.updatedTime}</p> </TableCell>
                <TableCell align="center"> <p>{data.type}</p> </TableCell>
                <TableCell align="center"> <p>{data.period}</p> <p>#TODO o adm que vai colocar a qtd de credito</p> </TableCell>
                <TableCell align="center"> <p>{data.description}</p> </TableCell>
                <TableCell align="center"> <p>#TODO</p> </TableCell>
                {enableReviewerField && <TableCell align="center"> <p>{data.reviewer}</p> </TableCell>}
                {enableActionsField &&
                  <TableCell align="center">
                    {isAdmin && 
                      <select>
                        {REVIEWERS_OPTIONS.map(reviewer => <option> {reviewer} </option>)}
                      </select>
                    }
                    {isAdmin && <button> ATRIBUIR </button>}
                    {!isAdmin && <button> VALIDAR </button>}
                    {!isAdmin && <button> NEGAR </button>}
                  </TableCell>
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5]}
        component="div"
        count={activities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

GeneralTable.defaultProps = {
  type: 'table',
  children: undefined,
  variant: 'closed',
};

GeneralTable.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(TableVariants))
}

export default GeneralTable;