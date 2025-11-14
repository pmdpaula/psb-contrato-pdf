import { Box, Container, Paper } from "@mui/material";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/auth/auth";
import { NeonCircle } from "@/components/NeonCircle";
import { NeonText } from "@/components/NeonText";
import { PSBIconLight } from "@/components/PSBIcon";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (await isAuthenticated()) {
    redirect("/");
  }

  return (
    <Container maxWidth="sm">
      <Box
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        display="flex"
        sx={{
          minHeight: "100vh",
          px: 1,
          paddingTop: 8,
        }}
      >
        <NeonCircle diameter={150}>
          <PSBIconLight sx={{ fontSize: 90 }} />
        </NeonCircle>

        <NeonText
          variant="h2"
          fontFamily="Ephesis"
          color="pink"
          mt={2}
        >
          Patricia Siqueira
        </NeonText>

        <Paper
          elevation={1}
          sx={{
            marginTop: 4,
            padding: "2rem 1rem",
            width: "100%",
            minHeight: "16rem",
          }}
        >
          {children}
        </Paper>
      </Box>
    </Container>
  );
}
