import CloseIcon from "@mui/icons-material/Close";
import { Container, Stack, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import * as React from "react";

import logoPSB from "@/assets/psb-logo_bgdark.svg";
import { NeonText } from "@/components/NeonText";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

interface FullScreenDialogProps {
  isOpened: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const FullScreenDialog = ({
  isOpened = false,
  title,
  onClose,
  children,
}: FullScreenDialogProps) => {
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
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            sx={{ flexGrow: 1, ml: isBreakpointLg ? 2 : 0.5 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <Image
                src={logoPSB}
                alt="logotipo com um bolo estilizado rosa e marrom a esquerda e a direita o nome Patricia Siqueira"
                width={isBreakpointLg ? 60 : isBreakpointMd ? 40 : 25}
              />

              <NeonText
                variant={isBreakpointLg ? "h3" : "h5"}
                fontFamily="Ephesis"
                color="pink"
              >
                {title}
              </NeonText>
            </Stack>

            {/* <Typography
              variant={isBreakpointLg ? "h3" : "h5"}
              color="pink"
            >
              {title}
            </Typography> */}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="sm"
        sx={{ p: 1 }}
      >
        {children}
      </Container>
    </Dialog>
  );
};

export default FullScreenDialog;
