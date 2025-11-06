"use client";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import { useRouter } from "next/navigation";
import { useFormState } from "@/hook/use-form-state";

import { signUpAction } from "./actions";

export const SignUpForm = () => {
  const router = useRouter();
  const theme = useTheme();

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push("/auth/sign-up");
    },
  );

  return (
    <>
      {success === false && message && (
        <Snackbar
          open={success === false && message.length > 0}
          autoHideDuration={5000}
          // onClose={handleClose}
        >
          <Alert
            severity="error"
            variant="outlined"
          >
            <AlertTitle>Erro no login</AlertTitle>
            <Typography>{message}</Typography>
          </Alert>
        </Snackbar>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <Box mb={3}>
          <TextField
            id="name"
            name="name"
            label="Nome"
            variant="outlined"
            fullWidth
          />

          <Box height={6}>
            <Typography
              variant="caption"
              color="error"
            >
              {errors && errors.name && errors.name.errors[0]}
            </Typography>
          </Box>
        </Box>

        <Box mb={3}>
          <TextField
            id="email"
            name="email"
            label="E-mail"
            variant="outlined"
            fullWidth
          />

          <Box height={6}>
            <Typography
              variant="caption"
              color="error"
            >
              {errors && errors.email && errors.email.errors[0]}
            </Typography>
          </Box>
        </Box>

        <Box mb={3}>
          <TextField
            type="password"
            id="password"
            name="password"
            label="Senha"
            variant="outlined"
            fullWidth
          />

          <Box height={6}>
            <Typography
              variant="caption"
              color="error"
            >
              {errors && errors.password && errors.password.errors[0]}
            </Typography>
          </Box>
        </Box>

        <Box mb={3}>
          <TextField
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            label="Confirme a senha"
            variant="outlined"
            fullWidth
          />

          <Box height={6}>
            <Typography
              variant="caption"
              color="error"
            >
              {errors &&
                errors.password_confirmation &&
                errors.password_confirmation.errors[0]}
            </Typography>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          fullWidth
          sx={{ height: 36 }}
        >
          {isPending ? (
            <CircularProgress
              enableTrackSlot
              size={22}
            />
          ) : (
            "Criar conta"
          )}
        </Button>

        <Box
          textAlign="center"
          my={3}
        >
          <Typography color="GrayText">
            Já cadastrado?
            <Link
              href="/auth/sign-in"
              style={{ color: theme.palette.primary.main, marginLeft: 3 }}
            >
              Acessar
            </Link>
          </Typography>
        </Box>
      </form>

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
