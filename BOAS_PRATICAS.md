# 📘 Boas Práticas de Desenvolvimento

## SEMPRE LEMBRAR DE UTILIZAR O COMANDO `npm install` AO PUXAR AS ALTERAÇÕES DO PROJETO

## 📌 Organização de Código

* **Comentar sempre** o propósito de cada componente, tela ou função.
* **Manter funções pequenas e com responsabilidade única** (quando possível; às vezes o código precisa ser mais direto).
* **Evitar código duplicado** → criar componentes reutilizáveis sempre que possível.
* **Modularizar sempre:** criar funções ou componentes separados em vez de concentrar tudo em um único arquivo.
* Evitar arquivos com mais de **300 linhas** → dividir em módulos menores.

## 📝 Nomenclatura

* Nomear **tudo em inglês**.
* **Componentes:** `PascalCase` → ex.: `UserCard`, `LoginForm`
* **Telas/Páginas:** `camelCase` → ex.: `loginScreen`, `dietPlanScreen`
* **Variáveis e funções:** `camelCase` → ex.: `userName`, `getUserData`
* **Constantes:** `UPPER_CASE_SNAKE_CASE` → ex.: `API_URL`, `MAX_RETRIES`
* Usar **nomes descritivos** (evitar `x`, `temp`, `data1`).

## 📂 Estrutura de Pastas

* Agrupar arquivos relacionados em pastas específicas:

  * **components/** → componentes reutilizáveis universais
  * **components/[nome_Tela]/** → criar pastas para os componentes que só existem numa tela ou aba 
  * **services/** → comunicação com APIs e backend
  * **utils/** → funções auxiliares
  * **hooks/** → hooks customizados
  * **assets/** → imagens, ícones e fontes

## 🔀 Versionamento (Git)

* Criar **commits claros e objetivos**.

> ⚠️ Nota: nem sempre os commits vão ser alterações de uma coisa só. Se não der para usar as "tags" abaixo, não tem problema.

### Tipos de Commit

* `add:` → adição de estrutura nova no código
* `feat:` → nova funcionalidade
* `fix:` → correção de bug
* `docs:` → alterações na documentação
* `refactor:` → melhoria de código sem mudar comportamento
* `style:` → ajustes visuais ou de formatação

### Exemplo de Commit

```text
feat(auth): adicionado o fluxo de cadastro e login

Implementado cadastro e login via API de exemplo.
Também foram adicionados tratamentos de erro para falha de autenticação.
```

## 🎨 Estilo e Padrões

* Utilizar **arquivos de estilos universais** sempre que possível.
* **Tipar variáveis e funções** quando possível (TypeScript recomendado).
* **Usar imports absolutos** em vez de caminhos longos (`../../../`).
* Opcional: usar a extensão **Prettier** para manter o código formatado.

## 🎯 Boas Práticas do Projeto

* Garantir que o código esteja **legível antes do commit**.
* Usar **tratamento de erros adequado** (não deixar falhas silenciosas).
* **Testar manualmente** as principais funcionalidades antes de subir alterações.
* Priorizar **clareza sobre esperteza**: código simples e legível > gambiarras complexas.
