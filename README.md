# torrentio-ss

Um plugin de fontes para o [ss](https://ss.giuli.dev). Resolve um título do
catálogo em torrents, perguntando ao [Torrentio](https://torrentio.strem.fun).

## Instalar

No ss, abra **Plugins** no cabeçalho, vá em **Adicionar**, e cole:

```
https://github.com/DOG248/torrentioss
```

A tela de confirmação mostra o que este plugin vai alcançar antes de gravar
qualquer coisa. Deve dizer `torrentio.strem.fun`, e nada além disso.

Só quem cria a sala precisa do plugin. Quem entra como espectador não instala
nada — pede o título ao host.

## O que ele faz

Uma função. Recebe o filme ou episódio que você abriu, chama o Torrentio, e
devolve a resposta como veio. O ss é quem lê os nomes de release, os tamanhos
e as bandeiras de idioma.

## O que ele pode alcançar

`torrentio.strem.fun`, e mais nada. O plugin roda num worker sem acesso a
rede: a única saída é `api.fetch`, e a página só realiza o pedido se o host
estiver na lista declarada no `manifest`. Uma versão nova que peça hosts
adicionais fica retida até você aprovar.

O que isso **não** garante: o Torrentio é um índice de terceiros, e um magnet
que ele devolva é um magnet que a sua sala vai abrir. A confiança termina em
quem publica os torrents, não neste código.

## Atualizações

O `manifest` declara de onde este plugin se atualiza, e o ss confere a cada
vez que você abre o site. Esse endereço fica travado no momento da instalação
— uma versão nova não consegue redirecionar o próprio canal de atualização.

## Licença

MIT.
