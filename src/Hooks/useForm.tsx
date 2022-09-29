import React from "react";

const types = {
  email: {
    regex:
      // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email Válido",
  },
};
const useForm = (type?: string) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  function validation(value: string): boolean {
    if (!type) return true;

    if (value.length === 0) {
      setError("Preencha um valor Valido");
      return false;
    } else if (type == "length") return true;
    else if (
      types[type as keyof typeof types] &&
      !types[type as keyof typeof types].regex.test(value)
    ) {
      setError(types[type as keyof typeof types].message);
      return false;
    } else {
      setError("");
      return true;
    }
  }

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    validation(target.value);
    setValue(target.value);
  }
  return {
    value,
    setValue,
    onChange,
    error,
    validation: () => validation(value),
    onBlur: () => validation(value),
  };
};

export default useForm;
