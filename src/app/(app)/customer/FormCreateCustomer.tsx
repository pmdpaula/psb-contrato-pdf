"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import SaveIcon from "@mui/icons-material/Save";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import type { CreateCustomerDto } from "@/data/dto/customer-dto";
import { createCustomerDtoSchema } from "@/data/dto/customer-dto";

import { createCustomerAction } from "./action";
import { useCustomerContext } from "./CustomerContext";
import { StyledFormHelperText, StyledOutlinedInput } from "./FormCustomer";

export const FormCreateCustomer = () => {
  const { openForm, setOpenForm, setOpenAlertSnackBar } = useCustomerContext();

  const action = openForm.action;
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading, isValid, isDirty },
  } = useForm<CreateCustomerDto>({
    defaultValues: {
      registerNumber: "",
      email: "",
      phoneNumber1: "",
      phoneNumber2: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    resolver: zodResolver(createCustomerDtoSchema),
    mode: "all", // Valida onChange + onBlur
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(isLoading);

  useEffect(() => {
    setIsButtonDisabled(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (!isDirty) {
      setIsButtonDisabled(true);
    } else if (isDirty && !isValid) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [isDirty, isValid, action, isLoading]);

  const onSubmit: SubmitHandler<CreateCustomerDto> = async (data) => {
    const submitResponse = await createCustomerAction(data);

    setOpenForm({ open: false, action: "none" });

    setOpenAlertSnackBar({
      isOpen: true,
      success: submitResponse.success,
      message: submitResponse.message,
      errorCode: submitResponse.errors,
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
          <Stack
            spacing={2}
            sx={{ mt: 2 }}
          >
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
                  <InputLabel
                    htmlFor="name"
                    size="small"
                  >
                    Nome
                  </InputLabel>

                  <StyledOutlinedInput
                    size="small"
                    id="name"
                    label="Nome"
                    {...field}
                    value={field.value || ""}
                    error={errors.name ? true : false}
                  />

                  <StyledFormHelperText component="p">
                    {errors.name?.message}
                  </StyledFormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="registerNumber"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.registerNumber ? true : false}
                  color={errors.registerNumber ? "error" : "secondary"}
                >
                  <InputLabel
                    size="small"
                    htmlFor="registerNumber"
                  >
                    CPF/CNPJ
                  </InputLabel>

                  <StyledOutlinedInput
                    size="small"
                    id="registerNumber"
                    label="CPF/CNPJ"
                    {...field}
                    value={field.value || ""}
                    error={errors.registerNumber ? true : false}
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
                    {errors.registerNumber?.message}
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
                  <InputLabel
                    size="small"
                    htmlFor="email"
                  >
                    E-mail
                  </InputLabel>

                  <StyledOutlinedInput
                    size="small"
                    id="email"
                    label="E-mail"
                    {...field}
                    value={field.value || ""}
                    error={errors.email ? true : false}
                  />

                  <StyledFormHelperText component="p">
                    {errors.email?.message}
                  </StyledFormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="phoneNumber1"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.phoneNumber1 ? true : false}
                  color={errors.phoneNumber1 ? "error" : "secondary"}
                >
                  <InputLabel
                    size="small"
                    htmlFor="phoneNumber1"
                  >
                    Telefone 1
                  </InputLabel>

                  <StyledOutlinedInput
                    size="small"
                    id="phoneNumber1"
                    label="Telefone 1"
                    {...field}
                    value={field.value || ""}
                    error={errors.phoneNumber1 ? true : false}
                  />

                  <StyledFormHelperText component="p">
                    {errors.phoneNumber1?.message}
                  </StyledFormHelperText>
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
                  <InputLabel
                    size="small"
                    htmlFor="phoneNumber2"
                  >
                    Telefone 2
                  </InputLabel>

                  <StyledOutlinedInput
                    size="small"
                    id="phoneNumber2"
                    label="Telefone 2"
                    {...field}
                    value={field.value || ""}
                    error={errors.phoneNumber2 ? true : false}
                  />

                  <StyledFormHelperText component="p">
                    {errors.phoneNumber2
                      ? errors.phoneNumber2.message
                      : "habilitado quando o telefone 1 for preenchido"}
                  </StyledFormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.address ? true : false}
                  color={errors.address ? "error" : "secondary"}
                >
                  <InputLabel
                    size="small"
                    htmlFor="address"
                  >
                    Endereço
                  </InputLabel>

                  <StyledOutlinedInput
                    size="small"
                    id="address"
                    label="Endereço"
                    {...field}
                    value={field.value || ""}
                    error={errors.address ? true : false}
                  />

                  <StyledFormHelperText component="p">
                    {errors.address?.message}
                  </StyledFormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.zipCode ? true : false}
                  color={errors.zipCode ? "error" : "secondary"}
                >
                  <InputLabel
                    size="small"
                    htmlFor="zipCode"
                  >
                    CEP
                  </InputLabel>

                  <StyledOutlinedInput
                    size="small"
                    id="zipCode"
                    label="CEP"
                    {...field}
                    value={field.value || ""}
                    error={errors.zipCode ? true : false}
                  />

                  <StyledFormHelperText component="p">
                    {errors.zipCode?.message}
                  </StyledFormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.city ? true : false}
                  color={errors.city ? "error" : "secondary"}
                >
                  <InputLabel
                    size="small"
                    htmlFor="city"
                  >
                    Cidade
                  </InputLabel>

                  <StyledOutlinedInput
                    size="small"
                    id="city"
                    label="Cidade"
                    {...field}
                    value={field.value || ""}
                    error={errors.city ? true : false}
                  />

                  <StyledFormHelperText component="p">
                    {errors.city?.message}
                  </StyledFormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.state ? true : false}
                  color={errors.state ? "error" : "secondary"}
                >
                  <InputLabel
                    size="small"
                    htmlFor="state"
                  >
                    Estado
                  </InputLabel>

                  <StyledOutlinedInput
                    size="small"
                    id="state"
                    label="Estado"
                    {...field}
                    value={field.value || ""}
                    error={errors.state ? true : false}
                  />

                  <StyledFormHelperText component="p">
                    {errors.state?.message}
                  </StyledFormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={errors.country ? true : false}
                  color={errors.country ? "error" : "secondary"}
                >
                  <InputLabel
                    size="small"
                    htmlFor="country"
                  >
                    País
                  </InputLabel>

                  <StyledOutlinedInput
                    size="small"
                    id="country"
                    label="País"
                    {...field}
                    value={field.value || ""}
                    error={errors.country ? true : false}
                  />

                  <StyledFormHelperText component="p">
                    {errors.country?.message}
                  </StyledFormHelperText>
                </FormControl>
              )}
            />
          </Stack>

          {
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              sx={{ mt: 5, height: 42 }}
              disabled={isButtonDisabled}
              startIcon={
                isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <SaveIcon fontSize="small" />
                )
              }
            >
              Salvar
            </Button>
          }
        </form>
      )}
    </>
  );
};
