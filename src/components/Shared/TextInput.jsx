import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";

export const TextInput = ({
  label,
  name,
  value,
  onChange,
  error = false,
  helperText = "",
  required = false,
  startIcon = null,
  endIcon = null,
  type = "text",
  inputProps = {},
  sx = {},
}) => {
  const inputPropsWithIcons = {
    ...inputProps,
    ...(startIcon && {
      startAdornment: (
        <InputAdornment position="start" sx={{ color: "#D4A537" }}>
          {startIcon}
        </InputAdornment>
      ),
    }),
    ...(endIcon && {
      endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment>,
    }),
  };

  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth
      required={required}
      InputProps={inputPropsWithIcons}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& fieldset": {
            borderColor: "#D4A537",
          },
          "&:hover fieldset": {
            borderColor: "#D4A537",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#D4A537",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#D4A537",
        },
        "& .MuiFormHelperText-root": {
          color: error ? "#f44336" : "inherit",
        },
        ...sx,
      }}
    />
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  type: PropTypes.string,
  inputProps: PropTypes.object,
  sx: PropTypes.object,
};

export default TextInput;
