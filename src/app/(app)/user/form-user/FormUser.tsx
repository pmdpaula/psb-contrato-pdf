"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import SaveIcon from "@mui/icons-material/Save";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import type { UserDto } from "@/data/dto/user-dto";
import { userDtoSchema } from "@/data/dto/user-dto";
import { getProfile } from "@/http/get-profile";

import { editUserAction } from "./action";

type AlertType = {
  isOpen: boolean;
  success: boolean;
  message: string;
  errorCode: string | number | null;
};

export const FormUser = () => {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isLoading, isValid, isDirty },
  } = useForm<UserDto>({
    defaultValues: async () => {
      const { user } = await getProfile();
      return {
        ...user,
        avatarUrl: user.avatarUrl || "",
        phoneNumber1: user.phoneNumber1 || "",
        phoneNumber2: user.phoneNumber2 || "",
      };
    },
    resolver: zodResolver(userDtoSchema),
    mode: "all", // Valida onChange + onBlur
  });

  const [openAlert, setOpenAlert] = useState({
    isOpen: false,
    success: true,
    message: "",
    errorCode: null,
  } as AlertType);

  const onSubmit: SubmitHandler<UserDto> = async (data) => {
    const submitResponse = await editUserAction(data);
    console.log("🚀 ~ onSubmit ~ submitResponse:", submitResponse);
    setOpenAlert({
      isOpen: true,
      success: submitResponse.success,
      message: submitResponse.message,
      errorCode: submitResponse.errors,
    });
  };

  const userRolesOptions = userDtoSchema.shape.userRole.options;

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
    <>
      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.name ? true : false}
                  color={errors.name ? "error" : "secondary"}
                >
                  <InputLabel htmlFor="name">Nome</InputLabel>
                  <OutlinedInput
                    id="name"
                    label="Nome"
                    {...field}
                    value={field.value || ""}
                    sx={{
                      boxShadow: errors.name
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
                    {errors.name?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.email ? true : false}
                  color={errors.email ? "error" : "secondary"}
                >
                  <InputLabel htmlFor="email">E-mail</InputLabel>
                  <OutlinedInput
                    id="email"
                    label="E-mail"
                    {...field}
                    value={field.value || ""}
                    sx={{
                      boxShadow: errors.email
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
                    {errors.email?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            {/* // Campo avatarUrl não implantado neste formulário */}

            <Controller
              name="phoneNumber1"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.phoneNumber1 ? true : false}
                  color={errors.phoneNumber1 ? "error" : "secondary"}
                >
                  <InputLabel htmlFor="phoneNumber1">Telefone 1</InputLabel>
                  <OutlinedInput
                    id="phoneNumber1"
                    label="Telefone 1"
                    {...field}
                    value={field.value || ""}
                    sx={{
                      boxShadow: errors.phoneNumber1
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
                    {errors.phoneNumber1?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="phoneNumber2"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.phoneNumber2 ? true : false}
                  color={errors.phoneNumber2 ? "error" : "secondary"}
                >
                  <InputLabel htmlFor="phoneNumber2">Telefone 2</InputLabel>
                  <OutlinedInput
                    id="phoneNumber2"
                    label="Telefone 2"
                    disabled={!!errors.phoneNumber1 || !watch("phoneNumber1")}
                    {...field}
                    value={field.value || ""}
                    sx={{
                      boxShadow: errors.phoneNumber2
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
                    {errors.phoneNumber2
                      ? errors.phoneNumber2.message
                      : "habilitado quando o telefone 1 for preenchido"}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="userRole"
              control={control}
              render={({ field }) => (
                <Box>
                  <FormControl disabled>
                    <FormLabel id="user-role">Papel</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="user-role"
                      {...field}
                      onBlur={() => trigger("userRole")}
                      color={errors.userRole ? "error" : "secondary"}
                    >
                      {userRolesOptions.map((role) => (
                        <FormControlLabel
                          key={role}
                          value={role}
                          control={<Radio color="secondary" />}
                          label={role}
                        />
                      ))}
                    </RadioGroup>

                    <FormHelperText>{errors.userRole?.message}</FormHelperText>
                  </FormControl>

                  {/* <Typography
                    variant="caption"
                    color="error"
                    alignSelf="self-end"
                    textAlign="end"
                    sx={{ height: 6 }}
                  >
                    {errors.userRole?.message}
                  </Typography> */}
                </Box>
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
            disabled={isLoading || !isDirty || !isValid}
          >
            {isLoading ? (
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
      )}

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
            sx={{ width: "100%" }}
          >
            {openAlert.message}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};
