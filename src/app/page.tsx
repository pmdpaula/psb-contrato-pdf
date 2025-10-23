import { Container } from "@mui/material";
import FormContract from "@/components/FormContract";

const HomePage = () => {
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ py: 3 }}>
        <FormContract />
      </Container>
    </>
  );
};

export default HomePage;
