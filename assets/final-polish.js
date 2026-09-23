/* Kronberg Legal — final site polish. */
(function(){
  "use strict";
  const path=location.pathname;
  const isHome=/\/(?:index\.html)?$/i.test(path);
  const isFirm=/\/our-firm\.html$/i.test(path);

  function L(en,de){return document.documentElement.lang==="de"?de:en;}

  function homeFooter(){
    if(!isHome)return;
    document.getElementById("kl-home-final")?.remove();
    const section=document.createElement("section");
    section.id="kl-home-final";
    section.className="kl-home-final kl-site";
    section.innerHTML=`
      <div class="kl-shell kl-home-final-grid">
        <div class="kl-home-final-brand">
          <a class="kl-brand" href="index.html">KRONBERG <span>LEGAL</span></a>
          <p>${L("A fictional Munich law-firm concept built around twelve connected practice floors, clear communication and an international perspective.","Ein fiktives Münchner Kanzleikonzept mit zwölf verbundenen Fachetagen, klarer Kommunikation und internationaler Perspektive.")}</p>
          <p class="kl-home-final-tag">${L("Perspectives. Solutions. Lasting value.","Perspektiven. Lösungen. Nachhaltiger Wert.")}</p>
        </div>
        <div>
          <p class="kl-kicker">${L("CONTACT","KONTAKT")}</p>
          <p><strong>München, Germany</strong><br>contact@kronberg.example<br>DE / EN</p>
          <a href="contact.html">${L("Contact page","Kontaktseite")} ↗</a>
        </div>
        <div>
          <p class="kl-kicker">${L("EXPLORE","ENTDECKEN")}</p>
          <a href="our-firm.html">${L("Our Firm","Unsere Kanzlei")}</a>
          <a href="floors.html">${L("12 Floors","12 Etagen")}</a>
          <a href="lawyers.html">${L("Our People","Unser Team")}</a>
          <a href="insights.html">${L("Insights","Impulse")}</a>
          <a href="client-guide.html">${L("Client Guide","Mandantenleitfaden")}</a>
        </div>
        <div>
          <p class="kl-kicker">${L("LEGAL & SOCIAL","RECHT & SOCIAL")}</p>
          <a href="legal.html#operator">${L("Legal Notice","Impressum")}</a>
          <a href="legal.html#privacy">${L("Privacy","Datenschutz")}</a>
          <a href="legal.html#accessibility">${L("Accessibility","Barrierearmut")}</a>
          <div class="kl-home-socials" aria-label="${L("Social channels","Social-Media-Kanäle")}">
            <button type="button" data-social="LinkedIn" aria-label="LinkedIn">in</button>
            <button type="button" data-social="X" aria-label="X">𝕏</button>
            <button type="button" data-social="Instagram" aria-label="Instagram">◎</button>
            <button type="button" data-social="YouTube" aria-label="YouTube">▶</button>
            <button type="button" data-social="Facebook" aria-label="Facebook">f</button>
          </div>
        </div>
      </div>
      <div class="kl-shell kl-home-final-bottom">
        <span>© 2026 KRONBERG LEGAL. ${L("ALL RIGHTS RESERVED.","ALLE RECHTE VORBEHALTEN.")}</span>
        <span>${L("Fictional website concept · AI-generated portraits · Example contact details","Fiktives Website-Konzept · KI-generierte Porträts · Beispiel-Kontaktdaten")}</span>
      </div>`;
    const reviews=document.getElementById("kl-client-perspectives");
    if(reviews)reviews.insertAdjacentElement("afterend",section);
    else document.body.append(section);
  }

  function firmEnhancements(){
    if(!isFirm)return;
    const who=document.getElementById("who-we-are");
    if(who){
      const copy=who.querySelector(".section-copy");
      if(copy){
        copy.innerHTML=L(
          "Kronberg Legal is organised around specialist practice floors that work as one connected firm. Each team owns a defined area of expertise, while matters that cross disciplines are coordinated through a shared client strategy.<br><br>Our fictional Munich-based model is designed around direct communication, disciplined project management and advice that connects legal detail with the commercial or personal decision behind it.",
          "Kronberg Legal ist um spezialisierte Fachetagen organisiert, die als eine verbundene Kanzlei zusammenarbeiten. Jedes Team verantwortet einen klar definierten Bereich; fachübergreifende Mandate werden über eine gemeinsame Mandatsstrategie koordiniert.<br><br>Unser fiktives Münchner Modell setzt auf direkte Kommunikation, diszipliniertes Projektmanagement und Beratung, die rechtliche Details mit der wirtschaftlichen oder persönlichen Entscheidung dahinter verbindet."
        );
      }
      if(!document.getElementById("kl-leadership")){
        const leadership=document.createElement("section");
        leadership.id="kl-leadership";
        leadership.className="kl-leadership-section";
        leadership.innerHTML=`
          <div class="kl-leadership-heading">
            <div class="section-label">02 / ${L("LEADERSHIP","LEITUNG")}</div>
            <div><h2>${L("Leadership with perspective.","Führung mit Perspektive.")}</h2><p>${L("Two fictional leadership profiles show how strategy, client care and day-to-day management connect across the firm.","Zwei fiktive Führungsprofile zeigen, wie Strategie, Mandantenbetreuung und tägliche Kanzleiführung verbunden werden.")}</p></div>
          </div>
          <div class="kl-leadership-grid">
            <article class="kl-leader">
              <img src="assets/leadership-ceo.webp" alt="${L("AI-generated fictional portrait of Alexander Kronberg","KI-generiertes fiktives Porträt von Alexander Kronberg")}">
              <div class="kl-leader-copy"><p class="kl-kicker">${L("FOUNDER & CEO · FICTIONAL PROFILE","GRÜNDER & CEO · FIKTIVES PROFIL")}</p><h3>Alexander Kronberg</h3><p>${L("Alexander represents the strategic direction of the firm concept, connecting long-term growth, cross-border coordination and the quality of the client experience.","Alexander steht im Kanzleikonzept für die strategische Ausrichtung und verbindet langfristiges Wachstum, internationale Koordination und die Qualität des Mandantenerlebnisses.")}</p><dl><div><dt>${L("Focus","Fokus")}</dt><dd>${L("Strategy · Corporate growth · Cross-border coordination","Strategie · Unternehmenswachstum · Internationale Koordination")}</dd></div><div><dt>${L("Languages","Sprachen")}</dt><dd>Deutsch / English</dd></div></dl></div>
            </article>
            <article class="kl-leader">
              <img src="assets/leadership-manager.webp" alt="${L("AI-generated fictional portrait of Clara Winter","KI-generiertes fiktives Porträt von Clara Winter")}">
              <div class="kl-leader-copy"><p class="kl-kicker">${L("MANAGING PARTNER · FICTIONAL PROFILE","MANAGING PARTNER · FIKTIVES PROFIL")}</p><h3>Clara Winter</h3><p>${L("Clara leads the operating model of the fictional firm, with responsibility for connected teams, client communication and consistent delivery across the twelve-floor structure.","Clara leitet das Betriebsmodell der fiktiven Kanzlei und verantwortet vernetzte Teams, Mandantenkommunikation und eine konsistente Zusammenarbeit über die zwölf Etagen hinweg.")}</p><dl><div><dt>${L("Focus","Fokus")}</dt><dd>${L("Corporate structures · Finance · Client delivery","Unternehmensstrukturen · Finanzierung · Mandatsführung")}</dd></div><div><dt>${L("Languages","Sprachen")}</dt><dd>Deutsch / English</dd></div></dl></div>
            </article>
          </div>`;
        who.insertAdjacentElement("afterend",leadership);
      }
    }
    const principle=[...document.querySelectorAll(".section")].find(s=>/OUR PRINCIPLES|UNSERE GRUNDSÄTZE/i.test(s.textContent));
    const principleLabel=principle?.querySelector(".section-label");
    if(principleLabel)principleLabel.textContent="03 / "+L("OUR PRINCIPLES","UNSERE GRUNDSÄTZE");
    const building=document.getElementById("floors");
    const buildingLabel=building?.querySelector(".section-label");
    if(buildingLabel)buildingLabel.textContent="04 / "+L("THE BUILDING","DAS GEBÄUDE");
    if(principle&&!principle.querySelector(".kl-principle-intro")){
      const h=principle.querySelector(".section-heading");
      const p=document.createElement("p");
      p.className="kl-principle-intro";
      p.textContent=L(
        "Our principles are practical working standards: explain complexity clearly, handle sensitive information with restraint, and consider the wider business or personal context before recommending the next step.",
        "Unsere Grundsätze sind praktische Arbeitsstandards: Komplexität verständlich erklären, sensible Informationen mit Zurückhaltung behandeln und den wirtschaftlichen oder persönlichen Kontext einbeziehen, bevor der nächste Schritt empfohlen wird."
      );
      h?.insertAdjacentElement("afterend",p);
    }
  }

  function reveal(){
    const items=[...document.querySelectorAll(".kl-section,.kl-card,.kl-person,.kl-floor-card,.section,.card,.floor,.kl-leader")];
    if(!("IntersectionObserver" in window)){items.forEach(x=>x.classList.add("kl-in-view"));return;}
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("kl-in-view");io.unobserve(e.target);}}),{threshold:.08,rootMargin:"0px 0px -30px"});
    items.forEach(x=>{x.classList.add("kl-reveal");io.observe(x);});
  }

  function run(){
    document.getElementById("kl-global-links")?.remove();
    firmEnhancements();
    homeFooter();
    reveal();
  }

  window.addEventListener("load",()=>{run();setTimeout(run,180);});
  new MutationObserver(()=>{if(isHome&&!document.getElementById("kl-home-final"))homeFooter();}).observe(document.body,{childList:true,subtree:true});
})();