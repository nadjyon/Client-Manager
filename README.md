# 📌 Client Manager — Sistema de Gerenciamento de Clientes

Aplicação **React + TypeScript + Tailwind CSS** para gerenciamento de clientes, com autenticação via **JWT** e integração completa com uma **API REST**.

---

## 🚀 Funcionalidades

- **Autenticação de Usuário**
  - Login e Registro com validação de formulários (Zod + React Hook Form)
  - Armazenamento seguro do token JWT no `localStorage`
  - Redirecionamento automático para a tela de clientes após login

- **CRUD de Clientes**
  - Listar todos os clientes
  - Criar novo cliente
  - Editar cliente existente
  - Excluir cliente
  - Formulário responsivo com validação

- **Experiência de Usuário**
  - Layout responsivo com **Tailwind CSS**
  - Feedback visual de erros e carregamento
  - Mensagem para lista vazia

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- [React 18+](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) + [@hookform/resolvers](https://github.com/react-hook-form/resolvers)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### **Ferramentas de Build e Dev**
- [Vite](https://vitejs.dev/)
- [PostCSS](https://postcss.org/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [ESLint](https://eslint.org/)

---

## 📂 Estrutura de Pastas

src/
├── components/
│ ├── forms/
│ │ └── ClientForm.tsx
│ └── layout/ # (se houver)
├── context/ # (AuthContext removido)
├── pages/
│ ├── auth/
│ │ ├── LoginPage.tsx
│ │ └── RegisterPage.tsx
│ └── clients/
│ └── ClientsPage.tsx
├── services/
│ └── api.ts
├── types/ # (tipos globais, se houver)
├── utils/ # (funções auxiliares, se houver)
├── App.tsx
├── main.tsx
└── index.css

1 Instalar dependências

npm install


2 Configurar o Tailwind CSS (já configurado no projeto)
Caso precise reinstalar:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p



3 Configurar a API

A API utilizada está hospedada em:
https://goon-teste-api-production.up.railway.app/api


Endpoints:

POST /auth/register → Registro

POST /auth/login → Login

GET /clients → Lista de clientes (JWT)

POST /clients → Criação (JWT)

PUT /clients/:id → Edição (JWT)

DELETE /clients/:id → Exclusão (JWT)



O token JWT é enviado no header:

Authorization: Bearer seu_token_aqui


4  Rodar o projeto
npm run dev


O app estará disponível em:
http://localhost:5173


👨‍💻 Autor
Robert Oliveira
Desenvolvedor Frontend | Java | Web | Python | IoT
📧 Email: robertdoliveira23@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/robertoliveira2301