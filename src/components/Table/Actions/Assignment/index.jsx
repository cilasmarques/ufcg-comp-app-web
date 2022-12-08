import { useState } from "react";
import { Box, Modal } from "@mui/material";
import { assignActivity } from "../../../../services/activityService";
import { useActivities } from "../../../../context/activitiesContext";

const REVIEWERS_OPTIONS = ["cilas.marques@ccc.ufcg.edu.br"]

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AssignmentOptions = ({ activityId }, props) => {
  const { handleCloseActivity } = useActivities();
  const [openModal, setOpenModal] = useState(false);
  const [reviewer, setReviewer] = useState(REVIEWERS_OPTIONS[0]);

  const handleAssignReviewer = () => {
    assignActivity({ 'activity_id': activityId, 'reviewer': reviewer })
      .then((res) => {
        handleCloseModal();
        if (res.status === 200) {
          alert('Atividade atribuida com sucesso.');
          handleCloseActivity(activityId, { 'reviewer': reviewer, 'status': 'ASSIGNED' });
        } else {
          alert('Erro ao atribuir atividade');
        }
      });
  };

  const handleSetReviewer = (event) => {
    setReviewer(event.target.value)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <select onChange={handleSetReviewer}>
        {REVIEWERS_OPTIONS.map(reviewer => <option key={reviewer}> {reviewer} </option>)}
      </select>
      <button onClick={handleOpenModal}> ATRIBUIR </button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <p> Você deseja atribuir essa atividade a <b>{reviewer}</b>? </p>
          <button onClick={handleAssignReviewer}> Confirmar </button>
          <button onClick={handleCloseModal}> Cancelar </button>
        </Box>
      </Modal>
    </div >
  )
}

export default AssignmentOptions;