from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'assets/site.js'
s=p.read_text(encoding='utf-8')
s=s.replace('const C=window.KLContent?', 'let C=window.KLContent?', 1)
old="function render(){const main=document.getElementById('kl-main');if(!main)return;const ps=params();"
new="function render(){const main=document.getElementById('kl-main');if(!main)return;if(window.KLContent)C=window.KLContent({L,E,U,hero,button,section,source});const ps=params();"
if old in s:s=s.replace(old,new,1)
old="if(!legacy){render();if(location.hash){requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());}return;}"
new="if(!legacy){render();if(location.hash){requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView());}else if(page==='floors'&&params().has('select')){requestAnimationFrame(()=>document.getElementById('floor-box-'+Number(params().get('select')))?.scrollIntoView({block:'center'}));}return;}"
if old in s:s=s.replace(old,new,1)
marker=' // Run once, then refresh URL labels on language change without wrapping floor content again.'
addition=""" // Give the standalone Our Firm page the same navigation controls, without changing its content.
 if(!document.getElementById('sideMenu')&&!document.getElementById('kl-legacy-header')){
  const old=document.querySelector('body > header');
  if(old){const host=document.createElement('div');host.id='kl-legacy-header';host.className='kl-site';host.style.display='contents';host.innerHTML=header();old.replaceWith(host);const dialogs=document.createElement('div');dialogs.className='kl-site';dialogs.style.display='contents';dialogs.innerHTML=dialogShell();document.body.append(dialogs);new MutationObserver(()=>{host.innerHTML=header();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}
 }
"""
if addition.strip() not in s and marker in s:s=s.replace(marker,addition+marker,1)
p.write_text(s,encoding='utf-8')
p=root/'assets/site.css';s=p.read_text(encoding='utf-8');extra='\n/* Header isolation for the standalone approved Our Firm page. */\n.kl-site .kl-header{display:block;height:auto;width:100%;padding:0}\n'
if extra not in s:p.write_text(s+extra,encoding='utf-8')
print('Review refinements applied.')
