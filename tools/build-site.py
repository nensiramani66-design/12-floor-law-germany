"""Assemble new pages and add shared navigation without rewriting approved pages."""
from pathlib import Path
import base64
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
PAGES = {
    'floors': ('The Twelve Floors', 'Explore twelve legal practice floors and their fictional team profiles.'),
    'lawyers': ('Our People', 'Meet the fictional, AI-illustrated team behind the Kronberg Legal concept.'),
    'client-guide': ('Client Guide', 'Preparation checklists and questions for a first legal conversation.'),
    'insights': ('Insights', 'General orientation notes with primary legal sources.'),
    'legal': ('Legal & Privacy', 'Demonstration status, operator-information checklist and privacy details.'),
    'contact': ('Contact', 'Explore the local contact preview. No real enquiries are sent.')
}
for key, (title, description) in PAGES.items():
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="{description}">
<meta name="theme-color" content="#090b0b">
<title>{title} | Kronberg Legal</title>
<link rel="stylesheet" href="assets/site.css?v=20260923">
<script defer src="assets/site-data.js?v=20260923"></script>
<script defer src="assets/site-content.js?v=20260923"></script>
<script defer src="assets/site.js?v=20260923"></script>
</head>
<body class="kl-site" data-page="{key}">
<div id="kl-header-host"></div>
<main id="kl-main" tabindex="-1">
  <noscript><section class="kl-shell kl-section"><h1>{title}</h1><p>{description}</p><p>This interactive demonstration requires JavaScript. All profiles are fictional and no legal services are offered.</p><p><a href="index.html">Home</a> · <a href="our-firm.html">Our Firm</a></p></section></noscript>
</main>
<div id="kl-footer-host"></div>
<div id="kl-dialog-host"></div>
</body>
</html>
'''
    (ROOT / f'{key}.html').write_text(html, encoding='utf-8')

parts = sorted((ROOT / 'assets').glob('portraits-base64-*.txt'))
if parts:
    image = base64.b64decode(''.join(p.read_text().strip() for p in parts), validate=True)
    assert image[:4] == b'RIFF' and image[8:12] == b'WEBP', 'Invalid WebP asset'
    (ROOT / 'assets/portraits.webp').write_bytes(image)
    for p in parts:
        p.unlink()
assert (ROOT / 'assets/portraits.webp').exists(), 'AI portrait asset must exist before publishing'

# Existing HTML and script blocks are retained; only these resource references are appended.
css = '<link rel="stylesheet" href="assets/site.css?v=20260923">'
scripts = '\n'.join(f'<script defer src="assets/{name}?v=20260923"></script>' for name in ('site-data.js', 'site-content.js', 'site.js'))
for name in ('index.html', 'our-firm.html'):
    path = ROOT / name
    original = path.read_text(encoding='utf-8')
    updated = original
    if 'assets/site.css' not in updated:
        updated = updated.replace('</head>', css + '\n</head>', 1)
    if 'assets/site.js' not in updated:
        updated = updated.replace('</body>', scripts + '\n</body>', 1)
    path.write_text(updated, encoding='utf-8')

(ROOT / 'SITE-PLAN.md').write_text('''# Kronberg Legal: eight-page demonstration

1. Home: existing introduction and Justice scroll animation preserved.
2. Our Firm: existing editorial panel and client pathways preserved.
3. Twelve Floors: 12 selectable tiles, distinct hover/selected highlights, expandable previews and deep-linkable detail views. Ground-floor reception is additional, not a thirteenth legal practice.
4. Lawyers: six fictional profiles, AI portraits, filters and floor associations.
5. Client Guide: preparation checklist, downloadable text checklist and FAQs.
6. Insights: four general-orientation notes with primary-source links; not current-news claims.
7. Legal & Privacy: demo status, incomplete operator details, professional sources, actual privacy behaviour and accessibility approach.
8. Contact: example details, locally processed form preview and explicitly unconnected social icons.

## Files
- Shared CSS, JavaScript and content are under `assets/`.
- `site-data.js` supplies all floor and team information.
- `portraits.webp` is a self-hosted AI-generated collage used for six labelled fictional profiles.
- `tools/build-site.py` generates the six new HTML entry points and adds resource references to existing pages without rewriting their content.

## Scope and safeguards
- No real people, bar admissions, awards, office addresses, successful cases or professional qualifications are claimed.
- `.example` emails are non-operational. No real telephone number is supplied.
- No form endpoint, file upload, booking, analytics, third-party font requests or live social embeds.
- The contact preview does not send, save or accept instructions. Use invented details only.
- Operator/controller details, authentic credentials, verified contacts, legal/privacy review, accessibility audit and a secure intake backend are still required for a real launch.
- Applicable law is not exhaustively represented; legal references are general orientation, reviewed 23 September 2026.

## Acceptance checks
- Eight HTML entry points load.
- Each floor can be selected, expanded and opened with a direct URL.
- Related floors, profiles, contact preview, legal links and back navigation work.
- English and German content, keyboard focus, narrow layouts and reduced motion are checked.
- Approved Page 1 markup and original JavaScript are not rewritten.
''', encoding='utf-8')
print(json.dumps({'pages': list(PAGES), 'portrait_sha256': hashlib.sha256((ROOT/'assets/portraits.webp').read_bytes()).hexdigest()}))
