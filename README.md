# Senai Notes (Angular)
 
Senai Notes é uma aplicação web que implementa a experiência de criar, organizar e revisar notas com Angular 20. O foco é fornecer uma interface moderna para usuários autenticados gerenciarem suas anotações em qualquer dispositivo.

## Demonstração
<img height="941" alt="image" src="https://github.com/user-attachments/assets/0bcaf23e-6473-4ebd-933e-3ed78850f7e6" />

### Aplicação publicada
https://senai-notes-angular-jul-25.vercel.app/

Usuário de teste:
  - E-mail: front@email.com
  - Senha: frontdomina 

## Funcionalidades principais

- **Autenticação** com guarda de rotas; tokens JWT são persistidos no `localStorage`.
- **Cadastro de usuário** com fluxo de criação e redirecionamento automático para login.
- **Lista de notas** com carregamento dinâmico da API e visualização em cards.
- **Criação de notas** com dados padrão, imagem ilustrativa e feedback imediato ao usuário.
- **Edição completa** de título, descrição, etiquetas e imagem (preview local da imagem enviada).
- **Filtros por etiquetas** consumindo o catálogo fornecido pela API.
- **Excluir notas** notas diretamente da tela principal.

## Arquitetura e tecnologias

- Angular 20 com componentes standalone e `ChangeDetection` manual onde necessário.
- TypeScript 5.9 e RxJS para composições assíncronas (`firstValueFrom`).
- Angular Router com guarda de autenticação (`authGuard`) e lazy loading de componentes.
- Angular Forms: reativos para telas de login/cadastro e template-driven para edição de notas.
- HTTPClient para buscas/cadastro/login e `fetch` nativo para operações de atualização pontual.
- Font Awesome via CDN para ícones.
- Deploy contínuo na Vercel, consumindo a API `https://senai-gpt-api.azurewebsites.net/`.

## Integração com a API

| Recurso | Rotas consumidas |
|---------|-----------------|
| Autenticação | `POST /login` |
| Usuários | `POST /users` |
| Notas | `GET /senainotes/notes`, `POST /senainotes/notes`, `PUT /senainotes/notes/{id}`, `PATCH /senainotes/notes/{id}`, `DELETE /senainotes/notes/{id}` |
| Etiquetas | `GET /senainotes/tags` |

Os tokens retornados no login são salvos localmente e enviados via header `Authorization` quando presentes.

## Organização do código

- `src/app/components`: componentes reutilizáveis (`header`, `left-panel`, `notes-list`, `note`, `note-options`).
- `src/app/notes-screen`: composição da tela principal com comunicação entre componentes.
- `src/app/user-module`: telas de autenticação (`login` e `novo usuário`).
- `src/app/auth.guard.ts`: guarda de rota que bloqueia acesso sem token.
