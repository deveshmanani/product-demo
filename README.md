# BIRDBOX — Product Management SPA

A single-page application for managing products and sending items to recipients. Built with React, Redux Toolkit, TypeScript, and Ant Design.

## Features

- **Product List** — Table with status filters, search, sort, pagination, and category filtering
- **Add Product** — Modal form with validation and image preview via AntD Upload
- **Send Product** — Card grid with sidebar filters (categories, price range, vendors)
- **Item Details** — Image gallery with thumbnails, color/size selectors
- **Send Connect** — Recipient and address form with order creation
- **Dark Mode** — Full theme support via AntD ConfigProvider CSS variable tokens
- **Responsive** — Collapsible sidebar, hamburger menu on mobile, drawer-based filters

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Redux Toolkit** — state management with entity adapters and memoized selectors
- **Ant Design 5** — UI components with CSS variable theming
- **React Router v7** — client-side routing

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/deveshmanani/product-demo.git
cd product-demo
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build
npm run preview
```

## Architectural Decisions

| Decision         | Approach                                                                                                         | Why                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| State ownership  | Redux for shared data (products, filters, orders, modals); AntD Form for form state; `useState` for ephemeral UI | Right tool for each scope — avoids over-centralizing           |
| Derived data     | Memoized `createSelector` with `Set`-based lookups — no `useEffect` for filtering                                | No stale state bugs, no wasted renders                         |
| Code splitting   | Lazy-load `SendProductPage` + all 3 modals via `React.lazy()`                                                    | Keeps initial bundle small; modals load on interaction         |
| Theming          | AntD `cssVar: true` + CSS Modules referencing `var(--ant-color-*)` tokens                                        | Single theme source, zero `isDark` ternaries in components     |
| Component design | Thin UI components; logic in custom hooks (`useProductFilters`, `useSendFlow`)                                   | Separation of concerns, reusability                            |
| Responsive       | `useMediaQuery` hook for structural changes; CSS media queries for layout                                        | Clean JS-level decisions (drawer vs sidebar) without CSS hacks |
| Constants        | Centralized `ROUTES`, `PAGINATION`, `PRICE_RANGE`                                                                | One-file changes, no scattered magic strings/numbers           |
| Error handling   | Dual `ErrorBoundary` (app + route level) + 404 catch-all                                                         | Graceful failures without full app crashes                     |

## Project Structure

```
src/
  app/            — Redux store, typed hooks
  components/
    layout/       — AppLayout, Sidebar
    products/     — ProductTable, ProductFilters, ProductCard, ProductGrid, AddProductModal
    send/         — SendFiltersPanel, ItemDetailsModal, SendConnectModal
    common/       — ErrorBoundary
  features/
    products/     — productsSlice, selectors, types
    filters/      — filtersSlice
    orders/       — ordersSlice
    ui/           — uiSlice (theme, modals)
  hooks/          — useProductFilters, useSendFlow, useTheme, useMediaQuery
  data/           — Mock products, categories, vendors
  pages/          — ProductListPage, SendProductPage, NotFoundPage
  constants.ts    — Routes, pagination, price range constants
```

## Known Limitations

- **No real image upload** — AntD Upload previews files locally; added products receive a random placeholder image
- **Bulk Action is non-functional** — Disabled placeholder per PRD scope
- **Edit/Delete actions are non-functional** — Table row action menu renders but has no handlers
- **Large initial bundle (~1.1 MB)** — Primarily Ant Design; can be improved with `manualChunks` vendor splitting in Vite config
- **Shared filter state between pages** — Both pages read from the same `filters` slice, so navigating carries over filter state
- **No form persistence on "Back"** — Going back from Send Connect to Item Details preserves color/size (Redux) but resets the recipient form
- **Mock images from external CDN** — Product images load from `picsum.photos`, requiring internet connectivity

## What I'd Improve With More Time

- **Vendor chunk splitting** — `manualChunks` for React, AntD, Redux to improve caching and reduce initial load
- **`React.memo` on `ProductCard`** — Prevent unnecessary re-renders in the grid
- **Per-page filter state** — Separate filter contexts so navigating between pages doesn't carry over filters
- **Form persistence on "Back"** — Preserve recipient form draft when going back from Send Connect to Item Details
- **Functional Edit/Delete** — Wire up table row actions with confirmation dialogs
- **ESLint + Prettier** — Pre-commit hooks via Husky + lint-staged for consistent code style
- **Skeleton loading states** — Shimmer placeholders for table and card grid during data loading
- **Accessibility audit** — Keyboard navigation, ARIA labels, screen reader support
- **Persist theme in `localStorage`** — Remember dark mode preference across sessions
- **Unit & integration tests** — Vitest for slices/selectors, React Testing Library for components
