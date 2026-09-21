# JOVI Aura — Especificação do Front-end Web

## 1. Visão geral

O **JOVI Aura** é uma solução **100% WEB**, desenvolvida para rodar diretamente no navegador do celular. O projeto deve seguir uma abordagem **mobile-first**, com foco total em uma experiência rápida, fluida, intuitiva, interativa e emocional.

A solução transforma a experiência de captura, organização e compartilhamento de conteúdo em smartphones, com foco principalmente no fluxo de **pós-captura**: organizar memórias digitais, reutilizar filtros personalizados, encontrar fotos rapidamente e criar conteúdos para compartilhar.

> **Conceito central:** a câmera deixa de ser apenas uma ferramenta de captura e passa a funcionar como um ecossistema inteligente de memórias digitais.

---

## 2. Objetivo do desenvolvimento

Desenvolver o **front-end da aplicação web JOVI Aura**, priorizando:

- Experiência mobile-first.
- Uso em navegador de celular.
- Interface responsiva.
- Interação com conteúdo.
- Visualização, organização e compartilhamento de fotos e conteúdos.
- Jornada dinâmica e interativa.
- Percepção de velocidade e desempenho.
- Design moderno, premium e confortável visualmente.
- Navegação simples e intuitiva.
- Personalização da experiência do usuário.

### Tecnologias permitidas

Utilizar **somente**:

- HTML5
- CSS3
- JavaScript
- Tailwind CSS **ou** Bootstrap

Não utilizar frameworks adicionais de front-end.

---

## 3. Problema que o JOVI Aura resolve

A experiência da câmera não termina quando a foto é tirada. Grande parte da frustração acontece depois da captura:

1. Encontrar fotos.
2. Editar imagens.
3. Repetir filtros.
4. Compartilhar conteúdo.
5. Organizar a galeria.

Além disso, pequenas demoras podem fazer o usuário perceber o aparelho ou sistema como lento. Portanto, o projeto deve trabalhar tanto a **performance real** quanto a **percepção de performance**.

---

## 4. Conceito da solução

O JOVI Aura simplifica a jornada de captura e pós-captura por meio de recursos personalizados.

### Principais funcionalidades

#### 4.1 Rolo de fotos categorizado

Permitir organizar fotos utilizando títulos e categorias/tags, por exemplo:

- Pessoa
- Restaurante
- Viagem
- Evento
- Comida
- Momentos

O usuário deve conseguir localizar fotos de maneira rápida e organizada.

#### 4.2 Filtros personalizados

Permitir que o usuário:

1. Crie seu próprio filtro.
2. Personalize o filtro.
3. Salve o filtro.
4. Reutilize o filtro futuramente.

A ideia é evitar a necessidade de editar cada foto individualmente.

O sistema deve apresentar os filtros salvos de maneira visual e fácil de acessar.

#### 4.3 Fotos + calendário

Integrar a organização das fotos com eventos do calendário.

Exemplo de jornada:

- O usuário possui uma foto intitulada/tagueada com o nome de uma pessoa.
- O calendário possui um evento relacionado àquela pessoa.
- Ao chegar a data do evento, o sistema apresenta uma memória ou sugestão relacionada.
- A plataforma pode criar uma colagem com fotos daquela pessoa.
- O usuário pode visualizar, editar e compartilhar a montagem.

#### 4.4 Montagem de posts com IA — experiência simulada no front-end

A ideia apresentada no projeto é permitir selecionar fotos e solicitar uma sugestão automática de layout.

No front-end, criar a experiência de:

1. Selecionar fotos.
2. Solicitar/criar sugestões de layout.
3. Apresentar diferentes opções.
4. Permitir trocar fotos.
5. Permitir editar a montagem.
6. Evitar repetir visualmente os mesmos layouts.
7. Compartilhar o resultado.

**Importante:** como este projeto é exclusivamente front-end, a funcionalidade de IA pode ser representada por uma interação simulada em JavaScript. Não é necessário criar um backend ou uma IA real.

---

## 5. Jornada principal do usuário

A jornada deve ser rápida, intuitiva e emocional.

### Fluxo sugerido

**1. Entrada**

O usuário acessa o JOVI Aura pelo navegador do celular.

→ Splash/entrada rápida  
→ Interface principal

**2. Captura**

O usuário acessa a câmera/interface de captura.

→ Seleciona um filtro personalizado  
→ Realiza a captura

Como o projeto é web, a câmera pode utilizar recursos nativos do navegador quando disponíveis ou uma simulação visual de captura para o protótipo.

**3. Organização**

Depois da captura:

→ Foto aparece na galeria  
→ Usuário pode adicionar título  
→ Usuário pode adicionar tags  
→ Foto fica organizada

**4. Memórias**

A galeria pode identificar conteúdos relacionados:

→ Pessoa  
→ Evento  
→ Data  
→ Categoria

**5. Calendário**

Quando existir uma data relacionada:

→ Mostrar lembrete/memória  
→ Sugerir montagem  
→ Exibir colagem

**6. Montagem**

Usuário:

→ Visualiza sugestão  
→ Troca fotos  
→ Alterna layouts  
→ Edita  
→ Confirma

**7. Compartilhamento**

Usuário:

→ Visualiza resultado final  
→ Compartilha  
→ Retorna para a galeria

---

## 6. Estrutura de telas

A interface deve contemplar, no mínimo, as seguintes áreas.

### 6.1 Splash / entrada

Características:

- Carregamento rápido.
- Identidade JOVI Aura.
- Animação curta e discreta.
- Transição automática para a interface principal.

Evitar splash demorado.

### 6.2 Home / câmera

Elementos sugeridos:

- Visual principal da câmera.
- Botão de captura em destaque.
- Filtros personalizados.
- Acesso à galeria.
- Acesso às memórias.
- Navegação simples.

A câmera deve ser minimalista.

### 6.3 Galeria inteligente

Recursos:

- Grid de fotos.
- Busca.
- Filtros por categoria.
- Tags.
- Títulos.
- Pastas inteligentes.
- Seleção múltipla.
- Compartilhamento.

A galeria deve priorizar visualização rápida e confortável no celular.

### 6.4 Detalhes da foto

Permitir:

- Visualizar foto.
- Visualizar título.
- Visualizar tags.
- Editar título.
- Adicionar/remover tags.
- Aplicar filtro salvo.
- Compartilhar.
- Excluir/remover da organização visual.

### 6.5 Filtros personalizados

Tela para:

- Visualizar filtros salvos.
- Criar novo filtro.
- Ajustar parâmetros visuais.
- Visualizar preview.
- Salvar filtro.
- Aplicar filtro à foto.

A experiência deve deixar claro que o filtro pode ser reutilizado posteriormente.

### 6.6 Tags

Permitir:

- Criar tag.
- Selecionar tags existentes.
- Associar tags às fotos.
- Filtrar a galeria pelas tags.

### 6.7 Calendário / Memórias

Apresentar:

- Eventos.
- Datas especiais.
- Pessoas relacionadas.
- Fotos associadas.
- Sugestões de memória.
- Montagens sugeridas.

### 6.8 Montagem com IA

Apresentar:

- Fotos selecionadas.
- Sugestões de layout.
- Preview da montagem.
- Alternância entre layouts.
- Troca de fotos.
- Edição básica.
- Botão de confirmação.
- Compartilhamento.

A interação de "IA" deve parecer dinâmica, mas pode ser simulada localmente com JavaScript.

### 6.9 Widget de memória

Criar uma área visual para destacar:

- Aniversários.
- Viagens.
- Eventos.
- Pessoas.
- Momentos antigos.

O widget deve funcionar como um lembrete emocional e visual.

---

## 7. Navegação mobile

Priorizar uma navegação adequada para uso com uma mão.

Sugestão de estrutura:

- Home/Câmera
- Galeria
- Memórias
- Filtros
- Perfil/configurações

Utilizar:

- Bottom navigation.
- Botões grandes.
- Áreas de toque confortáveis.
- Ícones claros.
- Hierarquia visual consistente.

Evitar menus complexos e excesso de etapas.

---

## 8. Interações obrigatórias

A aplicação deve parecer um produto funcional, e não apenas telas estáticas.

Implementar com JavaScript:

- Navegação entre telas/seções.
- Abrir/fechar modais.
- Seleção de fotos.
- Seleção múltipla.
- Aplicação de filtros.
- Criação de tags.
- Edição de títulos.
- Salvamento de filtros.
- Troca de layouts.
- Geração simulada de montagem.
- Compartilhamento.
- Feedback visual.
- Toasts/notificações.
- Loading states.
- Estados vazios.
- Botões com estados ativo/inativo.
- Transições e microanimações.

---

## 9. Percepção de velocidade e performance

Este é um dos principais diferenciais do projeto.

Implementar estratégias de UX para fazer a interface parecer rápida e fluida.

### 9.1 Skeleton Loading

Utilizar skeletons durante carregamentos simulados.

Exemplo:

- Skeleton de imagens.
- Skeleton de cards.
- Skeleton de calendário.
- Skeleton de montagem.

### 9.2 Lazy Loading

Imagens da galeria devem utilizar carregamento tardio quando possível.

Utilizar recursos nativos do navegador, como:

```html
<img loading="lazy" ...>
```

### 9.3 Pré-carregamento inteligente

Pré-carregar somente conteúdos relevantes para a próxima ação do usuário.

Exemplo:

- Usuário abre uma montagem.
- Próximos layouts podem ser preparados antecipadamente.

### 9.4 Feedback visual imediato

Toda ação importante deve produzir uma resposta visual rápida.

Exemplos:

- Botão muda de estado.
- Toast aparece.
- Skeleton é exibido.
- Barra/progresso de carregamento.
- Microanimação.
- Preview atualizado imediatamente.

### 9.5 Microanimações

Utilizar animações curtas e discretas para:

- Transições.
- Seleção de fotos.
- Aplicação de filtros.
- Salvamento.
- Compartilhamento.
- Abertura de cards.

Evitar animações longas que aumentem a sensação de espera.

---

## 10. Design visual

O protótipo original foi pensado com uma identidade visual premium e moderna inspirada na experiência JOVI.

Diretrizes:

- Visual premium.
- Interface limpa.
- Hierarquia visual forte.
- Espaçamento confortável.
- Elementos arredondados quando fizer sentido.
- Imagens como protagonistas.
- Ícones simples.
- Tipografia legível.
- Alto contraste nos elementos importantes.
- Experiência clara em telas pequenas.

Criar suporte para:

### Modo claro

Interface clara, leve e elegante.

### Modo escuro

Interface escura, confortável e visualmente premium.

O usuário deve conseguir alternar entre os modos.

---

## 11. Responsividade

O projeto deve ser desenvolvido **mobile-first**, mas continuar funcional em telas maiores.

Prioridade:

1. Smartphone.
2. Tablet.
3. Desktop.

Não criar uma experiência desktop e simplesmente reduzi-la para mobile.

A estrutura deve nascer pensando no smartphone.

---

## 12. Arquitetura sugerida do front-end

Organizar o projeto de forma simples e compreensível.

Exemplo:

```text
jovi-aura/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── camera.js
│   ├── gallery.js
│   ├── filters.js
│   ├── tags.js
│   ├── memories.js
│   ├── calendar.js
│   └── sharing.js
│
└── assets/
    ├── images/
    └── icons/
```

Caso a implementação fique mais simples, os arquivos JavaScript podem ser consolidados, desde que o código permaneça organizado.

---

## 13. Persistência local

Como não haverá backend, utilizar recursos do navegador para simular persistência quando necessário.

Preferencialmente:

- `localStorage`
- `sessionStorage`

Exemplos de dados que podem ser persistidos:

- Filtros criados.
- Tags.
- Títulos das fotos.
- Preferência de modo claro/escuro.
- Layout selecionado.
- Configurações simples.

---

## 14. Conteúdo de demonstração

Criar dados fictícios suficientes para demonstrar o funcionamento da solução.

Exemplos:

### Fotos

- Ana
- Viagem
- Restaurante
- Praia
- Aniversário
- Amigos
- Comida
- Evento

### Tags

- Ana
- Viagem
- Praia
- Restaurante
- Amigos
- Aniversário

### Eventos

- Aniversário da Ana
- Viagem
- Jantar
- Evento com amigos

Os dados devem servir apenas como conteúdo demonstrativo do protótipo.

---

## 15. Compartilhamento

Criar uma experiência de compartilhamento simples.

Quando possível, utilizar a Web Share API:

```javascript
navigator.share({
  title: 'JOVI Aura',
  text: 'Confira minha memória criada no JOVI Aura'
});
```

Também deve existir fallback visual caso a API não esteja disponível.

Exemplo:

- Copiar link.
- Exibir opções simuladas de compartilhamento.

---

## 16. Câmera no navegador

Como o produto é **100% WEB**, não criar dependência de aplicativo nativo.

Quando suportado pelo navegador, utilizar APIs web apropriadas, como `getUserMedia`, para acessar a câmera.

A implementação deve considerar:

- Permissão de câmera.
- Estados de carregamento.
- Estado de erro/permissão negada.
- Preview da câmera.
- Captura.
- Feedback após captura.

Se o ambiente de execução não permitir câmera, apresentar uma experiência simulada que mantenha o fluxo demonstrável.

---

## 17. Regras importantes de desenvolvimento

### Obrigatório

- 100% WEB.
- Rodar no navegador.
- Mobile-first.
- HTML.
- CSS.
- JavaScript.
- Tailwind CSS ou Bootstrap.
- Interface interativa.
- Design responsivo.
- Foco em UX.
- Feedback visual.
- Percepção de performance.

### Não utilizar

- Aplicativo nativo.
- React.
- Angular.
- Vue.
- Next.js.
- Flutter.
- React Native.
- Backend.
- Banco de dados externo.
- Frameworks adicionais.

A aplicação deve ser executável diretamente no navegador.

---

## 18. Princípios de UX

A interface deve seguir estes princípios:

### Menos etapas

Reduzir a quantidade de ações necessárias para executar tarefas comuns.

### Clareza

O usuário deve entender o que pode fazer sem precisar descobrir a interface.

### Feedback

Toda ação deve possuir resposta visual.

### Personalização

O sistema deve refletir os hábitos e preferências do usuário.

### Emoção

As memórias devem ter destaque visual e emocional.

### Velocidade percebida

Evitar telas aparentemente paradas.

### Consistência

Manter padrões de:

- Botões.
- Ícones.
- Espaçamentos.
- Cores.
- Tipografia.
- Cards.
- Modais.
- Feedbacks.

---

## 19. Modelo lógico de dados usado como referência

O projeto original possui as seguintes entidades principais:

- Usuário
- Foto
- Tag
- Montagem
- Evento Calendário
- Widget Memória
- Filtro

Essas entidades devem orientar a simulação dos dados no front-end.

Relacionamentos conceituais:

```text
Usuário
  │
  ├── Fotos
  │     ├── Tags
  │     └── Filtros
  │
  ├── Montagens
  │
  ├── Eventos do Calendário
  │
  └── Widgets de Memória
```

---

## 20. Critérios de aceitação do protótipo

O resultado final deve permitir demonstrar claramente:

- Acesso pelo navegador.
- Experiência mobile-first.
- Navegação entre as principais áreas.
- Visualização de fotos.
- Organização por tags.
- Edição de títulos.
- Criação e reutilização de filtros.
- Integração conceitual com calendário.
- Sugestão de memórias.
- Criação simulada de layouts com IA.
- Edição das montagens.
- Compartilhamento.
- Modo claro.
- Modo escuro.
- Skeleton loading.
- Lazy loading.
- Microanimações.
- Feedback visual imediato.
- Interface responsiva.

---

## 21. Fluxo de demonstração recomendado

Para apresentar o protótipo, seguir esta jornada:

```text
Entrada
  ↓
Home / Câmera
  ↓
Selecionar filtro personalizado
  ↓
Capturar foto
  ↓
Salvar foto
  ↓
Adicionar título e tags
  ↓
Galeria inteligente
  ↓
Identificação de memória/evento
  ↓
Sugestão de montagem
  ↓
Gerar layouts
  ↓
Selecionar layout
  ↓
Editar fotos
  ↓
Visualizar montagem
  ↓
Compartilhar
```

Esse fluxo deve ser o principal caminho demonstrável do produto.

---

## 22. Diferencial do JOVI Aura

O diferencial não está somente em capturar imagens.

A proposta é criar um **ecossistema inteligente de memórias digitais**.

O sistema deve:

- Aprender/representar estilos favoritos por meio dos filtros salvos.
- Reutilizar filtros personalizados.
- Organizar fotos por tags.
- Facilitar a localização de conteúdos.
- Criar montagens rapidamente.
- Conectar fotos a eventos.
- Sugerir memórias.
- Facilitar o compartilhamento.

O foco principal é o fluxo de **pós-captura**.

---

## 23. Resultado esperado

O front-end deve transmitir a sensação de uma plataforma:

- Rápida.
- Fluida.
- Moderna.
- Personalizada.
- Inteligente.
- Emocional.
- Fácil de usar.

A experiência deve reduzir a frustração do usuário, melhorar a percepção de performance e aumentar o engajamento.

### Frase-conceito

> **Sua câmera, seu estilo, suas memórias, sem espera.**

---

## 24. Instrução final para a IA desenvolvedora

Ao implementar este projeto:

1. Respeite a proposta original do JOVI Aura.
2. Priorize o mobile desde a primeira linha de código.
3. Construa uma experiência realmente interativa, não apenas um mockup estático.
4. Utilize apenas HTML, CSS, JavaScript e Tailwind CSS ou Bootstrap.
5. Simule funcionalidades de backend/IA quando necessário utilizando JavaScript e dados locais.
6. Priorize percepção de velocidade.
7. Utilize skeleton loading, lazy loading, feedback imediato e microanimações.
8. Mantenha a interface visualmente premium, limpa e intuitiva.
9. Garanta que o usuário consiga visualizar, organizar, editar e compartilhar conteúdo.
10. Mantenha o fluxo principal simples e com poucas etapas.
11. Garanta funcionamento adequado em navegadores de smartphones.
12. Evite dependências desnecessárias.
13. Mantenha o código organizado, legível e fácil de modificar.
14. Não transforme o projeto em aplicativo nativo.
15. O resultado deve representar fielmente o conceito do **JOVI Aura como uma experiência WEB mobile-first de memórias digitais**.

---

## Fonte do conceito

Este documento foi estruturado a partir do material do **FIAP & JOVI Challenge — JOVI Aura**, que apresenta a solução como uma plataforma WEB mobile-first voltada à captura, organização e compartilhamento de conteúdo, com filtros personalizados, rolo de fotos categorizado, integração entre fotos e calendário, montagem de posts e foco em percepção de performance.

O material original também destaca **Skeleton Loading, Lazy Loading, Pré-carregamento Inteligente, Micro Animações e Feedback Visual Imediato** como estratégias de UX/performance. 
