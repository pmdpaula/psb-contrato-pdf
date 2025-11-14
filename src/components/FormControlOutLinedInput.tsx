import {
  FormControl,
  type FormControlProps,
  FormHelperText,
  OutlinedInput,
  styled,
} from "@mui/material";

const StyledFormControlOutLinedInput = styled(OutlinedInput)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.dark,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary.main,
    borderWidth: 2,
  },
}));

interface FormControlInputProps extends FormControlProps {
  action: string;
  errors: boolean;
  errorMessage?: string;
}

export const FormControlInput = ({
  // field,
  action,
  errorMessage,
  ...props
}: FormControlInputProps) => {
  return (
    <FormControl
      fullWidth
      // error={errors.name ? true : false}
      // color={errors.name ? "error" : "secondary"}
      disabled={action === "delete"}
      {...props}
    >
      {props.children}
      <FormHelperText
        component="p"
        sx={{
          display: "flex",
          textAlign: "end",
          alignSelf: "end",
          height: 6,
        }}
      >
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
};
