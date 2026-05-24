# Voalá — Landing Page 3D

Landing page de companhia aérea fictícia com avião 3D animado via scroll, construída com Next.js 16, React Three Fiber e GSAP ScrollTrigger.

<!-- Substitua o caminho abaixo por um GIF/vídeo gravado da animação de scroll -->
<!-- Sugestão: use o LICEcap (Windows) ou o ShareX para gravar um GIF do scroll -->
![Preview da animação de scroll](./docs/preview.gif)

> **Dica:** grave um GIF mostrando o avião decolando e saindo de cena conforme o scroll — esse é o diferencial visual do projeto.

---

## Funcionalidades

- **Avião A320 3D** renderizado com React Three Fiber, animado em tempo real via GSAP ScrollTrigger — posição, escala e rotação respondem ao scroll do usuário
- **Hero com slides** rotativos automáticos (4 s) com copywriting por segmento (Destinos, Ofertas, Pacotes)
- **Seção de destinos** com grade bento, filtros por região e modal de detalhes
- **Carrinho de viagens** persistido em contexto React — suporta múltiplos destinos, passageiros e classes de cabine (econômica, executiva, primeira)
- **Animações acessíveis** — todas as animações respeitam `prefers-reduced-motion`
- **Seções adicionais:** Programa de Milhas, Flash Deals, Como Funciona, FAQ, Newsletter e Footer

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript + Tailwind CSS v4 |
| 3D | React Three Fiber + `@react-three/drei` |
| Animação | GSAP 3 + ScrollTrigger |
| Componentes | shadcn/ui (Base UI) + Lucide Icons |
| Notificações | Sonner |

---

## Rodando localmente

```bash
# instalar dependências
npm install

# iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

```bash
# build de produção
npm run build
npm start
```

---

## Estrutura relevante

```
src/
├── app/
│   ├── layout.tsx          # Provider do carrinho, fonte Geist
│   └── page.tsx            # Composição das seções
├── components/
│   ├── 3dAirplane.tsx      # Canvas R3F + animações GSAP do avião
│   ├── Hero.tsx            # Slides rotativos
│   ├── DestinationsSection.tsx
│   ├── destinations/
│   │   ├── BentoCard.tsx
│   │   ├── DestinationModal.tsx
│   │   └── destinationsData.ts
│   └── cart/
│       ├── CartContext.tsx
│       ├── CartDrawer.tsx
│       └── CartButton.tsx
└── utils/
    └── cloneAirplaneMaterials.ts  # Clona materiais do .glb para evitar compartilhamento de estado Three.js
```

---

## Decisões técnicas

**`cloneAirplaneMaterials`** — o modelo `.glb` carregado via `useGLTF` é cacheado globalmente pelo drei. Clonar os materiais antes de modificá-los evita que alterações de opacidade/transparência afetem outros usos do mesmo modelo.

**`useLayoutEffect` para GSAP** — ScrollTrigger precisa medir o DOM antes da primeira pintura. `useLayoutEffect` garante que os triggers sejam registrados com as dimensões corretas, evitando saltos de posição no carregamento.

**`useCallback` em todas as mutations do carrinho** — impede que o contexto recrie funções a cada render, evitando re-renders desnecessários em componentes que consomem apenas uma ação específica do carrinho.

---

## Observações

- Projeto **desktop-first**; o canvas 3D é otimizado para telas ≥ 1024 px
- O modelo `a320.glb` está em `/public` e é pré-carregado via `useGLTF.preload`
- Nenhuma chamada de API real — dados de destinos, preços e pacotes são estáticos em `destinationsData.ts`
