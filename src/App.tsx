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

      <a href={WHATSAPP} className="wa-float" target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        WhatsApp
      </a>

      <footer>
        <div className="wrap">
          © {new Date().getFullYear()} Surtielek · Surtiaceros del Pacífico S.A. de C.V.
        </div>
      </footer>
    </>
  );
}
