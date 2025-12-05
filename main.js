// Simple interactions: mobile nav, filter menu, cart preview, form submit
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav (if open)
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          navToggle.classList.remove('active');
        }
      }
    });
  });

  // Menu filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.menu-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const f = btn.dataset.filter;
      items.forEach(i => {
        if (f === 'all' || i.dataset.cat === f) {
          i.style.display = 'flex';
          i.animate(
            [
              { opacity: 0, transform: 'translateY(6px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ],
            { duration: 220, fill: 'forwards' }
          );
        } else {
          i.style.display = 'none';
        }
      });
    });
  });

  // Cart (very simple client-side)
  const cart = { count: 0, total: 0 };
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');

  function formatIDR(n) {
    return 'Rp' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // price map (simple)
  const priceMap = {
    "Espresso Shot": 18000,
    "Cappuccino": 28000,
    "Matcha Latte": 30000,
    "Avocado Toast": 42000,
    "Classic Burger": 55000
  };

  document.querySelectorAll('.add').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item;
      const price = priceMap[item] || 20000;

      cart.count += 1;
      cart.total += price;

      cartCount.textContent = cart.count;
      cartTotal.textContent = formatIDR(cart.total);

      // small feedback animation
      btn.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(1.08)' },
          { transform: 'scale(1)' }
        ],
        { duration: 220 }
      );
    });
  });

  // Form submit (no backend) — show success message
  const form = document.getElementById('orderForm');
  const note = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !phone) {
      note.textContent = 'Mohon isi nama dan nomor telepon.';
      note.style.color = '#ffb4b4';
      return;
    }

    note.style.color = '#cfeadf';
    note.textContent = `Terima kasih ${name}! Pesananmu akan diproses. Kami akan menghubungi ${phone}.`;
    form.reset();
  });

  // Simple scroll reveal
  const revealEls = document.querySelectorAll(
    '.section, .hero-card, .menu-item, .gallery-grid img'
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.opacity = 1;
          en.target.style.transform = 'none';
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(8px)';
    io.observe(el);
  });
});