/* ═══════════════════════════════════════════════════
   supabase.js — Hook Et Database Connection
   ───────────────────────────────────────────────────
   Paste your Supabase Project URL and Anon Key below.
   Get them from: Supabase → Settings → API
   ═══════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://eoyofjslajjfzlzhkrfm.supabase.co'';
const SUPABASE_KEY = 'sb_publishable_foDql94sbwVkmtMmnlf3tQ_-kjO2KgX';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ── ORDERS ── */
async function dbGetOrders() {
  const { data, error } = await db
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('dbGetOrders:', error); return []; }
  return data || [];
}
async function dbSaveOrder(order) {
  const { data, error } = await db
    .from('orders')
    .insert([order])
    .select()
    .single();
  if (error) { console.error('dbSaveOrder:', error); throw error; }
  return data;
}
async function dbUpdateOrder(id, patch) {
  const { error } = await db
    .from('orders')
    .update(patch)
    .eq('id', id);
  if (error) { console.error('dbUpdateOrder:', error); throw error; }
}
async function dbDeleteOrder(id) {
  const { error } = await db
    .from('orders')
    .delete()
    .eq('id', id);
  if (error) { console.error('dbDeleteOrder:', error); throw error; }
}

/* ── PRODUCTS ── */
async function dbGetProducts() {
  const { data, error } = await db
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) { console.error('dbGetProducts:', error); return []; }
  return data || [];
}
async function dbSaveProduct(product) {
  const { data, error } = await db
    .from('products')
    .insert([product])
    .select()
    .single();
  if (error) { console.error('dbSaveProduct:', error); throw error; }
  return data;
}
async function dbUpdateProduct(id, patch) {
  const { error } = await db
    .from('products')
    .update(patch)
    .eq('id', id);
  if (error) { console.error('dbUpdateProduct:', error); throw error; }
}
async function dbDeleteProduct(id) {
  const { error } = await db
    .from('products')
    .delete()
    .eq('id', id);
  if (error) { console.error('dbDeleteProduct:', error); throw error; }
}

/* ── GALLERY ── */
async function dbGetGallery() {
  const { data, error } = await db
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('dbGetGallery:', error); return []; }
  return data || [];
}
async function dbSaveGalleryPhoto(photo) {
  const { data, error } = await db
    .from('gallery')
    .insert([photo])
    .select()
    .single();
  if (error) { console.error('dbSaveGalleryPhoto:', error); throw error; }
  return data;
}
async function dbUpdateGalleryPhoto(id, patch) {
  const { error } = await db
    .from('gallery')
    .update(patch)
    .eq('id', id);
  if (error) { console.error('dbUpdateGalleryPhoto:', error); throw error; }
}
async function dbDeleteGalleryPhoto(id) {
  const { error } = await db
    .from('gallery')
    .delete()
    .eq('id', id);
  if (error) { console.error('dbDeleteGalleryPhoto:', error); throw error; }
}
