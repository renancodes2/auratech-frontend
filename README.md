# AuraTech - Frontend

 ⚠️ **Algumas partes da estilização do front ainda não estão 100%, pois meu foco no momento é agilizar o back**
 
 ⚠️ **Projeto em desenvolvimento inicial** **[Clique aqui para ver o inicio do site](https://auratech-frontend.vercel.app)**

 ## 🏗️ Arquitetura do Gabinete

Este projeto utiliza uma estrutura distribuída com integração contínua:

* **Frontend:** [Next.js] hospedado na **Vercel**.
* **Backend:** **Spring Boot(Java 21)** rodando em **Docker** no **Render**.
* **Link do Backend:** [auratech-api-spring](https://github.com/renancodes2/auratech-api-spring)
* **Banco de Dados:** PostgreSQL via **Neon(aws)**.

## 🚀 Pipeline de CI/CD (GitHub Actions)
1.  **O GitHub Actions** valida o código (Type Check com TypeScript).
2.  **O Render** reconstrói a imagem Docker do backend e aplica as migrations do Prisma automaticamente.
3.  **A Vercel** atualiza o frontend para refletir as mudanças.

 ![Aura Prism Tower](https://res.cloudinary.com/di1of4dwo/image/upload/v1766442074/jc8b3qxrc1tte5vzb7rd.jpg)

## Sobre

Frontend da aplicação AuraTech desenvolvido com **Next.js** e **React**.

## O que já temos

### Autenticação
- Context de autenticação para gerenciar estado de usuário
- Integração com backend para login e registro
- Verificação de token e fetch de dados do usuário

### Página de Produtos
- Listagem de produtos
- Página de detalhes de produto com imagens
- Integração com API de produtos

### Carrinho de Compras
- Contexto para gerenciar carrinho
- Página de carrinho funcional

### Interface de Usuário
- Componentes UI baseados em shadcn/ui
- Componentes customizados e reutilizáveis

### Infraestrutura
- Next.js com App Router
- TypeScript configurado
- ESLint para qualidade de código
- Tailwind CSS para estilos
- Axios para requisições HTTP

## Deployment

 Hospedado na **Vercel** com CI/CD automático
