"use client";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useFormState } from "@/hook/use-form-state";

import { signInWithEmailAndPassword } from "./actions";

export const SignInForm = () => {
  const theme = useTheme();
  // const isBreakpointSm = useMediaQuery(theme.breakpoints.up("sm"));
  // const isBreakpointMd = useMediaQuery(theme.breakpoints.up("md"));
  // const isBreakpointLg = useMediaQuery(theme.breakpoints.up("lg"));
  const router = useRouter();
  // const searchParams = useSearchParams();

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      router.push("/");
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

      <Stack
        spacing={4}
        mb={2}
        alignItems="center"
        justifyContent="center"
      >
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
        >
          <Box mb={3}>
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

            <Stack mb={3}>
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type="password"
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

              <Link
                href="/auth/forgot-password"
                style={{
                  alignSelf: "flex-end",
                  marginTop: 4,
                  fontSize: "0.875rem",
                  color: "GrayText",
                }}
              >
                Esqueceu a senha?
              </Link>
            </Stack>

            <Button
              variant="contained"
              type="submit"
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
                "Acessar"
              )}
            </Button>
          </Box>

          <Box
            textAlign="center"
            mb={2}
          >
            <Typography color="GrayText">
              Não tem conta?{" "}
              <Link
                href="/auth/sign-up"
                style={{ color: theme.palette.primary.main, marginLeft: 3 }}
              >
                Criar conta
              </Link>
            </Typography>
          </Box>
        </form>

        {/* <SignInGoogle /> */}
        {/* <form action={signInWithGoogle}>
          <Button type="submit" variant="outlined" className="w-full">
            <Image src={googleIcon} alt="Google" height={24} />
            <span style={{ marginLeft: 8 }}>Acessar com Google</span>
          </Button>
        </form> */}
      </Stack>
    </>
  );
};
