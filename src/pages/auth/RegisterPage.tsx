import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/services/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type RegisterData = z.infer<typeof schema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data: RegisterData) => {
    try {
      await api.post("/auth/register", data);
      navigate("/login");
    } catch (err) {
      setApiError("Erro ao registrar usuário");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Registrar</h2>
      {apiError && <p className="text-red-500 text-sm mb-3">{apiError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm">Nome</label>
          <input
            {...register("name")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Cadastrar
        </button>
      </form>
      <p className="text-sm mt-4">
  Já tem uma conta?{' '}
  <Link to="/login" className="text-blue-600 hover:underline">
    Faça login
  </Link>
</p>

    </div>
  );
}
