import { Button, TextField } from "@mui/material";
import Link from "next/link";

const ForgotPasswordPage = () => {
  return (
    <form action="">
      <TextField id="email" name="email" label="E-mail" variant="outlined" fullWidth />

      <Button type="submit" fullWidth variant="contained">
        Recuperar senha
      </Button>

      <Button variant="outlined" fullWidth>
        <Link href="/auth/sign-in">Acessar</Link>
      </Button>
    </form>
  );
};

export default ForgotPasswordPage;
