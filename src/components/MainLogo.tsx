import { Stack, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";

import { NeonCircle } from "./NeonCircle";
import { NeonText } from "./NeonText";
import { PSBIconLight } from "./PSBIcon";

export const MainLogo = () => {
  const theme = useTheme();
  const isBreakpointMd = useMediaQuery(theme.breakpoints.up("md"));
  const isBreakpointLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{ flexGrow: 1 }}
    >
      <Link href="/">
        <NeonCircle diameter={isBreakpointLg ? 60 : isBreakpointMd ? 40 : 30}>
          <PSBIconLight amplitude={100} />
        </NeonCircle>
      </Link>

      <NeonText
        variant={isBreakpointLg ? "h3" : "h5"}
        fontFamily="Ephesis"
        color="pink"
      >
        Patricia Siqueira
      </NeonText>
    </Stack>
  );
};
