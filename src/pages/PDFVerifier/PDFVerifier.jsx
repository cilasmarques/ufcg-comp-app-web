import React, { useState } from "react";

// COMPONENTS
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Sidebar from "../../components/Sidebar/Sidebar";

// SERVICES
import { verifyProcess } from "../../services/ProcessService";

// STYLES
import { Head, Title } from "./style.component";
import { Grid, GridContent, GridSidebar } from "../../styles/global/Grid";

function PDFVerifier() {
  const [file, setFile] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  // const [uploading, setUploading] = useState(false);

  const handleChangeUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile.type !== 'application/pdf') {
      window.alert('Tipo inválido, apenas PDFs são aceitos');
    } else {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    // setUploading(true);
    try {
      const formData = new FormData();
      formData.append('voucher', file);
      formData.append('user_email', userEmail);

      const response = await verifyProcess(formData);
      if (response.status === 200) {
        // alert pdf is valid
        response.data.isValid ? window.alert("PDF válido") : window.alert("PDF inválido");
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      // setUploading(false);
    }
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
          <Input placeholder="Insira o email do estudante" onChange={handleChangeUserEmail} />
          <Input variant='file' text={file?.name} onChange={handleFileChange} />
          <Button
            text="Verificar"
            backgroundColor="#497DB1"
            onClick={handleFileUpload}
          />
        </div>
      </GridContent>
    </Grid>
  );
}

export default PDFVerifier;

