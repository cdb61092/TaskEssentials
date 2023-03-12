import { api } from "../utils/api";
import { useState } from "react";

export default function Register() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { mutate } = api.user.register.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      email: formValues.email,
      password: formValues.password,
      name: formValues.name,
    });
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="email"
          placeholder="email"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          value={formValues.password}
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
        />
        <input
          type="text"
          id="name"
          placeholder="name"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
        />
        <input type="submit" placeholder="submit" />
      </form>
    </div>
  );
}
