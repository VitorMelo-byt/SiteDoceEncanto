# Doce Encanto — Confeitaria & Doces Gourmet

Site de confeitaria desenvolvido com HTML, CSS e JavaScript. Apresenta um catálogo de bolos, docinhos e tortas, com busca, filtros e um carrinho de compras lateral.

O projeto é uma demonstração de front-end: os produtos são dados de exemplo e a finalização do pedido é simulada, sem processamento de pagamentos ou envio de pedidos.

## Funcionalidades

- Catálogo gerado a partir de uma lista de produtos em JavaScript.
- Busca por nome e descrição, filtro por categoria e ordenação por preço ou popularidade.
- Carrinho com adição de produtos, ajuste de quantidades, remoção ao zerar a quantidade e cálculo do total.
- Formulário de checkout com nome, e-mail, endereço e seleção da forma de pagamento.
- Carrossel de banners com controles manuais e troca automática a cada cinco segundos.
- Notificações de ações, botão de voltar ao topo e cabeçalho que se oculta ao rolar para baixo.
- Grade de produtos adaptável e ajustes de layout para telas menores.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| HTML5 | Estrutura da página e formulários |
| CSS3 | Estilos, variáveis de cores, animações, Flexbox e Grid |
| JavaScript | Catálogo, filtros, carrinho e interações |
| Google Fonts | Fontes Poppins e Playfair Display |
| Font Awesome 6.4.0 | Ícones carregados via CDN |
| Unsplash | Imagens externas dos produtos e banners |

Não há framework, gerenciador de pacotes ou etapa de compilação.

## Estrutura

```text
site-doce/
├── index.html   # Página principal
├── styles.css   # Folha de estilos
├── script.js    # Dados de exemplo e lógica da interface
└── README.md    # Documentação
```

Alguns estilos pontuais ainda estão nos atributos `style` do HTML e nos modelos de marcação gerados pelo JavaScript.

## Como executar

1. Baixe ou clone o projeto.
2. Abra o arquivo `index.html` em um navegador moderno.
3. Utilize a busca, selecione uma categoria e adicione produtos ao carrinho para explorar a interface.

Não é necessário instalar dependências. É preciso acesso à internet para carregar as fontes, os ícones e as imagens externas.

## Personalização

- **Produtos:** edite a lista `productsDatabase` em `script.js`. Cada produto possui identificador, nome, categoria, preço, avaliação, popularidade, selo, imagem e descrição. Use identificadores únicos.
- **Categorias:** mantenha os valores dos produtos alinhados às opções do seletor `category-filter` em `index.html`.
- **Identidade visual:** altere as variáveis de cores, sombras e bordas no bloco `:root` de `styles.css`.
- **Conteúdo:** atualize o nome da confeitaria, os banners, os contatos e os links sociais em `index.html`.

## Estado atual e pendências

- O carrinho existe apenas em memória e é perdido ao recarregar a página.
- O checkout exibe uma mensagem de sucesso e limpa o carrinho; não salva os dados nem realiza cobranças.
- O desconto de PIX e o cupom `DOCE10` aparecem na interface, mas não são aplicados ao total. O botão do cupom também não copia o código para a área de transferência.
- A inicialização chama `initHeaderScroll()`, função que não está definida. Isso gera um erro e impede a chamada seguinte a `initPromoModal()`, bloqueando a abertura automática da promoção. A lógica de rolagem do cabeçalho já está registrada separadamente no final do script.
- O formulário de newsletter não possui integração de cadastro.
- O link “Sobre” aponta para uma seção ainda inexistente, e os links sociais usam endereços provisórios (`#`).

## Verificação de sintaxe

Com Node.js instalado, execute na pasta do projeto:

```sh
node --check script.js
```

Esse comando verifica a sintaxe do JavaScript. As interações e os erros de execução devem ser conferidos no navegador, incluindo o console de desenvolvimento.
