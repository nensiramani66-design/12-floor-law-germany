/* Kronberg Legal: scoped Our Firm refinement. No homepage or transition handlers are changed. */
(() => {
  'use strict';
  const embedded = document.getElementById('our-firm');
  const root = embedded || (document.querySelector('.page2-hero') ? document.body : null);
  if (!root || root.dataset.firmRefinement) return;

  // The standalone page and the scrolling page share the same enhancement.
  if (!embedded) {
    const aliases = {
      '.page2-hero': 'firm-hero', '.hero-copy': 'firm-copy',
      '.page2-hero h1': 'firm-title', '.hero-text': 'firm-text',
      '.hero-buttons': 'firm-actions', '.facts': 'firm-facts',
      '.section': 'firm-section', '.section-heading': 'firm-heading',
      '.section-label': 'firm-label', '.section-copy': 'firm-section-copy',
      '.cards': 'firm-cards', '.card': 'firm-card',
      '.floor-grid': 'firm-floor-grid', '.floor': 'firm-floor',
      '.floor-title': 'firm-floor-title', '.cta': 'firm-cta', 'footer': 'firm-footer'
    };
    for (const [selector, className] of Object.entries(aliases)) {
      root.querySelectorAll(selector).forEach(el => el.classList.add(className));
    }
  }

  const copy = root.querySelector('.firm-copy');
  const facts = root.querySelector('.firm-facts');
  const floorCards = [...root.querySelectorAll('.firm-floor')];
  if (!copy || !facts || floorCards.length < 10) return;
  root.dataset.firmRefinement = '1';
  root.classList.add('kl-firm-refined');

  const style = document.createElement('style');
  style.id = 'kl-firm-refinement-styles';
  style.textContent = `
.kl-firm-refined .firm-copy{max-width:none;min-width:0;display:grid;grid-template-columns:minmax(0,1fr) 200px;gap:26px;align-items:center}
.kl-firm-refined .kl-firm-main{min-width:0}
.kl-firm-refined .firm-title{font-size:clamp(48px,4.1vw,68px);line-height:1.05;letter-spacing:-1.5px}
.kl-firm-refined .firm-text{font-size:17px;line-height:1.75}
.kl-firm-refined .firm-actions{gap:10px}
.kl-firm-refined .kl-approach{min-width:0;border-left:1px solid #caa45f55;padding:8px 0 8px 22px}
.kl-firm-refined .kl-kicker{color:#caa45f;font-size:10px;line-height:1.6;letter-spacing:1.7px;text-transform:uppercase;margin:0 0 15px}
.kl-firm-refined .kl-approach h3{font:normal 27px/1.13 Georgia,serif;letter-spacing:-.3px;color:#f3efe7;margin:0 0 14px}
.kl-firm-refined .kl-approach-intro{color:#c1b9aa;font-size:13px;line-height:1.65;margin:0 0 22px}
.kl-firm-refined .kl-steps{list-style:none;display:grid;gap:17px;margin:0;padding:0}
.kl-firm-refined .kl-steps li{display:grid;grid-template-columns:20px minmax(0,1fr);gap:8px;align-items:start;color:#ddd5c7;font-size:13px;line-height:1.45}
.kl-firm-refined .kl-step-number{color:#caa45f;font-size:10px;letter-spacing:1px;padding-top:2px}
.kl-firm-refined .kl-note-link{display:inline-flex;align-items:center;gap:9px;color:#e2c48a;font-size:12px;line-height:1.5;text-decoration:none;border-bottom:1px solid #caa45f66;padding:7px 0;margin-top:20px}
.kl-firm-refined .kl-pathways{padding:42px 7% 38px;background:linear-gradient(110deg,#15150f,#10110e 65%);border-block:1px solid #caa45f35}
.kl-firm-refined .kl-pathways-top{display:flex;justify-content:space-between;gap:35px;align-items:end;margin:0 auto 28px;max-width:1440px}
.kl-firm-refined .kl-pathways h2{font:normal clamp(29px,2.7vw,40px)/1.15 Georgia,serif;color:#f3efe7;letter-spacing:-.7px;margin:0}
.kl-firm-refined .kl-pathways-top>p{max-width:355px;font-size:14px;line-height:1.65;color:#bdb7ab;margin:0}
.kl-firm-refined .kl-path-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;max-width:1440px;margin:auto}
.kl-firm-refined .kl-path{position:relative;display:flex;flex-direction:column;min-width:0;padding:26px 26px 22px 0;color:#f3efe7;text-decoration:none;border-top:1px solid #ffffff28;transition:background .2s ease}
.kl-firm-refined .kl-path+.kl-path{border-left:1px solid #ffffff18;padding-left:26px}
.kl-firm-refined .kl-path:hover{background:#caa45f08}
.kl-firm-refined .kl-path:focus-visible,.kl-firm-refined .kl-note-link:focus-visible{outline:2px solid #dfbb73;outline-offset:5px}
.kl-firm-refined .kl-path-label{font-size:10px;letter-spacing:1.6px;line-height:1.5;color:#caa45f;margin-bottom:12px;text-transform:uppercase}
.kl-firm-refined .kl-path h3{font:normal 25px/1.22 Georgia,serif;letter-spacing:-.2px;margin:0 0 13px}
.kl-firm-refined .kl-path p{font-size:14px;line-height:1.65;color:#bdb7ab;margin:0 0 19px;max-width:350px}
.kl-firm-refined .kl-path-action{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-top:auto;font-size:12px;color:#e0c58e}
.kl-firm-refined .kl-arrow{font-size:23px;line-height:1}
.kl-firm-refined .kl-demo-note{font-size:11px;line-height:1.65;color:#aaa393;max-width:1440px;margin:19px auto 0}
.kl-firm-refined .firm-floor{scroll-margin-top:calc(var(--header,82px) + 28px)}
.kl-firm-refined .firm-floor:target{outline:1px solid #caa45f;outline-offset:-1px;background:#1b1911}
.kl-firm-refined .kl-floor-summary{font-size:13px;line-height:1.55;color:#b8b1a4;margin-top:13px}
@media(max-width:1349px){
 .kl-firm-refined .firm-copy{display:block}
 .kl-firm-refined .firm-title{font-size:clamp(44px,5vw,64px)}
 .kl-firm-refined .kl-approach{margin-top:27px;padding:21px 0 0;border-left:0;border-top:1px solid #caa45f40}
 .kl-firm-refined .kl-approach h3{font-size:25px;margin-bottom:10px}
 .kl-firm-refined .kl-approach-intro{margin-bottom:16px}
 .kl-firm-refined .kl-steps{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
 .kl-firm-refined .kl-steps li{grid-template-columns:1fr;gap:5px;font-size:12px}
 .kl-firm-refined .kl-note-link{margin-top:12px}
}
@media(max-width:900px){
 .kl-firm-refined .firm-title{font-size:clamp(40px,10.5vw,58px);line-height:1.05}
 .kl-firm-refined .firm-text{font-size:16px;line-height:1.7}
 .kl-firm-refined .firm-actions a{flex:1 1 150px;text-align:center}
 .kl-firm-refined .kl-approach{margin-top:28px;padding-top:25px}
 .kl-firm-refined .kl-approach h3{font-size:28px}
 .kl-firm-refined .kl-approach-intro{font-size:14px}
 .kl-firm-refined .kl-steps li{font-size:13px}
 .kl-firm-refined .kl-pathways{padding:34px 20px 30px}
 .kl-firm-refined .kl-pathways-top{display:block;margin-bottom:24px}
 .kl-firm-refined .kl-pathways h2{font-size:34px;margin-bottom:14px}
 .kl-firm-refined .kl-pathways-top>p{font-size:15px;max-width:100%}
 .kl-firm-refined .kl-path-grid{grid-template-columns:1fr}
 .kl-firm-refined .kl-path,.kl-firm-refined .kl-path+.kl-path{border-left:0;padding:25px 0}
 .kl-firm-refined .kl-path h3{font-size:27px}
 .kl-firm-refined .kl-path p{max-width:100%;font-size:15px}
 .kl-firm-refined .kl-path-action{font-size:13px}
 .kl-firm-refined .kl-demo-note{font-size:12px}
}
@media(max-width:360px){.kl-firm-refined .kl-steps{grid-template-columns:1fr}.kl-firm-refined .kl-steps li{grid-template-columns:22px minmax(0,1fr)}}
@media(prefers-reduced-motion:reduce){.kl-firm-refined .kl-path{transition:none}}
`;
  document.head.append(style);

  const main = document.createElement('div');
  main.className = 'kl-firm-main';
  while (copy.firstChild) main.append(copy.firstChild);
  copy.append(main);
  const about = root.querySelector('#firm-who, #who-we-are');
  const approach = document.createElement('aside');
  approach.className = 'kl-approach';
  approach.setAttribute('aria-labelledby', 'kl-approach-title');
  approach.innerHTML = `
    <p class="kl-kicker" data-kl-text="approachKicker"></p>
    <h3 id="kl-approach-title" data-kl-text="approachTitle"></h3>
    <p class="kl-approach-intro" data-kl-text="approachIntro"></p>
    <ol class="kl-steps">
      <li><span class="kl-step-number" aria-hidden="true">01</span><span data-kl-text="step1"></span></li>
      <li><span class="kl-step-number" aria-hidden="true">02</span><span data-kl-text="step2"></span></li>
      <li><span class="kl-step-number" aria-hidden="true">03</span><span data-kl-text="step3"></span></li>
    </ol>
    <a class="kl-note-link" href="#${about ? about.id : 'firm-floors'}"><span data-kl-text="approachLink"></span><span aria-hidden="true">&#8599;</span></a>`;
  copy.append(approach);

  const targets = [0, 1, 9].map((index, i) => {
    const card = floorCards[index];
    if (!card.id) card.id = ['kl-business', 'kl-disputes', 'kl-private'][i];
    return card.id;
  });
  const pathways = document.createElement('section');
  pathways.className = 'kl-pathways';
  pathways.setAttribute('aria-labelledby', 'kl-pathways-title');
  pathways.innerHTML = `
    <div class="kl-pathways-top">
      <div><p class="kl-kicker" data-kl-text="pathsKicker"></p><h2 id="kl-pathways-title" data-kl-text="pathsTitle"></h2></div>
      <p data-kl-text="pathsIntro"></p>
    </div>
    <nav class="kl-path-grid" aria-label="Practice area pathways">
      ${targets.map((id, i) => `<a class="kl-path" href="#${id}">
        <span class="kl-path-label" data-kl-text="path${i}Label"></span>
        <h3 data-kl-text="path${i}Title"></h3>
        <p data-kl-text="path${i}Copy"></p>
        <span class="kl-path-action"><span data-kl-text="pathLink"></span><span class="kl-arrow" aria-hidden="true">&#8599;</span></span>
      </a>`).join('')}
    </nav>
    <p class="kl-demo-note" data-kl-text="demoNote"></p>`;
  facts.replaceWith(pathways);
  [0, 1, 9].forEach((index, i) => {
    const p = document.createElement('p');
    p.className = 'kl-floor-summary';
    p.dataset.klText = 'floorSummary' + i;
    floorCards[index].append(p);
  });

  const text = {
    en: {
      approachKicker:'OUR APPROACH', approachTitle:'Clear thinking. Connected advice.',
      approachIntro:'Different disciplines, brought together around the decisions that matter to you.',
      step1:'Understand your priorities', step2:'Bring the right specialists', step3:'Define the next step', approachLink:'How we work',
      pathsKicker:'START WITH WHAT MATTERS', pathsTitle:'The right expertise for your next move.',
      pathsIntro:'Explore the practice areas in our firm concept, organised around your needs rather than floor numbers.',
      path0Label:'FOR YOUR BUSINESS', path0Title:'Business & transactions',
      path0Copy:'Company structures, transactions and the legal questions behind a growing business.',
      path1Label:'WHEN THE STAKES ARE HIGH', path1Title:'Disputes & risk',
      path1Copy:'Commercial disputes, competing interests and a considered approach to resolving conflict.',
      path2Label:'FOR THE LONG TERM', path2Title:'Private clients & succession',
      path2Copy:'Personal assets, family businesses and planning for the next generation.',
      pathLink:'Explore this practice', demoNote:'Fictional firm / illustrative practice areas. This website does not offer legal advice or accept mandates.',
      floorSummary0:'Company structures, transactions and corporate governance.',
      floorSummary1:'Commercial disputes, negotiations and dispute resolution.',
      floorSummary2:'Private assets, family businesses and succession planning.'
    },
    de: {
      approachKicker:'UNSER ANSATZ', approachTitle:'Klar denken. Gemeinsam beraten.',
      approachIntro:'Verschiedene Fachgebiete, vereint f\u00fcr die Entscheidungen, die Ihnen wichtig sind.',
      step1:'Ihre Priorit\u00e4ten verstehen', step2:'Passende Fachleute verbinden', step3:'Den n\u00e4chsten Schritt kl\u00e4ren', approachLink:'So arbeiten wir',
      pathsKicker:'WAS F\u00dcR SIE Z\u00c4HLT', pathsTitle:'Die passende Expertise f\u00fcr Ihren n\u00e4chsten Schritt.',
      pathsIntro:'Entdecken Sie die Rechtsgebiete unseres Kanzleikonzepts: nach Ihren Anliegen geordnet, nicht nach Etagennummern.',
      path0Label:'F\u00dcR IHR UNTERNEHMEN', path0Title:'Unternehmen & Transaktionen',
      path0Copy:'Unternehmensstrukturen, Transaktionen und die rechtlichen Fragen hinter unternehmerischem Wachstum.',
      path1Label:'WENN VIEL AUF DEM SPIEL STEHT', path1Title:'Streitigkeiten & Risiken',
      path1Copy:'Wirtschaftliche Streitigkeiten, unterschiedliche Interessen und ein durchdachter Umgang mit Konflikten.',
      path2Label:'F\u00dcR DIE N\u00c4CHSTE GENERATION', path2Title:'Privatmandanten & Nachfolge',
      path2Copy:'Privates Verm\u00f6gen, Familienunternehmen und die Planung f\u00fcr die n\u00e4chste Generation.',
      pathLink:'Rechtsgebiet entdecken', demoNote:'Fiktive Kanzlei / beispielhafte Rechtsgebiete. Diese Website bietet keine Rechtsberatung und nimmt keine Mandate an.',
      floorSummary0:'Unternehmensstrukturen, Transaktionen und Unternehmensf\u00fchrung.',
      floorSummary1:'Wirtschaftliche Streitigkeiten, Verhandlungen und Konfliktl\u00f6sung.',
      floorSummary2:'Privates Verm\u00f6gen, Familienunternehmen und Nachfolgeplanung.'
    }
  };

  // Translate only Page 2. The original Page 1 language switch stays intact.
  const oldPairs = [
    ['02 / OUR FIRM','02 / UNSERE KANZLEI'], ['Meet The Firm','Die Kanzlei kennenlernen'],
    ['Explore 12 Floors','12 Etagen entdecken'], ['01 / WHO WE ARE','01 / WER WIR SIND'],
    ['Different expertise. One direction.','Unterschiedliche Expertise. Ein gemeinsamer Weg.'],
    ['02 / OUR PRINCIPLES','02 / UNSERE GRUNDS\u00c4TZE'],
    ['How we approach the work.','Wie wir an Aufgaben herangehen.'],
    ['Clarity','Klarheit'], ['Discretion','Diskretion'], ['Perspective','Perspektive'],
    ['03 / THE BUILDING','03 / DAS GEB\u00c4UDE'],
    ['Twelve floors. Twelve perspectives.','Zw\u00f6lf Etagen. Zw\u00f6lf Perspektiven.'],
    ['Corporate & M&A','Gesellschaftsrecht & M&A'], ['Litigation','Prozessf\u00fchrung'], ['Tax','Steuerrecht'],
    ['Employment','Arbeitsrecht'], ['Real Estate','Immobilienrecht'], ['Banking & Finance','Bank- & Finanzrecht'],
    ['Intellectual Property','Geistiges Eigentum'], ['Technology & Data','Technologie & Daten'],
    ['Competition','Kartellrecht'], ['Private Clients','Privatmandanten'], ['Cross-Border','Internationale Mandate'],
    ['Strategic Counsel','Strategische Beratung'], ['Discover The Floors','Etagen entdecken'],
    ['Explore Kronberg Legal floor by floor.','Entdecken Sie Kronberg Legal Etage f\u00fcr Etage.']
  ];
  const replacements = new Map(oldPairs.map(([en,de]) => [en.toLowerCase(),[en,de]]));
  root.querySelectorAll('.firm-eyebrow, .eyebrow, .firm-actions a, .firm-label, .firm-heading h2, .firm-card h3, .firm-floor-title, .firm-cta h2, .firm-cta a')
    .forEach(el => {
      const key = el.textContent.replace(/\s+/g,' ').trim().toLowerCase();
      const pair = replacements.get(key);
      if (pair) { el.dataset.klEn = pair[0]; el.dataset.klDe = pair[1]; }
    });
  const paragraphs = [
    ['.firm-text','Kronberg Legal is a fictional international law firm based in Munich. Our twelve-floor concept brings specialist legal teams together around a shared standard of clarity, discretion and strategic thinking.','Kronberg Legal ist eine fiktive internationale Kanzlei mit Sitz in M\u00fcnchen. Unser Zw\u00f6lf-Etagen-Konzept verbindet spezialisierte Rechtsteams durch einen gemeinsamen Anspruch an Klarheit, Diskretion und strategisches Denken.'],
    ['.firm-section-copy','Our concept is built around specialist teams working together instead of in isolation. Each floor represents a defined legal discipline, while the firm remains connected through a shared approach to client service and strategy.','Unser Konzept setzt auf Fachteams, die gemeinsam statt isoliert arbeiten. Jede Etage steht f\u00fcr ein Rechtsgebiet. Ein gemeinsamer Ansatz f\u00fcr Mandantenservice und Strategie verbindet die Kanzlei.']
  ];
  for(const [selector,en,de] of paragraphs){const el=root.querySelector(selector);if(el){el.dataset.klEn=en;el.dataset.klDe=de;}}
  const cardCopy = [
    ['Complex legal questions should lead to understandable choices, clear priorities and a practical next step.','Komplexe Rechtsfragen sollten zu verst\u00e4ndlichen Optionen, klaren Priorit\u00e4ten und einem praktikablen n\u00e4chsten Schritt f\u00fchren.'],
    ['Sensitive matters require careful communication, professional restraint and confidence in every interaction.','Sensible Angelegenheiten erfordern sorgf\u00e4ltige Kommunikation, professionelle Zur\u00fcckhaltung und Vertrauen in jeder Interaktion.'],
    ['Legal advice works best when business, personal and strategic context are considered together.','Rechtliche Beratung wirkt am besten, wenn wirtschaftliche, pers\u00f6nliche und strategische Zusammenh\u00e4nge gemeinsam betrachtet werden.']
  ];
  root.querySelectorAll('.firm-card p').forEach((el,i)=>{if(cardCopy[i]){el.dataset.klEn=cardCopy[i][0];el.dataset.klDe=cardCopy[i][1];}});
  const floorIntro = root.querySelectorAll('.firm-section-copy')[1];
  if(floorIntro){floorIntro.dataset.klEn='A preview of our twelve specialist areas. Detailed profiles and verified contact information will be added as this demonstration develops.';floorIntro.dataset.klDe='Eine Vorschau unserer zw\u00f6lf Fachgebiete. Ausf\u00fchrliche Profile und verifizierte Kontaktdaten werden bei der Weiterentwicklung dieser Demonstration erg\u00e4nzt.';}
  const ctaCopy = root.querySelector('.firm-cta p');
  if(ctaCopy){ctaCopy.dataset.klEn='Find the practice area closest to your interests. Individual team profiles and contact details are not yet available in this demonstration.';ctaCopy.dataset.klDe='Finden Sie das Rechtsgebiet, das Ihrem Anliegen am n\u00e4chsten kommt. Einzelne Teamprofile und Kontaktdaten sind in dieser Demonstration noch nicht verf\u00fcgbar.';}

  function translate(){
    const language = document.documentElement.lang === 'de' ? 'de' : 'en';
    root.querySelectorAll('[data-kl-text]').forEach(el => { const value=text[language][el.dataset.klText]; if(value) el.textContent=value; });
    root.querySelectorAll('[data-kl-en]').forEach(el => { el.textContent = language === 'de' ? el.dataset.klDe : el.dataset.klEn; });
    const title=root.querySelector('.firm-title');
    if(title) title.innerHTML=language==='de' ? 'Gebaut auf <span>Klarheit.</span><br>Mit Blick auf das Ganze.' : 'Built for <span>clarity.</span><br>Designed for perspective.';
    pathways.querySelector('nav').setAttribute('aria-label', language === 'de' ? 'Rechtsgebiete nach Anliegen' : 'Practice areas by client need');
  }
  translate();
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
