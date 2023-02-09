import { useState } from "react";
import { Box, Modal } from "@mui/material";

// COMPONENTS
import Button from "../../../Button/Button";

// CONTEXT
import { useActivities } from "../../../../context/ActivitiesContext";

// SERVICES
import { assignActivity } from "../../../../services/ActivityService";

// TODO: Move this boxStyle to a styled-component
const boxStyle = {
  p: 4,
  width: 400,
  top: '50%',
  left: '50%',
  boxShadow: 24,
  position: 'absolute',
  border: '2px solid #000',
  bgcolor: 'background.paper',
  transform: 'translate(-50%, -50%)',
};

const AssignmentOptions = ({ activityId, reviewer_email }) => {
  const { handleCloseActivity } = useActivities();
  const [openModal, setOpenModal] = useState(false);

  const handleAssignReviewer = async () => {
    const response = await assignActivity(activityId, { 
      'reviewer_email': reviewer_email
    });

    handleCloseModal();

    if (response?.status === 200) {
      alert('Atividade atribuida com sucesso.');
      handleCloseActivity(activityId, { 'reviewer_email': reviewer_email, 'state': 'ASSIGNED' });
    } else {
      alert('Erro ao atribuir atividade');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      <Button 
        text='Atribuir'
        onClick={handleOpenModal}
      />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <p> Você deseja atribuir essa atividade a <b>{reviewer_email}</b>? </p>
          <Button 
            text='Confirmar'
            onClick={handleAssignReviewer}
          />
          <Button 
            text='Cancelar'
            backgroundColor='#8C3636'
            onClick={handleAssignReviewer}
          />
        </Box>
      </Modal>
    </div >
  )
}

export default AssignmentOptions;