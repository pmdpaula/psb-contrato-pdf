import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { Box, Button, Stack, Typography } from "@mui/material";

import { NeonText } from "@/components/NeonText";

const AboutPage = () => {
  return (
    <>
      <Stack
        spacing={4}
        alignItems="center"
      >
        {/* <NeonCircle
      // diameter={isBreakpointLg ? 60 : isBreakpointMd ? 40 : 30}
      >
        <PSBIconLight amplitude={100} />
      </NeonCircle> */}

        <NeonText
          // variant={isBreakpointLg ? "h3" : "h5"}
          variant="h3"
          fontFamily="Ephesis"
          color="pink"
        >
          Patricia Siqueira
        </NeonText>

        <Typography
          variant="h3"
          textAlign="center"
        >
          Sistema de controle de projetos
        </Typography>

        <Typography
          variant="body1"
          textAlign="center"
        >
          Para ter acesso aos demais recuros do sistema, entre em contato com a
          administradora.
        </Typography>
      </Stack>

      <Stack
        spacing={2}
        marginTop={16}
      >
        <Button
          variant="text"
          href="mailto:patriciasiqueirabolos@gmail.com"
        >
          <EmailTwoToneIcon sx={{ mr: 1 }} />
          Contate a administradora
        </Button>

        <Button
          variant="text"
          href="https://www.instagram.com/patriciasiqueirabolos/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon sx={{ mr: 1 }} />
          Nosso Instagram
        </Button>
      </Stack>

      <Box sx={{ mt: 12, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          href="/api/auth/sign-out"
          size="small"
        >
          <LogoutTwoToneIcon sx={{ mr: 1 }} />
          Sair
        </Button>
      </Box>
    </>
  );
};

export default AboutPage;
