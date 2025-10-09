# 🟣 Jogaí — Frontend

**Jogaí** é uma plataforma onde usuários podem **trocar, vender ou emprestar jogos** de forma simples e moderna.  
Este repositório contém a interface web do projeto, desenvolvida com **Next.js** e **TailwindCSS**.

---

## 🚀 Tecnologias Utilizadas

- ⚡ [Next.js 14](https://nextjs.org/) — App Router
- 🟦 [TypeScript](https://www.typescriptlang.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🧱 [shadcn/ui](https://ui.shadcn.com/) — Componentes prontos e estilizados
- ✨ [Framer Motion](https://www.framer.com/motion/) — Animações modernas

---

## 📁 Estrutura de Pastas
```bash
src/
├─ app/
│ ├─ (public)/ # Páginas públicas: landing, login, registro
│ │ ├─ / home # Inicio
│ │ ├─ sign-in/ # Login
│ │ ├─ register/ # Cadastro de novo usuário
│ ├─ (private)/ # Páginas autenticadas: dashboard, games, profile
│ │ ├─ dashboard/
│ │ ├─ games/
│ │ │ ├─ game-details/
│ │ ├─ profile/
│ │ └─ layout.tsx
│ ├─ globals.css
│ └─ layout.tsx
├─ components/
│ ├─ ui/ # Botões, inputs, etc.
│ ├─ layout/ # Header, Footer, Sidebar
│ ├─ forms/ # Formulários (login, cadastro)
│ └─ cards/ # Cards de jogos, usuários, etc.
├─ lib/ # Funções utilitárias e helpers
└─ types/ # Tipagens globais TypeScript
```

---

## 🧪 Funcionalidades — Primeira Versão (MVP)

- 🌐 **Landing Page** — apresentação da plataforma + CTA para login/cadastro
- 🔐 **Login & Registro** — autenticação simulada localmente (backend será integrado depois)
- 🧭 **Dashboard** — visão geral do usuário, jogos disponíveis e ações rápidas
- 🕹 **Listagem de Jogos** — explorar jogos para troca, venda ou empréstimo
- 📝 **Detalhe do Jogo** — visualizar informações e opções (trocar, comprar, emprestar)
- 👤 **Perfil do Usuário** — jogos cadastrados e histórico de trocas/empréstimos

---

## 🛠️ Como Rodar o Projeto Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/jogai-frontend.git
cd jogai-frontend
```

### 2. Instalar dependências

`npm install`
ou
`yarn install`

### 3. Rodar o servidor de desenvolvimento

`npm run dev`
ou
`yarn dev`

O app ficará disponível em: http://localhost:3000

---

## 🧰 Comandos Úteis

| Comando         | Descrição                            |
| --------------- | ------------------------------------ |
| `npm run dev`   | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção               |
| `npm run start` | Inicia o servidor com a build gerada |
| `npm run lint`  | Verifica problemas de lint no código |

---

## 📝 Boas Práticas

• ✍️ Componentização: manter componentes reutilizáveis em src/components.

• 🧠 Separar responsabilidades: UI, lógica e tipagens bem organizadas.

• 🌈 Estilo consistente: Tailwind + shadcn/ui como base de design.

• 🧪 Testes: serão adicionados posteriormente para componentes críticos.

---

## 📌 Roadmap

• Criar estrutura inicial com rotas e layout base

• Desenvolver Landing Page

• Criar telas de Login e Registro

• Implementar Dashboard com listagem de jogos

• Adicionar modal de detalhes do jogo

• Integrar autenticação real (futura etapa backend)

• Melhorias de UI/UX e responsividade

---

## 👨‍💻 Autor

Jonatas Rosa Moura
Desenvolvedor Fullstack • JavaScript | TypeScript | Next.js | React Native
LinkedIn [Link Text](https://www.linkedin.com/in/jonatas-rosa-moura-235574193/) • GitHub [Link Text](https://github.com/jonatasrmoura).

---

## 🪪 Licença

Este projeto está licenciado sob a MIT License.
Sinta-se livre para usar e modificar conforme necessário.

---

Quer que eu **gere esse README.md como arquivo** para você baixar? (posso salvar e te mandar o link `.md`) 📝💾
# jogai-web
