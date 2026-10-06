(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };

/* Optional assets: leave empty to skip. Example: photo:'assets/profile.jpg' */
const CFG = {
  photo: '',
  video: '',
  resume: '',
  email: '',
  github: 'https://github.com/Venkyvtu',
  linkedin: 'https://www.linkedin.com/in/venkateswarlu-banka-902835196'
};

/* ---------- Data ---------- */
const G = [
  ['Programming', 'Core languages I build with.', [['Py', 'Python', 'Delta platform'], ['Jv', 'Java'], ['C', 'C'], ['JS', 'JavaScript']]],
  ['Web', 'Front end and back end web development.', [['Ht', 'HTML'], ['Cs', 'CSS'], ['Re', 'React'], ['No', 'Node.js'], ['Ex', 'Express'], ['Jp', 'JSP'], ['Sv', 'Servlets']]],
  ['Database', 'Relational, document and graph data stores.', [['My', 'MySQL'], ['Mg', 'MongoDB'], ['Sq', 'SQLite', 'Delta platform'], ['Ss', 'SQL Server', 'Delta platform'], ['N4', 'Neo4j']]],
  ['AI / ML', 'Machine learning and computer vision.', [['Ml', 'Machine Learning'], ['Dl', 'Deep Learning'], ['Cv', 'Computer Vision', 'PPE kit detection'], ['Tf', 'TensorFlow'], ['Pt', 'PyTorch'], ['Oc', 'OpenCV', 'PPE kit detection'], ['Yo', 'YOLO', 'PPE kit detection']]],
  ['Generative AI', 'LLM applications and agents.', [['Ll', 'LLMs', 'Delta platform'], ['Ga', 'Generative AI'], ['Aa', 'Agentic AI', 'Delta platform'], ['Lg', 'LangGraph', 'Delta platform'], ['Rg', 'RAG'], ['Pe', 'Prompt Engineering'], ['Gr', 'Guardrails'], ['Ao', 'AI Observability']]],
  ['Cloud', 'AWS and Azure AI services.', [['Aw', 'AWS'], ['Br', 'Amazon Bedrock'], ['La', 'Lambda'], ['S3', 'S3'], ['Ct', 'CloudTrail'], ['Eb', 'EventBridge'], ['Xr', 'X-Ray'], ['Az', 'Azure OpenAI']]]
];

const AG = [
  ['Remittance Agent', ['Processes remittance advice', 'Extracts invoice numbers', 'Extracts ticket numbers', 'Extracts payment amounts', 'Extracts deductions', 'PDF/TXT processing', 'LLM-based extraction', 'Fallback parsing']],
  ['Cash Application Agent', ['Matches payments with invoices', 'Uses deterministic matching', 'Uses pandas/data processing', 'Supports automated cash application decisions']],
  ['Dispute Resolution Agent', []],
  ['Refund Analysis Agent', []],
  ['Revenue Leakage Agent', []]
];

/* Every field except t and tag is optional. Add prob, sol, mine, res, tech, feat to any project to expand its case study. */
const P = [
  { t: 'Delta Autonomous Revenue Assurance Platform', tag: 'Agentic AI', sum: 'Agentic AI for Revenue Assurance',
    flow: AG.map(a => a[0]),
    tech: ['Python', 'LangGraph', 'Groq', 'GPT-OSS-120B', 'Streamlit', 'Pandas', 'PyMuPDF', 'PaddleOCR', 'SQLite / SQL Server', 'Agentic AI'],
    feat: ['Processes remittance advice from PDF and TXT files', 'LLM-based extraction of invoice numbers, ticket numbers, payment amounts and deductions, with fallback parsing', 'Deterministic matching of payments with invoices using pandas', 'Supports automated cash application decisions'] },
  { t: 'PPE Kit Detection Using Deep Learning', tag: 'Computer Vision', sum: 'Detecting personal protective equipment with deep learning models.',
    tech: ['YOLOv8n', 'YOLOv8s', 'YOLOv8m', 'Faster R-CNN', 'ResNet50', 'OpenCV', 'Computer Vision'],
    res: 'YOLOv8m achieved approximately mAP@0.5 = 0.864.' },
  { t: 'VMeet', tag: 'Video meeting app', sum: 'Video Meeting Application' },
  { t: 'Banking Application', tag: 'Application' },
  { t: 'Employee Time Tracker', tag: 'Application' },
  { t: 'Bone Fracture Detection', tag: 'Detection' },
  { t: 'Object Detection', tag: 'Detection' },
  { t: 'Financial Management', tag: 'Application' },
  { t: 'Text-to-Speech Converter', tag: 'Application' }
];

/* ---------- Menu ---------- */
const mb = $('#mb'), mn = $('#menu');
const setMenu = o => {
  mn.classList.toggle('open', o);
  mb.setAttribute('aria-expanded', String(o));
  mb.textContent = o ? 'CLOSE' : 'MENU';
  document.body.style.overflow = o ? 'hidden' : '';
  if (o) $('a', mn).focus();
};
mb.addEventListener('click', () => setMenu(!mn.classList.contains('open')));
mn.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', e => {
  if (e.key === 'Escape' && mn.classList.contains('open')) { setMenu(false); mb.focus(); }
});

/* ---------- Reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .15 });
$$('.rv').forEach(x => RM ? x.classList.add('in') : io.observe(x));
const abIo = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting)), { rootMargin: '-35% 0px -35% 0px' });
$$('.ab-l').forEach(x => RM ? x.classList.add('on') : abIo.observe(x));

/* ---------- Hero network + optional video ---------- */
const cv = $('#net'), cx = cv.getContext('2d');
let W = 0, H = 0, pts = [], heroVis = true, mx = -999, my = -999;
function sizeNet() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = cv.clientWidth; H = cv.clientHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const n = W < 700 ? 28 : 56;
  pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 }));
  if (RM) frame();
}
function frame() {
  if (heroVis && !document.hidden) {
    cx.clearRect(0, 0, W, H);
    cx.fillStyle = '#fff';
    for (const p of pts) {
      if (!RM) { p.x += p.vx; p.y += p.vy; }
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      cx.globalAlpha = .5;
      cx.fillRect(p.x - 1, p.y - 1, 2, 2);
    }
    cx.strokeStyle = '#fff';
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 130) { cx.globalAlpha = (1 - d / 130) * .22; cx.beginPath(); cx.moveTo(pts[i].x, pts[i].y); cx.lineTo(pts[j].x, pts[j].y); cx.stroke(); }
      }
      const dm = Math.hypot(pts[i].x - mx, pts[i].y - my);
      if (dm < 170) { cx.globalAlpha = (1 - dm / 170) * .5; cx.beginPath(); cx.moveTo(pts[i].x, pts[i].y); cx.lineTo(mx, my); cx.stroke(); }
    }
    cx.globalAlpha = 1;
  }
  if (!RM) requestAnimationFrame(frame);
}
sizeNet();
if (!RM) requestAnimationFrame(frame);
new IntersectionObserver(es => { heroVis = es[0].isIntersecting; }).observe($('#home'));
$('#home').addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
$('#home').addEventListener('pointerleave', () => { mx = my = -999; });

if (CFG.video) {
  const v = $('#hv');
  v.addEventListener('canplay', () => { v.classList.add('on'); if (!RM) v.play().catch(() => {}); }, { once: true });
  v.preload = 'auto'; v.src = CFG.video;
}

/* ---------- Cursor + hero parallax ---------- */
if (FINE && !RM) {
  document.body.classList.add('cur');
  const d = el('div', 'cd'), r = el('div', 'cr');
  d.setAttribute('aria-hidden', 'true'); r.setAttribute('aria-hidden', 'true');
  document.body.append(d, r);
  const l1 = $('.l1'), l2 = $('.l2');
  let x = 0, y = 0, rx = 0, ry = 0, tx = 0, ty = 0, px = 0, py = 0;
  addEventListener('pointermove', e => {
    x = e.clientX; y = e.clientY; tx = x / innerWidth - .5; ty = y / innerHeight - .5;
    d.style.transform = `translate3d(${x}px,${y}px,0)`;
  }, { passive: true });
  document.addEventListener('pointerover', e => {
    r.classList.toggle('h', !!e.target.closest('a,button,input,.card'));
    r.classList.toggle('p', !!e.target.closest('.pr,.hc,.fe'));
  });
  (function loop() {
    rx += (x - rx) * .16; ry += (y - ry) * .16;
    r.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    if (heroVis) {
      px += (tx - px) * .07; py += (ty - py) * .07;
      l1.style.transform = `translate3d(${px * 46}px,${py * 18}px,0)`;
      l2.style.transform = `translate3d(${px * -34}px,${py * -12}px,0)`;
    }
    requestAnimationFrame(loop);
  })();
}

/* ---------- ID card ---------- */
const card = $('#card'), cw = $('#cw'), ff = $('#ff'), fb = $('#fb'), flipBtn = $('#flip');
let flipped = false, tilt = [0, 0, 0, 0];
const drawCard = () => { card.style.transform = `translate3d(${tilt[2]}px,${tilt[3]}px,0) rotateX(${tilt[0]}deg) rotateY(${tilt[1] + (flipped ? 180 : 0)}deg)`; };
const flip = () => {
  flipped = !flipped;
  ff.toggleAttribute('inert', flipped); fb.toggleAttribute('inert', !flipped);
  flipBtn.setAttribute('aria-pressed', String(flipped));
  drawCard();
};
card.addEventListener('click', e => { if (!e.target.closest('a')) flip(); });
flipBtn.addEventListener('click', flip);
if (FINE && !RM) {
  cw.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const px = clamp((e.clientX - r.left) / r.width, -.3, 1.3) - .5, py = clamp((e.clientY - r.top) / r.height, -.3, 1.3) - .5;
    card.style.transition = 'transform .12s linear';
    tilt = [-py * 18, px * 22, px * 14, py * 14]; drawCard();
  });
  cw.addEventListener('pointerleave', () => { card.style.transition = ''; tilt = [0, 0, 0, 0]; drawCard(); });
}
if (CFG.photo) {
  const img = new Image();
  img.alt = 'Portrait of Banka Venkateswarlu'; img.loading = 'lazy';
  img.addEventListener('load', () => $('#ph').replaceChildren(img));
  img.src = CFG.photo;
}

/* ---------- Skills periodic table ---------- */
const pt = $('#pt'), info = $('#info');
let num = 0;
G.forEach(([g, desc, items]) => {
  const s = el('section', 'grp');
  s.setAttribute('aria-label', g);
  s.append(el('h3', null, g));
  const row = el('div', 'els');
  items.forEach(([sym, name, use]) => {
    num++;
    const b = el('button', 'elm');
    b.type = 'button';
    b.append(el('i', null, String(num)), el('b', null, sym), el('span', null, name));
    const show = () => {
      info.replaceChildren(el('strong', null, name), el('span', null, 'Category: ' + g), el('span', null, desc), el('span', null, 'Where I used it: ' + (use || 'Part of my skill set')));
      $$('.elm.on').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
    };
    b.addEventListener('mouseenter', show); b.addEventListener('focus', show); b.addEventListener('click', show);
    row.append(b);
  });
  s.append(row); pt.append(s);
});

/* ---------- Delta agent flow ---------- */
const flow = $('#flow'), agp = $('#ag');
AG.forEach(([name, items], i) => {
  const li = el('li');
  li.style.setProperty('--d', (i * .7) + 's');
  const b = el('button', 'ag', name);
  b.type = 'button';
  const show = () => {
    const box = [el('strong', null, name)];
    if (items.length) { const ul = el('ul'); items.forEach(t => ul.append(el('li', null, t))); box.push(ul); }
    else box.push(el('span', null, 'One stage of the Delta agent workflow.'));
    agp.replaceChildren(...box);
    $$('.ag.on').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
  };
  b.addEventListener('mouseenter', show); b.addEventListener('focus', show); b.addEventListener('click', show);
  li.append(b); flow.append(li);
});

/* ---------- Projects + case study dialog ---------- */
const dlg = $('#cs'), cbody = $('#cbody');
let lastFocus = null;
const pl = $('#pl');
P.forEach((p, i) => {
  const li = el('li'), b = el('button', 'pr');
  b.type = 'button'; b.dataset.open = i; b.setAttribute('aria-haspopup', 'dialog');
  b.append(el('b', null, p.t), el('span', null, p.tag));
  li.append(b); pl.append(li);
});
function section(title, nodes, i) {
  const s = el('section', 'cs-s');
  s.style.animationDelay = (i * 80) + 'ms';
  s.append(el('h3', null, title), ...nodes);
  return s;
}
const list = (a, ord) => { const u = el(ord ? 'ol' : 'ul'); a.forEach(t => u.append(el('li', null, t))); return u; };
function openCase(i) {
  const p = P[i];
  lastFocus = document.activeElement;
  $('#cst').textContent = p.t;
  const parts = [['PROJECT', [el('p', null, p.sum || p.tag)]]];
  if (p.prob) parts.push(['PROBLEM', [el('p', null, p.prob)]]);
  if (p.sol) parts.push(['SOLUTION', [el('p', null, p.sol)]]);
  if (p.flow) parts.push(['ARCHITECTURE', [list(p.flow, true)]]);
  if (p.tech) parts.push(['TECHNOLOGIES', [list(p.tech)]]);
  if (p.feat) parts.push(['KEY FEATURES', [list(p.feat)]]);
  if (p.mine) parts.push(['MY CONTRIBUTION', [el('p', null, p.mine)]]);
  if (p.res) parts.push(['RESULTS', [el('p', null, p.res)]]);
  const a = el('a', null, 'More on GitHub');
  a.href = CFG.github; a.target = '_blank'; a.rel = 'noopener';
  parts.push(['CODE', [a]]);
  cbody.replaceChildren(...parts.map((x, n) => section(x[0], x[1], n)));
  dlg.showModal();
  document.body.style.overflow = 'hidden';
  dlg.scrollTop = 0;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-open]');
  if (b) openCase(+b.dataset.open);
});
$('#cb').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('close', () => { document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); });

/* ---------- Horizontal scroll sections ---------- */
const hs = $$('[data-hs]').map(s => ({ s, t: $('.hs-track', s), d: 0 }));
function layoutHS() {
  const nat = innerWidth < 800 || RM;
  hs.forEach(o => {
    o.s.classList.toggle('nat', nat);
    if (nat) { o.s.style.height = ''; o.t.style.transform = ''; return; }
    o.d = Math.max(0, o.t.scrollWidth - innerWidth);
    o.s.style.height = (o.d + innerHeight) + 'px';
  });
  tickHS();
}
function tickHS() {
  hs.forEach(o => {
    if (o.s.classList.contains('nat')) return;
    const r = o.s.getBoundingClientRect();
    const p = clamp(-r.top / Math.max(1, o.s.offsetHeight - innerHeight), 0, 1);
    o.t.style.transform = `translate3d(${-p * o.d}px,0,0)`;
  });
}
let tick = false;
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(() => { tickHS(); tick = false; }); } }, { passive: true });
let rt;
addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { sizeNet(); layoutHS(); }, 120); });
layoutHS();
addEventListener('load', layoutHS);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizeNet(); layoutHS(); });
/* keep focused cards in view while horizontal sections are pinned */
hs.forEach(o => o.t.addEventListener('focusin', e => {
  if (o.s.classList.contains('nat')) return;
  const c = e.target.closest('.hc'); if (!c) return;
  const top = o.s.offsetTop + (c.offsetLeft / Math.max(1, o.d)) * (o.s.offsetHeight - innerHeight);
  scrollTo({ top, behavior: 'auto' });
}));

/* ---------- Terminal ---------- */
const out = $('#out'), tf = $('#tf'), ti = $('#ti'), tm = $('#tm');
const print = (t, c) => { out.append(el('div', 'ln' + (c ? ' ' + c : ''), t)); tm.scrollTop = tm.scrollHeight; };
const CMD = {
  help: () => ['Commands: help, about, skills, projects, contact, whoami, focus, stack, status, clear'],
  whoami: () => ['Banka Venkateswarlu'],
  about: () => ['Software Developer and AI/ML Engineer.', 'B.Tech Computer Science Engineering, Vel Tech University, Chennai.', 'Building Generative AI and Agentic AI applications.'],
  focus: () => ['Generative AI', 'Agentic AI', 'Software Development'],
  stack: () => ['Python', 'Java', 'React', 'Node.js', 'LangGraph', 'AWS', 'Azure OpenAI'],
  status: () => ['Building intelligent applications...'],
  skills: () => G.map(g => g[0] + ': ' + g[2].map(i => i[1]).join(', ')),
  projects: () => P.map((p, i) => (i + 1) + '. ' + p.t),
  contact: () => ['GitHub: ' + CFG.github, 'LinkedIn: ' + CFG.linkedin].concat(CFG.email ? ['Email: ' + CFG.email] : [])
};
print('$ whoami', 'cm'); CMD.whoami().forEach(l => print(l));
print('Type "help" to see commands.');
tf.addEventListener('submit', e => {
  e.preventDefault();
  const c = ti.value.trim().toLowerCase();
  ti.value = '';
  if (!c) return;
  if (c === 'clear') { out.replaceChildren(); return; }
  print('$ ' + c, 'cm');
  if (CMD[c]) CMD[c]().forEach(l => print(l));
  else print('command not found: ' + c + '. Type "help".');
});
tm.addEventListener('click', () => { if (!getSelection().toString()) ti.focus({ preventScroll: true }); });

/* ---------- Contact extras ---------- */
const cl = $('#cl');
const addLink = (label, href, ext) => {
  const li = el('li'), a = el('a', null, label);
  a.href = href;
  if (ext) { a.target = '_blank'; a.rel = 'noopener'; }
  li.append(a); cl.prepend(li);
};
if (CFG.resume) { const li = el('li'), a = el('a', null, 'Resume'); a.href = CFG.resume; a.target = '_blank'; a.rel = 'noopener'; li.append(a); cl.append(li); }
if (CFG.email) addLink('Email', 'mailto:' + CFG.email, false);
})();
