export const commonTheme = {
  typography: {
    fontFamily: `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 17,
    h1: { fontWeight: 600 },
    h2: { fontWeight: 500 },
    button: { textTransform: "none" },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 20px",
        },

        containedPrimary: {
          backgroundColor: "#1976d2",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#125ca1",
          },
        },

        outlinedSecondary: {
          borderColor: "#19d222",
          color: "#19d222",
          "&:hover": {
            borderColor: "#125ca1",
            color: "#125ca1",
          },
        },

        containedSecondary: {
          backgroundColor: "#388e3c",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2e7030",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
         padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f44336",
          },
          "&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d32f2f",
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            color: "#d32f2f",
            fontWeight: 500,
          },
        },
      },
    },
  },
};
