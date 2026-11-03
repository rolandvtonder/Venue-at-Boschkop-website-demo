import {StrictMode, type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import {Layout} from './components/Layout';
import './index.css';

// The scroll effects depend on position; always start at the top.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

/** Each page's entry calls this with its content. */
export function mount(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Layout>{page}</Layout>
    </StrictMode>,
  );
}
