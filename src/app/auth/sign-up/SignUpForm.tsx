"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoginIcon from "@mui/icons-material/Login";
import SaveIcon from "@mui/icons-material/Save";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Snackbar,
  type SnackbarCloseReason,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { type SignUpFormData, signUpSchema } from "@/data/dto/user-dto";

import { signUpAction } from "./actions";

type AlertType = {
  isOpen: boolean;
  success: boolean;
  message: string;
  errorCode: string | number | null;
};

export const SignUpForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading, isValid, isDirty },
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(signUpSchema),
    mode: "all", // Valida onChange + onBlur
  });

  const [openAlert, setOpenAlert] = useState({
    isOpen: false,
    success: true,
    message: "",
    errorCode: null,
  } as AlertType);

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    const submitResponse = await signUpAction(data);

    setOpenAlert({
      isOpen: true,
      success: submitResponse.success,
      message: submitResponse.message,
      errorCode: submitResponse.errors,
    });

    // if (submitResponse.success) {
    //   setTimeout(() => {
    //     // redirect("/auth/sign-in");
    //     router.push("/auth/sign-in");
    //   }, 4000);
    // }
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
    <>
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

          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={errors.password ? true : false}
                color={errors.password ? "error" : "secondary"}
              >
                <InputLabel htmlFor="password">E-mail</InputLabel>
                <OutlinedInput
                  id="password"
                  label="E-mail"
                  type="password"
                  {...field}
                  value={field.value || ""}
                  sx={{
                    boxShadow: errors.password
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
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="password_confirmation"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={errors.password_confirmation ? true : false}
                color={errors.password_confirmation ? "error" : "secondary"}
              >
                <InputLabel htmlFor="password_confirmation">
                  Confirme a senha
                </InputLabel>
                <OutlinedInput
                  id="password_confirmation"
                  label="Confirme a senha"
                  type="password"
                  {...field}
                  value={field.value || ""}
                  sx={{
                    boxShadow: errors.password_confirmation
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
                  {errors.password_confirmation?.message}
                </FormHelperText>
              </FormControl>
            )}
          />

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

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Typography color="GrayText">Já cadastrado?</Typography>

            <Typography color="primary">
              <Link href="/auth/sign-in">Acessar</Link>
            </Typography>
          </Stack>
        </Stack>
      </form>

      <Snackbar
        open={openAlert.isOpen}
        autoHideDuration={20000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {openAlert.success ? (
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            action={
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => router.push("/auth/sign-in")}
              >
                <LoginIcon sx={{ mr: 1 }} /> Login
              </Button>
            }
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

      {/* <form
        action={signInWithGoogle}
        style={{ marginTop: 16 }}
      >
        <Button
          type="submit"
          variant="outlined"
          size="large"
          fullWidth
        >
          <Image
            src={googleIcon}
            alt="Google"
            height={24}
          />
          <span style={{ marginLeft: 8 }}>Cadastrar com Google</span>
        </Button>
      </form> */}
    </>
  );
};
