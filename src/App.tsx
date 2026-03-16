import { useState, useEffect, useMemo, useCallback } from 'react'
import './App.css'
import { PRODUCTS, ProductEntry } from './products'

const API = 'https://surtiaceros.com/wp-json/surtiaceros/v1/tubular'
const LOGO = 'https://surtiaceros.com/wp-content/uploads/2025/12/logo-surtiaceros.png'

const CAT_ICONS: Record<string, string> = {
  Tubulares: '⬛', Ángulos: '∟', Soleras: '▬', Redondo: '◉', Vigas: 'I',
  Placa: '▪', 'Tubo Negro': '○', 'Tubo Mofle': '◌', Polín: '⊏',
  Varilla: '╱', 'Lámina Negra': '▤', 'Lámina Galvanizada': '▥', 'Cuadrados Sólidos': '■',
}

const CATS = [...new Set(Object.values(PRODUCTS).map(v => v[3]))].sort()

const peso = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)

const C = {
  bg: '#f7f8f7', surface: '#fff', surfaceAlt: '#f2f4f2',
  border: '#e5e8e5', active: '#16a34a',
  accent: '#16a34a', accentLight: '#f0fdf4', accentBorder: 'rgba(22,163,74,0.22)',
  text: '#111411', textSub: '#5a6b5a', textMuted: '#9aaa9a',
  card: '#1c1f1c', cardBorder: 'rgba(255,255,255,0.07)',
  onCard: '#f0f4f0', onCardSub: 'rgba(240,244,240,0.55)', onCardMuted: 'rgba(240,244,240,0.28)',
  shadow: 'rgba(0,0,0,0.05)', shadowMd: 'rgba(0,0,0,0.09)',
}

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth)
  useEffect(() => {
    const fn = () => setW(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return w
}

interface LivePrice { price: number | null; url: string | null; stock: boolean | null; loading: boolean; ok: boolean }

function useLivePrice(slug: string | null): LivePrice {
  const [s, setS] = useState<LivePrice>({ price: null, url: null, stock: null, loading: false, ok: false })
  useEffect(() => {
    if (!slug) return
    setS(p => ({ ...p, loading: true }))
    const ctrl = new AbortController()
    fetch(`${API}/${slug}`, { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((d: { price: string; url: string; in_stock: boolean }) =>
        setS({ price: parseFloat(d.price), url: d.url, stock: d.in_stock, loading: false, ok: true }))
      .catch((e: Error) => { if (e.name !== 'AbortError') setS({ price: null, url: null, stock: null, loading: false, ok: false }) })
    return () => ctrl.abort()
  }, [slug])
  return s
}

function ResultCard({ slug, product }: { slug: string; product: ProductEntry }) {
  const [title, sku, weight, cat] = product
  const lp = useLivePrice(slug)
  const waMsg = `Hola Surtiaceros, me interesa cotizar:\n\n*${title}*\nSKU: ${sku}\nPeso: ${weight} kg\n💰 ${lp.ok && lp.price ? peso(lp.price) : 'ver precio en línea'}\n\n¿Pueden confirmar disponibilidad?`
  const mailBody = `Hola,\n\nMe interesa cotizar:\n\n${title}\nSKU: ${sku}\nPeso: ${weight} kg\n${lp.ok && lp.price ? `Precio: ${peso(lp.price)} (IVA incluido)\n` : ''}\nFavor de confirmar disponibilidad.\n\nGracias.`

  return (
    <div className="fade" style={{ background: C.card, borderRadius: 20, padding: 18, marginBottom: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.13)' }}>
      <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${C.cardBorder}` }}>
        <div style={{ fontSize: 10, color: 'rgba(74,222,128,0.7)', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 5 }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: '#4ade80', display: 'inline-block', marginRight: 5, verticalAlign: 'middle' }} />
          {CAT_ICONS[cat] ?? '●'} {cat}
        </div>
        <div style={{ fontSize: 17, fontWeight: 900, color: C.onCard, letterSpacing: '-0.025em', lineHeight: 1.25 }}>{title}</div>
        <div style={{ fontSize: 11.5, color: C.onCardSub, marginTop: 3 }}>SKU: {sku} · {weight} kg</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: C.onCardMuted, letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 600 }}>Precio</span>
            {lp.loading && <div style={{ width: 12, height: 12, borderRadius: 99, border: '2px solid rgba(255,255,255,0.12)', borderTopColor: '#4ade80', animation: 'spin 0.7s linear infinite' }} />}
            {!lp.loading && (
              <span style={{
                fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 10, letterSpacing: '0.05em', textTransform: 'uppercase',
                background: lp.ok ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
                color: lp.ok ? '#4ade80' : 'rgba(240,244,240,0.35)',
                border: `1px solid ${lp.ok ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)'}`,
              }}>
                {lp.ok ? '✓ surtiaceros.com' : 'sin precio en línea'}
              </span>
            )}
          </div>
          {lp.loading
            ? <div style={{ fontSize: 32, fontWeight: 900, color: 'rgba(255,255,255,0.15)', letterSpacing: '-0.04em', lineHeight: 1 }}>···</div>
            : lp.ok && lp.price
              ? <div style={{ fontSize: 36, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>{peso(lp.price)}</div>
              : <div style={{ fontSize: 14, color: C.onCardSub, fontStyle: 'italic', marginTop: 4 }}>Cotizar con un agente</div>
          }
          {lp.ok && <div style={{ fontSize: 10, color: C.onCardMuted, marginTop: 2 }}>IVA incluido</div>}
        </div>
        {lp.ok && (
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: C.onCardMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 3, fontWeight: 600 }}>Disponibilidad</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: lp.stock ? '#4ade80' : '#f87171' }}>{lp.stock ? '✓ En stock' : 'Sin stock'}</div>
          </div>
        )}
      </div>

      {lp.ok && lp.url && (
        <a href={lp.url} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          marginBottom: 12, padding: '8px', borderRadius: 9,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
          color: '#4ade80', fontSize: 11.5, fontWeight: 600, textDecoration: 'none',
        }}>↗ Ver en surtiaceros.com</a>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <a href={`https://wa.me/526616137040?text=${encodeURIComponent(waMsg)}`}
          target="_blank" rel="noopener noreferrer" style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '13px', borderRadius: 13, background: '#22c55e', color: '#fff',
            textDecoration: 'none', fontSize: 14, fontWeight: 800, boxShadow: '0 3px 12px rgba(34,197,94,0.28)',
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.558 4.121 1.532 5.856L.057 23.882l6.198-1.627A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.52-5.184-1.426l-.371-.22-3.681.965.982-3.588-.242-.38A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          WhatsApp
        </a>
        <a href={`mailto:contacto@surtiaceros.com?subject=${encodeURIComponent('Cotización: ' + title)}&body=${encodeURIComponent(mailBody)}`}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '13px', borderRadius: 13,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: C.onCardSub, textDecoration: 'none', fontSize: 13, fontWeight: 700,
          }}>
          Correo
        </a>
      </div>
    </div>
  )
}

function App() {
  const winW = useWindowWidth()
  const isMobile = winW < 600
  const [cat, setCat] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const catProducts = useMemo(() => {
    if (!cat) return []
    return Object.entries(PRODUCTS)
      .filter(([, v]) => v[3] === cat)
      .sort((a, b) => a[1][0].localeCompare(b[1][0], 'es'))
  }, [cat])

  const filtered = useMemo(() => {
    if (!search.trim()) return catProducts
    const q = search.toLowerCase()
    return catProducts.filter(([slug, [title, sku]]) =>
      title.toLowerCase().includes(q) || sku.toLowerCase().includes(q) || slug.includes(q))
  }, [catProducts, search])

  const reset = useCallback(() => { setCat(null); setSelected(null); setSearch('') }, [])
  const selectCat = useCallback((c: string) => { setCat(c); setSelected(null); setSearch('') }, [])
  const selectedProduct = selected ? PRODUCTS[selected] : null

  return (
    <div style={{ minHeight: '100dvh', background: C.bg, color: C.text, display: 'flex', flexDirection: 'column' }}>

      {/* Top Bar */}
      <div style={{
        background: 'rgba(247,248,247,0.93)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        borderBottom: `1px solid ${C.border}`, padding: '0 18px', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 580, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }} onClick={reset}>
            <img src={LOGO} alt="Surtiaceros" style={{ height: 26, width: 'auto', objectFit: 'contain', borderRadius: 4 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.text, letterSpacing: '-0.01em', lineHeight: 1 }}>
                {cat ?? 'Cotizador de Acero'}
              </div>
              <div style={{ fontSize: 9.5, color: C.accent, letterSpacing: '0.06em', fontWeight: 700 }}>SURTIACEROS</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {cat && (
              <button onClick={reset} style={{
                padding: '5px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                background: C.accentLight, border: `1px solid ${C.accentBorder}`, color: C.accent,
              }}>← Categorías</button>
            )}
            <div style={{ fontSize: 11, color: C.textSub, background: C.surfaceAlt, border: `1px solid ${C.border}`, padding: '4px 9px', borderRadius: 20 }}>
              Precios <span style={{ color: C.accent, fontWeight: 700 }}>en vivo</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: 580, margin: '0 auto', padding: isMobile ? '16px 14px 80px' : '20px 20px 60px' }}>

          {/* Step 0 — Categories */}
          {!cat && (
            <div className="fade">
              <div style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: '-0.03em', marginBottom: 6 }}>
                ¿Qué producto necesitas?
              </div>
              <div style={{ fontSize: 14, color: C.textSub, marginBottom: 20 }}>Selecciona una categoría</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                {CATS.map((c, i) => (
                  <button
                    key={c}
                    onClick={() => selectCat(c)}
                    className="cat-card"
                    data-cat={c}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '14px 16px', borderRadius: 16, textAlign: 'left',
                      border: `1.5px solid ${C.border}`, background: C.surface, cursor: 'pointer',
                      boxShadow: `0 2px 6px ${C.shadow}`, transition: 'border-color 0.14s, box-shadow 0.14s',
                      animationDelay: `${i * 55}ms`,
                    }}
                  >
                    <span
                      className="cat-icon"
                      style={{ fontSize: 22, flexShrink: 0, width: 30, textAlign: 'center', animationDelay: `${i * 55 + 80}ms` }}
                    >
                      {CAT_ICONS[c] ?? '●'}
                    </span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{c}</div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>
                        {Object.values(PRODUCTS).filter(v => v[3] === c).length} productos
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 — Product list */}
          {cat && !selected && (
            <div className="fade">
              <div style={{ position: 'relative', marginBottom: 16 }}>
                <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.textMuted }}
                  width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder={`Buscar en ${cat}...`}
                  style={{
                    width: '100%', padding: '11px 36px', borderRadius: 12,
                    border: `1.5px solid ${C.border}`, background: C.surface,
                    fontSize: 14, color: C.text, boxShadow: `0 1px 3px ${C.shadow}`,
                  }} />
                {search && (
                  <button onClick={() => setSearch('')} style={{
                    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, fontSize: 18, lineHeight: 1,
                  }}>×</button>
                )}
              </div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>
                {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}{search ? ` para "${search}"` : ''}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {filtered.map(([slug, [title, sku, w]]) => (
                  <button key={slug} onClick={() => setSelected(slug)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                    padding: '13px 14px', borderRadius: 13, textAlign: 'left',
                    border: `1.5px solid ${C.border}`, background: C.surface, cursor: 'pointer',
                    boxShadow: `0 1px 3px ${C.shadow}`, transition: 'all 0.14s',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {title}
                      </div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{sku} · {w} kg</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2.5" strokeLinecap="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: C.textMuted }}>
                    Sin resultados para "{search}"
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2 — Result */}
          {cat && selected && selectedProduct && (
            <div>
              <button onClick={() => setSelected(null)} style={{
                display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none',
                color: C.textMuted, cursor: 'pointer', padding: '0 0 14px', fontSize: 13, fontWeight: 500,
              }}>‹ Volver a {cat}</button>
              <ResultCard slug={selected} product={selectedProduct} />
              <button onClick={() => setSelected(null)} style={{
                width: '100%', marginTop: 6, padding: '12px', borderRadius: 14,
                background: 'transparent', border: `1.5px solid ${C.border}`,
                color: C.textMuted, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>Ver otro producto</button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: '22px 18px 32px', textAlign: 'center' }}>
          <a href="https://surtiaceros.com" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 5, textDecoration: 'none', marginBottom: 12 }}>
            <img src={LOGO} alt="" style={{ height: 26, opacity: 0.7, borderRadius: 4 }} />
            <span style={{ fontSize: 10.5, color: C.accent, fontWeight: 700, letterSpacing: '0.04em' }}>www.surtiaceros.com</span>
          </a>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: '0 0 3px' }}>Surtiaceros del Pacífico S.A. de C.V.</p>
          <p style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.7, margin: '0 0 8px' }}>
            Calle Aguascalientes No. 4255, Col. Constitución<br />Playas de Rosarito, B.C., C.P. 22707
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px 12px', marginBottom: 10 }}>
            <a href="tel:6616137038" style={{ fontSize: 11, color: C.accent, textDecoration: 'none' }}>📞 661 613 7038</a>
            <a href="tel:6616137040" style={{ fontSize: 11, color: C.accent, textDecoration: 'none' }}>📞 661 613 7040</a>
            <a href="mailto:contacto@surtiaceros.com" style={{ fontSize: 11, color: C.accent, textDecoration: 'none' }}>✉️ contacto@surtiaceros.com</a>
          </div>
          <p style={{ fontSize: 10, color: C.textMuted, lineHeight: 1.6 }}>
            Entregas sin costo en Playas de Rosarito y Tijuana, B.C.<br />
            Precios con IVA incluido · © {new Date().getFullYear()} · v5.0
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
