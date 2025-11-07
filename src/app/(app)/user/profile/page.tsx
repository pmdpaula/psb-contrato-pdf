import { Button } from "@mui/material";

import { ChangePasswordForm } from "./ChangePasswordForm";
import { UserProfile } from "./UserProfile";

const UserProfilePage = () => {
  return (
    <>
      <UserProfile />

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 5 }}
        href="/user/form-user"
      >
        Editar Perfil
      </Button>

      <ChangePasswordForm />
    </>
  );
};

export default UserProfilePage;
