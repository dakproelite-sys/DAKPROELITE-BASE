// ============================================================
// CONFIGURATION CENTRALE BASE / SUPABASE
// ============================================================

const SUPABASE_URL = 'https://pqagmlvbeiulztdtpnrt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__m-IFasS5kWyvTDGhMpj8g_V01PfEcQ';

// Initialisation globale de l'instance Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Projets pré-configurés
const defaultProjects = [
  { name: 'Dakpro-Main', key: 'dk_live_99201923840192840' },
  { name: 'dakproelite-acheteur', key: 'dk_live_88301928391029381' },
  { name: 'DAKPROELITE PAY', key: 'dk_live_77109283019238109' },
  { name: 'Dakpro-Pro', key: 'dk_live_66019283019283019' }
];
