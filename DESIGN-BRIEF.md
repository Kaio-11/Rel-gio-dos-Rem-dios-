# Relógio dos Remédios: pacote para a IA de design

Projeto de Kaio (Enfermagem, UEPA), Grupo 1 de Tecnologias Educacionais. Ferramenta educativa para **pessoas idosas** usarem com ajuda de cuidador ou profissional. Sem prescrição e sem alterar doses.

**Pedido para a IA de design:** melhorar a aparência e a usabilidade visual **sem quebrar a lógica nem a acessibilidade**. A lógica está pronta e testada (76 verificações). Leia a seção "O que não pode mudar".

## 1. Arquivos
- `index.html`: o app inteiro (HTML, CSS e JavaScript em um arquivo único, sem framework).
- `google-agenda.js`: sincronização opcional com o Google Agenda (só roda com CLIENT_ID).
- `README.md`: como publicar no GitHub Pages e configurar o Google.
- `tests/autoteste.js`: 76 verificações automáticas. Como rodar: `npm i jsdom` e `node tests/autoteste.js` (leva cerca de 15 s). Rode depois de **qualquer** mudança de design.

## 2. Público e princípios de design
- Idosos, com visão reduzida, pouca prática com celular, às vezes com tremor ou memória fraca. Cuidador e profissional de saúde também usam.
- Poucas decisões por tela, botões grandes, linguagem simples, nada que dependa só de cor.
- Padrão: letra de 24 px (ajustável de 16 a 36 px) e botões grandes ligados.
- Tom: calmo, confiável, sem aparência infantil nem "hospitalar fria".

## 3. Estado atual do design
**Direção visual:** fundo azul-claro acinzentado, cartões brancos com borda grossa (3 px), cor de destaque verde-azulada (teal). Quatro cores de período do dia (manhã, almoço, tarde, noite). O "relógio" impresso é um disco de 4 quadrantes, cada um com um canto externo bem arredondado.

**Tipografia:** Atkinson Hyperlegible (Google Fonts, feita para baixa visão), com fallback Verdana, Segoe UI, sans-serif. Há opção "Simples (Verdana)". Escala em `em` a partir de `--fs`: h1 1.6em, h2 1.35em, h3 1.1em, horário grande 1.9em, rodapé e notas 0.88em. Altura de linha 1.5 (1.9 no modo "mais espaço").

**Formas e medidas:** botões com altura mínima de 52 px (68 px no modo "botões extra grandes", que é o padrão), borda de 3 px, raio de 12 px. Cartões com raio de 16 px e borda de 3 px. Largura máxima do conteúdo 900 px. Único ponto de quebra: `max-width:560px` (o relógio de 4 quadrantes vira uma coluna). Há estilos de impressão em `@media print`.

**Estados:** tags com ícone e texto, nunca só cor: ✔ Tomado, ⚠ Atrasado, ⏳ Aguardando/Próximo, ⚠ Estoque baixo, ✔ Estoque ok. Foco visível: contorno de 4 px na cor do texto. Alarme com animação de pulso leve (desligável em "Reduzir movimento").

**Temas** (variáveis CSS; `data-theme` no `<html>` com `light`, `dark` ou `hc`; sem o atributo segue o aparelho):

```css
:root{--bg:#F5F9FA;--fg:#12303A;--mut:#47616B;--card:#FFFFFF;--line:#B9CFD5;--acc:#0E6E78;--on:#FFFFFF;--ok:#1F7A4D;--okb:#E3F4EA;--bad:#B3363F;--badb:#FBE7E8;--wb:#FFF1CC;--m:#FBE9B8;--a:#D8EFD9;--t:#FFD9B8;--n:#D6DDF5;
}

:root:not([data-theme="light"]){--bg:#0D1C21;--fg:#E8F2F4;--mut:#9DB6BD;--card:#15292F;--line:#35505A;--acc:#5CC4CF;--on:#07191D;--ok:#6FD39C;--okb:#16352A;--bad:#FF8A91;--badb:#3B1F22;--wb:#40350F;--m:#4A3C14;--a:#1B3B24;--t:#4A2E17;--n:#262C4D}

:root[data-theme="dark"]{--bg:#0D1C21;--fg:#E8F2F4;--mut:#9DB6BD;--card:#15292F;--line:#35505A;--acc:#5CC4CF;--on:#07191D;--ok:#6FD39C;--okb:#16352A;--bad:#FF8A91;--badb:#3B1F22;--wb:#40350F;--m:#4A3C14;--a:#1B3B24;--t:#4A2E17;--n:#262C4D}

:root[data-theme="hc"]{--bg:#000;--fg:#FFF;--mut:#FFF;--card:#000;--line:#FFF;--acc:#FFE600;--on:#000;--ok:#7CFF9B;--okb:#000;--bad:#FF8F8F;--badb:#000;--wb:#000;--m:#000;--a:#000;--t:#000;--n:#000}
```

Pares de cor que o autoteste exige com contraste de pelo menos 4,5:1: texto/fundo, texto secundário/fundo e cartão, destaque/fundo, texto sobre destaque, ok/cartão, erro/cartão, ok/okb, texto sobre cada cor de período, erro/badb. Se mudar cores, o teste G7 avisa.

## 4. Telas
Navegação por abas no topo, com **6 áreas** (`data-tab`): `hoje` (Meus medicamentos), `ag` (Agenda), `es` (Estoque), `rem` (Cuidador), `cu` (Guia) e `pf` (Profissional, botão discreto). Mais dois botões fora da barra: **Acessibilidade e tamanho da letra** (`data-tab="ac"`, no topo) e **Imprimir** (`data-tab="pr"`, dentro de Agenda). Todos os elementos com `data-tab` funcionam como navegação, em qualquer lugar da tela.
1. **Meus medicamentos (`hoje`):** caixa "Ativar alarmes", cartão grande do próximo remédio (foto, horário, nome, "Já tomei", "Ler em voz alta"), "Ouvir os remédios de hoje", lista do dia com status, aviso de estoque baixo, resumo de 7 dias, botão "Sou cuidador" (só no modo simples).
2. **Agenda (`ag`):** estado da agenda interna, do Google Agenda e das notificações; botão "Tentar sincronizar de novo"; repetição de cada remédio; próximos 8 dias; botão Imprimir.
3. **Estoque (`es`):** um cartão por remédio com estoque estimado, aviso, compra, correção e histórico; remédio sem controle mostra "Começar controle".
4. **Cuidador (`rem`):** botão do guia, paciente e profissional (link de compartilhamento), formulário (nome, dose, unidades, quantidade, observação, foto, horários, dias, **data de início e de término**), botão azul de envio ao Google Agenda, lista de remédios com botões 📅, registros de uso.
5. **Guia (`cu`):** 10 itens, cada um marcado ✔ (disponível) ou 🛠 (em desenvolvimento).
6. **Profissional (`pf`):** orientações, informações técnicas, integração, limitações, como testar, segurança e acessibilidade (blocos que abrem e fecham).
7. **Imprimir (`pr`):** modelo (relógio do dia ou folha semanal), fotos, letra extra grande e pré-visualização.
8. **Acessibilidade (`ac`):** letra, cores, tipo de letra, espaçamento, botões grandes, reduzir movimento, **modo simples**, som, volume, voz, vibração, teste do alarme.
9. **Sobreposições:** alarme em tela cheia (`#al`), janela do PIN (`#pd`), aviso de importar lista (`#imp`), caixa do Google Agenda (inserida por `google-agenda.js`).

**Modo simples:** classe `ms` no `<html>`. Esconde todo elemento `data-tab` menos Meus medicamentos, a nota de alarme, o resumo e o aviso de importação. Sair exige PIN de 4 números (código de recuperação de 8 números, bloqueio de 30 s depois de 5 erros).

Classes de interface: `.box .hero .hero.late .row .grow .ph .tm .tag(.ok .late .wait) .btn .pri .bad .sm .chk .days .err .warn .note .disc .q(.m .a .t .n) .it .skip` e o elemento `details`. Classes no `<html>`: `simple`, `sp`, `big`, `nomo`, `ms`. Variável `--fs` controla o tamanho da letra.

## 5. O que não pode mudar
- **Os `id` e os atributos `data-*`:** o JavaScript e o autoteste dependem deles. Lista completa: ac, act, adh, ag, agb, agl, agr, ags, al, ald, alh, aln, alok, alph, alsn, alt, ast, ativ, cu, es, esl, fcn, fd, fde, fds, fdy, ferr, fm, fn, fo, fp, fpv, fpx, fq, fqg, fsv, ft, fta, fts, fu, gall, hero, hoje, imp, impno, impok, live, lst, main, mls, pbt, pcn, pd, pdm, pdt, pe, pf, pfg, pi, pm, pn, pok, pp, pr, pw, pxl, rdall, rem, rlg, rq${m.id}, sair, sbg, sfn, sfs, sfv, sheet, shr, shv, smo, sms, ssn, ssp, sth, svb, svl, svz, tst, tst2, warn. Atributos usados: data-tab, data-d, data-i, data-x, data-e, data-r, data-t, data-u, data-s, data-rp, data-aj, data-sq.
- **Um arquivo só**, sem scripts de terceiros além de `google-agenda.js` e Google Fonts (a página publicada no Claude bloqueia o resto). Imagens como data URI ou SVG embutido.
- **Acessibilidade:** campo com rótulo, botão com texto, imagem com `alt`, contraste mínimo de 4,5:1 nos três temas, nada só por cor, foco visível, toque confortável, lang pt-BR, região `aria-live`, janelas com `role` e `aria-modal`.
- **Tamanho da letra:** tudo deve acompanhar `--fs` até 36 px sem cortar texto nem esconder botão.
- **Segurança de saúde:** nenhum texto pode sugerir dose, trocar remédio ou prometer alarme garantido. Os avisos ("siga a receita", "use também o alarme do celular") devem permanecer.
- **Chaves de armazenamento** no navegador: rr_m, rr_l, rr_s, rr_p, rr_pin, rr_g2.

## 6. Pontos fracos conhecidos (onde o design pode ajudar)
- A aparência é funcional e limpa, mas pouco marcante. Falta identidade visual, ilustração e ícones próprios (hoje são emojis).
- A reorganização em seis áreas **já foi feita**, mas o visual ainda é simples: as abas são botões iguais e a área do Profissional usa blocos "details" sem acabamento.
- A área do Cuidador (`rem`) ainda é longa: formulário, lista de remédios e registros de uso na mesma tela. O estoque já foi separado em Estoque.
- O disco de 4 quadrantes é a ideia central do "relógio" e merece mais cuidado visual, inclusive na impressão em preto e branco.
- O alarme em tela cheia pode ficar mais claro e mais bonito, mantendo os botões enormes.
- Não foi testado em celular de verdade: confira letra no máximo, telas pequenas (320 px) e paisagem.
- O cartão da caixa do Google Agenda é gerado por script e precisa seguir o mesmo estilo.

## 7. Como validar o resultado
1. Rode `node tests/autoteste.js` e espere 76 de 76.
2. Abra em celular real com letra no máximo e nos três temas.
3. Faça o fluxo completo: cadastrar remédio, marcar "Tomei", registrar compra, ativar modo simples com PIN, imprimir relógio e folha semanal.
4. Mande de volta o `index.html` alterado.
