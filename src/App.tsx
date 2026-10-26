import "./App.css";

const CATALOGO = "https://surtiaceros.com/surtielek";
const TEL = "tel:+526611008946";
const WHATSAPP = "https://wa.me/526611008946?text=Hola%2C%20quiero%20cotizar%3A%20";
const MAPA = "https://maps.app.goo.gl/yzZcbm6zSsLdFzAy8";

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const ICONS = {
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
  chat: "M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.5 8.5 0 1 1 21 11.5z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l3 2",
  arrow: "M5 12h14m-6-6 6 6-6 6",
};

export default function App() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <img src="/logo-surtielek-blanco.webp" alt="Surtielek" className="hero-logo" />
          <p className="eyebrow">Sucursal Surtiaceros · Playas de Rosarito</p>
          <h1>
            Material eléctrico <span>y plomería.</span>
          </h1>
          <p className="hero-sub">
            Cable, conduit, centros de carga, tubería PVC, CPVC, ABS, cobre, PPR, válvulas y gas. Consulta
            productos, existencias y precios en línea.
          </p>
          <a href={CATALOGO} className="btn btn-primary btn-big">
            Ver catálogo y precios
            <Icon d={ICONS.arrow} />
          </a>
          <div className="hero-actions">
            <a href={TEL} className="btn btn-outline">
              <Icon d={ICONS.phone} />
              Llamar
            </a>
            <a href={WHATSAPP} className="btn btn-outline" target="_blank" rel="noreferrer">
              <Icon d={ICONS.chat} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="contact" id="contacto">
        <div className="wrap">
          <div className="card">
            <img src="/fachada-surtielek.webp" alt="Fachada de la sucursal Surtielek" className="card-photo" />
            <div className="card-body">
              <h2>Visítanos o contáctanos</h2>
              <ul className="info">
                <li>
                  <Icon d={ICONS.pin} />
                  <div>
                    Blvd. Guerrero 740-B, Col. Constitución
                    <br />
                    Playas de Rosarito, B.C. · CP 22707
                    <br />
                    <a href={MAPA} target="_blank" rel="noreferrer">Cómo llegar</a>
                  </div>
                </li>
                <li>
                  <Icon d={ICONS.phone} />
                  <a href={TEL}>(661) 100 8946</a>
                </li>
                <li>
                  <Icon d={ICONS.chat} />
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp (661) 100 8946</a>
                </li>
                <li>
                  <Icon d={ICONS.mail} />
                  <a href="mailto:contacto@surtielek.com">contacto@surtielek.com</a>
                </li>
                <li>
                  <Icon d={ICONS.clock} />
                  <div>
                    Lun a Vie 8:00–17:00
                    <br />
                    Sáb 8:00–13:30
                  </div>
                </li>
              </ul>
              <a href={CATALOGO} className="btn btn-dark">
                Ver catálogo y precios
                <Icon d={ICONS.arrow} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          © {new Date().getFullYear()} Surtielek · Surtiaceros del Pacífico S.A. de C.V.
        </div>
      </footer>
    </>
  );
}
