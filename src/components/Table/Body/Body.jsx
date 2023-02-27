import { TableCell, TableRow } from "@mui/material";
import { saveAs } from 'file-saver';
import { useState } from "react";

// COMPONENTS
import AssignmentOptions from '../Actions/Assignment/Assignment';
import AssessmentOptions from '../Actions/Assessment/Assessment';
import Select from "../../Select/Select";
import Button from "../../Button/Button";

// SERVICES
import { downloadActivityVoucher } from "../../../services/ActivityService";

// STYLES
import { TableContentContainer } from "./styles.body";

// TODO: Add more options and put this in the backend
const REVIEWERS_OPTIONS = [
  { value: "cilas.marques@ccc.ufcg.edu.br", label: "cilas.marques@ccc.ufcg.edu.br" },
  { value: "fubica@computacao.ufcg.edu.br", label: "fubica@computacao.ufcg.edu.br" },
];

const BodyContent = ({ data, isAdmin, enableActionsField }) => {
  const [reviewer, setReviewer] = useState(REVIEWERS_OPTIONS[0].value);

  const handleDownloadDoc = async (path) => {
    const response = await downloadActivityVoucher(path);
    if (response.status === 200) {
      const filename = path.split("/")[1];
      saveAs(response.data, filename);
    } else {
      alert('Erro ao baixar o documento');
    }
  };

  const handleSetReviewer = (value) => {
    setReviewer(value)
  };

  function handlePrettyDate(date) {
    const cDate = new Date(date)
    const day = cDate.getDate().toString().padStart(2, "0");
    const month = (cDate.getMonth() + 1).toString().padStart(2, "0");;
    const year = cDate.getFullYear();

    return `${day}/${month}/${year}`
  };

  function handlePrettyState(state) {
    switch (state) {
      case 'CREATED':
        return 'Criado'
      case 'ASSIGNED':
        return 'Atribuído'
      case 'APPROVED':
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
        <TableContentContainer>
          <p style={{ wordWrap: 'break-word', width: 161 }}>{data.owner_email}</p>
        </TableContentContainer>
      </TableCell>

      <TableCell align="center">
        <TableContentContainer>
          <p>{handlePrettyState(data.state)}</p>
          <p>{handlePrettyDate(data.updated_time)}</p>
        </TableContentContainer>
      </TableCell>

      <TableCell align="center">
        <TableContentContainer>
          <p>{data.kind}</p>
        </TableContentContainer>
      </TableCell>

      <TableCell align="center">
        <TableContentContainer>
          <p>{data.workload} {data.workload_unity}</p>
          {data.computed_credits && (data.computed_credits > 1 ? <p>{data.computed_credits} créditos</p> : <p>{data.computed_credits} crédito</p>)}
        </TableContentContainer>
      </TableCell>

      <TableCell align="center">
        <TableContentContainer>
          <p>{data.description}</p>
        </TableContentContainer>
      </TableCell>

      <TableCell align="center">
        <TableContentContainer>
          <Button
            variant="download"
            text={data.voucher_path.split('/')[2]}
            onClick={() => handleDownloadDoc(data.voucher_path)}
          />
        </TableContentContainer>
      </TableCell>

      {isAdmin && (
        data.reviewer_email ?
          <TableCell align="center">
            <TableContentContainer>
              <p>{data.reviewer_email}</p>
            </TableContentContainer>
          </TableCell> :
          <TableCell align="center">
            <TableContentContainer>
              <Select
                options={REVIEWERS_OPTIONS}
                onChange={handleSetReviewer}
              />
            </TableContentContainer>
          </TableCell>
      )}

      {enableActionsField &&
        <TableCell align="center">
          <TableContentContainer>
            {isAdmin ?
              <AssignmentOptions activityId={data.id} reviewer_email={reviewer} /> :
              <AssessmentOptions activityId={data.id} />
            }
          </TableContentContainer>
        </TableCell>
      }
    </TableRow>
  )
};

export default BodyContent;