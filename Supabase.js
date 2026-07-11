/* ═══════════════════════════════════════════════════════
   supabase.js — Hook Et Database Connection
   ───────────────────────────────────────────────────────
   Paste your Supabase Project URL and Anon Key below.
   Get them from: Supabase → Settings → API
   ═══════════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://eoyofjslajjfzlzhkrfm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_foDql94sbwVkmtMmnlf3tQ_-kjO2KgX';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ═══════════════════════════════════════════════════════
   IMAGE UPLOAD TO SUPABASE STORAGE
   ───────────────────────────────────────────────────────
   Instead of saving giant base64 strings into the database
   (which causes "Could not save" errors), we upload the
   image file to Supabase Storage and save only the URL.
   ═══════════════════════════════════════════════════════ */
async function uploadImageToStorage(base64String, bucket, fileName) {
  // Convert base64 to a Blob/File
  const response  = await fetch(base64String);
  const blob      = await response.blob();
  const ext       = blob.type.split('/')[1] || 'jpg';
  const path      = `${fileName}-${Date.now()}.${ext}`;

  const { data, error } = await db.storage
    .from(bucket)
    .upload(path, blob, { contentType: blob.type, upsert: true });

  if (error) { console.error('uploadImage:', error); throw error; }

  // Get public URL
  const { data: urlData } = db.storage.from(bucket).getPublicUrl(path);
  return urlData.publicUrl;
}

/* ═══════════════════════════════════════════════════════
   ORDERS
═══════════════════════════════════════════════════════ */
async function dbGetOrders() {
  const { data, error } = await db
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('dbGetOrders:', error); return []; }
  return data || [];
}

async function dbSaveOrder(order) {
  // Upload ref_images to storage if they are base64
  if (order.ref_images && order.ref_images.length) {
    const uploaded = [];
    for (const img of order.ref_images) {
      if (img.startsWith('data:')) {
        const url = await uploadImageToStorage(img, 'ref-images', 'ref');
        uploaded.push(url);
      } else {
        uploaded.push(img);
      }
    }
    order.ref_images = uploaded;
  }

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

/* ═══════════════════════════════════════════════════════
   PRODUCTS
═══════════════════════════════════════════════════════ */
async function dbGetProducts() {
  const { data, error } = await db
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) { console.error('dbGetProducts:', error); return []; }
  return data || [];
}

async function dbSaveProduct(product) {
  // Upload product image to storage if base64
  if (product.image && product.image.startsWith('data:')) {
    product.image = await uploadImageToStorage(product.image, 'product-images', 'product');
  }
  const { data, error } = await db
    .from('products')
    .insert([product])
    .select()
    .single();
  if (error) { console.error('dbSaveProduct:', error); throw error; }
  return data;
}

async function dbUpdateProduct(id, patch) {
  // Upload product image to storage if base64
  if (patch.image && patch.image.startsWith('data:')) {
    patch.image = await uploadImageToStorage(patch.image, 'product-images', 'product');
  }
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

/* ═══════════════════════════════════════════════════════
   GALLERY
═══════════════════════════════════════════════════════ */
async function dbGetGallery() {
  const { data, error } = await db
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('dbGetGallery:', error); return []; }
  return data || [];
}

async function dbSaveGalleryPhoto(photo) {
  // Upload gallery image to storage if base64
  if (photo.image && photo.image.startsWith('data:')) {
    photo.image = await uploadImageToStorage(photo.image, 'gallery-images', 'gallery');
  }
  const { data, error } = await db
    .from('gallery')
    .insert([photo])
    .select()
    .single();
  if (error) { console.error('dbSaveGalleryPhoto:', error); throw error; }
  return data;
}

async function dbUpdateGalleryPhoto(id, patch) {
  // Upload gallery image to storage if base64
  if (patch.image && patch.image.startsWith('data:')) {
    patch.image = await uploadImageToStorage(patch.image, 'gallery-images', 'gallery');
  }
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
