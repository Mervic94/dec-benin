/* ============================================================
   DEC — main.js v2.2 (finale)
   Injecte : header (7 liens + CTA), menu mobile complet (10),
   footer 4 colonnes, barre mobile dur, bouton retour en haut.
   LOGO AUTOMATIQUE partout : assets/images/logo.png remplace
   l'écusson dès que le fichier existe, sinon SVG fidèle au logo
   DEC (camion + maison) s'affiche.
   Infos officielles : siège Ilot 292-J Togoudo (Abomey-Calavi)
   + 2ᵉ téléphone 01 95 40 99 95 dans le footer.
   i18n FR/EN complet. Dépend de assets/js/config.js (chargé avant).
   ============================================================ */
window.DEC = (function(){
'use strict';

/* ---------- Configuration (config.js + garde-fous) ---------- */
const CFG = window.DEC_CONFIG || {};
const _c = CFG.contact || {};
const WA      = _c.whatsapp     || "2290166355509";
const TEL     = _c.phoneTel     || "+2290166355509";
const TEL_LBL = _c.phoneDisplay || "+229 01 66 35 55 09";
const TEL2    = _c.phone2Tel    || "";
const TEL2_LBL= _c.phone2Display|| "";
const EMAIL   = _c.email        || "demenagementexpresscotonou@gmail.com";
const ADDRESS = _c.address      || "";
const SOC     = _c.social       || {};

const waLink = function(txt){ return "https://wa.me/"+WA+"?text="+encodeURIComponent(txt); };

/* ---------- Navigation : 7 entrées + Checklist en mobile ---------- */
const NAV = [
  { id:"accueil",  href:"index.html",      fr:"Accueil",   en:"Home" },
  { id:"services", href:"services.html",   fr:"Services",  en:"Services" },
  { id:"devis",    href:"devis.html",      fr:"Devis",     en:"Quote" },
  { id:"apropos",  href:"a-propos.html",   fr:"À propos",  en:"About" },
  { id:"guide",    href:"organiser.html",  fr:"Guide",     en:"Guide" },
  { id:"faq",      href:"faq.html",        fr:"FAQ",       en:"FAQ" },
  { id:"contact",  href:"contact.html",    fr:"Contact",   en:"Contact" }
];
const MOBILE_EXTRA = [
  { id:"checklist", href:"checklist.html", fr:"Checklist", en:"Checklist" }
];

/* ---------- Langue FR/EN ---------- */
let LANG = localStorage.getItem('dec-lang') || 'fr';
const listeners = [];
const onLangChange = function(fn){ listeners.push(fn); };
const page = document.body.dataset.page || "";

const T = {
  fr:{
    tag:"DÉMÉNAGEMENT EXPRESS · COTONOU",
    title:"DEC — Déménagement Express Cotonou | Devis gratuit sur WhatsApp",
    ctaHead:"Estimer mon déménagement",
    gen:"Bonjour DEC,\nJe souhaite obtenir un devis pour mon déménagement.",
    call:"Appeler",
    foot:{
      blurb:"Déménagement Express Cotonou — accompagnement humain de l'emballage à la livraison, à Cotonou, au Bénin et au-delà.",
      sign:"Votre sérénité, notre priorité.",
      svc:"Services", res:"Ressources", contact:"Contact",
      f1:"Déménagement résidentiel", f2:"Déménagement professionnel",
      f3:"Emballage & manutention", f4:"Interurbain & international",
      r1:"Devis gratuit", r2:"Checklist de déménagement", r3:"Guide pratique", r4:"FAQ", r5:"Assurance déménagement",
      wa:"WhatsApp", maps:"Nous trouver sur Google Maps",
      hours:"Lun–Sam · 7h–19h · Dim : urgences",
      rights:"Déménagement Express Cotonou. Tous droits réservés.",
      legal:"Mentions légales", data:"Données personnelles", cookies:"Cookies"
    },
    cc:{
      t:"Transparence sur vos données",
      p:"Ce site n'utilise aucun traceur publicitaire. Seules vos préférences (langue, progression de checklist) sont conservées sur votre appareil, jamais transmises. Détails :",
      p2:".", ok:"Compris"
    },
    svx:"EXPRESS 24/48H", svf:"FLEX ≤ 7 J", d1:"J+1 · ", d7:"J+7 · ", none:"aucune",
    incl:"route incluse dans l'estimation",
    rkm:function(n){return "+ "+n.toLocaleString('fr-FR')+" F de distance";},
    fxm:function(n){return "+ "+n.toLocaleString('fr-FR')+" F de formalités";}, join:" · ",
    panels:{
      res:"Bonjour DEC,\nJe souhaite obtenir un devis pour un déménagement résidentiel.\nRéférence : ",
      com:"Bonjour DEC,\nJe souhaite planifier un déménagement d'entreprise ou de commerce.\nRéférence : ",
      intl:"Bonjour DEC,\nJe prépare un déménagement international.\nRéférence : "
    },
    copyT:"Devis copié !", copyM:"Collez-le dans WhatsApp ou vos notes.", copyFail:"Copie impossible — sélectionnez le texte manuellement."
  },
  en:{
    tag:"EXPRESS MOVING · COTONOU",
    title:"DEC — Express Moving Cotonou | Free quote on WhatsApp",
    ctaHead:"Estimate my move",
    gen:"Hello DEC,\nI would like a quote for my move.",
    call:"Call",
    foot:{
      blurb:"Déménagement Express Cotonou — human support from packing to delivery, in Cotonou, Benin and beyond.",
      sign:"Your peace of mind, our priority.",
      svc:"Services", res:"Resources", contact:"Contact",
      f1:"Residential moving", f2:"Office & commercial moving",
      f3:"Packing & handling", f4:"Inter-city & international",
      r1:"Free quote", r2:"Moving checklist", r3:"Practical guide", r4:"FAQ", r5:"Moving insurance",
      wa:"WhatsApp", maps:"Find us on Google Maps",
      hours:"Mon–Sat · 7am–7pm · Sun: emergencies",
      rights:"Déménagement Express Cotonou. All rights reserved.",
      legal:"Legal notice", data:"Personal data", cookies:"Cookies"
    },
    cc:{
      t:"Transparency about your data",
      p:"This site uses no advertising trackers. Only your preferences (language, checklist progress) stay on your device, never transmitted. Details:",
      p2:".", ok:"Got it"
    },
    svx:"EXPRESS 24/48H", svf:"FLEX ≤ 7 DAYS", d1:"D+1 · ", d7:"D+7 · ", none:"none",
    incl:"distance included in the estimate",
    rkm:function(n){return "+ "+n.toLocaleString('en-US')+" F distance fee";},
    fxm:function(n){return "+ "+n.toLocaleString('en-US')+" F customs handling";}, join:" · ",
    panels:{
      res:"Hello DEC,\nI would like a quote for a RESIDENTIAL move.\nReference: ",
      com:"Hello DEC,\nI need to plan an OFFICE / SHOP relocation.\nReference: ",
      intl:"Hello DEC,\nI am preparing an INTERNATIONAL move.\nReference: "
    },
    copyT:"Quote copied!", copyM:"Paste it into WhatsApp or your notes.", copyFail:"Copy failed — please select the text manually."
  }
};
const S = function(){ return T[LANG]; };
const i18nNodes = [];

/* ---------- Icônes ---------- */
const IC = {
  wa:   '<svg class="ico" style="width:17px;height:17px" aria-hidden="true"><use href="#ic-wa"/></svg>',
  phone:'<svg class="ico" style="width:15px;height:15px" aria-hidden="true"><use href="#ic-phone"/></svg>',
  fb:   '<svg class="ico" aria-hidden="true"><use href="#ic-fb"/></svg>',
  tt:   '<svg class="ico" aria-hidden="true"><use href="#ic-tiktok"/></svg>',
  li:   '<svg class="ico" aria-hidden="true"><use href="#ic-in"/></svg>',
  up:   '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>'
};
const SHIELD = '<svg class="ico" style="width:24px;height:24px" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 21.5S3.8 17.4 3.8 11V4.9L12 2l8.2 2.9V11c0 6.4-8.2 10.5-8.2 10.5z"/><path fill="#8C1D18" d="M12 6.5 7.5 10.2h1.4v4.3h6.2v-4.3h1.4L12 6.5z"/></svg>';

/* ============================================================
   LOGO DEC — SVG fidèle (camion + maison). Remplacé partout
   par assets/images/logo.png dès que le fichier existe.
   ============================================================ */
const LOGO_SVG =
'<svg viewBox="0 0 64 64" style="width:100%;height:100%" aria-hidden="true">'
+'<rect x="1" y="1" width="62" height="62" rx="12" fill="#F7F5F0" stroke="#8C1D18" stroke-width="2.5"/>'
+'<rect x="34" y="17" width="18" height="13" fill="#FFF6E3" stroke="#8C1D18" stroke-width="2"/>'
+'<path d="M31 18 43 9 55 18" fill="none" stroke="#8C1D18" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
+'<rect x="42" y="20" width="6" height="8" fill="#E9A70C"/>'
+'<path d="M8 38 v-8 h9 q2.5 0 4 2 l4.5 6 z" fill="#C8102E"/>'
+'<rect x="11" y="33" width="7" height="4" rx="1" fill="#BFE3F2"/>'
+'<rect x="8" y="37.5" width="48" height="11" rx="2.5" fill="#C8102E"/>'
+'<rect x="54" y="40" width="2.5" height="4" rx="1" fill="#E9A70C"/>'
+'<circle cx="19" cy="50.5" r="5.5" fill="#1C1412"/><circle cx="45" cy="50.5" r="5.5" fill="#1C1412"/>'
+'<circle cx="19" cy="50.5" r="2.2" fill="#F7F5F0"/><circle cx="45" cy="50.5" r="2.2" fill="#F7F5F0"/>'
+'</svg>';

function applyLogo(){
  document.querySelectorAll('.logo-tile').forEach(function(t){
    if(t.dataset.logoDone) return;
    t.dataset.logoDone = '1';
    t.style.background = '#F7F5F0';
    t.style.padding = '3px';
    t.innerHTML = LOGO_SVG;
    /* Le vrai logo prend le relais dès que le fichier existe */
    const probe = new Image();
    probe.onload = function(){
      t.innerHTML = '';
      const im = document.createElement('img');
      im.src = 'assets/images/logo.png';
      im.alt = 'DEC — Déménagement Express Cotonou';
      im.style.cssText = 'height:100%;width:100%;object-fit:contain';
      t.appendChild(im);
    };
    probe.src = 'assets/images/logo.png';
  });
}

/* ============================================================
   HEADER — injecté une seule fois (skip si déjà en dur)
   ============================================================ */
function injectHeader(){
  const host = document.getElementById('siteHeader');
  if(!host || host.innerHTML.trim()) return;
  host.className = 'site-head';
  let nav = '';
  NAV.forEach(function(n){
    nav += '<a href="'+n.href+'"'+(page===n.id?' class="on"':'')+' data-en="'+n.en+'">'+n.fr+'</a>';
  });
  host.innerHTML =
  '<div class="wrap head-in">'+
    '<a class="logo" href="index.html" aria-label="DEC — accueil">'+
      '<span class="logo-tile">'+SHIELD+'</span>'+
      '<span class="logo-txt"><b>DEC<i>.</i></b><span data-en="'+T.en.tag+'">'+T.fr.tag+'</span></span>'+
    '</a>'+
    '<nav class="main-nav" aria-label="Navigation principale">'+nav+'</nav>'+
    '<div class="head-right">'+
      '<a class="head-tel" href="tel:'+TEL+'">'+TEL_LBL+'</a>'+
      '<button class="lang-btn" id="langBtn" aria-label="Switch language / Changer de langue">'+(LANG==='en'?'FR':'EN')+'</button>'+
      '<a class="btn btn-solid btn-head" href="devis.html" data-en="'+T.en.ctaHead+'">'+T.fr.ctaHead+'</a>'+
      '<a class="btn btn-wa btn-head" data-wa-generic target="_blank" rel="noopener" href="'+waLink(T[LANG].gen)+'" aria-label="WhatsApp">'+IC.wa+'</a>'+
      '<button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false"><i></i><i></i></button>'+
    '</div>'+
  '</div>';
}

/* ============================================================
   MENU MOBILE — 7 pages + Checklist + Appeler + WhatsApp
   ============================================================ */
function injectMobileNav(){
  let host = document.getElementById('mobileNav');
  if(!host){
    host = document.createElement('nav');
    host.id = 'mobileNav'; host.className = 'mobile-nav';
    host.setAttribute('aria-label','Menu mobile');
    document.body.prepend(host);
  }
  const all = NAV.concat(MOBILE_EXTRA);
  let h = '';
  all.forEach(function(m,i){
    h += '<a href="'+m.href+'"><small>'+String(i+1).padStart(2,'0')+'</small><span data-en="'+m.en+'">'+m.fr+'</span></a>';
  });
  h += '<a href="tel:'+TEL+'"><small>'+String(all.length+1).padStart(2,'0')+'</small><span data-en="'+T.en.call+'">'+T.fr.call+'</span></a>';
  h += '<a data-wa-generic target="_blank" rel="noopener" href="'+waLink(S().gen)+'"><small>'+String(all.length+2).padStart(2,'0')+'</small>WhatsApp</a>';
  host.innerHTML = h;
}

/* ============================================================
   FOOTER — 4 colonnes + maillage complet + infos officielles
   ============================================================ */
function injectFooter(){
  const host = document.getElementById('siteFooter');
  if(!host || host.innerHTML.trim()) return;
  const f = S().foot;
  const blurbEn = "Déménagement Express Cotonou — human support from packing to delivery, in Cotonou, Benin and beyond.";
  const signEn  = "Your peace of mind, our priority.";
  const hoursEn = "Mon–Sat · 7am–7pm · Sun: emergencies";
  const rightsEn= "Déménagement Express Cotonou. All rights reserved.";
  const svc =
    '<li><a href="index.html#services" data-en="Residential moving">Déménagement résidentiel</a></li>'+
    '<li><a href="index.html#services" data-en="Commercial moving">Déménagement professionnel</a></li>'+
    '<li><a href="services.html#emballage" data-en="Packing &amp; handling">Emballage &amp; manutention</a></li>'+
    '<li><a href="services.html#international" data-en="Inter-city &amp; international">Interurbain &amp; international</a></li>';
  const res =
    '<li><a href="devis.html" data-en="Free quote">Devis gratuit</a></li>'+
    '<li><a href="checklist.html" data-en="Moving checklist">Checklist de déménagement</a></li>'+
    '<li><a href="organiser.html" data-en="Practical guide">Guide pratique</a></li>'+
    '<li><a href="faq.html" data-en="FAQ">FAQ</a></li>'+
    '<li><a href="assurance.html" data-en="Moving insurance">Assurance déménagement</a></li>';
  host.innerHTML =
  '<div class="wrap foot-grid">'+
    '<div class="foot-brand">'+
      '<span class="logo" style="pointer-events:none">'+
        '<span class="logo-tile">'+SHIELD+'</span>'+
        '<span class="logo-txt" style="color:#fff"><b style="font-family:var(--disp)">DEC<i style="font-style:normal;color:var(--gold)">.</i></b>'+
        '<span style="color:rgba(255,255,255,.6)" data-en="'+T.en.tag+'">'+T.fr.tag+'</span></span></span>'+
      '<p data-en="'+blurbEn+'">'+f.blurb+'</p>'+
      '<span class="sign" data-en="'+signEn+'">'+f.sign+'</span>'+
      '<div class="socials">'+
        (SOC.facebook?'<a href="'+SOC.facebook+'" target="_blank" rel="noopener" aria-label="Facebook DEC">'+IC.fb+'</a>':'')+
        (SOC.tiktok?'<a href="'+SOC.tiktok+'" target="_blank" rel="noopener" aria-label="TikTok DEC">'+IC.tt+'</a>':'')+
        (SOC.linkedin?'<a href="'+SOC.linkedin+'" target="_blank" rel="noopener" aria-label="LinkedIn DEC">'+IC.li+'</a>':'')+
        '<a data-wa-generic target="_blank" rel="noopener" href="'+waLink(S().gen)+'" aria-label="WhatsApp DEC">'+IC.wa+'</a>'+
      '</div>'+
      '<p class="foot-hours" data-en="'+hoursEn+'">'+f.hours+'</p>'+
    '</div>'+
    '<div><h4 data-en="Services">'+f.svc+'</h4><ul>'+svc+'</ul></div>'+
    '<div><h4 data-en="Resources">'+f.res+'</h4><ul>'+res+'</ul></div>'+
    '<div><h4 data-en="Contact">'+f.contact+'</h4><ul>'+
      '<li><a href="tel:'+TEL+'">'+TEL_LBL+'</a></li>'+
      (TEL2?'<li><a href="tel:'+TEL2+'">'+TEL2_LBL+'</a></li>':'')+
      '<li><a class="mail" href="mailto:'+EMAIL+'">'+EMAIL+'</a></li>'+
      (ADDRESS?'<li><a href="'+(SOC.maps||'#')+'" target="_blank" rel="noopener">📍 '+ADDRESS+'</a></li>':'')+
      '<li><a data-wa-generic target="_blank" rel="noopener" href="'+waLink(S().gen)+'" data-en="Direct WhatsApp">'+f.wa+'</a></li>'+
    '</ul></div>'+
  '</div>'+
  '<div class="wordmark" aria-hidden="true">DEC<i>®</i></div>'+
  '<div class="foot-bottom"><div class="wrap">'+
    '<span>© <span id="an"></span> DEC — <span data-en="'+rightsEn+'">'+f.rights+'</span></span>'+
    '<span><a href="mentions-legales.html" data-en="Legal notice">'+f.legal+'</a> · '+
    '<a href="mentions-legales.html#donnees" data-en="Personal data">'+f.data+'</a> · '+
    '<a href="politique-cookies.html" data-en="Cookies">'+f.cookies+'</a></span>'+
  '</div></div>';
  const an = document.getElementById('an');
  if(an) an.textContent = new Date().getFullYear();
}

/* ============================================================
   BARRE MOBILE — liens directs
   ============================================================ */
function ensureMbar(){
  let mb = document.querySelector('.mbar');
  if(!mb){
    mb = document.createElement('div');
    mb.className = 'mbar';
    mb.innerHTML = '<a class="m-call" href="tel:'+TEL+'">'+IC.phone+'<span data-en="Call">Appeler</span></a>'+
                   '<a class="m-wa" data-wa-generic target="_blank" rel="noopener" href="'+waLink(S().gen)+'">'+IC.wa+'WhatsApp</a>';
    document.body.appendChild(mb);
  }else{
    const c = mb.querySelector('.m-call'); if(c) c.href = 'tel:'+TEL;
    const w = mb.querySelector('.m-wa');   if(w) w.href = waLink(S().gen);
  }
}

/* ============================================================
   LIENS CONTACT / WHATSAPP
   ============================================================ */
function applyContact(){
  document.querySelectorAll('[data-tel]').forEach(function(a){ a.href = 'tel:'+TEL; });
  document.querySelectorAll('[data-tel-text]').forEach(function(s){ s.textContent = TEL_LBL; });
  applyWaLinks();
}
function applyWaLinks(){
  document.querySelectorAll('[data-wa-generic]').forEach(function(a){
    if(!a.dataset.waSet) a.href = waLink(S().gen);
  });
  Object.keys(S().panels || {}).forEach(function(k){
    document.querySelectorAll('[data-wa-panel="'+k+'"]').forEach(function(a){
      a.href = waLink(S().panels[k] + (a.dataset.ref || ''));
    });
  });
}

/* ============================================================
   I18N — capture + bascule de tout élément [data-en]
   ============================================================ */
function snapshot(){
  i18nNodes.length = 0;
  document.querySelectorAll('[data-en]').forEach(function(el){
    i18nNodes.push({el:el, fr:el.innerHTML, en:el.getAttribute('data-en')});
  });
}
function setLang(lang){
  LANG = lang;
  localStorage.setItem('dec-lang', lang);
  i18nNodes.forEach(function(n){ n.el.innerHTML = (lang==='en') ? n.en : n.fr; });
  document.documentElement.lang = lang;
  document.title = (lang==='en') ? T.en.title : (document.body.dataset.titleFr || T.fr.title);
  const b = document.getElementById('langBtn');
  if(b) b.textContent = (lang==='en') ? 'FR' : 'EN';
  ensureMbar(); applyWaLinks();
  listeners.forEach(function(fn){ fn(); });
}

/* ============================================================
   OUTILS
   ============================================================ */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function toast(title,msg){
  let box = document.getElementById('toasts');
  if(!box){
    box = document.createElement('div');
    box.id = 'toasts'; box.setAttribute('aria-live','polite');
    document.body.appendChild(box);
  }
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = '<span class="t-ico" aria-hidden="true"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="square"><path d="M4 12.5l5.5 5.5L20 6.5"/></svg></span><span><b>'+title+'</b><p>'+msg+'</p></span>';
  box.appendChild(t);
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ t.classList.add('show'); }); });
  setTimeout(function(){ t.classList.remove('show'); setTimeout(function(){ t.remove(); },450); },4200);
}

/* ============================================================
   BANDEAU CONSENTEMENT
   ============================================================ */
function initConsent(){
  if(localStorage.getItem('dec-consent')) return;
  const c = S().cc;
  const el = document.createElement('aside');
  el.className = 'cc';
  el.setAttribute('role','region');
  el.setAttribute('aria-label', c.t);
  el.innerHTML = '<b>'+c.t+'</b><p>'+c.p+' <a href="politique-cookies.html">'+(LANG==='en'?'cookie policy':'politique cookies')+'</a>'+c.p2+'</p>'+
    '<div class="cc-row"><button class="btn btn-solid" type="button" data-cc-ok>'+c.ok+'</button></div>';
  document.body.appendChild(el);
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.classList.add('show'); }); });
  el.querySelector('[data-cc-ok]').addEventListener('click',function(){
    localStorage.setItem('dec-consent','ok');
    el.classList.remove('show');
    setTimeout(function(){ el.remove(); },500);
  });
}

/* ============================================================
   INITIALISATION
   ============================================================ */
function boot(){
  if(document.body.dataset.decBooted) return;
  document.body.dataset.decBooted = '1';
  injectHeader();
  injectMobileNav();
  injectFooter();
  ensureMbar();
  applyLogo();       /* logo DEC dans tous les emplacements */
  applyContact();

  const tape = document.getElementById('tapeTrack');
  if(tape && !tape.dataset.dup){ tape.dataset.dup = '1'; tape.innerHTML += tape.innerHTML; }
  snapshot();

  if(LANG === 'en'){
    i18nNodes.forEach(function(n){ n.el.innerHTML = n.en; });
    document.documentElement.lang = 'en';
    document.title = T.en.title;
    const b0 = document.getElementById('langBtn');
    if(b0) b0.textContent = 'FR';
    applyWaLinks();
  }

  const lb = document.getElementById('langBtn');
  if(lb) lb.addEventListener('click',function(){ setLang(LANG==='fr'?'en':'fr'); });

  const burger = document.getElementById('burger');
  const mnav = document.getElementById('mobileNav');
  const closeMenu = function(){
    const b = document.getElementById('burger');
    if(b){ b.classList.remove('open'); b.setAttribute('aria-expanded','false'); }
    if(mnav) mnav.classList.remove('open');
    document.body.style.overflow = '';
  };
  if(burger && mnav){
    burger.addEventListener('click',function(){
      const open = burger.classList.toggle('open');
      mnav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mnav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',closeMenu); });
  }

  document.addEventListener('click',function(e){
    const a = e.target.closest('a[href^="index.html#"]');
    if(a && (location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname.endsWith('/'))){
      e.preventDefault();
      const el = document.getElementById(a.getAttribute('href').split('#')[1]);
      if(el) el.scrollIntoView({behavior: reduced ? 'auto' : 'smooth'});
    }
  });

  const io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12, rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
  window.addEventListener('load',function(){
    document.querySelectorAll('.rv.load').forEach(function(el){ el.classList.add('in'); });
  });

  const pbar = document.getElementById('progressBar');
  const totop = document.createElement('button');
  totop.type = 'button';
  totop.className = 'totop';
  totop.setAttribute('aria-label','Retour en haut / Back to top');
  totop.innerHTML = IC.up;
  document.body.appendChild(totop);
  totop.addEventListener('click',function(){ window.scrollTo({top:0, behavior: reduced ? 'auto' : 'smooth'}); });
  let pend = false;
  window.addEventListener('scroll',function(){
    if(pend) return; pend = true;
    requestAnimationFrame(function(){
      const h = document.documentElement, y = h.scrollTop;
      if(pbar) pbar.style.width = (y/(h.scrollHeight - h.clientHeight || 1)*100)+'%';
      totop.classList.toggle('show', y > 600);
      pend = false;
    });
  },{passive:true});

  function animCount(el){
    const target = +el.dataset.count;
    if(reduced){ el.textContent = target.toLocaleString(); return; }
    const t0 = performance.now(), D = 1600;
    (function s(n){
      const k = Math.min((n-t0)/D,1), e = 1-Math.pow(1-k,3);
      el.textContent = Math.round(target*e).toLocaleString(LANG==='en'?'en-US':'fr-FR');
      if(k<1) requestAnimationFrame(s);
    })(t0);
  }
  const ioC = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ animCount(e.target); ioC.unobserve(e.target); } });
  },{threshold:.5});
  document.querySelectorAll('.cnt').forEach(function(el){ ioC.observe(el); });

  const route = document.getElementById('routeLine');
  const paint = document.getElementById('routePaint');
  const truck = document.getElementById('truckG');
  if(route && paint && truck){
    const L = route.getTotalLength();
    if(reduced){
      const p = route.getPointAtLength(L*0.72);
      truck.setAttribute('transform','translate('+p.x+' '+p.y+') rotate(6)');
      paint.setAttribute('stroke-dasharray',(L*0.72)+' '+L);
    }else{
      let dist = 0, last = performance.now(), pauseUntil = 0;
      const SPEED = L/7.5;
      (function drive(now){
        const dt = Math.min((now-last)/1000,.05); last = now;
        if(now >= pauseUntil){
          dist += SPEED*dt;
          if(dist >= L){ dist = L; pauseUntil = now+2500; }
        }else if(dist >= L && now >= pauseUntil){ dist = 0; }
        const p  = route.getPointAtLength(dist);
        const p2 = route.getPointAtLength(Math.min(dist+2,L));
        const ang = Math.atan2(p2.y-p.y, p2.x-p.x)*180/Math.PI;
        const bob = (now >= pauseUntil && dist < L) ? Math.sin(now/85)*1.1 : 0;
        truck.setAttribute('transform','translate('+p.x+' '+(p.y+bob)+') rotate('+ang+')');
        paint.setAttribute('stroke-dasharray',Math.max(dist-32,0)+' '+L);
        requestAnimationFrame(drive);
      })(performance.now());
    }
  }

  let lastFocus = null;
  const openPanel = function(id){
    const p = document.getElementById(id);
    if(!p) return;
    lastFocus = document.activeElement;
    p.classList.add('open');
    document.body.style.overflow = 'hidden';
    const c = p.querySelector('.panel-close');
    if(c) setTimeout(function(){ c.focus(); },140);
  };
  const closePanels = function(){
    document.querySelectorAll('.panel.open').forEach(function(p){ p.classList.remove('open'); });
    document.body.style.overflow = '';
    if(lastFocus) lastFocus.focus();
  };
  document.querySelectorAll('[data-panel]').forEach(function(b){
    b.addEventListener('click',function(){ openPanel(b.dataset.panel); });
  });
  document.querySelectorAll('.panel').forEach(function(p){
    p.addEventListener('click',function(e){ if(e.target === p) closePanels(); });
  });
  document.querySelectorAll('[data-close]').forEach(function(b){ b.addEventListener('click',closePanels); });
  document.querySelectorAll('[data-close-and-go]').forEach(function(a){ a.addEventListener('click',closePanels); });
  document.addEventListener('keydown',function(e){
    if(e.key === 'Escape' && document.querySelector('.panel.open')) closePanels();
  });

  const track = document.getElementById('tstTrack');
  if(track && track.children.length && !track.dataset.wired){
    track.dataset.wired = '1';
    const slides = track.children.length;
    const dotsBox = document.getElementById('tstDots');
    if(dotsBox) dotsBox.innerHTML = '';
    let idx = 0, autoTimer = null;
    for(let i=0;i<slides;i++){
      const b = document.createElement('button');
      b.setAttribute('aria-label','Témoignage '+(i+1)+' / '+slides);
      b.addEventListener('click',function(){ go(i); restartAuto(); });
      dotsBox.appendChild(b);
    }
    const dots = dotsBox.children;
    function go(i){
      idx = (i+slides)%slides;
      track.style.transform = 'translateX(-'+(idx*100)+'%)';
      Array.prototype.forEach.call(dots,function(d,n){ d.classList.toggle('on', n===idx); });
    }
    function startAuto(){ if(!reduced) autoTimer = setInterval(function(){ go(idx+1); },6000); }
    function stopAuto(){ clearInterval(autoTimer); }
    function restartAuto(){ stopAuto(); startAuto(); }
    const prev = document.getElementById('tstPrev');
    const next = document.getElementById('tstNext');
    if(prev) prev.addEventListener('click',function(){ go(idx-1); restartAuto(); });
    if(next) next.addEventListener('click',function(){ go(idx+1); restartAuto(); });
    const viewport = document.getElementById('tstViewport');
    if(viewport){
      let tx = null;
      viewport.addEventListener('pointerdown',function(e){ tx = e.clientX; });
      viewport.addEventListener('pointerup',function(e){
        if(tx === null) return;
        const dx = e.clientX - tx;
        if(Math.abs(dx) > 40){ go(idx + (dx<0?1:-1)); restartAuto(); }
        tx = null;
      });
      viewport.addEventListener('keydown',function(e){
        if(e.key === 'ArrowRight'){ go(idx+1); restartAuto(); }
        if(e.key === 'ArrowLeft'){ go(idx-1); restartAuto(); }
      });
      viewport.addEventListener('mouseenter',stopAuto);
      viewport.addEventListener('mouseleave',startAuto);
    }
    go(0); startAuto();
  }

  document.querySelectorAll('.faq-item').forEach(function(item){
    const q = item.querySelector('.faq-q');
    q.addEventListener('click',function(){
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  initConsent();
}
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', boot);
}else boot();

/* API publique pour estimator.js et scripts de page */
return {
  CONFIG: CFG,
  S: S,
  LANG: function(){ return LANG; },
  setLang: setLang,
  waLink: waLink,
  onLangChange: onLangChange,
  toast: toast,
  pricing: CFG.pricing || null,
  generateRef: window.DEC_generateRef || function(){ return 'DEC-' + Date.now(); }
};
})();;