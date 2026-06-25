/* =================================================================
   RENEW ESTÉTICA — JS compartilhado (V2)
   UTM · WhatsApp · Traço Renew (scroll) · reveals · FAQ · vídeo lazy
   Vanilla JS. Carregado pelas 4 páginas. GSAP/lucide são opcionais
   (a página continua funcional sem eles).
   ================================================================= */

/* ---------- 1. Captura de UTM no load (CLAUDE §8) ---------- */
(function () {
  const p = new URLSearchParams(location.search);
  const ks = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const u = {};
  let h = false;
  ks.forEach((k) => { const v = p.get(k); if (v) { u[k] = v; h = true; } });
  if (h) sessionStorage.setItem('renew_utms', JSON.stringify(u));
})();

/* ---------- 2. Abrir WhatsApp com UTM + procedimento ----------
   Destino: cada página dedicada define window.RENEW_WA = 'https://wa.me/...'
   com o link da sua especialista. Sem config (hub), usa o número geral.
   Links de convite wa.me/message/XXXX NÃO aceitam ?text= → abrem direto,
   sem UTM. Links de número (wa.me/55...) recebem texto + UTM normalmente. */
function abrirWhatsApp(proc) {
  // Meta Pixel — evento de conversão. Dispara ANTES de abrir o WhatsApp.
  // Página dedicada: atinge o pixel da especialista. Hub: os 3 pixels inicializados.
  if (typeof window.fbq === 'function') { window.fbq('track', 'Lead'); }
  const base = window.RENEW_WA || 'https://wa.me/5547991968525';
  // wa.me/message/ (link de convite) não aceita parâmetro de texto: abre direto.
  if (base.indexOf('/message/') !== -1) {
    window.open(base, '_blank');
    return;
  }
  const u = JSON.parse(sessionStorage.getItem('renew_utms') || '{}');
  const tag = (u.utm_campaign || u.utm_source)
    ? ` [campanha: ${u.utm_campaign || '-'} | origem: ${u.utm_source || '-'}]`
    : '';
  const msg = 'Olá! Gostaria de agendar uma avaliação para ' + proc + '.' + tag;
  window.open(base + '?text=' + encodeURIComponent(msg), '_blank');
}
window.abrirWhatsApp = abrirWhatsApp;

/* ---------- 2b. Scroll suave até "As especialistas" (CTA do hero do hub) ----------
   O botão "Agendar avaliação" do hub NÃO abre WhatsApp: leva a paciente até a
   vitrine das 3 especialistas pra ela escolher com qual doutora falar. Desconta a
   altura do header fixo e respeita prefers-reduced-motion. */
function scrollToEspecialistas() {
  const el = document.getElementById('especialistas');
  if (!el) return;
  const headerH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10
  ) || 72;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const y = el.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
  window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
}
window.scrollToEspecialistas = scrollToEspecialistas;

/* ---------- helpers ---------- */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- 3. Ícones lucide ---------- */
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  /* ---------- 4. Header sólido ao rolar ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 5. Menu mobile ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- 6. FAQ acordeão ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // fecha os demais (acordeão clássico)
      item.closest('.faq').querySelectorAll('.faq-item.open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      q.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  /* ---------- 7. Vídeo YouTube lazy (facade) ---------- */
  document.querySelectorAll('.video-card[data-yt]').forEach((card) => {
    const id = card.getAttribute('data-yt');
    // thumbnail como fundo (não carrega o player até o clique)
    if (id && id !== 'VIDEO_ID') {
      card.style.backgroundImage = `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)`;
    }
    const load = () => {
      if (!id || id === 'VIDEO_ID') return; // placeholder vazio: não faz nada
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.title = card.getAttribute('aria-label') || 'Vídeo';
      card.appendChild(iframe);
    };
    card.addEventListener('click', load);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); }
    });
  });

  /* ---------- 8. Reveal de entrada (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // stagger leve por proximidade no DOM
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('in'), delay * 1);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- 9. O TRAÇO RENEW — desenho no scroll ---------- */
  // Cada .trace-stroke "desenha-se" conforme entra na viewport.
  const strokes = document.querySelectorAll('.trace-stroke');
  strokes.forEach((path) => {
    if (prefersReduced || typeof path.getTotalLength !== 'function') return;
    let len;
    try { len = path.getTotalLength(); } catch (e) { return; }
    if (!len) return;
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
  });

  function animateStrokes() {
    if (prefersReduced) return;
    strokes.forEach((path) => {
      if (!path.style.strokeDasharray) return;
      const rect = path.getBoundingClientRect();
      const vh = window.innerHeight;
      // progresso de 0→1 enquanto o traço cruza a tela
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      const len = parseFloat(path.style.strokeDasharray);
      path.style.strokeDashoffset = len * (1 - progress);
    });
  }
  if (strokes.length && !prefersReduced) {
    animateStrokes();
    window.addEventListener('scroll', () => window.requestAnimationFrame(animateStrokes), { passive: true });
  }

  /* ---------- 10. GSAP hero parallax (opcional, suave) ---------- */
  if (window.gsap && !prefersReduced) {
    const bg = document.querySelector('.hero-bg');
    if (bg && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.to(bg, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  }

  /* ---------- 11. Ano no footer ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
});
