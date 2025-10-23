"use client";

import { NeonText } from "./NeonText";
import { OptionsMenu } from "./OptionsMenu";
import { Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Image from "next/image";
import logoPSB from "@/assets/psb-logo_bgdark.svg";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Header = () => {
  const theme = useTheme();
  const isBreakpointSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isBreakpointMd = useMediaQuery(theme.breakpoints.up("md"));
  const isBreakpointLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <header>
      <Box width="100%" mb={isBreakpointLg ? 13 : isBreakpointMd ? 12 : isBreakpointSm ? 10 : 8}>
        <AppBar
          position="fixed"
          sx={{
            padding: isBreakpointSm ? 2 : 1,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(176, 109, 149, 0.2)",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-around" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Paper
                elevation={0}
                sx={{ p: 1.2, bgcolor: "rgba(255, 255, 255, 0.1)", borderRadius: "50%" }}
              >
                <Image
                  src={logoPSB}
                  alt="logotipo com um bolo estilizado rosa e marrom a esquerda e a direita o nome Patricia Siqueira"
                  width={isBreakpointLg ? 50 : isBreakpointMd ? 25 : 15}
                />
              </Paper>

              <NeonText variant={isBreakpointLg ? "h3" : "h5"} fontFamily="Ephesis" color="pink">
                Patricia Siqueira
              </NeonText>
            </Stack>

            <Typography variant={isBreakpointLg ? "h3" : "h5"} color="pink">
              Contrato
            </Typography>

            <OptionsMenu />
          </Stack>
        </AppBar>
      </Box>
    </header>
  );
};
