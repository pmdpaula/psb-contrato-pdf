import { Typography } from "@mui/material";
import Link from "next/link";

import { NeonCard } from "@/components/NeonCard";

const HomePage = () => {
  return (
    <>
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
    </>
  );
};

export default HomePage;
