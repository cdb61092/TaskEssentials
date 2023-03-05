import { useRouter } from "next/router";
import { api } from "../utils/api";

export default function Register() {
    const { query } = useRouter();
    const register = api.user.register.useMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register.mutate({
            email: 'test@test.com',
            password: 'test',
            name: 'test test'

        });
        
    }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="email"/>
      <input type="text" placeholder="password"/>
      <input type="text" placeholder="password"/>
      <input type="submit" placeholder="submit"/>
      </form>

    </div>
  );
}