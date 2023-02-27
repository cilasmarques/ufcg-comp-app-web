import React, { useState } from "react";
import { CircularProgress } from "@mui/material";

// COMPONENTS
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Sidebar from "../../components/Sidebar/Sidebar";

// SERVICES
import { userRegister, userUpdate } from "../../services/UserService";

// STYLES
import { Head, Title, FormsConatiner, MediumFormContainer, SmallFormContainer } from "./style.userRegister";
import { Grid, GridContent, GridSidebar } from "../../styles/global/Grid";

function UserRegister() {
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEnroll, setStudentEnroll] = useState("");

  const [reviewerEmail, setReviewerEmail] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  const [updateStudentEmail, setUpdateStudentEmail] = useState("");
  const [updateStudentEnroll, setUpdateStudentEnroll] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitStudentRegister = async () => {
    try {
      const userData = new FormData();
      userData.append("email", studentEmail);
      userData.append("name", studentName);
      userData.append("enroll", studentEnroll);
      userData.append("role", "student");
      
      setIsLoading(true);
      const response = await userRegister(userData);
      setIsLoading(false);

      if (response.status === 200) {
        setStudentEmail("");
        setStudentName("");
        setStudentEnroll("");
        window.alert("Estudante cadastrado com sucesso");
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleSubmitReviewerRegister = async () => {
    try {
      const userData = new FormData();
      userData.append("email", reviewerEmail);
      userData.append("name", reviewerName);
      userData.append("role", "reviewer");

      setIsLoading(true);
      const response = await userRegister(userData);
      setIsLoading(false);

      if (response.status === 200) {
        setReviewerEmail("");
        setReviewerName("");
        window.alert("Revisor cadastrado com sucesso");
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleSubmitStudentUpdate = async () => {
    try {
      const userData = new FormData();
      userData.append("email", updateStudentEmail);
      userData.append("enroll", updateStudentEnroll);

      setIsLoading(true);
      const response = await userUpdate(userData);
      setIsLoading(false);
      
      if (response.status === 200) {
        setUpdateStudentEmail("");
        setUpdateStudentEnroll("");
        window.alert("Matrícula vinculada com sucesso");
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };
  
  // TODO CSV register

  return (
    <Grid>
      <GridSidebar>
        <Sidebar />
      </GridSidebar>

      <GridContent>
        <Head>
          <Title>Gerência de usuários</Title>
        </Head>

        <FormsConatiner>
          <MediumFormContainer>
            <p>Cadastro de alunos</p>
            <Input placeholder="Email do aluno" type="email"  onChange={(e) => setStudentEmail(e.target.value)} value={studentEmail} />
            <Input placeholder="Nome do aluno" type="text" onChange={(e) => setStudentName(e.target.value)} value={studentName} />
            <Input placeholder="Matricula do aluno" type="numeric" onChange={(e) => setStudentEnroll(e.target.value)} value={studentEnroll} />
            {isLoading ? <CircularProgress /> : <Button text="Cadastrar aluno" backgroundColor="#497DB1" onClick={handleSubmitStudentRegister} />}
          </MediumFormContainer>

          <SmallFormContainer>
            <p>Cadastro de revisores</p>
            <Input placeholder="Email do revisor" type="email" onChange={(e) => setReviewerEmail(e.target.value)} value={reviewerEmail} />
            <Input placeholder="Nome do revisor" type="text" onChange={(e) => setReviewerName(e.target.value)} value={reviewerName} />
            {isLoading ? <CircularProgress /> : <Button text="Cadastrar revisor" backgroundColor="#497DB1" onClick={handleSubmitReviewerRegister} />}
          </SmallFormContainer>

          <SmallFormContainer>
            <p>Vincular matrícula ao aluno</p>
            <Input placeholder="Email do aluno" type="email" onChange={(e) => setUpdateStudentEmail(e.target.value)} value={updateStudentEmail} />
            <Input placeholder="Matricula do aluno" type="numeric" onChange={(e) => setUpdateStudentEnroll(e.target.value)} value={updateStudentEnroll} />
            {isLoading ? <CircularProgress /> : <Button text="Vincular matricula" backgroundColor="#497DB1" onClick={handleSubmitStudentUpdate} />}
          </SmallFormContainer>

          {/* TODO */}
          {/* <div style={{ width: 350, height: 100, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
              <p>Cadastro através de csv</p>
              <Input variant="file" text="Selecionar CSV" onChange={(e) => console.log(e.target.value)} />
              <Button text="Cadastrar CSV" backgroundColor="#497DB1" onClick={handleSubmitCSVRegister} />
            </div> */}
        </FormsConatiner>

      </GridContent>
    </Grid>
  );
}

export default UserRegister;

