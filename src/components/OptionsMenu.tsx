"use client";

import { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { useMediaQuery, useTheme } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PreviewIcon from "@mui/icons-material/Preview";
import FiberNewIcon from "@mui/icons-material/FiberNew";

import FullScreenDialog from "./FullScreenDialog";

import { getCookie, deleteCookie, hasCookie } from "cookies-next";
import { generatePdfAsModel } from "@/app/actions";

export const OptionsMenu = () => {
  const theme = useTheme();

  // const isBreakpointXs = useMediaQuery(theme.breakpoints.up("xs"));
  // const isBreakpointSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isBreakpointMd = useMediaQuery(theme.breakpoints.up("md"));
  const isBreakpointLg = useMediaQuery(theme.breakpoints.up("lg"));

  const [openPreview, setOpenPreview] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isFormDataAvailable = hasCookie("formData");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGeneratePdf = async () => {
    const formData = await getCookie("formData");
    generatePdfAsModel(formData ? JSON.parse(formData as string) : null);
    setAnchorEl(null);
  };

  function togglePreview() {
    // e.preventDefault();
    setOpenPreview((prev) => !prev);
    setAnchorEl(null);
  }

  function clearForm() {
    deleteCookie("formData");
    setAnchorEl(null);
    // Foi usado com window.location.href pois o router.refresh() não altera as variáveis setadas com useState
    window.location.href = "/";
  }

  return (
    <>
      {useMediaQuery(theme.breakpoints.down("md")) && (
        <Stack spacing={2}>
          <IconButton
            id="menu-options-button"
            aria-controls={open ? "menu-options-list" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            // aria-label="menu"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="menu-options-list"
            aria-labelledby="open-close-button"
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
          >
            <MenuList autoFocusItem={open}>
              <MenuItem onClick={handleGeneratePdf} disabled={!isFormDataAvailable}>
                <PictureAsPdfIcon fontSize="small" sx={{ mr: 1.5 }} />
                Gerar PDF
              </MenuItem>
              <MenuItem onClick={togglePreview}>
                <PreviewIcon fontSize="small" sx={{ mr: 1.5 }} />
                Rascunho
              </MenuItem>
              <MenuItem onClick={clearForm}>
                <FiberNewIcon fontSize="small" sx={{ mr: 1.5 }} />
                Limpar Formulário
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      )}

      {(isBreakpointMd || isBreakpointLg) && (
        <Stack direction="row" justifyContent="right" spacing={2}>
          <Button type="button" onClick={togglePreview} variant="outlined" size="small">
            <PreviewIcon fontSize="small" sx={{ mr: 1.5 }} />
            Rascunho
          </Button>

          <Button type="button" onClick={clearForm} variant="outlined" size="small">
            <FiberNewIcon fontSize="small" sx={{ mr: 1.5 }} />
            Limpar Formulário
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            onClick={handleGeneratePdf}
          >
            <PictureAsPdfIcon fontSize="small" sx={{ mr: 1.5 }} />
            Gerar PDF
          </Button>
        </Stack>
      )}

      <FullScreenDialog isOpened={openPreview} onClose={togglePreview} />
    </>
  );
};
