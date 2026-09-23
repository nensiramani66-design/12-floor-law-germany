/* Kronberg Legal — fictional client perspectives for the homepage. */
(function(){
  "use strict";
  var rows=[
    {name:"James Whitaker",country:"United Kingdom",photo:0,practice:"Corporate & M&A",quote:"The team kept a complex acquisition moving with clear updates, practical options and calm coordination. We reached signing on the timetable we had set."},
    {name:"Sophie Laurent",country:"France",photo:1,practice:"Dispute Resolution",quote:"What mattered most was the communication. We always knew the next step, and the dispute concluded through a negotiated settlement without losing sight of the commercial relationship."},
    {name:"Kenji Sato",country:"Japan",photo:2,practice:"Technology & Data",quote:"The advice translated technical detail into decisions our leadership team could use. The process was disciplined, responsive and easy to follow across time zones."},
    {name:"Claire Dubois",country:"Belgium",photo:3,practice:"Employment",quote:"A sensitive restructuring was handled with professionalism and empathy. The team gave us a clear process while keeping the people affected at the centre of the discussion."},
    {name:"Omar Al Mansoori",country:"United Arab Emirates",photo:4,practice:"Cross-Border",quote:"The cross-border coordination was the strongest part of the experience. Different workstreams were brought together into one concise view for our decision makers."},
    {name:"Priya Nair",country:"India",photo:5,practice:"Intellectual Property",quote:"Our licensing issue involved several moving parts. We appreciated the structured way the team separated legal risk, commercial priorities and the route to resolution."},
    {name:"Thomas Keller",country:"Germany",photo:6,practice:"Real Estate",quote:"The property review was thorough without becoming difficult to use. Key points were prioritised early, which made the negotiation much more efficient."},
    {name:"Amara Okafor",country:"Nigeria",photo:7,practice:"Banking & Finance",quote:"We valued the combination of detail and commercial judgement. Financing documents were explained clearly and our internal team knew exactly what required attention."},
    {name:"Carlos Mendes",country:"Brazil",photo:8,practice:"Competition",quote:"The team helped us rethink a distribution issue before it became a larger problem. The guidance was direct, practical and aligned with how our business actually operates."},
    {name:"Mei Lin Tan",country:"Singapore",photo:9,practice:"Private Clients",quote:"The succession discussion felt organised from the first meeting. Complex family and ownership questions were broken into manageable decisions with a clear sequence."}
  ];
  var deCountries={"United Kingdom":"Vereinigtes Königreich","France":"Frankreich","Japan":"Japan","Belgium":"Belgien","United Arab Emirates":"Vereinigte Arabische Emirate","India":"Indien","Germany":"Deutschland","Nigeria":"Nigeria","Brazil":"Brasilien","Singapore":"Singapur"};
  function lang(){return document.documentElement.lang==="de"?"de":"en";}
  function card(t){
    var article=document.createElement("article");
    article.className="kl-testimonial-card";
    var head=document.createElement("div");head.className="kl-testimonial-head";
    var photo=document.createElement("span");photo.className="kl-testimonial-photo";photo.setAttribute("aria-hidden","true");
    photo.style.setProperty("--tx",String((t.photo%5)*25)+"%");
    photo.style.setProperty("--ty",String(Math.floor(t.photo/5)*100)+"%");
    var who=document.createElement("div");
    var strong=document.createElement("strong");strong.textContent=t.name;
    var country=document.createElement("span");country.textContent=lang()==="de"?(deCountries[t.country]||t.country):t.country;
    who.append(strong,country);head.append(photo,who);
    var practice=document.createElement("p");practice.className="kl-testimonial-practice";practice.textContent=t.practice;
    var quote=document.createElement("blockquote");quote.textContent="“"+t.quote+"”";
    article.append(head,practice,quote);
    return article;
  }
  function render(){
    if(!/(\/|\/index\.html)$/i.test(location.pathname))return;
    var host=document.getElementById("our-firm")||document.body;
    var existing=document.getElementById("kl-client-perspectives");if(existing)existing.remove();
    var section=document.createElement("section");section.id="kl-client-perspectives";section.className="kl-testimonials kl-site";
    var title=document.createElement("div");title.className="kl-shell kl-testimonial-title";
    var kicker=document.createElement("p");kicker.className="kl-kicker";kicker.textContent=lang()==="de"?"MANDANTENPERSPEKTIVEN":"CLIENT PERSPECTIVES";
    var h2=document.createElement("h2");h2.textContent=lang()==="de"?"Betreuung, Klarheit und Ergebnisse.":"Care, clarity and outcomes.";
    var note=document.createElement("p");note.textContent=lang()==="de"?"Fiktive Testimonials für dieses Website-Konzept. Sie veranschaulichen das Mandantenerlebnis und sind keine echten Mandantenaussagen oder Fallergebnisse.":"Fictional testimonials created for this website concept. They illustrate the client experience and are not real client claims or case results.";
    title.append(kicker,h2,note);
    var win=document.createElement("div");win.className="kl-testimonial-window";win.setAttribute("aria-label",lang()==="de"?"Fiktive Mandantenperspektiven":"Fictional client perspectives");
    var track=document.createElement("div");track.className="kl-testimonial-track";
    rows.concat(rows).forEach(function(t){track.append(card(t));});
    win.append(track);section.append(title,win);host.append(section);
  }
  window.addEventListener("load",render);
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
})();