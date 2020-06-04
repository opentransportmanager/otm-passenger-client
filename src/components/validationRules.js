import { extend } from "vee-validate";
import { required, email, max, min, confirmed } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
extend("confirmPassword", {
  ...confirmed,
  message: "{_field_} and the password have to match"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});
extend("min", {
  ...min,
  message: "{_field_} may not be smaller than {length} characters"
});

extend("email", {
  ...email,
  message: "Email must be valid"
});
