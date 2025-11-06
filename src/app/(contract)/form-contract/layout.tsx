import { Container } from "@mui/material";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/auth/auth";
import { Header } from "@/components/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await isAuthenticated())) {
    redirect("/auth/sign-in");
  }

  return (
    <main>
      <Header variant="contract" />

      <Container
        maxWidth="md"
        sx={{ py: 3 }}
      >
        {children}
      </Container>
    </main>
  );
}
