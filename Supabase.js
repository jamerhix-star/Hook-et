/* ═══════════════════════════════════════════════════════
   supabase.js  —  Hook Et database connection
   ───────────────────────────────────────────────────────
   PASTE YOUR SUPABASE DETAILS BELOW
   ═══════════════════════════════════════════════════════ */

const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ── ORDERS ── */
async function dbGetOrders() {
  const { data, error } = await db.from('orders').select('*').order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data || [];
}
async function dbSaveOrder(order) {
  const { data, error } = await db.from('orders').insert([order]).select().single();
  if (error) { console.error(error); throw error; }
  return data;
}
async function dbUpdateOrder(id, patch) {
  const { error } = await db.from('orders').update(patch).eq('id', id);
  if (error) { console.error(error); throw error; }
}
async function dbDeleteOrder(id) {
  const { error } = await db.from('orders').delete().eq('id', id);
  if (error) { console.error(error); throw error; }
}

/* ── PRODUCTS ── */
async function dbGetProducts() {
  const { data, error } = await db.from('products').select('*').order('created_at', { ascending: true });
  if (error) { console.error(error); return []; }
  return data || [];
}
async function dbSaveProduct(product) {
  const { data, error } = await db.from('products').insert([product]).select().single();
  if (error) { console.error(error); throw error; }
  return data;
}
async function dbUpdateProduct(id, patch) {
  const { error } = await db.from('products').update(patch).eq('id', id);
  if (error) { console.error(error); throw error; }
}
async function dbDeleteProduct(id) {
  const { error } = await db.from('products').delete().eq('id', id);
  if (error) { console.error(error); throw error; }
}

/* ── GALLERY ── */
async function dbGetGallery() {
  const { data, error } = await db.from('gallery').select('*').order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return data || [];
}
async function dbSaveGalleryPhoto(photo) {
  const { data, error } = await db.from('gallery').insert([photo]).select().single();
  if (error) { console.error(error); throw error; }
  return data;
}
async function dbUpdateGalleryPhoto(id, patch) {
  const { error } = await db.from('gallery').update(patch).eq('id', id);
  if (error) { console.error(error); throw error; }
}
async function dbDeleteGalleryPhoto(id) {
  const { error } = await db.from('gallery').delete().eq('id', id);
  if (error) { console.error(error); throw error; }
}