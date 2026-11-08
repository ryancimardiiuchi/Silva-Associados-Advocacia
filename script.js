document.addEventListener('DOMContentLoaded', () => {
  // ===== Número do WhatsApp (somente dígitos, com DDI+DDD) =====
  const WHATSAPP_NUMBER = '5500000000000';

  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  // Ano do rodapé
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== Header ao rolar =====
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== Menu mobile =====
  const closeMenu = () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // ===== Link ativo conforme a seção =====
  const links = [...nav.querySelectorAll('a[href^="#"]:not(.btn)')];
  const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // ===== Revelar elementos ao rolar =====
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ===== Contadores =====
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const plus = el.dataset.plus ? '+' : '';
      const start = performance.now();
      const dur = 1600;
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = plus + Math.round(target * eased).toLocaleString('pt-BR') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => countObs.observe(c));

  // ===== Slider de depoimentos =====
  const track = document.getElementById('sliderTrack');
  const slides = track.children;
  const dotsBox = document.getElementById('dots');
  let index = 0, timer;

  [...slides].forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Ir para depoimento ' + (i + 1));
    b.addEventListener('click', () => { go(i); restart(); });
    dotsBox.appendChild(b);
  });

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    [...dotsBox.children].forEach((d, n) => d.classList.toggle('active', n === index));
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 6000);
  }
  document.getElementById('prev').addEventListener('click', () => { go(index - 1); restart(); });
  document.getElementById('next').addEventListener('click', () => { go(index + 1); restart(); });
  go(0);
  restart();

  // ===== FAQ: abre um por vez =====
  const details = document.querySelectorAll('.faq details');
  details.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) details.forEach(o => { if (o !== d) o.open = false; });
  }));

  // ===== Máscara de telefone =====
  const tel = document.getElementById('telefone');
  tel.addEventListener('input', () => {
    let v = tel.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 6) v = v.replace(/^(\d{2})(\d{4,5})(\d{4}).*/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d+)/, '($1) $2');
    else if (v.length) v = v.replace(/^(\d*)/, '($1');
    tel.value = v;
  });

  // ===== Formulário: validação + envio ao WhatsApp =====
  const form = document.getElementById('form');
  const note = document.getElementById('formNote');

  const rules = {
    nome:     v => v.trim().split(/\s+/).length >= 2 || 'Informe nome e sobrenome.',
    email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Informe um e-mail válido.',
    telefone: v => v.replace(/\D/g, '').length >= 10 || 'Informe um telefone com DDD.',
    area:     v => v !== '' || 'Selecione uma área.',
    mensagem: v => v.trim().length >= 10 || 'Descreva brevemente seu caso (mín. 10 caracteres).'
  };

  function validate(field) {
    const result = rules[field.name](field.value);
    const wrap = field.closest('.field');
    wrap.classList.toggle('invalid', result !== true);
    wrap.querySelector('.error').textContent = result === true ? '' : result;
    return result === true;
  }

  form.querySelectorAll('input, select, textarea').forEach(f => {
    f.addEventListener('blur', () => validate(f));
    f.addEventListener('input', () => f.closest('.field').classList.contains('invalid') && validate(f));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('input, select, textarea')];
    const ok = fields.map(validate).every(Boolean);
    if (!ok) {
      note.textContent = 'Revise os campos destacados.';
      form.querySelector('.invalid input, .invalid select, .invalid textarea')?.focus();
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const text =
      `Olá! Vim pelo site e gostaria de uma consulta.\n\n` +
      `*Nome:* ${d.nome}\n*E-mail:* ${d.email}\n*Telefone:* ${d.telefone}\n` +
      `*Área:* ${d.area}\n*Mensagem:* ${d.mensagem}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    note.textContent = 'Abrindo o WhatsApp para concluir o envio…';
    form.reset();
  });
});
