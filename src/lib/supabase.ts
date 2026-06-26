import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // Don't crash the build or SSR when env vars are missing — warn instead.
  // The client below is created with harmless placeholders so the module
  // always loads; any actual request will simply fail at the network layer
  // until the environment is configured.
  console.warn(
    '[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. ' +
      'Supabase-backed features will not work until they are configured.'
  );
}

// Always export a non-null client so consumers don't need to null-check.
export const supabase = createBrowserClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-anon-key'
);
