import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { api } from "@/services/api"; // Importando a instância da API

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginData = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await api.post("/auth/login", data);
      const { token, user } = response.data;

      // Salva token e usuário no localStorage
      localStorage.setItem("token", token);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      navigate("/clients");
    } catch (err) {
      setApiError("Email ou senha inválidos");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      {apiError && <p className="text-red-500 text-sm mb-3">{apiError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Senha</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        Não tem uma conta?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Cadastre-se aqui
        </Link>
      </p>
    </div>
  );
}
