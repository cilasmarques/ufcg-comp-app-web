import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

import { getActivities, getActivitiesCount } from "../../services/activityService";
import { useAuth } from "../../context/authContext";
import AssignmentOptions from './Options/Assignment/index';
import AssessmentOptions from './Options/Assessment';

const GENERAL_TABLE_CLOSED_REVIEWER = ["Usuário", "Estado", "Tipo", "Periodo de tempo", "Descrição", "Comprovação"];
const GENERAL_TABLE_CLOSED_ADMIN = ["Usuário", "Estado", "Tipo", "Periodo de tempo", "Descrição", "Comprovação", "Revisor"];
const GENERAL_TABLE_OPENED = ["Usuário", "Estado", "Tipo", "Periodo de tempo", "Descrição", "Comprovação", "Opções"];

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

const GeneralTable = ({ variant }) => {
  const { user } = useAuth();
  const [sort, setSort] = useState("status");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [headFields, setHeadFields] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activitiesCount, setActivitiesCount] = useState(0);
  const [enableActionsField, setEnableActionsField] = useState(false);
  const [enableReviewerField, setEnableReviewerField] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    //TODO Remover variaveis magicas e requests consecultivos
    const loadTableContent = () => {
      const admin = user.role === 'admin';
      setIsAdmin(admin)

      let headFields = null;
      let activitiesStatus = null;
      switch (variant) {
        case 'closed':
          setEnableReviewerField(admin);
          headFields = admin ? GENERAL_TABLE_CLOSED_ADMIN : GENERAL_TABLE_CLOSED_REVIEWER;
          activitiesStatus = admin ? ["VALIDATED", "REJECTED", "ASSIGNED"] : ["VALIDATED", "REJECTED"];
          break;
        default:
          setEnableActionsField(true);
          activitiesStatus = admin ? ['CREATED'] : ['ASSIGNED'];
          headFields = GENERAL_TABLE_OPENED;
          break;
      }

      setHeadFields(headFields);

      console.log("======")
      console.log({ "status": activitiesStatus })
      console.log("======")

      getActivities({ "status": activitiesStatus }, page, rowsPerPage, sort, 'asc')
        .then(res => {
          console.log(res)
          setActivities(res.data.activities)
        });

      getActivitiesCount()
        .then(res => {
          setActivitiesCount(res.data.activities_count)
        });
    }
    loadTableContent();
  }, [sort, page, rowsPerPage, user, variant]);

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

  function handlePrettyDate(date) {
    const cDate = new Date(date)
    const day = cDate.getDate();
    const month = cDate.getMonth();
    const year = cDate.getFullYear();

    return `${day}/${month}/${year}`
  };

  function handlePrettyStatus(status) {
    switch (status) {
      case 'CREATED':
        return 'Criado'
      case 'ASSIGNED':
        return 'Atribuído'
      case 'VALIDATED':
        return 'Validado'
      case 'REJECTED':
        return 'Rejeitado'
      default:
        break;
    }
  };

  function handlePrettySort(status) {

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
    <Paper sx={{ marginBottom: 3 }}>
      <TableContainer sx={{ width: '100%', height: 344, border: 'solid 3px #004A8F' }}>
        <Table stickyHeader>
          <TableHead>
            {/* Fazer isso virar um componente personalizado 'tableHead' */}
            <TableRow>
              {headFields.map(field => <TableCell key={field} align="center"> {field} </TableCell>)}
            </TableRow>
          </TableHead>

          {activities.length === 0 && <p> Sem dados </p>}
          <TableBody sx={{ maxHeight: 100 }}>
            {/* Fazer isso virar um componente personalizado 'tableRow' */}
            {activities.length > 0 && activities.map((data, index) =>
              <TableRow key={data._id}>
                <TableCell align="center"> <p>{data.owner_email}</p> <p>{data.owner_enroll}</p> </TableCell>
                <TableCell align="center"> <p>{handlePrettyStatus(data.status)}</p> <p>{handlePrettyDate(data.updatedTime)}</p> </TableCell>
                <TableCell align="center"> <p>{data.type}</p> </TableCell>
                <TableCell align="center"> 
                  <p>{data.period}</p>
                  {data.credits > 1 ? <p>{data.credits} créditos</p> : <p>{data.credits} crédito</p>}
                </TableCell>
                <TableCell align="center"> <p>{data.description}</p> </TableCell>
                <TableCell align="center"> <p>#TODO</p> </TableCell>
                {enableReviewerField && <TableCell align="center"> <p>{data.reviewer}</p> </TableCell>}
                {enableActionsField &&
                  <TableCell align="center">
                    {isAdmin ?
                      <AssignmentOptions activityId={data._id} /> :
                      <AssessmentOptions activityId={data._id} />
                    }
                  </TableCell>
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: "flex", alignItems: 'center', flexDirection: 'revert', justifyContent: 'flex-end' }}>
        <select style={{ height: '30px' }} onChange={handleChangeSort}>
          {SORT_OPTIONS.map(sort => <option value={sort}> {handlePrettySort(sort)} </option>)}
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
      </div>
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