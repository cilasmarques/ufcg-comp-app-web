import { useState } from "react";
import { Modal, CircularProgress } from "@mui/material";

// COMPONENTS
import Button from "../../../Button/Button";

// CONTEXT
import { useActivities } from "../../../../context/ActivitiesContext";

// SERVICES
import { assignActivity } from "../../../../services/ActivityService";

// STYLES
import { BoxStyled } from "../style.actions";

const AssignmentOptions = ({ activityId, reviewer_email }) => {
  const { handleCloseActivity } = useActivities();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAssignReviewer = async () => {
    setIsLoading(true);
    handleCloseModal();

    const response = await assignActivity(activityId, {
      'reviewer_email': reviewer_email
    });

    setIsLoading(false);

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
      {isLoading ?
        <CircularProgress /> :
        <Button
          text='Atribuir'
          onClick={handleOpenModal}
        />
      }
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxStyled>
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
        </BoxStyled>
      </Modal>
    </div >
  )
}

export default AssignmentOptions;