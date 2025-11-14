"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  type ChangePasswordProps,
  changeUserPasswordSchema,
} from "@/data/dto/user-dto";
import { getProfile } from "@/http/user/get-profile";
import type { AlertType } from "@/lib/alert";

import { changePasswordAction } from "./action";

// import { editUserAction } from "./action";

// type AlertType = {
//   isOpen: boolean;
//   success: boolean;
//   message: string;
//   errorCode: string | number | null;
// };

export const ChangePasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordProps>({
    defaultValues: async () => {
      const { user } = await getProfile();
      const normalizedData = {
        id: user.id,
        currentPassword: "",
        newPassword: "",
      };
      return normalizedData;
    },
    resolver: zodResolver(changeUserPasswordSchema),
    mode: "onBlur", // Valida onChange + onBlur
  });

  const [visiblePassword, setVisiblePassword] = useState(false);

  const [openAlert, setOpenAlert] = useState({
    isOpen: false,
    success: true,
    message: "",
    errorCode: null,
  } as AlertType);

  const onSubmit: SubmitHandler<ChangePasswordProps> = async (data) => {
    const { user } = await getProfile();

    const normalizedData = {
      ...data,
      id: user.id,
    };
    const submitResponse = await changePasswordAction(normalizedData);
    setOpenAlert({
      isOpen: true,
      success: submitResponse.success,
      message: submitResponse.message,
      errorCode: submitResponse.errors,
    });
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert({
      isOpen: false,
      success: true,
      message: "",
      errorCode: null,
    });
  };

  return (
    <Card sx={{ p: 4, mt: 8 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h6"
          margin={0}
          sx={{ flexGrow: 1 }}
        >
          Alterar Senha
        </Typography>

        <Box
          onClick={() => setVisiblePassword(!visiblePassword)}
          color="secondary.main"
        >
          {visiblePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </Box>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="currentPassword"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={errors.currentPassword ? true : false}
                color={errors.currentPassword ? "error" : "secondary"}
              >
                <InputLabel htmlFor="currentPassword">Senha atual</InputLabel>
                <OutlinedInput
                  id="currentPassword"
                  label="Senha atual"
                  type={visiblePassword ? "text" : "password"}
                  {...field}
                  value={field.value || ""}
                  sx={{
                    boxShadow: errors.currentPassword
                      ? "0px 0px 12px 2px rgba(255,0,0,0.5)"
                      : "",
                  }}
                />

                <FormHelperText
                  component="p"
                  sx={{
                    display: "flex",
                    textAlign: "end",
                    alignSelf: "end",
                    height: 6,
                  }}
                >
                  {errors.currentPassword?.message}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="newPassword"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={errors.newPassword ? true : false}
                color={errors.newPassword ? "error" : "secondary"}
              >
                <InputLabel htmlFor="newPassword">Nova senha</InputLabel>
                <OutlinedInput
                  id="newPassword"
                  label="Nova senha"
                  type={visiblePassword ? "text" : "password"}
                  {...field}
                  value={field.value || ""}
                  sx={{
                    boxShadow: errors.newPassword
                      ? "0px 0px 12px 2px rgba(255,0,0,0.5)"
                      : "",
                  }}
                />

                <FormHelperText
                  component="p"
                  sx={{
                    display: "flex",
                    textAlign: "end",
                    alignSelf: "end",
                    height: 6,
                  }}
                >
                  {errors.newPassword?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          sx={{ mt: 5, height: 42 }}
          // disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? (
            <CircularProgress
              enableTrackSlot
              size={24}
              color="warning"
            />
          ) : (
            <Stack
              direction="row"
              alignItems="start"
              justifyContent="center"
            >
              <SaveIcon sx={{ mr: 1 }} /> Salvar
            </Stack>
          )}
        </Button>
      </form>

      <Snackbar
        open={openAlert.isOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {openAlert.success ? (
          <Alert
            onClose={handleCloseAlert}
            severity="success"
          >
            {openAlert.message}
          </Alert>
        ) : (
          <Alert
            onClose={handleCloseAlert}
            severity="error"
          >
            {openAlert.message}
          </Alert>
        )}
      </Snackbar>
    </Card>
  );
};
