import { TableCell, TableRow } from "@mui/material";

import AssignmentOptions from '../Actions/Assignment/index';
import AssessmentOptions from '../Actions/Assessment';

const BodyContent = ({ data, isAdmin, enableActionsField,enableReviewerField }, props) => {

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

  return (
    <TableRow key={data._id}>
      <TableCell align="center">
        <p>{data.owner_email}</p>
        <p>{data.owner_enroll}</p>
      </TableCell>
      <TableCell align="center">
        <p>{handlePrettyStatus(data.status)}</p>
        <p>{handlePrettyDate(data.updatedTime)}</p>
      </TableCell>
      <TableCell align="center">
        <p>{data.type}</p>
      </TableCell>
      <TableCell align="center">
        <p>{data.period}</p>
        {data.credits > 1 ?
          <p>{data.credits} créditos</p> :
          <p>{data.credits} crédito</p>
        }
      </TableCell>
      <TableCell align="center">
        <p>{data.description}</p>
      </TableCell>
      <TableCell align="center">
        <p>#TODO</p>
      </TableCell>
      {enableReviewerField &&
        <TableCell align="center">
          <p>{data.reviewer}</p>
        </TableCell>
      }
      {enableActionsField && 
        <TableCell align="center">
          {isAdmin ?
            <AssignmentOptions activityId={data._id} /> :
            <AssessmentOptions activityId={data._id} />
          }
        </TableCell>
      }
    </TableRow>
  )
};

export default BodyContent;