/* ============================================================
   DEC — estimator.js v3.1 (finale, optgroups corrigés)
   Un optgroup PAR DÉPARTEMENT (pas d'imbrication — le HTML
   interdit les groupes imbriqués). Cascade : commune →
   arrondissement → quartier (texte). Distance auto.
   ESTIMATION INDICATIVE · WhatsApp structuré · gère #fullForm.
   ============================================================ */
(function(){
'use strict';
function boot(){
  const D   = window.DEC;
  const CFG = window.DEC_CONFIG || {};
  const P   = (D && D.pricing) || CFG.pricing;
  const form = document.getElementById('quoteForm');
  if(!form || !P) return;

  const errs = CFG.validatePricing ? CFG.validatePricing(P) : [];
  if(errs.length) console.warn('[DEC estimator] Config à corriger :', errs);

  const $ = function(id){ return document.getElementById(id); };
  const isEn = function(){ return (D && D.LANG && D.LANG()) === 'en'; };
  const loc  = function(){ return isEn() ? 'en-US' : 'fr-FR'; };
  const esc  = function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
  const money = function(n){ return n.toLocaleString(loc()); };

  const segHousing = $('segHousing'), optBoxes = $('optBoxes');
  const qFrom = $('qFrom'), qTo = $('qTo');
  const qFromArr = $('qFromArr'), qToArr = $('qToArr');
  const qFromQ = $('qFromQ'), qToQ = $('qToQ');
  const lblFrom = $('lblFrom'), lblTo = $('lblTo'), lblKm = $('lblKm'), lblVol = $('lblVol');
  const lblSvc = $('lblSvc'), lblDate = $('lblDate'), lblRef = $('lblRef'), refEcho = $('refEcho');
  const priceOut = $('priceOut'), distVal = $('distVal'), distCost = $('distCost'), tripTypeEl = $('tripType');
  const prioStamp = $('prioStamp'), btnWa = $('btnWa'), btnCopy = $('btnCopy');

  const REF = (D && D.generateRef) ? D.generateRef() : 'DEC-' + Date.now();
  if(lblRef) lblRef.textContent = REF;
  if(refEcho) refEcho.textContent = REF;

  (function(){ const bc = $('barcode'); if(!bc) return;
    let h=''; for(let i=0;i<44;i++){ const w=[1.5,1.5,2.5,4][Math.floor(Math.random()*4)];
      h += '<i style="width:'+w+'px;margin-right:'+(1+Math.random()*2.2)+'px"></i>'; } bc.innerHTML=h; })();

  const ALL = [];
  (P.benin||[]).forEach(function(dep){
    (dep.communes||[]).forEach(function(c){
      ALL.push({ name:c.name, dep:dep.dep, arr:c.arr||[], km:(typeof c.km==='number'?c.km:null), cc:'BJ', intl:false });
    });
  });
  (P.international||[]).forEach(function(c){
    ALL.push({ name:c.name, dep:null, arr:[], km:c.km, cc:c.cc, intl:true });
  });

  function renderHousing(){
    if(!segHousing) return;
    const prev = form.querySelector('input[name=housing]:checked');
    const prevId = prev ? prev.value : P.housing[0].id;
    segHousing.innerHTML = P.housing.map(function(h,i){
      const lbl = isEn() ? (h.labelEn||h.label) : h.label;
      return '<label><input type="radio" name="housing" value="'+h.id+'" data-base="'+h.base+'" data-vol="'+esc(h.vol)+'"'
        + ((h.id===prevId||i===0)?' checked':'')
        + '><span class="pill">'+esc(lbl)+'<small>'+esc(h.vol)+'</small></span></label>';
    }).join('');
  }
  function renderOpts(){
    if(!optBoxes) return;
    const prev = {};
    form.querySelectorAll('input[type=checkbox]:checked').forEach(function(c){ prev[c.dataset.id]=true; });
    optBoxes.innerHTML = P.options.map(function(o){
      const nm = isEn() ? (o.nameEn||o.name) : o.name;
      return '<label class="opt"><input type="checkbox" data-id="'+o.id+'" data-price="'+o.price+'"'
        + ' data-name="'+esc(o.name)+'" data-name-en="'+esc(o.nameEn||o.name)+'"'
        + (prev[o.id]?' checked':'')
        + '><span class="box" aria-hidden="true"></span><span><b>'+esc(nm)+'</b><span>+ '+money(o.price)+' F</span></span></label>';
    }).join('');
  }

  /* Un optgroup par département — SANS imbrication (correctif v3.1) */
  function communeOptions(){
    let h = '';
    (P.benin||[]).forEach(function(dep){
      h += '<optgroup label="'+esc(dep.dep)+'">';
      (dep.communes||[]).forEach(function(c){
        h += '<option data-km="'+(c.km===null?'':c.km)+'" data-cc="BJ" data-name="'+esc(c.name)+'">'+esc(c.name)+'</option>';
      });
      h += '</optgroup>';
    });
    h += '<optgroup label="'+esc(isEn()?'Outside Benin':'Hors du Bénin')+'">';
    (P.international||[]).forEach(function(c){
      h += '<option data-km="'+c.km+'" data-cc="'+c.cc+'" data-name="'+esc(c.name)+'">'+esc(c.name)+'</option>';
    });
    h += '</optgroup>';
    return h;
  }
  function renderCities(){
    if(!qFrom || !qTo) return;
    const opt = communeOptions();
    qFrom.innerHTML = opt;
    qTo.innerHTML   = opt;
    let iFrom = 0, iTo = 0;
    ALL.forEach(function(c,n){
      if(c.name==='Cotonou') iFrom = n;
      if(c.name==='Abomey-Calavi') iTo = n;
    });
    qFrom.selectedIndex = iFrom;
    qTo.selectedIndex = iTo;
    syncArr('From'); syncArr('To');
  }
  function syncArr(side){
    const sel = (side==='From') ? qFrom : qTo;
    const arr = (side==='From') ? qFromArr : qToArr;
    if(!sel || !arr) return;
    const c = ALL[sel.selectedIndex];
    if(!c || c.intl || !c.arr.length){
      arr.innerHTML = '<option>'+(isEn()?'Precise area (optional)':'Arrondissement (optionnel)')+'</option>';
      arr.disabled = true; arr.style.opacity = .5;
    }else{
      arr.disabled = false; arr.style.opacity = 1;
      arr.innerHTML = '<option value="">'+(isEn()?'Arrondissement (optional)':'Arrondissement (optionnel)')+'</option>'
        + c.arr.map(function(a){ return '<option>'+esc(a)+'</option>'; }).join('');
    }
  }
  function sideText(side){
    const sel = (side==='From') ? qFrom : qTo;
    const arr = (side==='From') ? qFromArr : qToArr;
    const q   = (side==='From') ? qFromQ : qToQ;
    const c = ALL[sel.selectedIndex];
    if(!c) return '—';
    let t = c.name;
    const a = arr && arr.value ? arr.value : '';
    const qt = q && q.value.trim() ? q.value.trim() : '';
    if(a && !c.intl) t += ', ' + a;
    if(qt) t += ' (' + qt + ')';
    return t;
  }

  function readState(){
    const h = form.querySelector('input[name=housing]:checked');
    const express = !form.querySelector('input[name=speed]') ||
                    form.querySelector('input[name=speed]:checked').value === 'express';
    const from = qFrom.selectedOptions[0], to = qTo.selectedOptions[0];
    const kmA = from.dataset.km === '' ? null : +from.dataset.km;
    const kmB = to.dataset.km === '' ? null : +to.dataset.km;
    const km  = (kmA !== null && kmB !== null) ? Math.abs(kmA - kmB) : null;
    const intl = (from.dataset.cc !== to.dataset.cc);
    let routeCost = 0;
    if(km !== null && km > P.kmIncluded){
      routeCost = Math.ceil((km - P.kmIncluded) * P.pricePerKm / P.roundTo) * P.roundTo;
    }
    const borderCost = intl ? (P.borderFee || 0) : 0;
    let optsCost = 0; const opts = [];
    form.querySelectorAll('input[type=checkbox]:checked').forEach(function(c){
      optsCost += +c.dataset.price;
      opts.push(isEn() ? (c.dataset.nameEn||c.dataset.name) : c.dataset.name);
    });
    let total = (+((h && h.dataset.base) || P.housing[0].base)) + routeCost + borderCost + optsCost;
    if(!express) total = total * (1 - (P.discountFlex || 0));
    total = Math.ceil(total / P.roundTo) * P.roundTo;
    return { h:h, express:express, from:from, to:to, km:km, intl:intl,
             routeCost:routeCost, borderCost:borderCost, opts:opts, total:total };
  }
  function fmtDate(days){
    const d = new Date(); d.setDate(d.getDate()+days);
    return new Intl.DateTimeFormat(loc(),{weekday:'short',day:'numeric',month:'long'}).format(d).toUpperCase();
  }
  let shown = 0, anim = null;
  function tweenPrice(target){
    if(!priceOut) return;
    cancelAnimationFrame(anim);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced){ shown = target; priceOut.innerHTML = money(target)+' <small>FCFA</small>'; return; }
    const from = shown, t0 = performance.now(), D = 480;
    (function step(now){
      const k = Math.min((now-t0)/D,1), e = 1-Math.pow(1-k,3);
      shown = from + (target-from)*e;
      priceOut.innerHTML = money(Math.round(shown))+' <small>FCFA</small>';
      if(k<1) anim = requestAnimationFrame(step);
    })(t0);
  }
  function distLabel(s){
    if(s.km === null) return isEn() ? 'To be confirmed by DEC' : 'À confirmer par DEC';
    return '≈ '+s.km+' km';
  }
  function tripTypeLabel(s){
    if(!s.from || !s.to) return '—';
    if(s.intl) return isEn() ? 'International move' : 'Déménagement international';
    if(s.from.dataset.name === s.to.dataset.name) return isEn() ? 'Local move (same city)' : 'Déménagement local / intra-urbain';
    return isEn() ? 'Inter-city move' : 'Déménagement interurbain';
  }
  function quickMsg(s){
    const optTxt = s.opts.length ? s.opts.join(', ') : (isEn()?'none':'aucune');
    const dist = (s.km === null) ? (isEn()?'to be confirmed by DEC':'à confirmer par DEC') : ('≈ '+s.km+' km (indicative)');
    return (isEn()
      ? "Hello DEC,\nI would like a quote for my move.\n\nReference: "+REF+"\nName: \nPhone: \nDate: \nSlot: \n"
        + "Pickup: "+sideText('From')+"\nDrop-off: "+sideText('To')+"\nDistance: "+dist+"\n"
        + "Volume: "+(s.h?s.h.dataset.vol:'')+"\nService: "+(s.express?'Express 24/48h':'Flex \u2264 7 days')+"\n"
        + "Options: "+optTxt+"\nLift: \nNotes: \n\n"
        + "Displayed estimate: "+money(s.total)+" FCFA (indicative)\n\nPlease confirm my quote."
      : "Bonjour DEC,\nJe souhaite obtenir un devis pour mon déménagement.\n\nRéférence : "+REF+"\nNom : \nTéléphone : \nDate : \nCréneau : \n"
        + "Départ : "+sideText('From')+"\nArrivée : "+sideText('To')+"\nDistance : "+dist+"\n"
        + "Volume : "+(s.h?s.h.dataset.vol:'')+"\nService : "+(s.express?'Express — 24/48h':'Flex — dès 7 jours')+"\n"
        + "Options : "+optTxt+"\nAscenseur : \nPrécisions : \n\n"
        + "Estimation affichée : "+money(s.total)+" FCFA (indicative)\n\nMerci de confirmer mon devis.");
  }
  function openWa(msg){
    const url = (D && D.waLink) ? D.waLink(msg)
      : 'https://wa.me/'+((CFG.contact&&CFG.contact.whatsapp)||'2290166355509')+'?text='+encodeURIComponent(msg);
    const w = window.open(url,'_blank');
    if(!w) window.location.href = url;
  }
  function updateQuote(){
    const s = readState();
    const S = D && D.S ? D.S() : null;
    if(distVal) distVal.textContent = distLabel(s);
    if(tripTypeEl) tripTypeEl.textContent = tripTypeLabel(s);
    const parts = [];
    if(s.routeCost) parts.push((S?S.rkm:function(n){return '+ '+money(n)+' F de distance';})(s.routeCost));
    if(s.intl && s.borderCost) parts.push((S?S.fxm:function(n){return '+ '+money(n)+' F de formalités';})(s.borderCost));
    if(distCost){
      distCost.textContent = parts.length ? parts.join(' · ')
        : (s.km === null ? (isEn()?'route to be confirmed by DEC':'route à confirmer par DEC')
                         : (S ? S.incl : 'route incluse dans l\'estimation'));
      distCost.classList.toggle('hot', parts.length > 0 || s.km === null);
    }
    if(lblFrom) lblFrom.textContent = sideText('From');
    if(lblTo)   lblTo.textContent   = sideText('To');
    if(lblKm)   lblKm.textContent   = distLabel(s).toUpperCase();
    if(lblVol)  lblVol.textContent  = (s.h ? s.h.dataset.vol : '');
    if(lblSvc)  lblSvc.textContent  = s.express ? (S?S.svx:'EXPRESS 24/48H') : (S?S.svf:'FLEX ≤ 7 J');
    if(lblDate) lblDate.textContent = (s.express?(S?S.d1:'J+1 · '):(S?S.d7:'J+7 · ')) + fmtDate(s.express?1:7);
    if(prioStamp) prioStamp.classList.toggle('on', s.express);
    tweenPrice(s.total);
    if(btnWa) btnWa.href = (D && D.waLink) ? D.waLink(quickMsg(s)) : '#';
    return s;
  }
  function setOpt(id, val){
    const el = form.querySelector('input[type=checkbox][data-id="'+id+'"]');
    if(el) el.checked = val;
  }
  function wireServiceLevel(){
    form.querySelectorAll('input[name=svcLevel]').forEach(function(r){
      r.addEventListener('change', function(){
        if(this.value === 'standard'){
          setOpt('packing', false); setOpt('unpack', false);
        } else if(this.value === 'complet'){
          setOpt('packing', true); setOpt('unpack', true);
        } else if(this.value === 'premium'){
          setOpt('packing', true); setOpt('unpack', true);
          setOpt('assurance', true); setOpt('manutention', true);
        }
        updateQuote();
      });
    });
  }
  function wirePanels(){
    if(!D) return;
    document.querySelectorAll('[data-wa-panel]').forEach(function(a){
      const k = a.dataset.waPanel;
      const S = D.S();
      const base = (S.panels && S.panels[k]) || '';
      a.href = D.waLink(base + ' ' + REF + '\n');
    });
  }

  /* ---- Formulaire détaillé (#fullForm — devis.html) ---- */
  const fullForm = document.getElementById('fullForm');
  if(fullForm){
    const dateI = document.getElementById('fDate');
    if(dateI){ const t = new Date(); t.setDate(t.getDate()+1); dateI.min = t.toISOString().slice(0,10); }
    fullForm.addEventListener('submit', function(e){
      e.preventDefault();
      const wName = $('wName'), wPhone = $('wPhone'), wConsent = $('wConsent');
      const name  = ($('fName')||{}).value || '';
      const phone = ($('fPhone')||{}).value || '';
      const okName  = name.trim().length >= 2;
      const okPhone = phone.replace(/\D/g,'').length >= 8;
      const okConsent = $('fConsent') && $('fConsent').checked;
      if(wName) wName.classList.toggle('bad', !okName);
      if(wPhone) wPhone.classList.toggle('bad', !okPhone);
      if(wConsent) wConsent.classList.toggle('bad', !okConsent);
      if(!okName){ $('fName').focus(); return; }
      if(!okPhone){ $('fPhone').focus(); return; }
      if(!okConsent){ if($('fConsent')) $('fConsent').focus(); return; }

      const s = readState();
      const date = dateI ? dateI.value : '';
      let dateTxt = '—';
      if(date){ try{ dateTxt = new Intl.DateTimeFormat(loc(),{weekday:'long',day:'numeric',month:'long'}).format(new Date(date+'T12:00:00')); }catch(err){ dateTxt = date; } }
      const slotEl = fullForm.querySelector('input[name=slot]:checked');
      const slot = slotEl ? slotEl.value : '—';
      const lifts = Array.prototype.slice.call(fullForm.querySelectorAll('input[name=lift]:checked')).map(function(i){return i.value;}).join(' · ') || '—';
      const fromFloor = $('fFromFloor'), toFloor = $('fToFloor');
      const notes = ($('fNotes')||{}).value || '';
      const fFl = fromFloor ? fromFloor.selectedOptions[0].textContent : '—';
      const tFl = toFloor ? toFloor.selectedOptions[0].textContent : '—';
      const dist = (s.km === null) ? (isEn()?'to be confirmed by DEC':'à confirmer par DEC') : ('≈ '+s.km+' km (indicative)');

      const msg = (isEn()
        ? "Hello DEC,\nI would like a quote for my move.\n\nReference: "+REF+"\nName: "+name.trim()+"\nPhone: "+phone.trim()
          +"\nDate: "+dateTxt+"\nSlot: "+slot+"\nPickup: "+sideText('From')+"\nDrop-off: "+sideText('To')
          +"\nDistance: "+dist+"\nVolume: "+(s.h?s.h.dataset.vol:'')+"\nService: "+(s.express?'Express 24/48h':'Flex \u2264 7 days')
          +"\nOptions: "+(s.opts.length?s.opts.join(', '):'none')+"\nPickup floor: "+fFl+"\nDrop-off floor: "+tFl
          +"\nLift: "+lifts+"\nNotes: "+(notes.trim()||'—')+"\n\nDisplayed estimate: "+money(s.total)+" FCFA (indicative)\n\nPlease confirm my quote."
        : "Bonjour DEC,\nJe souhaite obtenir un devis pour mon déménagement.\n\nRéférence : "+REF+"\nNom : "+name.trim()+"\nTéléphone : "+phone.trim()
          +"\nDate : "+dateTxt+"\nCréneau : "+slot+"\nDépart : "+sideText('From')+"\nArrivée : "+sideText('To')
          +"\nDistance : "+dist+"\nVolume : "+(s.h?s.h.dataset.vol:'')+"\nService : "+(s.express?'Express — 24/48h':'Flex — dès 7 jours')
          +"\nOptions : "+(s.opts.length?s.opts.join(', '):'aucune')+"\nÉtage départ : "+fFl+"\nÉtage arrivée : "+tFl
          +"\nAscenseur : "+lifts+"\nPrécisions : "+(notes.trim()||'—')+"\n\nEstimation affichée : "+money(s.total)+" FCFA (indicative)\n\nMerci de confirmer mon devis.");

      openWa(msg);
      if(D && D.toast) D.toast(isEn()?'Request ready!':'Demande prête !',
        isEn()?'WhatsApp just opened — press Send and DEC confirms.':'WhatsApp vient de s\'ouvrir — appuyez sur Envoyer et DEC confirme.');
    });
  }

  if(btnCopy) btnCopy.addEventListener('click', function(){
    const txt = quickMsg(readState());
    const done = function(){ if(D && D.toast) D.toast(isEn()?'Quote copied!':'Devis copié !', isEn()?'Paste it into WhatsApp or your notes.':'Collez-le dans WhatsApp ou vos notes.'); };
    if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(done).catch(function(){
      const ta = document.createElement('textarea'); ta.value = txt;
      ta.style.position='fixed'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); done(); }catch(e){}
      ta.remove(); });
    }else{
      const ta = document.createElement('textarea'); ta.value = txt;
      ta.style.position='fixed'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); done(); }catch(e){}
      ta.remove();
    }
  });

  form.addEventListener('change', updateQuote);
  [qFrom,qTo].forEach(function(s){ if(s) s.addEventListener('change', function(){ syncArr(s===qFrom?'From':'To'); updateQuote(); }); });
  [qFromQ,qToQ].forEach(function(i){ if(i) i.addEventListener('change', updateQuote); });
  if(D && D.onLangChange) D.onLangChange(function(){ renderHousing(); renderOpts(); updateQuote(); wirePanels(); });

  renderHousing(); renderOpts(); renderCities(); updateQuote(); wirePanels(); wireServiceLevel();
}
if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', boot); } else boot();
})();