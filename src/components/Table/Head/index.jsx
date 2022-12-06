import { useEffect, useState } from "react";
import { TableCell, TableRow } from "@mui/material";

const GENERAL_TABLE_CLOSED_REVIEWER_VIEW = ["Usuário", "Estado", "Tipo", "Periodo de tempo", "Descrição", "Comprovação"];
const GENERAL_TABLE_CLOSED_ADMIN_VIEW = ["Usuário", "Estado", "Tipo", "Periodo de tempo", "Descrição", "Comprovação", "Revisor"];
const GENERAL_TABLE_OPENED_GENERAL_VIEW = ["Usuário", "Estado", "Tipo", "Periodo de tempo", "Descrição", "Comprovação", "Opções"];

const HeadContent = ({ isAdmin, enableActionsField }) => {
  const [headFields, setHeadFields] = useState([]);

  useEffect(() => {
    let fields = []
    if (enableActionsField)
      fields = GENERAL_TABLE_OPENED_GENERAL_VIEW;
    else
      fields = isAdmin ? GENERAL_TABLE_CLOSED_ADMIN_VIEW : GENERAL_TABLE_CLOSED_REVIEWER_VIEW;

    setHeadFields(fields)
  }, [isAdmin, enableActionsField]);

  return (
    <TableRow>
      {headFields.map(field => <TableCell key={field} align="center"> {field} </TableCell>)}
    </TableRow>
  )
};

export default HeadContent;