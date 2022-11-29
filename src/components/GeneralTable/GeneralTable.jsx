import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import PropTypes from 'prop-types';

const ACTIVITY_INFO = [
  {
    "credits": "4",
    "description": "Monitoria de ICC no periodo 2021.2",
    "owner_enroll": "118110386",
    "period": " 1 semestre ",
    "proof_doc": "#TODO: UM LINK AQUI",
    "status": "CREATED",
    "type": "Monitoria"
  },
]

const GENERAL_TABLE_SIGNED_REVIEWER = ["Usuário", "Status", "Tipo", "Total", "Descrição", "Comprovação"];
const GENERAL_TABLE_SIGNED_ADMIN = ["Usuário", "Status", "Tipo", "Total", "Descrição", "Comprovação", "Revisor"];
const GENERAL_TABLE_UNSIGNED = ["Usuário", "Status", "Tipo", "Total", "Descrição", "Comprovação", "Opções"];

export const TableVariants = {
  unsigned: 'unsigned',
  signed: 'signed'
};

const GeneralTable = ({ variant }) => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [headFields, setHeadFields] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const setTableHeadFields = useCallback(() => {
    //TODO: remover variaveis mágicas
    switch (variant) {
      case 'signed':
        if (user.role === 'reviewer')
          setHeadFields(GENERAL_TABLE_SIGNED_REVIEWER)
        else
          setHeadFields(GENERAL_TABLE_SIGNED_ADMIN)
        break;
      default:
        setHeadFields(GENERAL_TABLE_UNSIGNED)
        break;
    }
  }, [setHeadFields, variant, user]);

  useEffect(() => {
    setTableHeadFields()
    // getActivitiesChecked(user.role)
    // getActivitiesUnchecked(user.role)
    // showReviewerField(data)
    // showActionsField()
  }, [setTableHeadFields]);

  const showReviewerField = (dictionary) => {
    return Object.keys(dictionary).includes("reviewer")
  }

  const showActionsField = () => {
    return variant === "unsigned";
  }

  return (
    <Paper sx={{ width: '100%', maxHeight: 440 }}>
      <h2> Tabela {variant} ~ Visão {user.role} </h2>
        <Table>
          <TableHead>
            {headFields.map(field => <TableCell key={field} align="center"> {field} </TableCell>)}
          </TableHead>

          <TableBody>
            {ACTIVITY_INFO.map((data, index) =>
              <TableRow key={index}>
                <TableCell align="center"> <p>#TODO retornar email"</p> <p>{data.owner_enroll}</p> </TableCell>
                <TableCell align="center"> <p>{data.status}</p> <p>#TODO retornar data"</p> </TableCell>
                <TableCell align="center"> <p>{data.type}</p> </TableCell>
                <TableCell align="center"> <p>{data.period}</p> <p>#TODO o adm que vai colocar a qtd de credito</p> </TableCell>
                <TableCell align="center"> <p>{data.description}</p> </TableCell>
                <TableCell align="center"> <p>{data.proof_doc}</p> </TableCell>
                {showReviewerField(data) && <TableCell align="center"> <p>{data.reviewer}</p> </TableCell>}
                {showActionsField() && <TableCell align="center"> <button> OPÇÃO </button> </TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={ACTIVITY_INFO.length}
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
  variant: 'unsigned',
};

GeneralTable.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(TableVariants))
}

export default GeneralTable;