// middleware.js — Vercel Edge Middleware
import { NextResponse } from 'next/server';

// ⚠️ Utilise des timestamps en UTC pour éviter tout problème de fuseau/DST
const AUCTION_START_UTC = Date.parse('2025-11-11T10:11:00Z'); // 11:11 CET = 10:11 UTC
const AUCTION_END_UTC   = Date.parse('2025-11-13T10:11:00Z'); // 11:11 CET = 10:11 UTC

export const config = {
  // On intercepte uniquement la home
  matcher: ['/', '/index.html'],
};

export default function middleware(req) {
  const now = Date.now();

  // Si on est DANS la fenêtre d’enchère, on redirige proprement vers /bid
  if (now >= AUCTION_START_UTC && now < AUCTION_END_UTC) {
    const url = new URL(req.url);
    url.pathname = '/bid';
    return NextResponse.redirect(url, 307);
  }

  // Sinon on laisse passer (avant l’ouverture ou après la clôture)
  return NextResponse.next();
}
