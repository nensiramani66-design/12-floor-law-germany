"""Browser acceptance checks against a local copy; no external enquiries are sent."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
import threading, json, hashlib, re
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'review-results';OUT.mkdir(exist_ok=True)
handler=partial(SimpleHTTPRequestHandler,directory=str(ROOT))
server=ThreadingHTTPServer(('127.0.0.1',8765),handler)
threading.Thread(target=server.serve_forever,daemon=True).start()
BASE='http://127.0.0.1:8765/'
errors=[];checks=[]

def record(ok,label,detail=''):
    checks.append({'passed':bool(ok),'check':label,'detail':detail})

# Verify the original homepage source survives verbatim after removing only resource tags added by the build.
for name,expected in [('index.html','d2d2c34283599a7b091d754825da1da0d2141011'),('our-firm.html','375c41ae677cd37bce237b760338ea05016ec949')]:
    content=(ROOT/name).read_text()
    for tag in ['<link rel="stylesheet" href="assets/site.css?v=20260923">\n']+[f'<script defer src="assets/{x}?v=20260923"></script>\n' for x in ['site-data.js','site-content.js','site.js']]:
        content=content.replace(tag,'')
    b=content.encode();sha=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\x00'+b).hexdigest()
    record(sha==expected,'Approved source preserved: '+name,sha)

with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True)
    routes=['floors.html','floors.html?floor=1','lawyers.html','lawyers.html?person=clara-winter','client-guide.html','insights.html','legal.html','contact.html']
    for width,height in [(1440,900),(390,844),(320,740)]:
        page=browser.new_page(viewport={'width':width,'height':height})
        page.on('pageerror',lambda err:errors.append(str(err)))
        for route in routes:
            page.goto(BASE+route,wait_until='networkidle')
            page.wait_for_timeout(120)
            size=page.evaluate('({w:innerWidth,scroll:document.documentElement.scrollWidth})')
            record(size['scroll']<=size['w']+1,f'No horizontal overflow {width}: {route}',str(size))
            record(len(page.locator('#kl-main').inner_text())>150,f'Rendered content {width}: {route}')
            if width in [1440,390] and route in ['floors.html','floors.html?floor=1','lawyers.html','contact.html']:
                name=route.split('.')[0]+('-detail' if '?' in route else '')
                page.screenshot(path=str(OUT/f'{name}-{width}.png'),full_page=False)
        page.close()
    page=browser.new_page(viewport={'width':1440,'height':900})
    page.on('pageerror',lambda err:errors.append(str(err)))
    page.goto(BASE+'floors.html',wait_until='networkidle')
    record(page.locator('[data-floor-card]').count()==12,'Twelve distinct floor tiles')
    page.locator('[data-floor-card="1"] .kl-floor-select').click()
    page.wait_for_timeout(550)
    record(page.locator('[data-floor-card="1"] .kl-floor-select').get_attribute('aria-expanded')=='true','Floor expands on selection')
    page.locator('[data-floor-card="1"]').screenshot(path=str(OUT/'floor-selected.png'))
    page.locator('[data-floor-card="1"] .kl-btn').click()
    page.wait_for_timeout(650)
    record('floor=1' in page.url and 'Corporate' in page.locator('main h1').inner_text(),'Selected floor opens detailed route')
    record(page.locator('.kl-contact-card .kl-portrait').count()==1,'Detailed floor has AI portrait/contact card')
    page.go_back();page.wait_for_timeout(600)
    record(page.locator('[data-floor-card="1"]').count()==1,'Browser back restores floor directory')
    for n in range(13):
        page.goto(BASE+f'floors.html?floor={n}&lang=de',wait_until='domcontentloaded')
        record(page.locator('main h1').count()==1,f'Ground/floor direct German view {n}')
    page.goto(BASE+'floors.html?floor=99',wait_until='domcontentloaded')
    record('404' in page.locator('main').inner_text(),'Invalid floor has useful fallback')
    page.goto(BASE+'client-guide.html',wait_until='networkidle')
    page.locator('[data-language="de"]').click()
    record('Wie bereite' in page.locator('.kl-faq summary').first.inner_text(),'FAQ updates when language changes')
    page.goto(BASE+'insights.html',wait_until='networkidle')
    page.locator('[data-language="de"]').click()
    record('Vor Ihrem' in page.locator('.kl-card h2').first.inner_text(),'Insights update when language changes')
    page.goto(BASE+'floors.html',wait_until='networkidle')
    page.locator('[data-search-open]').click()
    page.locator('#kl-site-search').fill('Clara')
    record(page.locator('#kl-search-results a').count()==1,'Website search finds fictional team member')
    page.keyboard.press('Escape')
    page.goto(BASE+'contact.html?floor=1',wait_until='networkidle')
    page.locator('[name="exampleName"]').fill('Alex Example')
    page.locator('[name="exampleEmail"]').fill('alex@example.com')
    page.locator('[name="exampleMessage"]').fill('<b>Demo only</b>')
    requests=[];page.on('request',lambda r:requests.append(r.method))
    page.locator('button[type="submit"]').click()
    record('Nothing was sent' in page.locator('#kl-form-result').inner_text(),'Contact form labels unsent local preview')
    record(page.locator('#kl-form-result b').count()==0,'Typed markup remains plain text')
    record('POST' not in requests,'Contact preview sends no POST')
    page.locator('[data-social="LinkedIn"]').first.click()
    record(page.locator('#kl-message-dialog').is_visible(),'Social icon explains unconnected status')
    page.keyboard.press('Escape')
    for name in ['index.html','our-firm.html']:
        page.goto(BASE+name,wait_until='networkidle');page.wait_for_timeout(2500)
        record(page.locator('#kl-global-links a').count()==6,'New navigation attached: '+name)
        if name=='index.html':
            record(page.locator('#floorButton').get_attribute('href').startswith('floors.html'),'Home floor button reaches new directory')
            page.evaluate('scrollTo(0,innerHeight)');page.wait_for_timeout(250)
            record(page.locator('.kl-approach').count()==1,'Approved Our Firm panel retained')
        page.screenshot(path=str(OUT/(name.replace('.html','')+'-retained.png')))
    reduced=browser.new_context(reduced_motion='reduce',viewport={'width':390,'height':844})
    rp=reduced.new_page();rp.goto(BASE+'floors.html',wait_until='networkidle')
    rp.locator('[data-floor-card="2"] .kl-floor-select').focus();rp.keyboard.press('Enter')
    record(rp.locator('[data-floor-card="2"] .kl-floor-select').get_attribute('aria-expanded')=='true','Keyboard selection and reduced motion work')
    reduced.close();page.close();browser.close()
server.shutdown()
record(not errors,'No uncaught browser JavaScript errors',str(errors))
report={'checks':checks,'errors':errors,'passed':sum(x['passed'] for x in checks),'total':len(checks)}
(OUT/'report.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
assert all(x['passed'] for x in checks), 'Review report contains failed checks'
