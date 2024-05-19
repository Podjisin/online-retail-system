export const formatTimestamp = (timestamp) => {
  // Parse the timestamp string into a Date object
  const date = new Date(timestamp);

  // Options for formatting the date and time
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Format the date and time using the options
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
};
export const rules = {
  required: (value) => !!value || "Field is required!",
  number: (value) => {
    return !isNaN(value) || "Field must be a number!";
  },

  image: (value) => {
    if (!value) {
      // If no file is selected, return true (valid)
      return true;
    }

    // Check if the file has a valid type property
    if (!value[0] || typeof value[0].type !== "string") {
      return "File type is invalid!";
    }

    // Check if the file type is image/png or image/jpeg
    if (!(value[0].type === "image/png" || value[0].type === "image/jpeg")) {
      return "File must be an image (PNG or JPEG)!";
    }

    // Check if the file size is less than 2MB
    if (value[0].size > 2000000) {
      return "File size must be at most 2MB!";
    }

    // If all checks pass, return true (valid)
    return true;
  },
  email: (value) => {
    // Check if the email is valid
    if (!value || value === undefined) return "Email is required!";
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      )
    ) {
      return "Email is invalid!";
    }
    return true;
  },

  password: (value) => {
    // Check if the password is valid
    if (!value || value === undefined) return "Password is required!";
    if (value.length < 8) {
      return "Password must be at least 8 characters!";
    }
    return true;
  },

  confirmPassword: (pass, confirmPass) => {
    // Check if the password is valid
    if (!confirmPass || confirmPass === undefined)
      return "Confirm Password is required!";
    if (pass !== confirmPass) {
      return "Passwords do not match!";
    }
    return true;
  },
};
