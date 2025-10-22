import { Box, Container, Stack, Typography } from "@mui/material";
import FormContract from "@/components/FormContract";
import Image from "next/image";
import logoPSB from "@/assets/psb-logo_bgdark.svg";
import { NeonText } from "@/components/NeonText";
import { Header } from "@/components/Header";

const HomePage = () => {
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ py: 3 }}>
        {/* <Stack spacing={1} alignItems="center" mb={4} mt={1} p={1}>
        <Image
          src={logoPSB}
          alt="logotipo com um bolo estilizado rosa e marrom a esquerda e a direita o nome Patricia Siqueira"
          width={340}
        />
        <NeonText variant="h2" fontFamily="Ephesis" color="pink">
          Contrato
        </NeonText>
      </Stack> */}

        <FormContract />
      </Container>
    </>
  );
};

export default HomePage;
