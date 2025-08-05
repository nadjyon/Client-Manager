import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface ClientFormProps {
  onSuccess: () => void;
  clientToEdit?: Client | null;
  onCancelEdit?: () => void;
}

export default function ClientForm({ onSuccess, clientToEdit, onCancelEdit }: ClientFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  // Atualiza token sempre que precisar
  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    if (clientToEdit) {
      setName(clientToEdit.name);
      setEmail(clientToEdit.email);
      setPhone(clientToEdit.phone);
      setCompany(clientToEdit.company);
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
    }
  }, [clientToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      setError("Você precisa estar logado para salvar um cliente.");
      return;
    }

    const data = { name, email, phone, company };

    try {
      if (clientToEdit?.id) {
        await api.put(`/clients/${clientToEdit.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post('/clients', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Limpa o formulário
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setError('');
      onSuccess();
      if (onCancelEdit) onCancelEdit();
    } catch (err: any) {
      console.error("Erro ao salvar cliente:", err.response || err);
      setError('Erro ao salvar cliente');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">{clientToEdit ? 'Editar Cliente' : 'Novo Cliente'}</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
        className="border p-2 w-full text-black"
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full text-black"
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full text-black"
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full text-black"
        type="text"
        placeholder="Empresa"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <div className="flex gap-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          {clientToEdit ? 'Atualizar' : 'Criar'}
        </button>
        {clientToEdit && (
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onCancelEdit}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
