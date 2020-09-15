# Atividade Sockets UDP

## Quais as principais diferenças entre TCP e UDP?
Uma das maiores diferenças é o fato de TCP ter confiabilidade nas mensagens enquanto UDP não têm, ou seja, se uma mensagem de UDP se perder na rede o remetente não tem como saber disso, enquanto no TCP ele não só detecta isso como reenvia a mensagem até que chegue no destinatário.
TCP também estabelece uma conexão de mão dupla antes de enviar as mensagens, característica não presente no UDP.  Isso não significa que o destinatário do UDP não consiga enviar mensagens de volta para o remetente, mas ele terá que criar um canal "separado" para isso.
Além disso, UDP não garante o ordenamento dos pacotes, enquanto TCP garante.
Essas características fazem com que TCP seja um protocolo mais confiável, mas UDP ainda é útil por ser mais rápido e eficiente devido a sua simplicidade.

## Quais as principais diferenças entre a implementação TCP e UDP (tanto do chat como da calculadora)?
Do lado do servidor, quando temos TCP, recebemos conexões e criamos um handler para cada uma, que vai ficar tratando especificamente as requisições daquele cliente específico. No servidor UDP nós tratamos todas as mensagens no mesmo handler, apenas mudando o destinatário da reposta baseado no endereço recebido por meio da `rinfo`.
Já do lado do cliente, uma grande diferença é que não dá pra usar a mesma porta para o socket de múltiplos clientes simultâneos na mesma máquina quando é UDP. Logo, para não ficar dando conflito, foi necessária a implementação de um prompt para que o usuário escolha a porta que vai utilizar (poderia ser aleatória também).

## Quais as principais dificuldades nas implementações UDP?
Creio que é realmente essa parte de evitar conflito nas portas e ficar sempre tendo que buscar o endereço do remetente em cada mensagem para poder devolver uma resposta.
No meu caso, só rodei em localhost, então não tive problemas com perda de pacotes, mas se fosse rodar o programa na internet, esse poderia ser um problema considerável para uma aplicação como essa, pois o cliente nunca iria saber que isso aconteceu e esperaria uma resposta para sempre.

## Quando faz sentido usar TCP ou UDP?
Eu acredito que nesses programas que desenvolvemos faz mais sentido usar TCP, pois eles se beneficiam do estabelecimento da conexão e evitam possíveis problemas. A característica deles que me faz pensar assim é que os maiores requisitos deles devem ser **corretude** e **estabilidade**, aspectos nos quais o TCP se destaca.
Já o UDP seria mais ideal para situações onde os requisitos fossem **rapidez** e **volume de dados transmitidos**, idealmente sem a necessidade de o destinatário necessitar responder ao remetente e sem grandes problemas para o caso de dados perdidos/desordenados, como streaming ou jogos.