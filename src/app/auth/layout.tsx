import { redirect } from "next/navigation";

import { isAuthenticated } from "@/auth/auth";
import { Box, Container, Paper } from "@mui/material";

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
        justifyContent="center"
        alignItems="center"
        display="flex"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={1}
          sx={{
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
