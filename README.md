# Meu Relógio dos Remédios

Tecnologia educacional (Enfermagem, UEPA) sobre uso seguro de medicamentos e adesão ao tratamento por pessoas idosas.
Ferramenta educativa: não prescreve nem altera doses. Siga sempre a receita.

## Publicar no GitHub Pages
1. Crie um repositório e envie os 3 arquivos: `index.html`, `google-agenda.js`, `README.md`.
2. Em Settings > Pages, escolha Deploy from a branch, branch `main`, pasta `/ (root)`.
3. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Sem nenhuma configuração (já funciona)
Cada remédio tem botões 📅 que abrem o Google Agenda com tudo preenchido. A pessoa só toca em Salvar.
Depois, no evento, coloque o aviso em 0 minutos antes.

## Opcional: Entrar com Google e enviar todos de uma vez
1. Acesse console.cloud.google.com e crie um projeto.
2. Ative a Google Calendar API.
3. Tela de consentimento OAuth: tipo Externo, escopo `https://www.googleapis.com/auth/calendar.events`.
4. Em modo Teste, adicione como usuários de teste os e-mails que vão usar (até 100). Para qualquer pessoa usar, o Google exige verificação do app, com política de privacidade (dados de saúde: LGPD).
5. Credenciais > ID do cliente OAuth > Aplicativo da Web. Em origens JavaScript autorizadas coloque `https://SEU-USUARIO.github.io` (sem caminho).
6. Cole o ID em `google-agenda.js`, na linha `CLIENT_ID`.
7. O ID do cliente é público. Nunca coloque chave secreta no repositório.

Com isso, aparece "Entrar com Google" na aba Remédios. O envio cria os eventos repetidos, com aviso na hora (0 minuto).
Alterações feitas depois no app não atualizam eventos já enviados: edite ou apague no Google Agenda.

## Privacidade
Os dados ficam no navegador do aparelho. O link de compartilhamento leva nome e remédios do paciente: envie só a quem deve receber.
