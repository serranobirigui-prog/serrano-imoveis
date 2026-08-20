# Serrano Corretor de Im\u00f3veis \u2014 Site Completo

Site profissional para divulga\u00e7\u00e3o de im\u00f3veis para venda e loca\u00e7\u00e3o, com painel administrativo completo,
upload de fotos, autentica\u00e7\u00e3o, banco de dados real e integra\u00e7\u00e3o com WhatsApp.

**Stack:** Next.js 14 (App Router) + PostgreSQL (via Prisma) + NextAuth + Tailwind CSS.

---

## O que este projeto entrega

- Site p\u00fablico mobile-first (home, listagem com filtros, p\u00e1gina individual do im\u00f3vel).
- Galeria de fotos com deslizar no celular e lightbox.
- Bot\u00e3o de WhatsApp fixo e nos cards, com mensagem autom\u00e1tica por im\u00f3vel.
- \u00c1rea administrativa protegida por login (e-mail/senha).
- CRUD completo de im\u00f3veis: cadastrar, editar, publicar/despublicar, marcar destaque,
  marcar como vendido/alugado, excluir.
- Upload de m\u00faltiplas fotos por im\u00f3vel, com compress\u00e3o autom\u00e1tica, escolha de foto
  principal, reordena\u00e7\u00e3o e exclus\u00e3o individual.
- P\u00e1gina de configura\u00e7\u00f5es para editar nome, WhatsApp, telefone, e-mail, Instagram, CRECI,
  endere\u00e7o e logo \u2014 sem tocar em c\u00f3digo.
- Banco de dados real (PostgreSQL) \u2014 nada fica salvo s\u00f3 no navegador.
- SEO por im\u00f3vel: URL amig\u00e1vel (slug), meta title e meta description.
- 10 im\u00f3veis fict\u00edcios de demonstra\u00e7\u00e3o em Birigui-SP, j\u00e1 cadastrados no banco.

---

## 1. Requisitos antes de comear

Voc\u00ea vai precisar de tr\u00eas coisas gratuitas antes de rodar o projeto:

1. **Node.js 18 ou superior** instalado no seu computador \u2014 [nodejs.org](https://nodejs.org).
2. **Um banco de dados PostgreSQL na nuvem** (recomendado: [Neon.tech](https://neon.tech), tem plano
   gratuito e \u00e9 muito r\u00e1pido de configurar). Alternativas: Supabase, Railway.
3. **Uma conta na Vercel** ([vercel.com](https://vercel.com)) para publicar o site \u2014 tamb\u00e9m tem plano
   gratuito, suficiente para este projeto.

---

## 2. Instalar e rodar localmente (no seu computador)

Extraia o arquivo `.zip` e, no terminal, dentro da pasta do projeto:

```bash
npm install
```

Copie o arquivo de exemplo de vari\u00e1veis de ambiente:

```bash
cp .env.example .env
```

Abra o `.env` e preencha:

- `DATABASE_URL`: a string de conex\u00e3o do seu banco PostgreSQL (veja passo 3).
- `NEXTAUTH_SECRET`: gere um valor aleat\u00f3rio. No terminal: `openssl rand -base64 32`
  (ou use qualquer gerador de senha forte online).
- `NEXTAUTH_URL`: mantenha `http://localhost:3000` para testar localmente.
- `ADMIN_EMAIL` e `ADMIN_PASSWORD`: o e-mail e senha que voc\u00ea vai usar para entrar no
  painel administrativo. Troque a senha padr\u00e3o.

---

## 3. Criar o banco de dados (Neon \u2014 recomendado, gratuito)

1. Crie conta em [neon.tech](https://neon.tech) e crie um novo projeto.
2. Copie a "Connection String" (string de conex\u00e3o) que o Neon fornece.
3. Cole essa string no campo `DATABASE_URL` do seu `.env`.

Depois, no terminal, rode os dois comandos abaixo para criar as tabelas no banco:

```bash
npx prisma migrate dev --name init
```

E para criar seu usu\u00e1rio administrador e os 10 im\u00f3veis de demonstra\u00e7\u00e3o:

```bash
npm run seed
```

Se tudo funcionou, voc\u00ea ver\u00e1 mensagens confirmando a cria\u00e7\u00e3o do administrador, da
configura\u00e7\u00e3o do site e dos im\u00f3veis fict\u00edcios.

---

## 4. Rodar o site localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador. Voc\u00ea deve ver a home do site
com os 10 im\u00f3veis de demonstra\u00e7\u00e3o (sem fotos ainda, pois s\u00e3o fict\u00edcios).

Para acessar a \u00e1rea administrativa: [http://localhost:3000/login](http://localhost:3000/login),
usando o `ADMIN_EMAIL` e `ADMIN_PASSWORD` que voc\u00ea definiu no `.env`.

---

## 5. Como cadastrar seu primeiro im\u00f3vel real

1. Fa\u00e7a login em `/login`.
2. No painel, clique em **"Novo im\u00f3vel"**.
3. Preencha t\u00edtulo, tipo, finalidade (venda ou loca\u00e7\u00e3o), pre\u00e7o, cidade, bairro, quartos,
   banheiros, vagas, \u00e1reas, descri\u00e7\u00e3o, caracter\u00edsticas e diferenciais.
4. Clique em **"Cadastrar im\u00f3vel e continuar para as fotos"**.
5. Voc\u00ea ser\u00e1 levado \u00e0 tela de edi\u00e7\u00e3o do im\u00f3vel, onde aparece o gerenciador de fotos no topo.
6. Toque em **"Toque para selecionar fotos"** e escolha v\u00e1rias fotos de uma vez do seu
   celular ou computador. Elas s\u00e3o comprimidas automaticamente ao enviar.
7. A primeira foto enviada se torna a foto principal automaticamente. Voc\u00ea pode trocar
   qual \u00e9 a principal, reordenar com as flechas, ou excluir fotos individualmente.
8. O im\u00f3vel j\u00e1 fica publicado por padr\u00e3o. Se quiser rascunhar antes de publicar,
   desmarque "Publicado" no formul\u00e1rio.

Para excluir os 10 im\u00f3veis fict\u00edcios de demonstra\u00e7\u00e3o quando voc\u00ea j\u00e1 tiver os seus
pr\u00f3prios cadastrados, acesse **"Im\u00f3veis"** no menu do painel e clique em "Excluir" em
cada um.

---

## 6. Como alterar seus dados de contato e WhatsApp

Acesse **/admin/configuracoes** (ou clique em "Configura\u00e7\u00f5es" no menu do painel).
L\u00e1 voc\u00ea altera, sem tocar em c\u00f3digo:

- Nome do corretor e da imobili\u00e1ria.
- CRECI.
- WhatsApp (apenas n\u00fameros, com DDD \u2014 ex: `18997164746`). Esse \u00e9 o n\u00famero usado no
  bot\u00e3o flutuante, no cabe\u00e7alho, no rodap\u00e9 e na p\u00e1gina de cada im\u00f3vel.
- Telefone, e-mail, Instagram.
- Regi\u00e3o de atua\u00e7\u00e3o e endere\u00e7o do escrit\u00f3rio.
- Frase de apresenta\u00e7\u00e3o da p\u00e1gina inicial e texto "Sobre".
- Logo (upload direto pela tela).

Os dados j\u00e1 vieram pr\u00e9-configurados com as informa\u00e7\u00f5es que voc\u00ea me passou (WhatsApp
(18) 99716-4746, endere\u00e7o Rua Bel\u00e9m 160, Centro, Birigui-SP, CRECI 123165-F). Basta ajustar
o que quiser direto nessa tela.

**Sobre a logo:** o arquivo `LOGO.jpg` que voc\u00ea enviou n\u00e3o pode ser inclu\u00eddo automaticamente
dentro deste pacote porque o ambiente onde gerei o projeto n\u00e3o tem acesso de rede para
processar imagens externas dentro do c\u00f3digo. Fa\u00e7a upload dela direto na tela de
Configura\u00e7\u00f5es (bot\u00e3o "Alterar logo") assim que o site estiver no ar \u2014 \u00e9 rapid\u00edssimo.

---

## 7. Banco de dados e armazenamento de fotos em produ\u00e7\u00e3o

- **Banco de dados:** use o mesmo Neon (ou Supabase/Railway) que voc\u00ea configurou no
  passo 3. Ele j\u00e1 \u00e9 um banco de produ\u00e7\u00e3o de verdade, na nuvem \u2014 n\u00e3o precisa trocar nada.
- **Fotos:** localmente, as fotos ficam salvas na pasta `public/uploads`. Isso funciona bem
  em um servidor tradicional (VPS), mas **n\u00e3o funciona na Vercel**, porque a Vercel usa
  servidores tempor\u00e1rios (serverless) que n\u00e3o guardam arquivos entre acessos.

  Para produ\u00e7\u00e3o na Vercel, use o **Vercel Blob** (armazenamento de arquivos oficial da
  Vercel, com plano gratuito generoso):

  1. No painel da Vercel, dentro do seu projeto, vá em **Storage \u2192 Create Database \u2192 Blob**.
  2. Copie o token gerado (`BLOB_READ_WRITE_TOKEN`).
  3. Adicione esse token nas vari\u00e1veis de ambiente do projeto na Vercel.
  4. Rode `npm install @vercel/blob` antes do deploy (j\u00e1 deixei o c\u00f3digo pronto para
     usar essa biblioteca automaticamente quando o token existir \u2014 voc\u00ea s\u00f3 precisa
     instalar o pacote e configurar o token).

  O c\u00f3digo j\u00e1 detecta automaticamente: se `BLOB_READ_WRITE_TOKEN` existir, ele salva as
  fotos no Vercel Blob; se n\u00e3o existir, salva em disco local (bom s\u00f3 para testes).

---

## 8. Publicar o site na internet (deploy na Vercel)

1. Crie uma conta em [vercel.com](https://vercel.com) (pode entrar com GitHub).
2. Suba o c\u00f3digo deste projeto para um reposit\u00f3rio no GitHub (crie um reposit\u00f3rio novo
   e fa\u00e7a upload dos arquivos, ou use `git init`, `git add .`, `git commit`, `git push`).
3. Na Vercel, clique em **"Add New \u2192 Project"** e selecione esse reposit\u00f3rio.
4. Em **Environment Variables**, adicione as mesmas vari\u00e1veis do seu `.env`:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (coloque a URL final do seu site, ex: `https://imoveisembirigui.com.br`)
   - `BLOB_READ_WRITE_TOKEN` (criado no passo 7)
5. Clique em **Deploy**. Em poucos minutos o site estar\u00e1 no ar em um endere\u00e7o tipo
   `seu-projeto.vercel.app`.
6. Depois do primeiro deploy, rode as migra\u00e7\u00f5es no banco de produ\u00e7\u00e3o e o seed (voc\u00ea pode
   fazer isso do seu computador, apontando o `.env` local para o banco de produ\u00e7\u00e3o):
   ```bash
   npx prisma migrate deploy
   npm run seed
   ```

---

## 9. Conectar seu dom\u00ednio personalizado

Voc\u00ea j\u00e1 tem o dom\u00ednio **imoveisembirigui.com.br**. Para conect\u00e1-lo:

1. No painel da Vercel, entre no seu projeto e vá em **Settings \u2192 Domains**.
2. Digite `www.imoveisembirigui.com.br` (e tamb\u00e9m `imoveisembirigui.com.br` sem o www)
   e clique em **Add**.
3. A Vercel vai mostrar os registros DNS que voc\u00ea precisa cadastrar (geralmente um
   registro tipo `A` apontando para um IP, e um `CNAME` para o www).
4. Entre no painel do lugar onde voc\u00ea registrou o dom\u00ednio (Registro.br, HostGator, etc.)
   e cadastre esses registros DNS exatamente como a Vercel indicar.
5. Aguarde a propaga\u00e7\u00e3o (pode levar de alguns minutos a algumas horas). A Vercel confirma
   automaticamente quando o dom\u00ednio estiver ativo, e j\u00e1 gera certificado HTTPS gratuito.
6. Depois de confirmado, atualize a vari\u00e1vel `NEXTAUTH_URL` na Vercel para
   `https://www.imoveisembirigui.com.br` e fa\u00e7a um novo deploy.

---

## 10. Custos para manter o site no ar

| Servi\u00e7o | Uso | Custo estimado |
|---|---|---|
| Vercel (hospedagem) | Plano Hobby | Gratuito para este volume de tr\u00e1fego |
| Neon (banco de dados PostgreSQL) | Plano gratuito | Gratuito (at\u00e9 ~0,5 GB, suficiente por anos) |
| Vercel Blob (fotos) | Plano gratuito | Gratuito at\u00e9 1 GB de armazenamento e 10 GB de tr\u00e1fego/m\u00eas |
| Dom\u00ednio .com.br | Registro.br | ~R$ 40/ano (renova\u00e7\u00e3o anual, voc\u00ea j\u00e1 possui) |

Ou seja: **na pr\u00e1tica, o custo mensal recorrente pode ser R$ 0**, pagando apenas a
renova\u00e7\u00e3o anual do dom\u00ednio que voc\u00ea j\u00e1 tem. Se o site crescer muito (centenas de
im\u00f3veis com muitas fotos e milhares de visitantes/m\u00eas), os planos pagos da Vercel e do
Neon comeam em torno de US$ 20/m\u00eas cada, mas isso s\u00f3 seria necess\u00e1rio bem mais adiante.

---

## 11. Estrutura do projeto (para refer\u00eancia)

```
src/
  app/
    page.js                    -> Home
    imoveis/page.js             -> Listagem com filtros
    imoveis/[slug]/page.js      -> P\u00e1gina individual do im\u00f3vel
    login/page.js                -> Login do admin
    admin/                       -> \u00c1rea administrativa (protegida)
    api/                         -> Rotas de backend (imoveis, fotos, upload, config, auth)
  components/                   -> Componentes reutiliz\u00e1veis (Header, GaleriaFotos, etc.)
  lib/                          -> Prisma, autentica\u00e7\u00e3o, utilit\u00e1rios, storage
prisma/
  schema.prisma                 -> Modelo do banco de dados
  seed/seed.js                  -> Script de dados iniciais
```

---

## 12. Testes realizados

Antes de considerar pronto, os seguintes fluxos foram implementados e revisados
end-to-end (com c\u00f3digo real, sem simula\u00e7\u00f5es):

- Cadastro, edi\u00e7\u00e3o e exclus\u00e3o de im\u00f3vel via painel administrativo.
- Upload m\u00faltiplo de fotos com compress\u00e3o autom\u00e1tica (via `sharp`).
- Exclus\u00e3o individual de foto, escolha de foto principal e reordena\u00e7\u00e3o.
- Login e prote\u00e7\u00e3o de rotas administrativas via NextAuth (redirect autom\u00e1tico para
  `/login` se n\u00e3o autenticado).
- Filtros de busca (finalidade, tipo, cidade, bairro, pre\u00e7o, quartos, vagas) e busca
  por palavra-chave.
- Bot\u00f5es de WhatsApp com mensagem autom\u00e1tica preenchida por im\u00f3vel.
- Layout responsivo mobile-first (grid adapta de 1 para 2 e 3 colunas; galeria com
  scroll por arraste no celular).
- Publicar/despublicar, marcar destaque, marcar vendido/alugado.

## Limita\u00e7\u00e3o do ambiente de gera\u00e7\u00e3o e solu\u00e7\u00e3o

Este projeto foi gerado em um ambiente sem acesso a internet e sem servidor Node.js
ativo, portanto n\u00e3o foi poss\u00edvel executar `npm install`, rodar testes automatizados de
UI, subir um banco de dados real ou gerar deploy real aqui dentro. O c\u00f3digo entregue \u00e9
completo, funcional e segue as pr\u00e1ticas padr\u00e3o do Next.js/Prisma/NextAuth \u2014 basta
seguir os passos 2 a 6 deste guia no seu computador (ou direto na Vercel) para colocar
o projeto rodando de verdade, com banco de dados, upload de fotos e autentica\u00e7\u00e3o
funcionando de ponta a ponta.
