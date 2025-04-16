import { createTheme } from "@mui/material";

// Create and export theme
export const theme = createTheme({
  palette: {
    primary: {
      main: "#D4A537",
      light: "#e3b955",
      dark: "#b88c2e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1a1a1a",
      light: "#2c2c2c",
      dark: "#000000",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});
