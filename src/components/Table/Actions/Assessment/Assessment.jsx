import { useState } from "react";
import { Modal, CircularProgress } from "@mui/material";

// COMPONENTS
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";

// CONTEXT
import { useAuth } from "../../../../context/AuthContext";
import { useActivities } from "../../../../context/ActivitiesContext";

// SERVICES
import { validateActivity } from "../../../../services/ActivityService";

// STYLES
import { BoxStyled } from "../style.actions";

const AssessmentOptions = ({ activityId }) => {
  const { user } = useAuth();
  const { handleCloseActivity } = useActivities();
  const [validation, setValidation] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [justifyField, setJustifyField] = useState(null);
  const [creditsField, setCreditsField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFinishValidation = async () => {
    let response = null;
    let stateValue = (validation === 'APROVAR') ? 'APPROVED' : 'REJECTED';

    handleCloseModal();
    if (stateValue === 'APPROVED') {
      if (!creditsField) {
        alert('Insira a quantidade de créditos.');
        return;
      }
      setIsLoading(true);
      response = await validateActivity(activityId, {
        'state': stateValue,
        'computed_credits': creditsField,
        'reviewer_email': user.email,
      })
      setIsLoading(false);
    } else {
      if (!justifyField) {
        alert('Insira uma justificativa.');
        return;
      }
      setIsLoading(true);
      response = await validateActivity(activityId, {
        'state': stateValue,
        'justify': justifyField,
        'reviewer_email': user.email,
      })
      setIsLoading(false);
    }


    if (response?.status === 200) {
      alert('Atividade validada com sucesso.');
      handleCloseActivity(activityId, { 'state': stateValue });
    } else {
      alert('Erro ao validada a atividade');
    }
  };

  const handleOpenModal = (event) => {
    setValidation(event.target.innerText);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setValidation("");
    setCreditsField(null);
    setJustifyField(null);
    setOpenModal(false);
  };

  const handleAddCredits = (event) => {
    setCreditsField(event.target.value);
  };

  const handleAddJustify = (event) => {
    setJustifyField(event.target.value);
  };

  return (
    <div>
      {isLoading ?
        <CircularProgress /> :
        <>
          <Button
            text='APROVAR'
            backgroundColor='#368C72'
            onClick={handleOpenModal}
          />
          <Button
            text='REJEITAR'
            backgroundColor='#8C3636'
            onClick={handleOpenModal}
          />
        </>
      }
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxStyled>
          <p> Você deseja <b>{validation}</b> essa atividade? </p>
          {(validation === 'APROVAR') ?
            <Input onChange={handleAddCredits} placeholder="Insira a quantidade de créditos" type="number" min="0" /> :
            <Input onChange={handleAddJustify} placeholder="Insira uma justificativa" type="text" />
          }
          <div>
            <Button
              text={validation}
              onClick={handleFinishValidation}
            />
            <Button
              text='Cancelar'
              backgroundColor='#8C3636'
              onClick={handleCloseModal}
            />
          </div>
        </BoxStyled>
      </Modal>
    </div>
  );
}

export default AssessmentOptions;