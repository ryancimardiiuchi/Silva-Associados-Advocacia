<div align="center">

<img width="1852" height="897" alt="Captura de tela 2026-11-08 052132" src="https://github.com/user-attachments/assets/4dede1ae-eb3a-4b7c-bae1-ed58afae034f" />

# ⚖️ Site de Advocacia — Silva & Associados

Landing page institucional para escritório de advocacia, com visual elegante em azul-marinho e dourado (`#B8A264`), totalmente responsiva e feita só com **HTML, CSS e JavaScript puro**.

<p>
  <img src="https://skillicons.dev/icons?i=html,css,js,git,vscode" alt="Tecnologias usadas">
</p>

</div>

---

## 📌 Sobre a página

Uma página única (one-page) pensada para apresentar o escritório, passar credibilidade e converter visitantes em contatos pelo WhatsApp.

### Seções

| Seção | O que faz |
|---|---|
| **Header** | Menu fixo com efeito de vidro ao rolar, destaque do link da seção atual e menu hambúrguer no celular |
| **Hero** | Título de impacto, botões de ação e contadores animados (anos de experiência, casos, satisfação) |
| **Sobre** | Apresentação do escritório com lista de diferenciais de atendimento |
| **Áreas de atuação** | Cards com imagem para Civil, Imigração, Empresarial e Família |
| **Diferenciais** | Quatro pilares do escritório: estratégia, transparência, agilidade e sigilo |
| **Equipe** | Apresentação dos advogados sócios |
| **Depoimentos** | Carrossel automático com setas e indicadores |
| **Dúvidas frequentes** | FAQ em sanfona (abre um item por vez) |
| **Contato** | Formulário com validação e envio direto para o WhatsApp |
| **Rodapé** | Logotipo, direitos e aviso legal da OAB |

### Recursos

- 🎨 Paleta dourada sobre fundo escuro e tipografia **Playfair Display** + **Inter**
- 📱 Layout responsivo (desktop, tablet e celular)
- ✨ Animações de entrada ao rolar a página (respeita `prefers-reduced-motion`)
- ✅ Validação do formulário com mensagens de erro e máscara de telefone
- 💬 Botão flutuante de WhatsApp
- 🔍 Meta tags básicas de SEO

---

## 🗂️ Estrutura do projeto

```
site-advogado/
├── index.html      # Estrutura e conteúdo da página
├── style.css       # Estilos, variáveis de cor e responsividade
├── script.js       # Menu, animações, carrossel, FAQ e formulário
├── README.md
└── img/            # Imagens e logotipo
```

---

## 🚀 Como rodar no seu dispositivo

Não precisa instalar nada: o projeto é estático.

### Opção 1 — Abrir direto no navegador (mais simples)

1. Baixe e **descompacte** o arquivo `site-advogado.zip`.
2. Abra a pasta `site-advogado`.
3. Dê **dois cliques** no arquivo `index.html`.

> 💡 Precisa de internet apenas para carregar as fontes do Google Fonts.

### Opção 2 — VS Code com Live Server (recomendado para editar)

1. Instale o [Visual Studio Code](https://code.visualstudio.com/).
2. Instale a extensão **Live Server**.
3. Abra a pasta do projeto (`Arquivo > Abrir Pasta`).
4. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

A página recarrega sozinha a cada alteração salva.

### Opção 3 — Servidor local pelo terminal

Com **Python** instalado:

```bash
cd site-advogado
python -m http.server 5500
```

Ou com **Node.js**:

```bash
cd site-advogado
npx serve .
```

Depois acesse `http://localhost:5500` (Python) ou o endereço mostrado no terminal (Node).

### Ver no celular (mesma rede Wi-Fi)

1. Rode o servidor local (Opção 2 ou 3).
2. Descubra o IP do computador (`ipconfig` no Windows, `ifconfig`/`ip a` no Linux e Mac).
3. No celular, acesse `http://SEU-IP:5500`.

---

## ✏️ Como personalizar

**Cores** — altere as variáveis no topo do `style.css`:

```css
:root {
  --gold: #B8A264;
  --bg: #0a111c;
}
```

**WhatsApp** — no `script.js`, troque o número (somente dígitos, com DDI e DDD):

```js
const WHATSAPP_NUMBER = '5500000000000';
```

E atualize também o link do botão flutuante (`wa.me/...`) no `index.html`.

**Textos e dados** — no `index.html`, substitua:

- Nome do escritório, telefone, e-mail, endereço e horário
- Nomes e números de OAB da equipe
- Depoimentos (use apenas relatos reais, conforme o Código de Ética da OAB)
- Estatísticas do hero (`data-count`)

**Imagens** — troque os arquivos da pasta `img/` mantendo os mesmos nomes, ou ajuste os caminhos no HTML.

---

## 🌐 Como publicar

Por ser um site estático, pode ser hospedado gratuitamente em:

- [Vercel](https://vercel.com/) · [Netlify](https://www.netlify.com/) · [GitHub Pages](https://pages.github.com/) · [Cloudflare Pages](https://pages.cloudflare.com/)

Basta enviar a pasta do projeto — não há etapa de build.

---

## ⚠️ Aviso

Este projeto é um **modelo**. Os nomes, depoimentos e dados de contato são ilustrativos e devem ser substituídos pelos dados reais do escritório antes da publicação.
