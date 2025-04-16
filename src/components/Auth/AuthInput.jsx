import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function AuthInput({ LabelText, type = "text", sx, value, onChange, name }) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <TextField
            id="outlined-basic"
            label={LabelText}
            variant="outlined"
            name={name}
            value={value}
            onChange={onChange}
            type={type === "password" && showPassword ? "text" : type}
            sx={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "5px",
                "& label": { color: "white" }, // Change label color
                "& label.Mui-focused": { color: "white" }, // Label color when focused
                "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" }, // Default border color
                    "&:hover fieldset": { borderColor: "white" }, // Border color on hover
                    "&.Mui-focused fieldset": { borderColor: "white" }, // Border color when focused
                },
                ...sx,
            }}
            InputLabelProps={{
                style: { color: "#333" }, // Ensure label color is applied properly
            }}
            InputProps={{
                endAdornment:
                    type === "password" ? (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ) : null,
            }}
        />
    );
}

export default AuthInput;
