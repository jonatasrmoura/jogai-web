# 📄 Casos de Uso — Projeto Jogaí

## UC01 – Cadastrar Usuário
**Ator:** Visitante  
**Descrição:** O visitante cria uma conta informando nome, e-mail, senha e CPF.  
**Fluxo Principal:**
1. O visitante acessa a página de registro.
2. Preenche os dados obrigatórios.
3. O sistema valida o CPF.
4. O sistema salva o usuário e exibe mensagem de sucesso.

---

## UC02 – Cadastrar Jogo
**Ator:** Usuário autenticado  
**Descrição:** O usuário cadastra um novo jogo.  
**Fluxo Principal:**
1. O usuário escolhe entre vender, trocar ou emprestar.
2. O formulário adapta os campos conforme a escolha.
3. O usuário envia o jogo.
4. O sistema salva e exibe o novo item na lista.

---

## UC03 – Negociar Jogo
**Ator:** Usuário autenticado  
**Descrição:** O usuário inicia negociação com outro usuário.  
**Fluxo Principal:**
1. O usuário clica em “Negociar”.
2. O sistema exibe as opções (venda/troca/emprestar).
3. Dependendo do tipo:
   - Venda → pagamento seguro.  
   - Troca → ponto de encontro.  
   - Empréstimo → definir prazo.  
4. O sistema atualiza status da transação.

---

## UC04 – Definir Ponto de Encontro
**Ator:** Dois usuários autenticados  
**Descrição:** Os usuários definem e confirmam um local de troca.  
**Fluxo Principal:**
1. Um dos usuários sugere local no mapa.  
2. O outro confirma ou sugere alteração.  
3. O sistema registra o ponto e envia notificação.

---

## UC05 – Avaliar Usuário
**Ator:** Usuário autenticado  
**Descrição:** Após uma negociação, o usuário avalia o outro.  
**Fluxo Principal:**
1. O sistema exibe a opção de avaliação após conclusão da transação.  
2. O usuário atribui nota e comentário.  
3. O sistema salva a avaliação no perfil do outro usuário.
