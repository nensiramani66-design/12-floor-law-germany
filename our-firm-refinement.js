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
.kl-firm-refined .kl-principle-extra{margin-top:18px;padding-top:16px;border-top:1px solid #ffffff12;color:#d2cabb!important;font-size:12px!important;line-height:1.6!important}

.kl-firm-refined .kl-who-detail{max-width:1200px;margin:-18px auto 0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;background:#ffffff18;border:1px solid #ffffff12}
.kl-firm-refined .kl-who-detail article{padding:24px;background:#0d0f0d}
.kl-firm-refined .kl-who-detail strong{display:block;color:#caa45f;font:normal 20px/1.2 Georgia,serif;margin-bottom:9px}
.kl-firm-refined .kl-who-detail p{margin:0;color:#bdb7ab;font-size:13px;line-height:1.65}
.kl-firm-refined .kl-leadership{max-width:1200px;margin:58px auto 0;padding-top:46px;border-top:1px solid #caa45f35}
.kl-firm-refined .kl-leadership-head{display:grid;grid-template-columns:190px 1fr;gap:40px;margin-bottom:28px}
.kl-firm-refined .kl-leadership-head h3{font:normal clamp(32px,3vw,45px)/1.08 Georgia,serif;color:#f3efe7}
.kl-firm-refined .kl-leadership-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.kl-firm-refined .kl-leader{display:grid;grid-template-columns:180px 1fr;min-height:230px;border:1px solid #ffffff18;background:linear-gradient(135deg,#11130f,#0b0d0b);overflow:hidden}
.kl-firm-refined .kl-leader img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) sepia(.18) contrast(1.08);border-right:1px solid #caa45f30}
.kl-firm-refined .kl-leader-copy{padding:26px}
.kl-firm-refined .kl-leader-role{color:#caa45f;font-size:9px;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
.kl-firm-refined .kl-leader h4{font:normal 26px/1.1 Georgia,serif;color:#f3efe7;margin:0 0 11px}
.kl-firm-refined .kl-leader p{color:#bdb7ab;font-size:13px;line-height:1.65;margin:0}
.kl-firm-refined .kl-leader-note{margin-top:11px;color:#807c74;font-size:10px;letter-spacing:.4px}

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
 .kl-firm-refined .kl-who-detail{grid-template-columns:1fr;margin-top:0}
 .kl-firm-refined .kl-leadership{margin-top:42px;padding-top:34px}
 .kl-firm-refined .kl-leadership-head{grid-template-columns:1fr;gap:10px}
 .kl-firm-refined .kl-leadership-grid{grid-template-columns:1fr}
 .kl-firm-refined .kl-leader{grid-template-columns:118px 1fr;min-height:190px}
 .kl-firm-refined .kl-leader-copy{padding:19px}
 .kl-firm-refined .kl-leader h4{font-size:22px}
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

  const whoSection = root.querySelector('#firm-who, #who-we-are');
  if (whoSection && !whoSection.querySelector('.kl-leadership')) {
    const whoDetail = document.createElement('div');
    whoDetail.className = 'kl-who-detail';
    whoDetail.innerHTML = `
      <article><strong data-kl-text="whoPoint1Title"></strong><p data-kl-text="whoPoint1Copy"></p></article>
      <article><strong data-kl-text="whoPoint2Title"></strong><p data-kl-text="whoPoint2Copy"></p></article>
      <article><strong data-kl-text="whoPoint3Title"></strong><p data-kl-text="whoPoint3Copy"></p></article>`;
    whoSection.append(whoDetail);

    const leadership = document.createElement('section');
    leadership.className = 'kl-leadership';
    leadership.innerHTML = `
      <div class="kl-leadership-head">
        <div class="kl-kicker" data-kl-text="leadershipKicker"></div>
        <h3 data-kl-text="leadershipTitle"></h3>
      </div>
      <div class="kl-leadership-grid">
        <article class="kl-leader">
          <div class="kl-leader-photo-frame"><img src="assets/ceo-portrait.webp" alt="Fictional CEO portrait"></div>
          <div class="kl-leader-copy">
            <div class="kl-leader-role" data-kl-text="ceoRole"></div>
            <h4>Dr. Alexander Kronberg</h4>
            <p data-kl-text="ceoCopy"></p>
            <p class="kl-leader-experience" data-kl-text="ceoExperience"></p>
            <div class="kl-leader-scope" data-kl-text="ceoScope"></div>
            <div class="kl-leader-note" data-kl-text="leadershipNote"></div>
          </div>
        </article>
        <article class="kl-leader">
          <div class="kl-leader-photo-frame"><img src="assets/leadership-manager.webp" alt="Fictional Managing Director portrait"></div>
          <div class="kl-leader-copy">
            <div class="kl-leader-role" data-kl-text="managerRole"></div>
            <h4>Leonie Falk</h4>
            <p data-kl-text="managerCopy"></p>
            <p class="kl-leader-experience" data-kl-text="managerExperience"></p>
            <div class="kl-leader-scope" data-kl-text="managerScope"></div>
            <div class="kl-leader-note" data-kl-text="leadershipNote"></div>
          </div>
        </article>
      </div>`;
    whoSection.insertAdjacentElement('afterend', leadership);
  }
  root.querySelectorAll('.firm-card').forEach((card, i) => {
    if (i > 2 || card.querySelector('.kl-principle-extra')) return;
    const p = document.createElement('p');
    p.className = 'kl-principle-extra';
    p.dataset.klText = 'principleExtra' + i;
    card.append(p);
  });

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
      floorSummary2:'Private assets, family businesses and succession planning.',
      whoPoint1Title:'Independent by design', whoPoint1Copy:'A Munich-based fictional firm concept built around direct responsibility, clear ownership of work and specialist collaboration.',
      whoPoint2Title:'Connected across floors', whoPoint2Copy:'The twelve-floor model makes cross-practice work visible: corporate, disputes, technology, private clients and other disciplines connect around the same matter.',
      whoPoint3Title:'International perspective', whoPoint3Copy:'German and English communication, cross-border coordination and a practical understanding of business context shape the client experience.',
      leadershipKicker:'02 / LEADERSHIP', leadershipTitle:'Responsibility at the centre of the firm.',
      ceoRole:'Founder & Chief Executive Officer', ceoCopy:'Shapes the firm-wide strategy and the way specialist teams work together on complex business and cross-border matters.',
      ceoExperience:'Experience focus: corporate strategy, M&A coordination, cross-border mandates, key-client governance and long-term firm development.',
      ceoScope:'Leadership scope: firm strategy · international growth · client relationships',
      managerRole:'Managing Director', managerCopy:'Leads the operating model of the firm, connecting people, technology, project management and client-service standards across all twelve practice floors.',
      managerExperience:'Experience focus: legal operations, team development, service design, technology implementation and multi-practice coordination.',
      managerScope:'Leadership scope: operations · talent · technology · client delivery',
      leadershipNote:'AI-generated / fictional leadership profile',
      principleExtra0:'In practice: concise options, visible priorities and advice that ends with a clear decision path.',
      principleExtra1:'In practice: agreed communication channels, careful handling of sensitive information and disciplined documentation.',
      principleExtra2:'In practice: the legal question is considered alongside commercial, personal and cross-border context.'
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
      floorSummary2:'Privates Verm\u00f6gen, Familienunternehmen und Nachfolgeplanung.',
      whoPoint1Title:'Bewusst unabhängig', whoPoint1Copy:'Ein fiktives Münchner Kanzleikonzept mit direkter Verantwortung, klarer Zuständigkeit und fachübergreifender Zusammenarbeit.',
      whoPoint2Title:'Über Etagen verbunden', whoPoint2Copy:'Das Zwölf-Etagen-Modell macht Zusammenarbeit sichtbar: Gesellschaftsrecht, Streitbeilegung, Technologie, Privatmandanten und weitere Fachgebiete greifen ineinander.',
      whoPoint3Title:'Internationale Perspektive', whoPoint3Copy:'Deutsch- und englischsprachige Kommunikation, grenzüberschreitende Koordination und wirtschaftlicher Kontext prägen das Mandantenerlebnis.',
      leadershipKicker:'02 / LEITUNG', leadershipTitle:'Verantwortung im Zentrum der Kanzlei.',
      ceoRole:'Gründer & Chief Executive Officer', ceoCopy:'Prägt die Gesamtstrategie der Kanzlei und die Zusammenarbeit spezialisierter Teams bei komplexen unternehmerischen und internationalen Mandaten.',
      ceoExperience:'Erfahrungsschwerpunkte: Unternehmensstrategie, M&A-Koordination, internationale Mandate, Key-Client-Governance und langfristige Kanzleientwicklung.',
      ceoScope:'Verantwortung: Kanzleistrategie · internationales Wachstum · Mandantenbeziehungen',
      managerRole:'Managing Director', managerCopy:'Leitet das Betriebsmodell der Kanzlei und verbindet Menschen, Technologie, Projektmanagement und Servicestandards über alle zwölf Fachetagen hinweg.',
      managerExperience:'Erfahrungsschwerpunkte: Legal Operations, Teamentwicklung, Servicedesign, Technologieimplementierung und fachübergreifende Koordination.',
      managerScope:'Verantwortung: Betrieb · Talente · Technologie · Mandatsführung',
      leadershipNote:'KI-generiert / fiktives Leitungsprofil',
      principleExtra0:'In der Praxis: klare Optionen, sichtbare Prioritäten und Beratung mit einem nachvollziehbaren Entscheidungsweg.',
      principleExtra1:'In der Praxis: abgestimmte Kommunikationswege, sorgfältiger Umgang mit sensiblen Informationen und disziplinierte Dokumentation.',
      principleExtra2:'In der Praxis: Die Rechtsfrage wird gemeinsam mit wirtschaftlichem, persönlichem und internationalem Kontext betrachtet.'
    }
  };

  // Translate only Page 2. The original Page 1 language switch stays intact.
  const oldPairs = [
    ['02 / OUR FIRM','02 / UNSERE KANZLEI'], ['Meet The Firm','Die Kanzlei kennenlernen'],
    ['Explore 12 Floors','12 Etagen entdecken'], ['01 / WHO WE ARE','01 / WER WIR SIND'],
    ['Different expertise. One direction.','Unterschiedliche Expertise. Ein gemeinsamer Weg.'],
    ['03 / OUR PRINCIPLES','03 / UNSERE GRUNDS\u00c4TZE'],
    ['How we approach the work.','Wie wir an Aufgaben herangehen.'],
    ['Clarity','Klarheit'], ['Discretion','Diskretion'], ['Perspective','Perspektive'],
    ['04 / THE BUILDING','04 / DAS GEB\u00c4UDE'],
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
