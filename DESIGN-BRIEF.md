# Relógio dos Remédios: pacote para a IA de design

Projeto de Kaio (Enfermagem, UEPA), chamado **Hora do Remédio** na interface e **Relógio dos Remédios** no trabalho, Grupo 1 de Tecnologias Educacionais. Ferramenta educativa para **pessoas idosas** usarem com ajuda de cuidador ou profissional. Sem prescrição e sem alterar doses.

**Pedido para a IA de design:** melhorar a aparência e a usabilidade visual **sem quebrar a lógica nem a acessibilidade**. A lógica está pronta e testada (103 verificações). Leia a seção "O que não pode mudar".

## 1. Arquivos
- `index.html`: o app inteiro (HTML, CSS e JavaScript em um arquivo único, sem framework).
- `README.md`: como publicar no GitHub Pages e como o aplicativo funciona.
- `tests/autoteste.js`: 103 verificações automáticas. Como rodar: `npm i jsdom` e `node tests/autoteste.js` (leva cerca de 15 s). Rode depois de **qualquer** mudança de design.

## 2. Público e princípios de design
- Idosos, com visão reduzida, pouca prática com celular, às vezes com tremor ou memória fraca. Cuidador e profissional de saúde também usam.
- Poucas decisões por tela, botões grandes, linguagem simples, nada que dependa só de cor.
- Padrão: letra de 24 px (ajustável de 16 a 36 px) e botões grandes ligados.
- Tom: calmo, confiável, sem aparência infantil nem "hospitalar fria".

## 3. Estado atual do design (versão final)
**Status:** o visual **já foi aplicado** seguindo o guia de design do Kaio ("Hora do Remédio") sobre o layout robusto do `index.html` que o Kaio enviou (cartões arredondados, botões em pílula, navegação em grade, sem estouro de caixas). Se for ajustar de novo, mantenha este padrão.

**Cores** (variáveis CSS; `data-theme` no `<html>`: `light`, `dark`, `hc`; sem o atributo segue o aparelho):

```css
:root{--bg:#EBF5FB;--fg:#1A252C;--mut:#46535E;--card:#FFFFFF;--soft:#D3E2EC;--line:#7F93A1;--acc:#1B4F72;--on:#FFFFFF;--ok:#145C37;--okb:#E8F5E9;--bad:#8F241A;--badb:#FDECEA;--or:#8A3600;--orb:#FFF3E0;--gry:#F2F4F4;--wb:#FFF3E0;--m:#FFF3E0;--a:#E8F5E9;--t:#FDEBD0;--n:#E3ECF7;--go:#145C37;--goon:#FFFFFF;--ob:#A84300;--obon:#FFFFFF;--focus:#0057D9;
--shadow-card:0 4px 6px -1px rgba(0,0,0,.10),0 2px 4px -2px rgba(0,0,0,.10);--shadow-soft:0 2px 8px rgba(0,0,0,.06);
}

:root:not([data-theme="light"]){--bg:#0F1A21;--fg:#EAF2F6;--mut:#B4C4CE;--card:#17252E;--soft:#2A3D49;--line:#7C909D;--acc:#8EC5EA;--on:#08202E;--ok:#74D6A0;--okb:#143324;--bad:#FF9A90;--badb:#3B1E1B;--or:#FFB06B;--orb:#3A2A14;--gry:#1E2B33;--wb:#3A2A14;--m:#3A2A14;--a:#143324;--t:#40291A;--n:#1D2A45;--go:#74D6A0;--goon:#06210F;--ob:#FFB06B;--obon:#2A1500;--focus:#FFD60A}

:root[data-theme="dark"]{--bg:#0F1A21;--fg:#EAF2F6;--mut:#B4C4CE;--card:#17252E;--soft:#2A3D49;--line:#7C909D;--acc:#8EC5EA;--on:#08202E;--ok:#74D6A0;--okb:#143324;--bad:#FF9A90;--badb:#3B1E1B;--or:#FFB06B;--orb:#3A2A14;--gry:#1E2B33;--wb:#3A2A14;--m:#3A2A14;--a:#143324;--t:#40291A;--n:#1D2A45;--go:#74D6A0;--goon:#06210F;--ob:#FFB06B;--obon:#2A1500;--focus:#FFD60A}

:root[data-theme="hc"]{--bg:#000;--fg:#FFF;--mut:#FFF;--card:#000;--soft:#FFF;--line:#FFF;--acc:#FFE600;--on:#000;--ok:#7CFF9B;--okb:#000;--bad:#FF8F8F;--badb:#000;--or:#FFB86B;--orb:#000;--gry:#000;--wb:#000;--m:#000;--a:#000;--t:#000;--n:#000;--go:#7CFF9B;--goon:#000;--ob:#FFB86B;--obon:#000;--focus:#FFE600}
```

Mapeamento do guia: verde = Já tomei/concluído (`--go`, `--ok`, `--okb`); laranja = adiar/atual (`--ob`, `--or`, `--orb`); azul = marca e títulos (`--acc`); vermelho = emergência e atraso (`--bad`, barra fixa `#A52A1E`); cinza = futuro (`--gry`, `--mut`); texto `#1A252C`; fundo `#EBF5FB`.

**Diferenças em relação ao guia (de propósito):** os contrastes citados no guia não conferem com o cálculo real (verde `#1E824C` = 4,8:1; laranja `#D35400` = 4,2:1; vermelho `#C0392B` = 5,4:1; verde sobre verde claro = 4,3:1). As cores foram escurecidas para chegar a 7:1 ou mais nos textos: verde `#145C37`, laranja de texto `#8A3600`, laranja de botão `#A84300` (texto grande, mais de 6:1), vermelho `#8F241A`. O teste G9 confere isso nos três temas.

**Tipografia:** Atkinson Hyperlegible (Google Fonts; só existem os pesos 400 e 700, então o "extra bold" do guia usa 700), fallback Verdana. Tudo em `em`/`calc()` a partir de `--fs` (padrão 24 px, de 18 a 36 px). Relógio digital 3×`--fs` (72 px; 2×, 48 px, no celular). Nome do remédio no cartão do alarme 1,67×`--fs` (40 px). Dose 1,17× (28 px). Botão "Já tomei!" 1,33× (32 px). Itens da linha do tempo 1×.

**Medidas:** botões 64 px (72 px no modo botões grandes); "Já tomei!" 80 px; "Adiar" 70 px; botões pequenos 56 px; foto do perfil 80 px; ilustração do remédio 160 px; cartões com raio 24 px; botões e campos em pílula; foco com contorno de 6 px (azul vibrante, amarelo no escuro e no alto contraste). Pontos de quebra: 1024 px (duas colunas 60/40 na tela principal), 768, 760, 560 e 380 px.

**Componentes:** cabeçalho (logo, saudação com foto, relógio analógico + digital + data por extenso), cartão do alarme laranja suave, linha do tempo (verde tomado, laranja atual com borda pulsante, cinza futuro, vermelho atrasado), filtros de turno (Todos, Manhã, Tarde, Noite), acordeão "Agenda de hoje", barra de emergência fixa vermelha, tela de emergência, tela de sucesso com estrelas, histórico de 28 dias.

**Não implementado do guia (fora do escopo visual):** integração com o Google Agenda (removida por decisão do projeto), gravação de voz do cuidador, biometria, som de confirmação, resposta falada "Parabéns, Dona Maria!", `role="alert"` com `aria-live="assertive"` no cartão (leria de novo a cada minuto), e a faixa "Madrugada" separada (entra em Noite).

## 4. Telas
**Referência visual do Kaio:** ele criou um mockup ("Hora do Remédio") que o app deve seguir: cabeçalho com saudação ("Olá, Dona Maria! Boa tarde."), foto e relógio; cartão de alarme com figura grande do remédio e botões "Já tomei!" e "Adiar 10 min"; agenda do dia em **linha do tempo** com cartões coloridos (verde tomado, amarelo pendente, azul agendado, vermelho atrasado) e a pílula "Próximo: 16:00"; histórico em calendário com marcas; tela de sucesso com estrelas e "Celebrar!"; tela de emergência vermelha com botão verde de ligar; modo cuidador com a rotina da pessoa. Tudo isso já existe em versão simples (cores, emojis e CSS). O visual do guia já foi aplicado; novas melhorias devem manter esse padrão e não mudar a lógica.

Navegação por abas com **6 áreas** (`data-tab`): `hoje` (Meus medicamentos), `ag` (Agenda), `es` (Estoque), `rem` (Cuidador), `cu` (Guia, "Como funciona") e `pf` (Profissional, botão discreto). Fora da barra: **Acessibilidade e tamanho da letra** (`ac`, no topo) e **Imprimir** (`pr`, dentro de Agenda). Qualquer elemento com `data-tab` funciona como navegação.
1. **Meus medicamentos (`hoje`):** caixa "Ativar alarmes" com botão vermelho Emergência, cartão do próximo remédio (ou tela de sucesso quando tudo foi tomado), "Ouvir os remédios de hoje", linha do tempo do dia, resumo de 7 dias, "Sou cuidador" (modo simples).
2. **Agenda (`ag`):** estado do alarme e das notificações, botão "Salvar lembretes na agenda do celular" (gera arquivo .ics), repetição de cada remédio e próximos 8 dias.
3. **Estoque (`es`):** resumo de estoque baixo e um cartão por remédio (número grande, barra, previsão de término, e blocos "Registrar compra", "Corrigir estoque" e "Histórico" que abrem e fecham). Mais urgente primeiro.
4. **Cuidador (`rem`)**, com três botões internos (`data-sub`): **Pessoa** (nome, foto, profissional, até 3 contatos de emergência, link), **Remédios** (formulário em 4 passos: remédio e figura; quando tomar com atalhos de 4/6/8/12 em horas, dias e primeira dose; por quanto tempo; estoque; e lista dos cadastrados) e **Histórico** (calendário de 28 dias e registros).
5. **Guia (`cu`):** 6 passos curtos, "Se algo não funcionar" e "Limites".
6. **Profissional (`pf`):** blocos que abrem e fecham (orientações, técnica, limitações, testes, segurança).
7. **Imprimir (`pr`)** e **Acessibilidade (`ac`):** como antes. O modo simples está em Acessibilidade.
8. **Sobreposições:** alarme (`#al`), PIN (`#pd`), **emergência (`#em`, vermelha, botões verdes de ligar)** e aviso de importar lista (`#imp`).

**Modo simples:** classe `ms` no `<html>`. Esconde todo elemento `data-tab` menos Meus medicamentos, a nota de alarme, o resumo e o aviso de importação. O botão Emergência continua visível. Sair exige PIN de 4 números (recuperação com código de 8 números, bloqueio de 30 s depois de 5 erros).

Classes de interface: `.box .hero .hero.late .row .grow .ph .tm .tag(.ok .late .wait) .btn .pri .go .orb .bad .sm .em .acts .hgrid .hl .hr .date-fields .ana .chk .days .err .warn .note .disc .q(.m .a .t .n) .it .skip .top .brand .who .hi .av .clk .tl(.ok .late .nx) .tlc .pill .chips .seg2 .step .bar2 .big2 .hist(.g .y .r .t .h) .ok-card .stars .eyebrow` e o elemento `details`. Classes no `<html>`: `simple`, `sp`, `big`, `nomo`, `ms`. Variável `--fs` controla o tamanho da letra.

## 5. O que não pode mudar
- **Os `id` e os atributos `data-*`:** o JavaScript e o autoteste dependem deles. Lista completa: ac, act, adh, ag, agl, agr, ags, ah, al, ald, alh, aln, alok, alph, alsn, alt, am, ana, as, ast, ativ, av, avp, cd2, cel, ck, cu, em, ema, emb, embar, eml, emr, emt, emx, en${i}, er${i}, es, esl, et${i}, fcn, fd, fde, fds, fdy, ferr, ffs, fiv, fm, fn, fo, fp, fpv, fpx, fq, fqg, fsv, ft, fta, fts, fu, hero, hi, hist, hoje, ics, icsm, imp, impno, impok, live, lst, main, mls, okc, pav, pax, pbt, pcn, pd, pdm, pdt, pe, pf, pfg, pfo, pi, pm, pn, pok, pp, pr, pw, pxl, ra${m.id}, rd${m.id}, rdall, rem, rlg, rq${m.id}, sair, sbg, sfn, sfs, sfv, sheet, shr, shv, smo, sms, ssn, ssp, sth, sub-hi, sub-pe, sub-re, svb, svl, svz, tfl, tld, tst, tst2, warn. Atributos usados: data-tab, data-sub, data-d, data-i, data-x, data-e, data-r, data-t, data-u, data-s, data-sn, data-rp, data-aj, data-sq, data-iv, data-dp, data-du, data-ic, data-ec, data-ex, data-tf.
- **Um arquivo só**, sem scripts de terceiros (só a fonte do Google Fonts é permitida) (a página publicada no Claude bloqueia o resto). Imagens como data URI ou SVG embutido.
- **Acessibilidade:** campo com rótulo, botão com texto, imagem com `alt`, contraste mínimo de 4,5:1 nos três temas, nada só por cor, foco visível, toque confortável, lang pt-BR, região `aria-live`, janelas com `role` e `aria-modal`.
- **Tamanho da letra:** tudo deve acompanhar `--fs` até 36 px sem cortar texto nem esconder botão.
- **Segurança de saúde:** nenhum texto pode sugerir dose, trocar remédio ou prometer alarme garantido. Os avisos ("siga a receita", "use também o alarme do celular") devem permanecer.
- **Chaves de armazenamento** no navegador: rr_m, rr_l, rr_s, rr_p, rr_pin.

## 6. Pontos fracos conhecidos (onde o design pode ajudar)
- A aparência é funcional e limpa, mas pouco marcante. Falta identidade visual, ilustração e ícones próprios (hoje são emojis).
- Melhorias possíveis: ilustrações SVG próprias no lugar de emojis e animação mais suave nas transições, sem mexer na lógica.
- O formulário de remédio (4 passos) pode virar um assistente passo a passo, um passo por tela, se isso ficar mais fluido.
- O disco de 4 quadrantes é a ideia central do "relógio" e merece mais cuidado visual, inclusive na impressão em preto e branco.
- O alarme em tela cheia pode ficar mais claro e mais bonito, mantendo os botões enormes.
- Não foi testado em celular de verdade: confira letra no máximo, telas pequenas (320 px) e paisagem.

## 7. Como validar o resultado
1. Rode `node tests/autoteste.js` e espere 103 de 103.
2. Abra em celular real com letra no máximo e nos três temas.
3. Faça o fluxo completo: cadastrar remédio, marcar "Tomei", registrar compra, ativar modo simples com PIN, imprimir relógio e folha semanal.
4. Mande de volta o `index.html` alterado.
