import { Stack, Typography } from "@mui/material";
import Link from "next/link";

import { NeonCard } from "@/components/NeonCard";

const HomePage = () => {
  return (
    <Stack
      spacing={6}
      // alignItems="center"
    >
      <Link href="/form-contract">
        <NeonCard>
          <Typography
            variant="h5"
            color="pink"
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            Formulário de contrato
          </Typography>
        </NeonCard>
      </Link>

      <Link href="/customer">
        <NeonCard>
          <Typography
            variant="h5"
            color="pink"
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            Clientes
          </Typography>
        </NeonCard>
      </Link>
    </Stack>
  );
};

export default HomePage;
