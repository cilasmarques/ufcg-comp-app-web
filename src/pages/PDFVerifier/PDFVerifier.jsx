import React, { useState } from "react";
import { CircularProgress } from "@mui/material";


// COMPONENTS
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Sidebar from "../../components/Sidebar/Sidebar";

// SERVICES
import { verifyProcess } from "../../services/ProcessService";

// STYLES
import { Head, Title } from "./style.pdfVerifier";
import { Grid, GridContent, GridSidebar } from "../../styles/global/Grid";

function PDFVerifier() {
  const [file, setFile] = useState(null);
  const [userEnroll, setUserEnroll] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUserEnroll = (e) => {
    setUserEnroll(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile.type !== 'application/pdf') {
      window.alert('Tipo inválido, apenas PDFs são aceitos');
    } else {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('voucher', file);
      formData.append('user_enroll', userEnroll);

      if (userEnroll === "") {
        window.alert("Matricula do estudante não pode ser vazia");
        return;
      }
      if (file === null) {
        window.alert("Nenhum arquivo selecionado");
        return;
      }

      const response = await verifyProcess(formData);
      if (response?.status === 200) {
        response.data.isValid ? window.alert("PDF válido") : window.alert("PDF inválido");
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setIsLoading(false);
  };

  return (
    <Grid>
      <GridSidebar>
        <Sidebar />
      </GridSidebar>

      <GridContent>
        <Head>
          <Title>Verificação de Documentos</Title>
        </Head>

        <div style={{ display: 'flex', gap: 20 }}>
          <Input placeholder="Matricula do estudante" type="numeric" onChange={handleChangeUserEnroll} />
          <Input variant='file' text={file ? file.name : "Selecionar PDF"} onChange={handleFileChange} />
          {isLoading ?
            <CircularProgress /> :
            <Button
              text="Verificar"
              backgroundColor="#497DB1"
              onClick={handleFileUpload}
            />
          }
        </div>
      </GridContent>
    </Grid>
  );
}

export default PDFVerifier;

