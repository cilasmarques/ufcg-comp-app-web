import { useState } from "react";
import { Box, Modal } from "@mui/material";
import { updateActivity } from "../../../../services/activityService";

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

const AssessmentOptions = ({ activityId }, props) => {
  const [evaluation, setEvaluation] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [additionalField, setAdditionalField] = useState(null);

  const handleEvaluate = () => {
    const value = (evaluation === 'validar') ? 'VALIDATED' : 'REJECTED';

    updateActivity(activityId, { ...additionalField, 'status': value })
      .then(res => {
        handleCloseModal();
        if (res.status === 200) {
          alert('Atividade avaliada com sucesso.');
        } else {
          alert('Erro ao avaliada a atividade');
        }
      });
  };

  const handleOpenModal = (event) => {
    setEvaluation(event.target.innerText);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddCredits = (event) => {
    console.log(event.target.value)
    setAdditionalField({'credits': event.target.value})
  }

  const handleAddJustify = (event) => {
    console.log(event.target.value)
    setAdditionalField({'justify': event.target.value})
  }

  return (
    <div>
      <button onClick={handleOpenModal}> validar </button>
      <button onClick={handleOpenModal}> negar </button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <p> Você deseja <b>{evaluation}</b> essa atividade? </p>
          <div style={{ width: '300px' }}>
            {(evaluation === 'validar') ?
              <input
                onChange={handleAddCredits}
                placeholder="Insira a quantidade de créditos"
                style={{ width: '300px' }}
                type="number"
                min="0" 
              /> :
              <input
                onChange={handleAddJustify}
                placeholder="Insira uma justificativa"
                style={{ width: '300px' }}
                type="text"
              />
            }
          </div>
          <button onClick={handleEvaluate}> Confirmar </button>
          <button onClick={handleCloseModal}> Cancelar </button>
        </Box>
      </Modal>
    </div >
  )
}

export default AssessmentOptions;