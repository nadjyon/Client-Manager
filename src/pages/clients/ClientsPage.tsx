import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import ClientForm from '@/components/forms/ClientForm';
import { useNavigate } from 'react-router-dom';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchClients = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setClients([]);
      return;
    }

    api.get('/clients', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log("Resposta da API:", response.data);
        // Garante que clients sempre seja array
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.clients)
          ? response.data.clients
          : [];
        setClients(data);
      })
      .catch((err) => {
        console.error('Erro ao buscar clientes:', err);
        setError("Falha ao carregar clientes.");
        setClients([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await api.delete(`/clients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClients();
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
    }
  };

  const handleEdit = (client: Client) => setClientToEdit(client);
  const cancelEdit = () => setClientToEdit(null);

  if (loading) {
    return <p className="p-4">Carregando clientes...</p>;
  }

  if (!localStorage.getItem("token")) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-4">Você não está logado.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ir para o Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      {error && <p className="text-red-500">{error}</p>}

      <ClientForm
        onSuccess={fetchClients}
        clientToEdit={clientToEdit}
        onCancelEdit={cancelEdit}
      />

      {clients.length === 0 ? (
        <p className="text-gray-500 mt-4">Nenhum cliente cadastrado.</p>
      ) : (
        <ul className="space-y-2 mt-6">
          {clients.map((client) => (
            <li
              key={client.id}
              className="border p-4 rounded bg-white shadow flex justify-between items-center"
            >
              <div>
                <strong>{client.name}</strong> — {client.email} — {client.phone}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(client)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
