"use client";

import { useState } from "react";
import { generatePdfAsModel } from "@/app/actions";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { BatterOptions, FillingOptions, formSkeleton } from "@/data/formSkeleton";

export interface FormData {
  nomeCliente: string;
  dadosContratada: string;
  qtdFatias: string;
  massaBolo: string;
  recheio1: string;
  recheio2: string;
  recheio3: string;
  observacoesBolo: string;
  modeloBolo: string;
  valorBolo: string;
  sinalBolo: string;
  saldoBolo: string;
  formaPagamentoBolo: string;
  localEntrega: string;
  dataEntrega: string;
  horaEntrega: string;
  telefoneCliente: string;
  telefoneAdicional: string;
  nomeContatoEvento: string;
  telefoneContatoEvento: string;
}

const FormContract = () => {
  const initialFormState: FormData = {
    nomeCliente: "",
    dadosContratada:
      "Patricia Edwiges Alves de Siqueira, confeiteira, representante da Patrícia Siqueira Bolos, localizada na rua Desembargador Izidro, 126 702 B - Tijuca - RJ , inscrita no CPF : 02900486726",
    qtdFatias: "",
    massaBolo: "",
    recheio1: "",
    recheio2: "",
    recheio3: "",
    observacoesBolo: "",
    modeloBolo: "",
    valorBolo: "",
    sinalBolo: "",
    saldoBolo: "",
    formaPagamentoBolo: "",
    localEntrega: "",
    dataEntrega: "",
    horaEntrega: "",
    telefoneCliente: "",
    telefoneAdicional: "",
    nomeContatoEvento: "",
    telefoneContatoEvento: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  // }

  function handleSubmitModel(e: React.FormEvent) {
    e.preventDefault();
    generatePdfAsModel(formData);
  }

  const SectionLabel = ({ label }: { label: string }) => {
    return (
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
    );
  };

  return (
    <>
      <form>
        {formSkeleton.map((section) => (
          <Paper
            key={section.step}
            sx={{
              p: 2,
              mb: 2,
              // backgroundColor: "#65003dff" /* fallback for old browsers */,
              background:
                "linear-gradient(to top, #1e062bff, #65003dff)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
            }}
          >
            <SectionLabel label={section.label} />

            <Stack spacing={2} mb={2}>
              {section.fields.map((field) => (
                <Box key={field.name}>
                  {(field.type === "text" ||
                    field.type === "number" ||
                    field.type === "date" ||
                    field.type === "textarea") && (
                    <TextField
                      id={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      required={field.required}
                      disabled={field.disabled}
                      fullWidth
                      variant="filled"
                      // size="small"
                      multiline={field.type === "textarea"}
                      minRows={field.type === "textarea" ? 3 : undefined}
                      sx={{
                        border: "none",
                        // borderBottom: "2px solid #fff",
                        backgroundColor: "transparent",
                        color: "#fff",
                        outline: "none",
                        transition: "border-bottom-color 0.5s ease, box-shadow 0.5s ease",
                      }}
                    />
                  )}

                  {field.type === "selection" && (
                    <FormControl fullWidth>
                      <InputLabel id={`select-label-${field.name}`}>{field.label}</InputLabel>
                      <Select
                        labelId={`select-label-${field.name}`}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof FormData]}
                        label={field.label}
                        onChange={handleSelectChange}
                      >
                        {field.name === "massaBolo" &&
                          BatterOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        {field.name.startsWith("recheio") &&
                          FillingOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                </Box>
              ))}
            </Stack>
          </Paper>
        ))}

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmitModel}
            sx={{ minWidth: 200, height: 48 }}
          >
            Gerar Contrato Completo
          </Button>
        </Box>
      </form>
    </>
  );
};

export default FormContract;
