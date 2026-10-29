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

## Privacidade
Os dados ficam no navegador do aparelho. O link de compartilhamento leva nome e remédios do paciente: envie só a quem deve receber.

## Sincronização (versão 2)
- Cada evento guarda o ID do Google. Ao editar um remédio, o evento é atualizado. Ao excluir um remédio ou um horário, o evento é removido.
- Sem internet ou com erro, a alteração fica pendente e os horários continuam salvos no aplicativo. A sincronização roda de novo ao voltar a internet ou ao tocar em Sincronizar agora.
- O acesso do Google dura cerca de 1 hora. Depois, é preciso tocar em Entrar com o Google.
- Se o evento for apagado ou alterado direto no Google Agenda, o app recria ou corrige na próxima sincronização.

## Limites conhecidos
- O som do alerta depende do celular, das permissões e do modo silencioso. Não dá para garantir som estridente só com o Google Agenda.
- Testar em aparelhos reais (Android e iPhone) antes de usar com pacientes.

## Datas de início e término
Cada remédio pode ter data de início e de término. Fora do período ele não aparece nas doses do dia, e o evento do Google começa na data de início e a série termina no término (UNTIL).

## Rodar os testes automatizados

O projeto inclui 76 verificações automatizadas. Com Node.js 24.15.0 ou mais recente dentro da linha 24, rode na raiz do repositório:

```sh
npm install
npm test
```

O GitHub Actions executa o mesmo autoteste em cada push e pull request. O processo retorna código de falha quando qualquer verificação não passa.
