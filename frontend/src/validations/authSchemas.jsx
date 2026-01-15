import * as Yup from "yup";

export const emailValidation = Yup.string()
  .trim()
  .lowercase()
  .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email must end with @gmail.com")
  .required("Email is required");

export const passwordValidation = Yup.string()
  .required("Password is required")
  .min(8, "• Minimum 8 characters required")
  .matches(/[A-Za-z]/, "• Must contain at least 1 alphabet")
  .matches(/\d/, "• Must contain at least 1 number")
  .matches(/[@$!%*?#_&]/, "• Must contain at least 1 special character");


export const mobileValidation = Yup.string()
  .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
  .required("Mobile number is required");

export const signupSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(
      /^[A-Za-z\s'-]+$/,
      "Name can only contain letters, spaces, apostrophes, and hyphens"
    ),

    email: emailValidation,
    mobileno: mobileValidation,
    password: passwordValidation,
});

export const loginSchema = Yup.object({
  email: emailValidation,
});

export const otpSchema = Yup.object({
  email: emailValidation,
});