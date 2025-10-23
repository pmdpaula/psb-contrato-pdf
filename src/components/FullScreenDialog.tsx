import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import PreviewFile from "./PreviewFile";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { NeonText } from "./NeonText";
import logoPSB from "@/assets/psb-logo_bgdark.svg";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogProps {
  isOpened: boolean;
  onClose: () => void;
}

const FullScreenDialog = ({ isOpened = false, onClose }: FullScreenDialogProps) => {
  const theme = useTheme();
  // const isBreakpointSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isBreakpointMd = useMediaQuery(theme.breakpoints.up("md"));
  const isBreakpointLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Dialog
      fullScreen
      open={isOpened}
      onClose={onClose}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar sx={{ position: "relative", p: isBreakpointMd ? 1 : 0.5 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{ flexGrow: 1, ml: isBreakpointLg ? 2 : 0.5 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Image
                src={logoPSB}
                alt="logotipo com um bolo estilizado rosa e marrom a esquerda e a direita o nome Patricia Siqueira"
                width={isBreakpointLg ? 60 : isBreakpointMd ? 40 : 20}
              />

              <NeonText variant={isBreakpointLg ? "h3" : "h4"} fontFamily="Ephesis" color="pink">
                Patricia Siqueira
              </NeonText>
            </Stack>

            <Typography variant={isBreakpointLg ? "h3" : "h4"} fontFamily="Ephesis" color="pink">
              Rascunho
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <PreviewFile />
    </Dialog>
  );
};

export default FullScreenDialog;
