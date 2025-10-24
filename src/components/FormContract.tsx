"use client";

import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";

import { BatterOptions, FillingOptions, formSkeleton } from "@/data/formSkeleton";
import { NeonText } from "./NeonText";
import { getCookie, setCookie, hasCookie } from "cookies-next";

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

export const initialFormState: FormData = {
  nomeCliente: "",
  dadosContratada:
    "Patricia Edwiges Alves de Siqueira, confeiteira, representante da Patrícia Siqueira Bolos, localizada na rua Desembargador Izidro, 126 702 B - Tijuca - RJ , inscrita no CNPJ 29.384.426/0001-78",
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

const FormContract = () => {
  const [formData, setFormData] = useState<FormData>(initialFormState);

  useEffect(() => {
    const checkAvaibilityOfFormData = async () => {
      const isFormDataAvailable = hasCookie("formData");
      const availableFormData = isFormDataAvailable
        ? (JSON.parse((await getCookie("formData")) as string) as FormData)
        : initialFormState;

      setFormData(availableFormData);
    };

    checkAvaibilityOfFormData();
  }, []);

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

  const SectionLabel = ({ label }: { label: string }) => {
    return (
      <NeonText variant="h6" gutterBottom>
        {label}
      </NeonText>
    );
  };

  useEffect(() => {
    setCookie("formData", JSON.stringify(formData), {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 1 month
    });
  }, [formData]);

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
                  {field.name === "saldoBolo" ? (
                    <TextField
                      id={field.name}
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      value={Number(formData.valorBolo) - Number(formData.sinalBolo)}
                      disabled
                      fullWidth
                      size="small"
                    />
                  ) : (
                    (field.type === "text" ||
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
                        size="small"
                        multiline={field.type === "textarea"}
                        minRows={field.type === "textarea" ? 3 : undefined}
                      />
                    )
                  )}

                  {field.type === "selection" && (
                    <FormControl fullWidth size="small">
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
      </form>
    </>
  );
};

export default FormContract;
