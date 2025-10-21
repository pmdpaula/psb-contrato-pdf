import { Box, Container, Stack, Typography } from "@mui/material";
import styles from "./page.module.css";
import FormContract from "@/components/FormContract";
import Image from "next/image";
import logoPSB from "@/assets/psb-logo_bgdark.svg";

const HomePage = () => {
  return (
    <Container component="main">
      <Stack
        spacing={2}
        alignItems="center"
        mb={4}
        mt={3}
        // bgcolor="teal"
        borderRadius={3}
        p={2}
        sx={{}}
      >
        <Image
          src={logoPSB}
          alt="logotipo com um bolo estilizado rosa e marrom a esquerda e a direita o nome Patricia Siqueira"
          width={300}
        />
        <Typography variant="h4">Contrato</Typography>
      </Stack>

      <FormContract />
    </Container>
  );
};

export default HomePage;
