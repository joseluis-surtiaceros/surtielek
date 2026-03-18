// SurtielekLanding.tsx
// Drop into your Next.js or Vite + React project.
// No external dependencies beyond React itself.
// Google Fonts loaded via <link> tag inside the component.

import { useState, useEffect } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --white:    #ffffff;
    --off:      #f7f8f6;
    --gray50:   #f9fafb;
    --gray100:  #f3f4f6;
    --gray200:  #e5e7eb;
    --gray400:  #9ca3af;
    --gray600:  #4b5563;
    --gray800:  #1f2937;
    --gray900:  #111827;
    --green:    #16a34a;
    --green2:   #15803d;
    --green3:   #dcfce7;
    --greenmid: #22c55e;
  }

  section[id], div[id] { scroll-margin-top: 68px; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--gray900);
    overflow-x: hidden;
  }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5vw; height: 68px;
    background: rgba(255,255,255,0.94);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--gray200);
  }
  .nav-logo {
    font-family: 'DM Serif Display', sans-serif; font-weight: 800; font-size: 1.4rem;
    letter-spacing: -0.02em; color: var(--gray900); text-decoration: none; display: flex; align-items: center; gap: 6px;
  }
  .nav-logo-dot { width: 9px; height: 9px; background: var(--green); border-radius: 50%; display: inline-block; }
  .nav-links { display: flex; gap: 2.2rem; list-style: none; align-items: center; }
  .nav-links a {
    font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 500;
    color: var(--gray600); text-decoration: none; letter-spacing: 0.01em;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--green); }
  .nav-btn {
    background: var(--green); color: white !important; padding: 0.5rem 1.3rem;
    border-radius: 6px; font-weight: 600 !important; font-size: 0.85rem !important;
    transition: background 0.2s !important;
  }
  .nav-btn:hover { background: var(--green2) !important; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; padding: 68px 5vw 0;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; gap: 4rem;
    background: var(--white); position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 50%;
    background: var(--off); z-index: 0;
  }
  .hero-left { position: relative; z-index: 1; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--green3); color: var(--green2);
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; padding: 0.35rem 0.9rem; border-radius: 100px;
    margin-bottom: 2rem;
  }
  .hero-tag-dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; }
  .hero h1 {
    font-family: 'DM Serif Display', sans-serif; font-weight: 800;
    font-size: clamp(2.6rem, 4.5vw, 4.4rem); line-height: 1.05;
    letter-spacing: -0.03em; color: var(--gray900); margin-bottom: 1.5rem;
  }
  .hero h1 .accent { color: var(--green); }
  .hero-sub {
    font-size: 1rem; font-weight: 300; line-height: 1.75;
    color: var(--gray600); max-width: 440px; margin-bottom: 2.5rem;
  }
  .hero-actions { display: flex; gap: 0.9rem; flex-wrap: wrap; }

  .btn-green {
    display: inline-block; background: var(--green); color: white;
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.9rem;
    text-decoration: none; padding: 0.85rem 2rem; border-radius: 6px;
    transition: background 0.2s, transform 0.15s; border: none; cursor: pointer;
  }
  .btn-green:hover { background: var(--green2); transform: translateY(-2px); }

  .btn-outline {
    display: inline-block; background: transparent; color: var(--gray700);
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.9rem;
    text-decoration: none; padding: 0.85rem 2rem; border-radius: 6px;
    border: 1.5px solid var(--gray200); transition: border-color 0.2s, color 0.2s, transform 0.15s;
    cursor: pointer;
  }
  .btn-outline:hover { border-color: var(--green); color: var(--green); transform: translateY(-2px); }

  /* hero right panel */
  .hero-right {
    position: relative; z-index: 1;
    display: flex; flex-direction: column; gap: 1rem; padding: 3rem 0;
  }

  .hero-card {
    background: var(--white); border: 1px solid var(--gray200); border-radius: 12px;
    padding: 1.5rem 1.8rem; display: flex; align-items: center; gap: 1.2rem;
    transition: box-shadow 0.25s, transform 0.25s;
    animation: slideIn 0.6s ease both;
  }
  .hero-card:hover { box-shadow: 0 8px 32px rgba(22,163,74,0.10); transform: translateX(-4px); }
  .hero-card:nth-child(1) { animation-delay: 0.1s; }
  .hero-card:nth-child(2) { animation-delay: 0.2s; margin-left: 2rem; }
  .hero-card:nth-child(3) { animation-delay: 0.3s; }

  .hcard-icon {
    width: 52px; height: 52px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; flex-shrink: 0;
  }
  .hcard-icon.green { background: var(--green3); }
  .hcard-icon.gray  { background: var(--gray100); }

  .hcard-body h4 {
    font-family: 'DM Serif Display', sans-serif; font-weight: 700; font-size: 0.95rem;
    color: var(--gray900); margin-bottom: 0.2rem;
  }
  .hcard-body p { font-size: 0.78rem; color: var(--gray400); font-weight: 400; }

  /* ── TICKER ── */
  .ticker { background: var(--gray900); padding: 0.85rem 0; overflow: hidden; }
  .ticker-track { display: inline-flex; white-space: nowrap; animation: scroll-left 25s linear infinite; }
  .ticker-item {
    font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--gray400); padding: 0 2.5rem;
  }
  .ticker-item b { color: var(--greenmid); font-weight: 600; }
  @keyframes scroll-left { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

  /* ── STATS ── */
  .stats {
    background: var(--white); border-bottom: 1px solid var(--gray200);
    display: grid; grid-template-columns: repeat(4, 1fr);
  }
  .stat {
    padding: 2.5rem 2rem; text-align: center;
    border-right: 1px solid var(--gray200);
  }
  .stat:last-child { border-right: none; }
  .stat-n {
    font-family: 'DM Serif Display', sans-serif; font-weight: 800; font-size: 2.4rem;
    color: var(--green); line-height: 1; margin-bottom: 0.3rem;
  }
  .stat-l { font-size: 0.78rem; font-weight: 500; color: var(--gray400); text-transform: uppercase; letter-spacing: 0.08em; }

  /* ── SECTIONS ── */
  .section { padding: 7rem 5vw; }
  .section-alt { background: var(--off); }

  .section-header { margin-bottom: 4rem; }
  .section-tag {
    display: inline-block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--green); margin-bottom: 0.8rem;
  }
  .section-title {
    font-family: 'DM Serif Display', sans-serif; font-weight: 800;
    font-size: clamp(1.8rem, 3vw, 2.8rem); letter-spacing: -0.02em;
    color: var(--gray900); line-height: 1.1; margin-bottom: 1rem;
  }
  .section-sub { font-size: 0.95rem; font-weight: 300; color: var(--gray600); max-width: 520px; line-height: 1.7; }

  /* ── CATEGORY CARDS ── */
  .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

  .cat-card {
    border: 1px solid var(--gray200); border-radius: 14px; overflow: hidden;
    background: var(--white); transition: box-shadow 0.25s, transform 0.25s;
    display: flex; flex-direction: column;
  }
  .cat-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.08); transform: translateY(-4px); }

  .cat-header {
    padding: 2.2rem 2rem 1.5rem;
    border-bottom: 1px solid var(--gray100);
  }
  .cat-header.drywall  { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); }
  .cat-header.elec     { background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); }
  .cat-header.plumb    { background: linear-gradient(135deg, #f0fdf4 0%, #f9fafb 100%); }

  .cat-icon { font-size: 2.4rem; margin-bottom: 1rem; display: block; }
  .cat-num {
    font-family: 'DM Sans', sans-serif; font-size: 0.65rem; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--gray400); margin-bottom: 0.5rem;
  }
  .cat-title {
    font-family: 'DM Serif Display', sans-serif; font-weight: 800; font-size: 1.3rem;
    color: var(--gray900); margin-bottom: 0.5rem;
  }
  .cat-desc { font-size: 0.82rem; color: var(--gray600); font-weight: 300; line-height: 1.6; }

  .cat-body { padding: 1.5rem 2rem; flex: 1; }

  .product-list { list-style: none; display: flex; flex-direction: column; gap: 0; }
  .product-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.7rem 0; border-bottom: 1px solid var(--gray100);
    font-size: 0.82rem; color: var(--gray600); font-weight: 400;
    transition: color 0.15s;
  }
  .product-item:last-child { border-bottom: none; }
  .product-item:hover { color: var(--green); }
  .product-item::before {
    content: ''; width: 5px; height: 5px; border-radius: 50%;
    background: var(--green); margin-right: 0.8rem; flex-shrink: 0; opacity: 0.5;
  }
  .product-badge {
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 0.15rem 0.5rem;
    background: var(--green3); color: var(--green2); border-radius: 4px;
  }

  .cat-footer { padding: 1.2rem 2rem; border-top: 1px solid var(--gray100); }
  .cat-link {
    font-size: 0.82rem; font-weight: 600; color: var(--green);
    text-decoration: none; display: flex; align-items: center; gap: 0.4rem;
    transition: gap 0.2s;
  }
  .cat-link:hover { gap: 0.7rem; }

  /* ── NOSOTROS ── */
  .nosotros-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 5rem; align-items: center; margin-bottom: 5rem;
  }
  .nosotros-text { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
  .nosotros-text p { font-size: 0.95rem; font-weight: 400; color: var(--gray600); line-height: 1.8; }
  .nosotros-text strong { color: var(--gray900); font-weight: 600; }

  .cobertura { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin-top: 0.5rem; }
  .cob-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gray400); margin-right: 0.3rem; }
  .cob-pill {
    font-size: 0.75rem; font-weight: 500; padding: 0.3rem 0.8rem;
    border-radius: 100px; background: var(--white); border: 1px solid var(--gray200);
    color: var(--gray700);
  }
  .cob-pill-alt { background: var(--green3); border-color: transparent; color: var(--green2); font-weight: 600; }

  /* equipo photo */
  .equipo-wrap {
    position: relative; border-radius: 16px; overflow: hidden;
    aspect-ratio: 4/3; box-shadow: 0 16px 48px rgba(0,0,0,0.10);
  }
  .equipo-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .equipo-badge {
    position: absolute; bottom: 1.2rem; left: 1.2rem;
    background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
    border-radius: 10px; padding: 0.7rem 1.1rem;
    display: flex; flex-direction: column; gap: 0.1rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
  .equipo-badge-year { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: var(--green); line-height: 1; }
  .equipo-badge-label { font-size: 0.68rem; font-weight: 500; color: var(--gray600); letter-spacing: 0.04em; }

  /* 4 pilares */
  .pilares-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem; border-top: 1px solid var(--gray200); padding-top: 3.5rem;
  }
  .pilar-card {
    background: var(--white); border: 1px solid var(--gray200); border-radius: 12px;
    padding: 1.8rem 1.5rem; transition: box-shadow 0.25s, transform 0.2s;
  }
  .pilar-card:hover { box-shadow: 0 8px 28px rgba(22,163,74,0.09); transform: translateY(-3px); }
  .pilar-icon { font-size: 1.8rem; margin-bottom: 1rem; display: block; }
  .pilar-title { font-family: 'DM Serif Display', serif; font-size: 1rem; color: var(--gray900); margin-bottom: 0.5rem; }
  .pilar-desc { font-size: 0.8rem; color: var(--gray600); line-height: 1.65; font-weight: 400; }

  /* ── CTA ── */
  .cta-section {
    background: var(--gray900); padding: 8rem 5vw; text-align: center; position: relative; overflow: hidden;
  }
  .cta-section::before {
    content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(22,163,74,0.12), transparent 70%);
    border-radius: 50%; pointer-events: none;
  }
  .cta-tag {
    display: inline-block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--greenmid); margin-bottom: 1.2rem;
  }
  .cta-title {
    font-family: 'DM Serif Display', sans-serif; font-weight: 800;
    font-size: clamp(2rem, 4vw, 4rem); color: white;
    letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 1.2rem; position: relative;
  }
  .cta-title .g { color: var(--greenmid); }
  .cta-sub { font-size: 0.95rem; color: var(--gray400); max-width: 380px; margin: 0 auto 3rem; line-height: 1.7; font-weight: 300; }
  .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

  .btn-white {
    display: inline-block; background: white; color: var(--gray900);
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.9rem;
    text-decoration: none; padding: 0.9rem 2rem; border-radius: 6px;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,255,0.15); }

  .btn-green-outline {
    display: inline-block; border: 1.5px solid rgba(255,255,255,0.15); color: white;
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.9rem;
    text-decoration: none; padding: 0.9rem 2rem; border-radius: 6px;
    transition: border-color 0.2s, transform 0.15s;
  }
  .btn-green-outline:hover { border-color: var(--greenmid); color: var(--greenmid); transform: translateY(-2px); }

  .contact-row {
    display: flex; justify-content: center; gap: 3rem; margin-top: 4rem; flex-wrap: wrap;
  }
  .contact-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
  .contact-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray400); }
  .contact-val { font-size: 0.92rem; font-weight: 500; color: white; }

  /* ── FOOTER ── */
  footer {
    background: var(--gray900); border-top: 1px solid rgba(255,255,255,0.07);
    padding: 2rem 5vw; display: flex; align-items: center;
    justify-content: space-between; flex-wrap: wrap; gap: 1rem;
  }
  .footer-logo {
    font-family: 'DM Serif Display', sans-serif; font-weight: 800; font-size: 1.2rem;
    color: white; display: flex; align-items: center; gap: 6px;
  }
  .footer-copy { font-size: 0.75rem; color: var(--gray400); }
  .footer-group { font-size: 0.75rem; color: var(--gray400); }
  .footer-group span { color: rgba(255,255,255,0.5); }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
  .fade-hero { animation: fadeUp 0.8s ease both; }
  .fade-hero-2 { animation: fadeUp 0.8s 0.15s ease both; }
  .fade-hero-3 { animation: fadeUp 0.8s 0.28s ease both; }
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .reveal.in { opacity: 1; transform: none; }
  .delay-1 { transition-delay: 0.1s; }
  .delay-2 { transition-delay: 0.2s; }

  .nav-logo-img {
    height: 40px; width: auto; object-fit: contain; display: block;
  }

  /* ── FACHADA ── */
  .fachada-wrap {
    position: relative; border-radius: 16px; overflow: hidden;
    aspect-ratio: 4/3;
  }
  .fachada-img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: brightness(0.55);
  }
  .fachada-overlay {
    position: absolute; inset: 0; padding: 2.5rem;
    display: flex; flex-direction: column; justify-content: flex-end;
    background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
  }


  .btn-catalog {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--white); color: var(--green2);
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.92rem;
    text-decoration: none; padding: 0.85rem 1.8rem; border-radius: 8px;
    border: 2px solid var(--green);
    box-shadow: 0 2px 12px rgba(22,163,74,0.12);
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
    letter-spacing: 0.01em;
  }
  .btn-catalog:hover {
    background: var(--green3);
    box-shadow: 0 6px 24px rgba(22,163,74,0.2);
    transform: translateY(-2px);
  }

  .btn-catalog-dark {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: transparent; color: white;
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.92rem;
    text-decoration: none; padding: 0.85rem 1.8rem; border-radius: 8px;
    border: 2px solid var(--greenmid);
    transition: background 0.2s, transform 0.15s;
    letter-spacing: 0.01em;
  }
  .btn-catalog-dark:hover {
    background: rgba(34,197,94,0.1);
    transform: translateY(-2px);
  }

  /* ── RESPONSIVE ── */
  @media(max-width:960px){
    .hero { grid-template-columns: 1fr; padding-top:100px; }
    .hero::before { display: none; }
    .hero-right { padding: 0 0 2rem; }
    .hero-card:nth-child(2) { margin-left: 0; }
    .cat-grid { grid-template-columns: 1fr; }
    .nosotros-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .pilares-grid { grid-template-columns: repeat(2, 1fr); }
    .stats { grid-template-columns: repeat(2,1fr); }
    .stat:nth-child(2) { border-right: none; }
    .nav-links { display: none; }
  }
  @media(max-width:560px){
    .pilares-grid { grid-template-columns: 1fr; }
  }
`;

const DRYWALL_PRODUCTS = [
  { name: "Panel Tablaroca Estándar 1/2\"", badge: "Stock" },
  { name: "Panel Resistente a Humedad 5/8\"", badge: "" },
  { name: "Perfil Riel 3-5/8\"", badge: "Stock" },
  { name: "Perfil Poste 3-5/8\"", badge: "Stock" },
  { name: "Compuesto para Juntas", badge: "" },
  { name: "Cinta de Papel y Malla", badge: "Stock" },
  { name: "Tornillo Punta Fina / Punta Broca", badge: "Stock" },
];

const ELEC_PRODUCTS = [
  { name: "Cable THW 12, 10, 8 AWG", badge: "Stock" },
  { name: "Cable THHW-LS 600V", badge: "Stock" },
  { name: "Conduit EMT 1/2\" – 2\"", badge: "Stock" },
  { name: "Tablero de Distribución 8-24 Circuitos", badge: "" },
  { name: "Interruptores Termo 1P / 2P", badge: "Stock" },
  { name: "Contactos e Interruptores de Pared", badge: "Stock" },
  { name: "Luminarias LED Panel / Spot", badge: "" },
];

const PLUMB_PRODUCTS = [
  { name: "Tubería CPVC 1/2\" – 2\"", badge: "Stock" },
  { name: "Tubería PVC Sanitario", badge: "Stock" },
  { name: "Codos, Tees y Uniones CPVC", badge: "Stock" },
  { name: "Llaves de Paso 1/2\" – 1\"", badge: "Stock" },
  { name: "Registros y Coladeras PVC", badge: "" },
  { name: "Tubo Multicapa PEX/AL/PEX", badge: "" },
  { name: "Pegamento y Limpiador PVC", badge: "Stock" },
];

const WHY_ITEMS = [
  { icon: "📦", title: "Stock permanente", desc: "Producto en bodega listo para entrega inmediata. Sin tiempos de espera que retrasen tu obra." },
  { icon: "💲", title: "Precio de distribuidor", desc: "Márgenes competitivos para contratistas y constructores. Volumen = mejor precio." },
  { icon: "🤝", title: "Asesoría técnica real", desc: "Nuestro equipo conoce los materiales. Te orientamos en especificación y cantidades." },
  { icon: "🏢", title: "Respaldo Surtiaceros", desc: "Parte del grupo Surtiaceros del Pacífico. La misma seriedad de siempre, nueva línea de producto." },
];

const TICKER_ITEMS = [
  "Cable THW", "Panel Tablaroca", "Tubería CPVC", "Conduit EMT",
  "Interruptores", "Perfil Riel", "Llaves de Paso", "Tableros",
  "Compuesto para Juntas", "Luminarias LED", "Registros PVC",
];

export default function SurtielekLanding() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Scroll reveal
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Nav highlight
    const onScroll = () => {
      let cur = "";
      document.querySelectorAll("section[id]").forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 80) cur = s.id;
      });
      setActiveSection(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="#inicio" className="nav-logo">
          {/* LOGO: pon "logo-surtielek.jpg" en /public/logo-surtielek.jpg */}
          <img src="/logo-surtielek.jpg" alt="Surtielek" className="nav-logo-img" />
        </a>
        <ul className="nav-links">
          {[["#productos", "Productos"], ["#nosotros", "Nosotros"], ["#contacto", "Contacto"]].map(([href, label]) => (
            <li key={href}>
              <a href={href} style={activeSection === href.slice(1) ? { color: "var(--green)" } : {}}>
                {label}
              </a>
            </li>
          ))}
          <li><a href="#contacto" className="nav-btn">Cotizar</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="inicio">
        <div className="hero-left">
          <p className="hero-tag fade-hero"><span className="hero-tag-dot" />Suministros para Construcción</p>
          <h1 className="fade-hero-2">
            Todo el material<br />que tu obra<br /><span className="accent">necesita.</span>
          </h1>
          <p className="hero-sub fade-hero-3">
            Tablaroca, materiales eléctricos y plomería. Surtimos contratistas y constructores
            en el noroeste de México con producto en stock y entrega rápida.
          </p>
          <div className="hero-actions fade-hero-3">
            <a href="#contacto" className="btn-green">Solicitar Cotización</a>
            <a href="#productos" className="btn-outline">Ver Catálogo</a>
          </div>
          <div style={{ marginTop: "1.2rem" }} className="fade-hero-3">
            <a
              href="https://surtiaceros.com/surtielek"
              target="_blank"
              rel="noreferrer"
              className="btn-catalog"
            >
              🛒 Consultar precios y productos
            </a>
          </div>
        </div>

        <div className="hero-right">
          {[
            { icon: "🏗️", label: "Tablaroca & Drywall", sub: "Panel, perfilería, compuesto, fijaciones", cls: "green" },
            { icon: "⚡", label: "Materiales Eléctricos", sub: "Cable, conduit, tableros, luminarias", cls: "gray" },
            { icon: "🔧", label: "Plomería", sub: "Tubería, llaves, conexiones, registros", cls: "green" },
          ].map(({ icon, label, sub, cls }) => (
            <div className="hero-card" key={label}>
              <div className={`hcard-icon ${cls}`}>{icon}</div>
              <div className="hcard-body">
                <h4>{label}</h4>
                <p>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats">
        {[
          { n: "+500", l: "SKUs en catálogo" },
          { n: "3", l: "Líneas especializadas" },
          { n: "24h", l: "Entrega local" },
          { n: "NW", l: "Cobertura México" },
        ].map(({ n, l }) => (
          <div className="stat reveal" key={l}>
            <div className="stat-n">{n}</div>
            <div className="stat-l">{l}</div>
          </div>
        ))}
      </div>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker-track">
          {tickerContent.map((item, i) => (
            <span className="ticker-item" key={i}>
              {i % 3 === 0 ? <b>{item}</b> : item}
              <span style={{ marginLeft: "2.5rem", color: "var(--green)", opacity: 0.4 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section className="section" id="productos">
        <div className="section-header reveal">
          <span className="section-tag">Nuestras líneas</span>
          <h2 className="section-title">Tres líneas.<br />Una sola fuente.</h2>
          <p className="section-sub">Producto disponible en bodega para entrega inmediata. Mayoreo y menudeo.</p>
        </div>

        <div className="cat-grid">
          {/* DRYWALL */}
          <div className="cat-card reveal">
            <div className="cat-header drywall">
              <span className="cat-icon">🏗️</span>
              <div className="cat-num">01 — Construcción en seco</div>
              <div className="cat-title">Tablaroca & Drywall</div>
              <div className="cat-desc">Panel, perfilería metálica y acabados para muros y techos interiores.</div>
            </div>
            <div className="cat-body">
              <ul className="product-list">
                {DRYWALL_PRODUCTS.map(({ name, badge }) => (
                  <li className="product-item" key={name}>
                    <span>{name}</span>
                    {badge && <span className="product-badge">{badge}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cat-footer">
              <a href="#contacto" className="cat-link">Ver todos los productos →</a>
            </div>
          </div>

          {/* ELECTRICAL */}
          <div className="cat-card reveal delay-1">
            <div className="cat-header elec">
              <span className="cat-icon">⚡</span>
              <div className="cat-num">02 — Instalaciones eléctricas</div>
              <div className="cat-title">Materiales Eléctricos</div>
              <div className="cat-desc">Cable, protecciones, canalizaciones y luminarias para todo tipo de obra.</div>
            </div>
            <div className="cat-body">
              <ul className="product-list">
                {ELEC_PRODUCTS.map(({ name, badge }) => (
                  <li className="product-item" key={name}>
                    <span>{name}</span>
                    {badge && <span className="product-badge">{badge}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cat-footer">
              <a href="#contacto" className="cat-link">Ver todos los productos →</a>
            </div>
          </div>

          {/* PLUMBING */}
          <div className="cat-card reveal delay-2">
            <div className="cat-header plumb">
              <span className="cat-icon">🔧</span>
              <div className="cat-num">03 — Sistemas hidráulicos</div>
              <div className="cat-title">Plomería</div>
              <div className="cat-desc">Tubería, accesorios y conexiones para sistemas hidráulicos y sanitarios.</div>
            </div>
            <div className="cat-body">
              <ul className="product-list">
                {PLUMB_PRODUCTS.map(({ name, badge }) => (
                  <li className="product-item" key={name}>
                    <span>{name}</span>
                    {badge && <span className="product-badge">{badge}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cat-footer">
              <a href="#contacto" className="cat-link">Ver todos los productos →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOSOTROS ── */}
      <section className="section section-alt" id="nosotros">
        {/* Top: texto + foto equipo */}
        <div className="nosotros-grid">
          <div className="reveal">
            <span className="section-tag">Nosotros</span>
            <h2 className="section-title" style={{ marginBottom: "1.8rem" }}>
              Tu mejor opción<br /><span style={{ color: "var(--green)" }}>confiable.</span>
            </h2>
            <div className="nosotros-text">
              <p>
                En Surtielek somos una empresa comprometida con brindar calidad, excelente
                servicio y los mejores precios a nuestros clientes. Formamos parte de{" "}
                <strong>Surtiaceros del Pacífico S.A. de C.V.</strong>, lo que respalda
                nuestra experiencia y solidez en el mercado.
              </p>
              <p>
                Fuimos fundados en el año <strong>2024</strong> en{" "}
                <strong>Playas de Rosarito, Baja California</strong>, desde donde atendemos
                y distribuimos nuestros productos en Playas de Rosarito, Tijuana, Tecate y
                Ensenada. Además, realizamos envíos a toda la República Mexicana con costo,
                adaptándonos a las necesidades de cada cliente.
              </p>
              <p>
                Nos distingue nuestra <strong>transparencia</strong> — siempre publicamos
                nuestros precios de forma clara — y nuestro compromiso por ofrecer el mayor
                surtido posible en electricidad, plomería y construcción ligera.
              </p>
            </div>
            {/* Cobertura pills */}
            <div className="cobertura">
              <span className="cob-label">Cobertura directa</span>
              {["Playas de Rosarito", "Tijuana", "Tecate", "Ensenada"].map((c) => (
                <span className="cob-pill" key={c}>{c}</span>
              ))}
              <span className="cob-pill cob-pill-alt">📦 Envíos a toda la República</span>
            </div>
          </div>

          {/* FOTO EQUIPO */}
          <div className="reveal delay-1">
            {/* IMAGEN: pon "equipo-surtielek.jpg" en /public/equipo-surtielek.jpg */}
            <div className="equipo-wrap">
              <img
                src="/equipo-surtielek.jpg"
                alt="Equipo Surtielek"
                className="equipo-img"
              />
              <div className="equipo-badge">
                <span className="equipo-badge-year">2024</span>
                <span className="equipo-badge-label">Fundación · Rosarito, B.C.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: 4 pilares */}
        <div className="pilares-grid">
          {WHY_ITEMS.map(({ icon, title, desc }, i) => (
            <div className={`pilar-card reveal delay-${Math.min(i, 2)}`} key={title}>
              <div className="pilar-icon">{icon}</div>
              <h4 className="pilar-title">{title}</h4>
              <p className="pilar-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="contacto">
        <p className="cta-tag">Empieza hoy</p>
        <h2 className="cta-title">
          ¿Listo para<br /><span className="g">cotizar tu proyecto?</span>
        </h2>
        <p className="cta-sub">Sin burocracia. Te respondemos rápido con precio y disponibilidad.</p>
        <div className="cta-buttons">
          <a href="tel:+526611008946" className="btn-white">📞 Llamar ahora</a>
          <a href="https://wa.me/526611008946" className="btn-green-outline" target="_blank" rel="noreferrer">💬 WhatsApp</a>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <a
            href="https://surtiaceros.com/surtielek"
            target="_blank"
            rel="noreferrer"
            className="btn-catalog-dark"
          >
            🛒 Consultar precios y productos
          </a>
        </div>
        <div className="contact-row">
          {[
            { label: "Teléfono", val: "661-100-8946" },
            { label: "WhatsApp", val: "661-100-8946" },
            { label: "Correo", val: "contacto@surtielek.com" },
          ].map(({ label, val }) => (
            <div className="contact-item" key={label}>
              <span className="contact-label">{label}</span>
              <span className="contact-val">{val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-logo">
          <img src="/logo-surtielek.jpg" alt="Surtielek" style={{ height: "32px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </div>
        <p className="footer-copy">© 2026 Surtielek. Todos los derechos reservados.</p>
        <p className="footer-group">Grupo <span>Surtiaceros del Pacífico S.A. de C.V.</span></p>
      </footer>
    </>
  );
}
