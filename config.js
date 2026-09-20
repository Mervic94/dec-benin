/* ============================================================
   DEC — CONFIGURATION CENTRALE v5 (finale)
   Officiel : RCCM RB/ABC/22 A 40206 · IFU 0201910804130 ·
   Siège Ilot 292-J Togoudo 03 BP 1782 Jéricho (Abomey-Calavi) ·
   Tél. 01 66 35 55 09 / 01 95 40 99 95.
   Compte bancaire volontairement EXCLU (demande DEC).
   Cascade : 12 départements · 77 communes (liste DEC) ·
   arrondissements · quartier = texte libre.
   km = approximatifs depuis Cotonou — indicatif, à valider DEC.
   ============================================================ */
window.DEC_CONFIG = {

  contact: {
    phoneDisplay: "+229 01 66 35 55 09",
    phoneTel:     "+2290166355509",
    phone2Display:"+229 01 95 40 99 95",
    phone2Tel:    "+2290195409995",
    whatsapp:     "2290166355509",
    email:        "demenagementexpresscotonou@gmail.com",
    address:      "Ilot 292-J, Quartier Togoudo, 03 BP 1782 Jéricho, Abomey-Calavi, Bénin",
    social: {
      facebook: "https://www.facebook.com/demenagementexpresscotonou/",
      tiktok:   "https://www.tiktok.com/@demenagementexpress",
      linkedin: "https://linkedin.com/company/demenagement-express-cotonou",
      maps:     "https://maps.app.goo.gl/kM1ZKyeTqTg2Hdr96"
    },
    hours: { open: 7, close: 19, daysOff: [0] }
  },

  pricing: {
    currency: "FCFA",
    kmIncluded: 30,
    pricePerKm: 350,
    roundTo: 500,
    discountFlex: 0.15,
    borderFee: 75000,
    housing: [
      { id:"chambre",    label:"Chambre / studio",        labelEn:"Room / studio",              vol:"≈ 6 m³",  base:25000 },
      { id:"etudiant",   label:"Chambre étudiante",       labelEn:"Student room",               vol:"≈ 4 m³",  base:18000 },
      { id:"appart",     label:"2–3 pièces",              labelEn:"2–3 rooms",                  vol:"≈ 12 m³", base:55000 },
      { id:"villa",      label:"Villa 4–5 pièces",        labelEn:"Villa 4–5 rooms",             vol:"≈ 20 m³", base:95000 },
      { id:"bureau",     label:"Bureau / entreprise",     labelEn:"Office / business",           vol:"≈ 30 m³", base:150000 },
      { id:"industriel", label:"Commerce / industriel",   labelEn:"Commercial / industrial",     vol:"≈ 45 m³", base:220000 }
    ],
    options: [
      { id:"packing",     price:15000, name:"Emballage complet",     nameEn:"Full packing" },
      { id:"stairs",      price:10000, name:"Étage sans ascenseur",  nameEn:"Stairs, no lift" },
      { id:"unpack",      price:8000,  name:"Déballage & rangement", nameEn:"Unpacking & setup" },
      { id:"storage",     price:25000, name:"Garde-meuble 1 mois",   nameEn:"Storage, 1 month" },
      { id:"assurance",   price:20000, name:"Assurance tous risques", nameEn:"Full insurance coverage" },
      { id:"manutention", price:30000, name:"Manutention spécialisée (piano, coffre-fort, objets fragiles)", nameEn:"Specialized handling (piano, safe, fragile items)" }
    ],

    /* ===== BÉNIN — 12 départements · 77 communes (liste DEC) ===== */
    benin: [
      { dep:"Alibori", communes:[
        { name:"Banikoara", km:680, arr:["Banikoara","Founougo","Gomparou","Goumori","Kokey","Kokiborou","Ounet","Sompérékou","Soroko","Toura"] },
        { name:"Gogounou", km:595, arr:["Bagou","Gogounou","Gounarou","Ouara","Sori","Zoungou-Pantrossi"] },
        { name:"Kandi", km:640, arr:["Angaradébou","Bensékou","Donwari","Kandi I","Kandi II","Kandi III","Kassakou","Saah","Sam","Sonsoro"] },
        { name:"Karimama", km:595, arr:["Birni-Lafia","Bogo-Bogo","Karimama","Kompa","Monsey"] },
        { name:"Malanville", km:695, arr:["Garou","Guéné","Madécali","Malanville","Tomboutou"] },
        { name:"Ségbana", km:555, arr:["Libantè","Liboussou","Lougou","Ségbana","Sokotindji"] }
      ]},
      { dep:"Atacora", communes:[
        { name:"Boukoumbé", km:615, arr:["Boukoumbé","Dipoli","Korontière","Kossoucoingou","Manta","Natta","Tabota"] },
        { name:"Cobly", km:675, arr:["Cobly","Datori","Kountori","Tapoga"] },
        { name:"Kérou", km:610, arr:["Brignamaro","Firou","Kérou","Koabagou"] },
        { name:"Kouandé", km:610, arr:["Birni","Chabi-Kouma","Fô-Tancé","Guilmaro","Kouandé","Oroukayo"] },
        { name:"Matéri", km:730, arr:["Dassari","Gouandé","Matéri","Nodi","Tantéga","Tchanhoun-Cossi"] },
        { name:"Natitingou", km:645, arr:["Kotopounga","Kouaba","Kounadébou","Natitingou I","Natitingou II","Natitingou III","Natitingou IV","Perma","Tchoumi-Tchoumi"] },
        { name:"Ouassa-Péhunco", km:570, arr:["Gnégpasson","Péhunco","Tobré"] },
        { name:"Tanguiéta", km:670, arr:["Cotiakou","Nadiagou","Taiacou","Tanguiéta","Tumounté"] },
        { name:"Toucountouna", km:615, arr:["Kouarfa","Tampégré","Toucountouna"] }
      ]},
      { dep:"Atlantique", communes:[
        { name:"Abomey-Calavi", km:15, arr:["Abomey-Calavi","Akassato","Godomey","Golo-Yogo","Kpanroun","Ouédo","Togba","Zinvié"] },
        { name:"Allada", km:45, arr:["Allada","Agbanou","Ahouannonzoun","Attogon","Avakpa","Hinvi","Lissègazoun","Lon-Agonmey","Mame","Togoudo","Tokpa-Avagoudo","Wassaho"] },
        { name:"Kpomassè", km:55, arr:["Agbanto","Agonkanmè","Ahouandji","Dekanmè","Kpomassè","Ségbohouè","Ségbya","Tokpa-Dommè","Agonvy"] },
        { name:"Ouidah", km:40, arr:["Agbocoussa","Avlekete","Djégbadji","Gakpé","Houakpè-Daho","Ouidah I","Ouidah II","Ouidah III","Ouidah IV","Pahou"] },
        { name:"Sô-Ava", km:25, arr:["Ahomey-Lokpo","Dékanmè","Ganvié I","Ganvié II","Houédo-Aguékon","Sô-Ava","Vekky"] },
        { name:"Toffo", km:50, arr:["Agama","Agbame","Colli-Agbame","Damè","Djanglanmè","Houégbo","Kpédékpo","Nyessikhwé","Sey","Toffo-Agué","Sèhouè"] },
        { name:"Tori-Bossito", km:35, arr:["Azohouè-Aliho","Azohouè-Cada","Tori-Bossito","Tori-Cada","Tori-Garé","Yèvié"] },
        { name:"Zè", km:50, arr:["Adjan","Dawé","Djigbé","Dodji-Bata","Heume-Gbégnon","Koundokpo","Sedjè-Denou","Sedjè-Houégoudo","Tangbo-Djèvié","Yokpo","Zè"] }
      ]},
      { dep:"Borgou", communes:[
        { name:"Bembérèkè", km:390, arr:["Bembérèkè","Bouanri","Gomia","Ina","Béroubouay"] },
        { name:"Kalalé", km:520, arr:["Basso","Bouca","Dérassi","Kalalé","Dunkassa","Péonga","Péhunco"] },
        { name:"N'Dali", km:360, arr:["Bori","Gbégourou","N'Dali","Ouénou","Sirarou"] },
        { name:"Nikki", km:470, arr:["Biro","Gnonkourokali","Nikki","Ouénou","Tasso","Dikouman","Serékali"] },
        { name:"Parakou", km:430, arr:["1er Arrondissement","2e Arrondissement","3e Arrondissement"] },
        { name:"Pèrèrè", km:465, arr:["Gninsy","Guadahazi","Kpéné","Pané","Pèrèrè","Sontou"] },
        { name:"Sinendé", km:410, arr:["Fô-Bourè","Sèkèrè","Sinendé","Sikki"] },
        { name:"Tchaourou", km:330, arr:["Alafiarou","Bétérou","Gounin","Kika","Sanson","Tchaourou","Tchatchou"] }
      ]},
      { dep:"Collines", communes:[
        { name:"Bantè", km:215, arr:["Agoua","Akpassi","Atokoligbé","Bantè","Gouka","Koko","Lougba","Pira"] },
        { name:"Dassa-Zoumè", km:200, arr:["Akoffodjoulé","Dassa I","Dassa II","Dotan","Kpkingni","Lemé","Paouingnan","Soclogbo","Tré","Kéré"] },
        { name:"Glazoué", km:230, arr:["Assanté","Glazoué","Gommè","Kpédékpo","Magoumi","Ouèdèmè","Thio","Zaffé","Gomé","Kaboua"] },
        { name:"Ouèssè", km:270, arr:["Challa-Ogoi","Djègbé","Gbananmè","Kilibo","Laminou","Odougba","Ouèssè","Toui","Ikemon"] },
        { name:"Savalou", km:180, arr:["Agbado","Attity","Djalloukou","Doumè","Gobé","Kpato","Lahotan","Lèma","Ottola","Ouèssè","Savalou-Aga","Savalou-Agonlin","Savalou-Tchessi","Tchetti"] },
        { name:"Savè", km:250, arr:["Adido","Bessè","Boni","Kaboua","Offè","Plateau","Sakin"] }
      ]},
      { dep:"Couffo", communes:[
        { name:"Aplahoué", km:100, arr:["Aplahoué","Atomè","Azovè","Kissamey","Lonkly","Dékpo","Godohou"] },
        { name:"Djakotomey", km:90, arr:["Adjintimey","Betoumey","Djakotomey I","Djakotomey II","Gohomey","Houégamè","Kpoba","Kokohoué","Sokouhoué","Gbéhoué"] },
        { name:"Dogbo", km:95, arr:["Ayomi","Couti","Dogbo-Tota","Lokogohoué","Madjrè","Tota","Totchangni"] },
        { name:"Klouékanmè", km:85, arr:["Adjahanmè","Ahogbémè","Ayahohoué","Djotto","Hondjin","Klouékanmè","Lanta","Tchikpé"] },
        { name:"Lalo", km:95, arr:["Adanhondjigon","Ahounmè","Ahomadégbé","Banigbé","Gnizounmè","Hlassamè","Lalo","Lokogba","Tohou","Tohoué","Zalli"] },
        { name:"Toviklin", km:90, arr:["Adjido","Avédjin","Doko","Houédogli","Missinko","Tannou-Gola","Toviklin"] }
      ]},
      { dep:"Donga", communes:[
        { name:"Bassila", km:380, arr:["Alédjo","Bassila","Manigri","Pénéssoulou"] },
        { name:"Copargo", km:530, arr:["Anandana","Copargo","Pabégou","Singré"] },
        { name:"Djougou", km:500, arr:["Barei","Bougou","Djougou I","Djougou II","Djougou III","Kolokondé","Onklou","Patargo","Pélébina","Serou","Soubroukou"] },
        { name:"Ouaké", km:540, arr:["Badjoudè","Kondé","Ouaké","Sèmèrè I","Sèmèrè II","Awotébi"] }
      ]},
      { dep:"Littoral", communes:[
        { name:"Cotonou", km:0, arr:["1er Arrondissement","2e Arrondissement","3e Arrondissement","4e Arrondissement","5e Arrondissement","6e Arrondissement","7e Arrondissement","8e Arrondissement","9e Arrondissement","10e Arrondissement","11e Arrondissement","12e Arrondissement","13e Arrondissement"] }
      ]},
      { dep:"Mono", communes:[
        { name:"Athiémè", km:70, arr:["Atchannou","Athiémè","Dédékpoé","Kpinnou","Zoungbonou"] },
        { name:"Bopa", km:70, arr:["Agbodji","Badazoui","Bopa","Lobogo","Possotomè","Yéwémè"] },
        { name:"Comè", km:60, arr:["Agatogbo","Akodéha","Comè","Ouédémè-Pedah","Oumako"] },
        { name:"Grand-Popo", km:95, arr:["Adjaha","Agoué","Avlo","Grand-Popo","Gbéhoué","Sazoué","Janglanmey"] },
        { name:"Houéyogbé", km:90, arr:["Dahè","Doutou","Honhoué","Houéyogbé","Sè","Zoungbonou"] },
        { name:"Lokossa", km:80, arr:["Agamè","Houin","Koudo","Lokossa","Ouèdèmè"] }
      ]},
      { dep:"Ouémé", communes:[
        { name:"Adjarra", km:45, arr:["Adjarra I","Adjarra II","Aglogbé","Honvié","Malanhoui"] },
        { name:"Adjohoun", km:50, arr:["Adjohoun","Akpadanou","Awonou","Azowlissè","Demè","Gangban","Kodé","Togbota"] },
        { name:"Aguégués", km:45, arr:["Avagbodji","Houédomè","Zoungamè"] },
        { name:"Akpro-Missérété", km:50, arr:["Akpro-Missérété","Gomè-Sota","Katagon","Tokpota","Vakon"] },
        { name:"Avrankou", km:60, arr:["Atchoukpa","Avrankou","Djomon","Gbozounmè","Kouty","Ouanho","Sadagnon"] },
        { name:"Bonou", km:55, arr:["Affamè","Atchonsa","Bonou","Damè-Wogon","Houinvigné"] },
        { name:"Dangbo", km:40, arr:["Dangbo","Dékin","Gbéko","Houédomey","Hozin","Kessounou","Zounguè"] },
        { name:"Porto-Novo", km:35, arr:["1er Arrondissement","2e Arrondissement","3e Arrondissement","4e Arrondissement","5e Arrondissement"] },
        { name:"Sèmè-Podji", km:60, arr:["Agblangandan","Djèrègbé","Ekpè","Podji","Sèmè-Podji","Tohoué"] }
      ]},
      { dep:"Plateau", communes:[
        { name:"Adja-Ouèrè", km:95, arr:["Adja-Ouèrè","Ikpinlè","Kpoulou","Massè","Oko-Akaré","Totonnou-Gbéffa"] },
        { name:"Ifangni", km:100, arr:["Banigbé","Daagbé","Ifangni","Lagbé","Tchaada"] },
        { name:"Kétou", km:120, arr:["Adakplamé","Idigny","Kétou","Kpankou","Odomèta","Okpo-Owo","Yékipago"] },
        { name:"Pobè", km:130, arr:["Ahoyéyé","Igana","Issaba","Pobè","Towé"] },
        { name:"Sakété", km:75, arr:["Agidi","Ita-Djoubou","Sakété I","Sakété II","Takon","Yoko"] }
      ]},
      { dep:"Zou", communes:[
        { name:"Abomey", km:125, arr:["Agboki","Detohou","Djègbé","Hounli","Sèhoun","Vidolé","Zounzounmè"] },
        { name:"Agbangnizoun", km:105, arr:["Adahounsa","Agbangnizoun","Adingnigon","Kinta","Kpota","Lissazounmè","Sahé","Sinwé","Tanvé","Zoungoudo"] },
        { name:"Bohicon", km:120, arr:["Agongointo","Avogbannan","Bohicon I","Bohicon II","Passagon","Saclo","Sodohomè","Ouassaho","Gnidjazoun","Lissezoun"] },
        { name:"Covè", km:100, arr:["Adogbé","Gounli","Houéko","Houen-Hounso","Naogon","Soli","Zogba"] },
        { name:"Djidja", km:140, arr:["Agbauto","Dan","Djidja","Goutchon","Houto","Mougnon","Oumgbègamè","Outo","Setto","Zoukon","Agouna"] },
        { name:"Ouinhi", km:100, arr:["Dasso","Ouinhi","Sado","Tohoué"] },
        { name:"Zagnanado", km:105, arr:["Agonlin-Hououto","Dovi","Kpédékpo","Naogon","Zagnanado","Zounzonmè"] },
        { name:"Za-Kpota", km:110, arr:["Allahé","Assahoun","Houngomey","Kpakpamè","Kpounzoun","Za-Kpota","Za-Tanta","Zèko"] },
        { name:"Zogbodomey", km:95, arr:["Akiza","Avlamè","Cana I","Cana II","Dommè","Koussoukpa","Kpoki","Zoukou","Zoukou-Lézou","Zogbodomey","Tanwé-Hessou"] }
      ]}
    ],

    /* ---- HORS BÉNIN (indicatif — à confirmer au cas par cas) ---- */
    international: [
      { name:"Lomé (Togo)",             km:170,  cc:"TG" },
      { name:"Accra (Ghana)",           km:440,  cc:"GH" },
      { name:"Abidjan (Côte d'Ivoire)", km:870,  cc:"CI" },
      { name:"Ouagadougou (Burkina)",   km:980,  cc:"BF" },
      { name:"Niamey (Niger)",          km:1030, cc:"NE" }
    ]
  },

  officiel: {
    assurance: { couvertures:null, exclusions:null, plafond:null, franchise:null, delaiDeclaration:null, delaiIndemnisation:null, documentsRequis:null },
    gardemeuble: null,
    destinations: null,
    legal: {
      rccm: "RB/ABC/22 A 40206",
      ifu:  "0201910804130",
      responsable: null,   /* TODO_OFFICIEL */
      hebergeur: null,     /* TODO_OFFICIEL : après mise en ligne */
      apdp: null           /* TODO_OFFICIEL : récépissé après dépôt */
    },
    equipe: [],
    photos: []
  },

  validatePricing: function(p){
    p = p || (window.DEC_CONFIG && window.DEC_CONFIG.pricing);
    const errs = [];
    if(!p) return ["CONFIG_PRICING absent"];
    if(p.kmIncluded < 0 || p.pricePerKm <= 0) errs.push("kmIncluded/pricePerKm invalides");
    if(p.roundTo <= 0) errs.push("roundTo doit être > 0");
    (p.housing||[]).forEach(h=>{ if(!h.id || h.base <= 0) errs.push("logement invalide : "+h.id); });
    (p.options||[]).forEach(o=>{ if(o.price < 0 || !o.id) errs.push("option invalide : "+o.id); });
    if(p.discountFlex < 0 || p.discountFlex >= 1) errs.push("discountFlex invalide");
    let n = 0;
    (p.benin||[]).forEach(d=>{ (d.communes||[]).forEach(function(){ n++; }); });
    if(n !== 77) console.warn("[DEC config] "+n+" communes listées (attendu : 77).");
    return errs;
  }
};
(function(){
  const errs = window.DEC_CONFIG.validatePricing();
  if(errs.length) console.warn("[DEC config] Tarifs à corriger :", errs);
})();
window.DEC_generateRef = function(){
  const d = new Date();
  const ymd = d.getFullYear() + String(d.getMonth()+1).padStart(2,"0") + String(d.getDate()).padStart(2,"0");
  const rand = String(Math.floor(Math.random()*10000)).padStart(4,"0");
  return "DEC-" + ymd + "-" + rand;
};;;