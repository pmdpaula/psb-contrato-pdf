"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import Image from "next/image";
import logoPSB from "@/assets/psb-logo_bgdark.svg";
import { NeonText } from "./NeonText";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

export const Header = () => {
  const theme = useTheme();
  const isBreakpointSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isBreakpointMd = useMediaQuery(theme.breakpoints.up("md"));
  const isBreakpointLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <header>
      <Box width="100%" mb={isBreakpointLg ? 11 : isBreakpointMd ? 10 : isBreakpointSm ? 8 : 6}>
        <AppBar
          position="fixed"
          sx={{
            padding: isBreakpointSm ? 2 : 1,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(176, 109, 149, 0.2)",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-around" spacing={2}>
            <Image
              src={logoPSB}
              alt="logotipo com um bolo estilizado rosa e marrom a esquerda e a direita o nome Patricia Siqueira"
              width={isBreakpointLg ? 340 : isBreakpointMd ? 300 : 180}
            />

            <NeonText variant={isBreakpointLg ? "h3" : "h4"} fontFamily="Ephesis" color="pink">
              Contrato
            </NeonText>
          </Stack>
        </AppBar>
      </Box>
    </header>
  );
};
