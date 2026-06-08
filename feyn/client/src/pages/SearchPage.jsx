import { useState, useEffect, useRef } from "react";
import "../css/SearchPage.css";

/* ─── DATA ─── */
const ALL_PRODUCTS = [
  {
    id: 1, brand: "Redmi", name: "Note 15 SE 5G", tag: "Snapdragon Edition",
    color: "Crimson Reserve", storage: "128GB", ram: "6GB", price: 22999,
    originalPrice: 34999, discount: 34, rating: 4.2, reviews: 12847,
    badge: "Best Seller", category: "Smartphones", processor: "Snapdragon",
    battery: 5800, display: "6.77\"", camera: "50MP",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/h/o/e/-original-imah7aff3gwhpgge.jpeg?q=70",
    tags: ["5G", "Fast Charge", "120Hz"],
  },
  {
    id: 2, brand: "Redmi", name: "Note 15 SE 5G", tag: "Snapdragon Edition",
    color: "Midnight Eclipse", storage: "128GB", ram: "8GB", price: 24999,
    originalPrice: 35999, discount: 31, rating: 4.3, reviews: 8421,
    badge: "Trending", category: "Smartphones", processor: "Snapdragon",
    battery: 5800, display: "6.77\"", camera: "50MP",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/3/c/2/-original-imah7aff6hwsqrhb.jpeg?q=70",
    tags: ["5G", "120Hz", "NFC"],
  },
  {
    id: 3, brand: "Redmi", name: "Note 15 SE 5G", tag: "Pro Variant",
    color: "Arctic White", storage: "256GB", ram: "8GB", price: 26999,
    originalPrice: 37999, discount: 29, rating: 4.4, reviews: 5632,
    badge: "New", category: "Smartphones", processor: "Snapdragon",
    battery: 5800, display: "6.77\"", camera: "50MP",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/l/0/p/-original-imah7affxfg6zfwy.jpeg?q=70",
    tags: ["5G", "120Hz", "256GB"],
  },
  {
    id: 4, brand: "Redmi", name: "Note 14 Pro", tag: "MediaTek Edition",
    color: "Phantom Purple", storage: "128GB", ram: "8GB", price: 19999,
    originalPrice: 27999, discount: 28, rating: 4.1, reviews: 21043,
    badge: "Top Rated", category: "Smartphones", processor: "MediaTek",
    battery: 5110, display: "6.67\"", camera: "200MP",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/i/7/c/-original-imah7affhmqghkqv.jpeg?q=70",
    tags: ["5G", "200MP", "67W"],
  },
  {
    id: 5, brand: "Redmi", name: "13C 5G", tag: "Budget Champion",
    color: "Startrail Black", storage: "128GB", ram: "6GB", price: 11999,
    originalPrice: 15999, discount: 25, rating: 3.9, reviews: 34201,
    badge: "Budget Pick", category: "Smartphones", processor: "MediaTek",
    battery: 5000, display: "6.74\"", camera: "50MP",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/h/o/e/-original-imah7aff3gwhpgge.jpeg?q=70",
    tags: ["5G", "50MP", "Slim"],
  },
  {
    id: 6, brand: "Redmi", name: "A3x", tag: "Entry Series",
    color: "Olive Green", storage: "64GB", ram: "3GB", price: 7499,
    originalPrice: 9999, discount: 25, rating: 3.7, reviews: 18900,
    badge: "Value", category: "Smartphones", processor: "MediaTek",
    battery: 5000, display: "6.71\"", camera: "8MP",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/l/0/p/-original-imah7affxfg6zfwy.jpeg?q=70",
    tags: ["Dual SIM", "Light"],
  },
  {
    id: 7, brand: "Redmi", name: "Note 15 Pro 5G", tag: "Flagship Killer",
    color: "Glacier Blue", storage: "256GB", ram: "12GB", price: 31999,
    originalPrice: 42999, discount: 25, rating: 4.5, reviews: 7821,
    badge: "Premium", category: "Smartphones", processor: "Snapdragon",
    battery: 6200, display: "6.78\"", camera: "108MP",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/3/c/2/-original-imah7aff6hwsqrhb.jpeg?q=70",
    tags: ["5G", "108MP", "120W"],
  },
  {
    id: 8, brand: "Redmi", name: "Turbo 3", tag: "Performance Beast",
    color: "Graphite Shadow", storage: "256GB", ram: "12GB", price: 34999,
    originalPrice: 45999, discount: 24, rating: 4.6, reviews: 4320,
    badge: "Editor's Choice", category: "Smartphones", processor: "Snapdragon",
    battery: 5500, display: "6.67\"", camera: "50MP",
    img: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/i/7/c/-original-imah7affhmqghkqv.jpeg?q=70",
    tags: ["5G", "120W", "Gaming"],
  },
];

const SORT_OPTIONS = ["Relevance", "Price: Low to High", "Price: High to Low", "Rating", "Newest", "Discount"];
const BRANDS = ["Redmi", "Samsung", "OnePlus", "Realme", "iQOO"];
const PROCESSORS = ["Snapdragon", "MediaTek", "Dimensity", "Exynos"];
const STORAGES = ["64GB", "128GB", "256GB", "512GB"];
const RAMS = ["3GB", "4GB", "6GB", "8GB", "12GB"];

/* ─── HELPERS ─── */
function PriceRange({ min, max, value, onChange }) {
  return (
    <div className="sp-range-wrap">
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} className="sp-range" />
      <div className="sp-range-labels">
        <span>₹{min.toLocaleString("en-IN")}</span>
        <span className="sp-range-val">≤ ₹{value.toLocaleString("en-IN")}</span>
        <span>₹{max.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

function StarRow({ rating }) {
  return (
    <div className="sp-stars">
      {[1,2,3,4,5].map(i => (
        <svg key={i} viewBox="0 0 12 12" className={`sp-star ${i <= Math.floor(rating) ? "full" : i - 0.5 <= rating ? "half" : "empty"}`}>
          <polygon points="6,0.5 7.5,4.5 12,4.5 8.5,7 9.8,11.5 6,9 2.2,11.5 3.5,7 0,4.5 4.5,4.5"/>
        </svg>
      ))}
      <span className="sp-rating-num">{rating}</span>
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button className={`sp-chip ${active ? "active" : ""}`} onClick={onClick}>{label}</button>
  );
}

/* ─── MAIN ─── */
export default function SearchPage() {
  const [query, setQuery] = useState("Redmi Note 15 SE 5G");
  const [searchInput, setSearchInput] = useState("Redmi Note 15 SE 5G");
  const [sort, setSort] = useState("Relevance");
  const [priceMax, setPriceMax] = useState(45000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProcessors, setSelectedProcessors] = useState([]);
  const [selectedStorages, setSelectedStorages] = useState([]);
  const [selectedRams, setSelectedRams] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [view, setView] = useState("grid"); // grid | list
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const [cartAdded, setCartAdded] = useState(new Set());
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  /* Intersection Observer for stagger animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisibleCards(p => new Set([...p, e.target.dataset.id])); }),
      { threshold: 0.1 }
    );
    cardRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  /* Filtered + sorted products */
  const filtered = ALL_PRODUCTS.filter(p => {
    const q = query.toLowerCase();
    if (!`${p.brand} ${p.name} ${p.tag} ${p.color}`.toLowerCase().includes(q)) return false;
    if (p.price > priceMax) return false;
    if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
    if (selectedProcessors.length && !selectedProcessors.includes(p.processor)) return false;
    if (selectedStorages.length && !selectedStorages.includes(p.storage)) return false;
    if (selectedRams.length && !selectedRams.includes(p.ram)) return false;
    if (p.rating < minRating) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "Price: Low to High") return a.price - b.price;
    if (sort === "Price: High to Low") return b.price - a.price;
    if (sort === "Rating") return b.rating - a.rating;
    if (sort === "Discount") return b.discount - a.discount;
    if (sort === "Newest") return b.id - a.id;
    return 0;
  });

  const toggle = (set, setFn, val) =>
    setFn(s => s.includes(val) ? s.filter(x => x !== val) : [...s, val]);

  const toggleWish = id => setWishlist(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const addToCart = id => {
    setCartAdded(s => new Set([...s, id]));
    setTimeout(() => setCartAdded(s => { const n = new Set(s); n.delete(id); return n; }), 1800);
  };

  const activeFilterCount = selectedBrands.length + selectedProcessors.length + selectedStorages.length + selectedRams.length + (minRating > 0 ? 1 : 0) + (priceMax < 45000 ? 1 : 0);

  const clearAll = () => {
    setSelectedBrands([]); setSelectedProcessors([]); setSelectedStorages([]); setSelectedRams([]); setMinRating(0); setPriceMax(45000);
  };

  /* ── FILTER PANEL ── */
  const FilterPanel = () => (
    <aside className="sp-filters">
      <div className="sp-filter-header">
        <span className="sp-filter-title">Filters</span>
        {activeFilterCount > 0 && (
          <button className="sp-clear-btn" onClick={clearAll}>Clear all ({activeFilterCount})</button>
        )}
      </div>

      <div className="sp-filter-section">
        <p className="sp-filter-label">Price Range</p>
        <PriceRange min={5000} max={45000} value={priceMax} onChange={setPriceMax} />
      </div>

      <div className="sp-filter-section">
        <p className="sp-filter-label">Brand</p>
        <div className="sp-chip-group">
          {BRANDS.map(b => <Chip key={b} label={b} active={selectedBrands.includes(b)} onClick={() => toggle(selectedBrands, setSelectedBrands, b)} />)}
        </div>
      </div>

      <div className="sp-filter-section">
        <p className="sp-filter-label">Processor</p>
        <div className="sp-chip-group">
          {PROCESSORS.map(p => <Chip key={p} label={p} active={selectedProcessors.includes(p)} onClick={() => toggle(selectedProcessors, setSelectedProcessors, p)} />)}
        </div>
      </div>

      <div className="sp-filter-section">
        <p className="sp-filter-label">Storage</p>
        <div className="sp-chip-group">
          {STORAGES.map(s => <Chip key={s} label={s} active={selectedStorages.includes(s)} onClick={() => toggle(selectedStorages, setSelectedStorages, s)} />)}
        </div>
      </div>

      <div className="sp-filter-section">
        <p className="sp-filter-label">RAM</p>
        <div className="sp-chip-group">
          {RAMS.map(r => <Chip key={r} label={r} active={selectedRams.includes(r)} onClick={() => toggle(selectedRams, setSelectedRams, r)} />)}
        </div>
      </div>

      <div className="sp-filter-section">
        <p className="sp-filter-label">Minimum Rating</p>
        <div className="sp-chip-group">
          {[3, 3.5, 4, 4.5].map(r => (
            <Chip key={r} label={`${r}★+`} active={minRating === r} onClick={() => setMinRating(minRating === r ? 0 : r)} />
          ))}
        </div>
      </div>
    </aside>
  );

  return (
    <div className="sp-root">
      {/* ── TOP BAR ── */}
      <header className="sp-header">
        <div className="sp-header-inner">
          <a href="#" className="sp-logo">
            <span className="sp-logo-icon">◈</span>
            <span className="sp-logo-name">VOLTA</span>
            <span className="sp-logo-tag">tech</span>
          </a>

          <div className="sp-search-wrap">
            <div className="sp-search-box">
              <svg className="sp-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                className="sp-search-input"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && setQuery(searchInput)}
                placeholder="Search smartphones, accessories…"
              />
              <button className="sp-search-go" onClick={() => setQuery(searchInput)}>Search</button>
            </div>
            <div className="sp-search-tags">
              {["Redmi Note 15", "Snapdragon 5G", "Under ₹25000", "Best Camera"].map(t => (
                <button key={t} className="sp-search-tag" onClick={() => { setSearchInput(t); setQuery(t); }}>{t}</button>
              ))}
            </div>
          </div>

          <nav className="sp-nav-links">
            <a href="#">Phones</a>
            <a href="#">Tablets</a>
            <a href="#">Accessories</a>
            <button className="sp-cart-nav">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.69l1.64-9.8H6"/>
              </svg>
              <span className="sp-cart-count">{cartAdded.size}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* ── MOBILE FILTER DRAWER ── */}
      {drawerOpen && (
        <div className="sp-overlay" onClick={() => setDrawerOpen(false)}>
          <div className="sp-drawer" onClick={e => e.stopPropagation()}>
            <div className="sp-drawer-top">
              <span>Filters</span>
              <button className="sp-close-btn" onClick={() => setDrawerOpen(false)}>✕</button>
            </div>
            <div className="sp-drawer-body"><FilterPanel /></div>
            <div className="sp-drawer-footer">
              <button className="sp-apply-btn" onClick={() => setDrawerOpen(false)}>Show {filtered.length} Results</button>
            </div>
          </div>
        </div>
      )}

      {/* ── BREADCRUMB ── */}
      <div className="sp-crumb">
        <span>Home</span><span className="sp-crumb-sep">/</span>
        <span>Smartphones</span><span className="sp-crumb-sep">/</span>
        <span className="sp-crumb-active">"{query}"</span>
      </div>

      {/* ── BODY ── */}
      <div className="sp-body">
        {/* Desktop Filters */}
        <div className="sp-filters-desktop"><FilterPanel /></div>

        {/* Results */}
        <div className="sp-results">
          {/* Toolbar */}
          <div className="sp-toolbar">
            <div className="sp-toolbar-left">
              <span className="sp-result-count">
                <strong>{filtered.length}</strong> results for <em>"{query}"</em>
              </span>
              {/* Mobile filter toggle */}
              <button className="sp-filter-toggle-btn" onClick={() => setDrawerOpen(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16">
                  <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/>
                  <line x1="11" y1="18" x2="13" y2="18"/>
                </svg>
                Filters {activeFilterCount > 0 && <span className="sp-filter-badge">{activeFilterCount}</span>}
              </button>
            </div>
            <div className="sp-toolbar-right">
              <div className="sp-sort-wrap">
                <label>Sort:</label>
                <select value={sort} onChange={e => setSort(e.target.value)} className="sp-sort-select">
                  {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="sp-view-toggle">
                <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>
                  <svg viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1"/><rect x="10" y="0" width="6" height="6" rx="1"/><rect x="0" y="10" width="6" height="6" rx="1"/><rect x="10" y="10" width="6" height="6" rx="1"/></svg>
                </button>
                <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
                  <svg viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="2" rx="1"/><rect x="0" y="7" width="16" height="2" rx="1"/><rect x="0" y="13" width="16" height="2" rx="1"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="sp-active-filters">
              {selectedBrands.map(b => <span key={b} className="sp-active-pill">{b} <button onClick={() => toggle(selectedBrands, setSelectedBrands, b)}>✕</button></span>)}
              {selectedProcessors.map(p => <span key={p} className="sp-active-pill">{p} <button onClick={() => toggle(selectedProcessors, setSelectedProcessors, p)}>✕</button></span>)}
              {selectedStorages.map(s => <span key={s} className="sp-active-pill">{s} <button onClick={() => toggle(selectedStorages, setSelectedStorages, s)}>✕</button></span>)}
              {selectedRams.map(r => <span key={r} className="sp-active-pill">{r} RAM <button onClick={() => toggle(selectedRams, setSelectedRams, r)}>✕</button></span>)}
              {minRating > 0 && <span className="sp-active-pill">{minRating}★+ <button onClick={() => setMinRating(0)}>✕</button></span>}
              {priceMax < 45000 && <span className="sp-active-pill">≤ ₹{priceMax.toLocaleString("en-IN")} <button onClick={() => setPriceMax(45000)}>✕</button></span>}
            </div>
          )}

          {/* Cards */}
          {filtered.length === 0 ? (
            <div className="sp-empty">
              <span className="sp-empty-icon">🔍</span>
              <h3>No results found</h3>
              <p>Try adjusting your filters or search term</p>
              <button className="sp-apply-btn" onClick={clearAll}>Clear Filters</button>
            </div>
          ) : (
            <div className={`sp-grid ${view === "list" ? "sp-list-view" : ""}`}>
              {filtered.map((p, idx) => (
                <div
                  key={p.id}
                  className={`sp-card ${visibleCards.has(String(p.id)) ? "sp-card-visible" : ""} ${view === "list" ? "sp-card-list" : ""}`}
                  ref={el => { cardRefs.current[idx] = el; if (el) el.dataset.id = p.id; }}
                  style={{ "--delay": `${idx * 60}ms` }}
                >
                  {/* Image Area */}
                  <div className="sp-card-img-wrap">
                    <img
                      src={p.img}
                      alt={`${p.brand} ${p.name}`}
                      className="sp-card-img"
                      loading="lazy"
                      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                    />
                    <div className="sp-card-img-fallback" style={{display:"none"}}>📱</div>
                    <div className="sp-card-badge">{p.badge}</div>
                    <button className={`sp-card-wish ${wishlist.has(p.id) ? "active" : ""}`} onClick={() => toggleWish(p.id)}>
                      <svg viewBox="0 0 24 24" fill={wishlist.has(p.id) ? "#ff6b6b" : "none"} stroke={wishlist.has(p.id) ? "#ff6b6b" : "currentColor"} strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                      </svg>
                    </button>
                    <div className="sp-card-tags">
                      {p.tags.map(t => <span key={t} className="sp-tag">{t}</span>)}
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="sp-card-info">
                    <div className="sp-card-brand">{p.brand}</div>
                    <h3 className="sp-card-name">{p.name}</h3>
                    <p className="sp-card-tag">{p.tag} · {p.color}</p>
                    <div className="sp-card-specs">
                      <span>{p.ram} RAM</span>
                      <span className="sp-spec-dot">·</span>
                      <span>{p.storage}</span>
                      <span className="sp-spec-dot">·</span>
                      <span>{p.camera}</span>
                      <span className="sp-spec-dot">·</span>
                      <span>{p.battery}mAh</span>
                    </div>
                    <StarRow rating={p.rating} />
                    <p className="sp-card-reviews">{p.reviews.toLocaleString("en-IN")} reviews</p>
                    <div className="sp-card-price-row">
                      <span className="sp-card-price">₹{p.price.toLocaleString("en-IN")}</span>
                      <span className="sp-card-original">₹{p.originalPrice.toLocaleString("en-IN")}</span>
                      <span className="sp-card-disc">{p.discount}% off</span>
                    </div>
                    <div className="sp-card-actions">
                      <button className="sp-btn-wish-mobile" onClick={() => toggleWish(p.id)}>
                        {wishlist.has(p.id) ? "♥" : "♡"}
                      </button>
                      <button className="sp-btn-cart" onClick={() => addToCart(p.id)}>
                        {cartAdded.has(p.id) ? "✓ Added" : "Add to Cart"}
                      </button>
                      <button className="sp-btn-buy">Buy Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="sp-pagination">
            {[1,2,3,4,5].map(n => (
              <button key={n} className={`sp-page-btn ${n === 1 ? "active" : ""}`}>{n}</button>
            ))}
            <button className="sp-page-btn">›</button>
          </div>
        </div>
      </div>

      <footer className="sp-footer">
        <div className="sp-footer-inner">
          <span className="sp-logo"><span className="sp-logo-icon">◈</span> VOLTA<span className="sp-logo-tag">tech</span></span>
          <span className="sp-footer-text">© 2025 VoltaTech Store · All prices in INR · Demo only</span>
        </div>
      </footer>
    </div>
  );
}
