"use client";

import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface NeonTextProps extends TypographyProps {
  children: React.ReactNode;
}

const StyledText = styled(Typography)<TypographyProps>(({ theme }) => ({
  textShadow: `0 0 9px ${theme.palette.primary.main}, 0 0 10px ${theme.palette.primary.main}, 0 0 15px ${theme.palette.primary.main}`,
  // color: "transparent",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

export const NeonText = ({ children, ...props }: NeonTextProps) => {
  return <StyledText {...props}>{children}</StyledText>;
};
