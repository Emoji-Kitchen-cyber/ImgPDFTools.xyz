const siteData = {
  title: "ImgPDFTools — Free Online Image & PDF Toolkit",
  heroTitle: "Every Image & PDF tool",
  heroSpan: "you'll ever need",
  heroDesc: "Process images and PDFs directly in your browser. No servers, no sign-up, no waiting — just instant results.",
  copyright: "© 2026 ImgPDFTools — All Rights Reserved",
  searchPlaceholder: "Search tools…",
  noResultsText: "No results found.",
  filters: [
    {id:'all',text:'All'},{id:'optimize',text:'Optimize'},{id:'create',text:'Create'},
    {id:'edit',text:'Edit'},{id:'convert',text:'Convert'},{id:'security',text:'Security'},
    {id:'doc',text:'PDF & Docs'},{id:'utility',text:'Utilities'}
  ],
  sidebarTitles: {image:"Image Tools", doc:"PDF & Document Tools", utility:"Dev & Utility Tools", info:"Info & Pages"},
  seo: {
    mainH2: "Free Online Image & PDF Tools — Right in Your Browser",
    intro: "ImgPDFTools is a collection of 25+ free, privacy-first tools to compress, resize, convert, and edit images, plus a full set of PDF utilities like merge, split, compress, and annotate. Everything runs entirely in your browser — your files are never uploaded to a server, so your work stays private and fast.",
    cat1: "Image Tools",
    cat2: "PDF & Document Tools",
    cat3: "Developer & Utility Tools",
    whyH2: "Why use ImgPDFTools?",
    whyP: "<strong>100% private:</strong> Files are processed on your device, never uploaded. <strong>No sign-up:</strong> Open a tool and start instantly. <strong>Fast &amp; offline-ready:</strong> Most tools keep working even without an internet connection.",
    faqH2: "Frequently Asked Questions",
    q1: "Are these tools really free?",
    a1: "Yes — every tool is completely free with no account, no watermarks, and no limits.",
    q2: "Are my files uploaded anywhere?",
    a2: "No. All processing happens locally in your browser, so your images and PDFs never leave your device.",
    q3: "Do I need to install anything?",
    a3: "No installation required. The tools run in any modern browser, and many work offline as well."
  },
  toolsRegistry: [
    {href:"./index.html",icon:"fa-house",text:"Home",section:"home",isUtilityCard:false},
    {href:"./compress.html",icon:"fa-box",text:"Compress Image",section:"image",cat:"optimize",emoji:"📦",title:"Compress Image",desc:"Compress JPG, PNG, and WEBP while saving space.",isUtilityCard:true},
    {href:"./resize.html",icon:"fa-up-right-and-down-left-from-center",text:"Resize Image",section:"image",cat:"edit",emoji:"📐",title:"Resize Image",desc:"Define dimensions by percent or pixel.",isUtilityCard:true},
    {href:"./photo-editor.html",icon:"fa-wand-magic-sparkles",text:"Photo Editor",section:"image",cat:"edit create",emoji:"✨",title:"Photo Editor",desc:"Edit photos with filters, brightness, contrast.",isUtilityCard:true},
    {href:"./convert.html",icon:"fa-rotate",text:"Convert Format",section:"image",cat:"convert",emoji:"🔄",title:"Convert Format",desc:"Transform images into JPG, PNG, or WEBP.",isUtilityCard:true},
    {href:"./watermark.html",icon:"fa-droplet",text:"Watermark Image",section:"image",cat:"security create",emoji:"💧",title:"Watermark Image",desc:"Stamp text or image over your photos.",isUtilityCard:true},
    {href:"./remove-bg.html",icon:"fa-eraser",text:"Remove Background",section:"image",cat:"edit create",emoji:"🫥",title:"Remove Background",desc:"AI-powered background remover.",isUtilityCard:true},
    {href:"./meme-generator.html",icon:"fa-face-laugh-squint",text:"Meme Generator",section:"image",cat:"create",emoji:"😂",title:"Meme Generator",desc:"Create memes with templates and text.",isUtilityCard:true},
    {href:"./crop.html",icon:"fa-scissors",text:"Advanced Crop",section:"image",cat:"edit",emoji:"✂️",title:"Advanced Crop",desc:"Precise cropping with aspect ratios.",isUtilityCard:true},
    {href:"./blur-face.html",icon:"fa-user-shield",text:"Blur Face",section:"image",cat:"security edit",emoji:"👤",title:"Blur Face",desc:"Auto-detect and blur faces for privacy.",isUtilityCard:true},
    {href:"./thumbnail-maker.html",icon:"fa-image",text:"Thumbnail Maker",section:"image",cat:"create",emoji:"🖼️",title:"Thumbnail Maker",desc:"Generate streaming & social media cards.",isUtilityCard:true},
    {href:"./screenshot-editor.html",icon:"fa-desktop",text:"Screenshot Editor",section:"image",cat:"edit create",emoji:"💻",title:"Screenshot Editor",desc:"Wrap captures in beautiful device frames.",isUtilityCard:true},
    {href:"./favicon-generator.html",icon:"fa-icons",text:"Favicon Generator",section:"image",cat:"create convert",emoji:"🎯",title:"Favicon Generator",desc:"Convert assets into multi-size .ico files.",isUtilityCard:true},
    {href:"./pdf-to-jpg.html",icon:"fa-file-pdf",text:"PDF to JPG",section:"doc",cat:"convert doc",emoji:"📄",title:"PDF to JPG",desc:"Extract pages from PDF as JPG images.",isUtilityCard:true},
    {href:"./jpg-to-pdf.html",icon:"fa-file-image",text:"JPG to PDF",section:"doc",cat:"convert doc",emoji:"🖼️",title:"JPG to PDF",desc:"Convert images into a single PDF document.",isUtilityCard:true},
    {href:"./split-pdf.html",icon:"fa-scissors",text:"Split PDF",section:"doc",cat:"doc",emoji:"✂️",title:"Split PDF",desc:"Extract page ranges or split every page.",isUtilityCard:true},
    {href:"./merge-pdf.html",icon:"fa-object-group",text:"Merge PDF",section:"doc",cat:"doc",emoji:"🗂️",title:"Merge PDF",desc:"Combine multiple PDFs into one file.",isUtilityCard:true},
    {href:"./compress-pdf.html",icon:"fa-compress",text:"Compress PDF",section:"doc",cat:"optimize doc",emoji:"📉",title:"Compress PDF",desc:"Shrink PDF file size dynamically.",isUtilityCard:true},
    {href:"./pdf-annotator.html",icon:"fa-pen-ruler",text:"PDF Annotator",section:"doc",cat:"edit doc",emoji:"🖊️",title:"PDF Annotator",desc:"Add text, draw, highlight, sign PDFs.",isUtilityCard:true},
    {href:"./qr-generator.html",icon:"fa-qrcode",text:"QR Generator",section:"utility",cat:"create utility",emoji:"📱",title:"QR Generator",desc:"Generate custom vector QR codes instantly.",isUtilityCard:true},
    {href:"./password-generator.html",icon:"fa-key",text:"Password Generator",section:"utility",cat:"security utility",emoji:"🔑",title:"Password Generator",desc:"Create cryptographically secure passwords.",isUtilityCard:true},
    {href:"./json-formatter.html",icon:"fa-code",text:"JSON Formatter",section:"utility",cat:"utility",emoji:"💻",title:"JSON Formatter",desc:"Parse, format, and validate JSON data.",isUtilityCard:true},
    {href:"./url-shortener.html",icon:"fa-link",text:"URL Shortener",section:"utility",cat:"utility",emoji:"🔗",title:"URL Shortener",desc:"Minify lengthy URLs into short links.",isUtilityCard:true},
    {href:"./color-picker.html",icon:"fa-eye-dropper",text:"Color Picker",section:"utility",cat:"utility edit",emoji:"🎨",title:"Color Picker",desc:"Advanced color inspection and HEX copying.",isUtilityCard:true},
    {href:"./palette-generator.html",icon:"fa-palette",text:"Palette Generator",section:"utility",cat:"utility create",emoji:"🌈",title:"Palette Generator",desc:"Algorithmic color scheme generator.",isUtilityCard:true},
    {href:"./unit-converter.html",icon:"fa-calculator",text:"Unit Converter",section:"utility",cat:"utility",emoji:"📏",title:"Unit Converter",desc:"High performance digital metrics calculator.",isUtilityCard:true},
    {href:"./dxf-dwg-converter.html",icon:"fa-compass-drafting",text:"CAD Converter",section:"utility",cat:"utility convert",emoji:"📐",title:"CAD Converter",desc:"DXF & DWG structural CAD utility.",isUtilityCard:true},
    {href:"./ocr.html",icon:"fa-file-lines",text:"OCR Scanner",section:"utility",cat:"utility",emoji:"📝",title:"OCR Scanner",desc:"Extract text from images with 100+ languages.",isUtilityCard:true},
    {href:"./about.html",icon:"fa-circle-info",text:"About Us",section:"info",isUtilityCard:false},
    {href:"./contact.html",icon:"fa-envelope",text:"Contact",section:"info",isUtilityCard:false},
    {href:"./faq.html",icon:"fa-circle-question",text:"FAQ",section:"info",isUtilityCard:false},
    {href:"./blog/",icon:"fa-pen-to-square",text:"Blog",section:"info",isUtilityCard:false},
    {href:"./privacy-policy.html",icon:"fa-shield-halved",text:"Privacy Policy",section:"info",isUtilityCard:false},
    {href:"./terms.html",icon:"fa-file-contract",text:"Terms of Service",section:"info",isUtilityCard:false},
    {href:"./disclaimer.html",icon:"fa-triangle-exclamation",text:"Disclaimer",section:"info",isUtilityCard:false}
  ],
  footer: [
    {href:"./about.html",text:"About"},{href:"./contact.html",text:"Contact"},
    {href:"./faq.html",text:"FAQ"},{href:"./blog/",text:"Blog"},
    {href:"./privacy-policy.html",text:"Privacy"},{href:"./terms.html",text:"Terms"},
    {href:"./disclaimer.html",text:"Disclaimer"}
  ]
};

function renderUI() {
  var data = siteData;
  document.getElementById('siteTitle').textContent = data.title;
  var heroTitleEl = document.getElementById('heroTitle');
  heroTitleEl.childNodes[0].nodeValue = data.heroTitle + ' ';
  document.getElementById('heroSpan').textContent = data.heroSpan;
  document.getElementById('heroDesc').textContent = data.heroDesc;
  document.getElementById('footerCopyright').textContent = data.copyright;
  document.getElementById('noResults').textContent = data.noResultsText;
  document.getElementById('toolSearch').placeholder = data.searchPlaceholder;

  var filterBox = document.getElementById('filterContainer');
  filterBox.innerHTML = '';
  var filterFrag = document.createDocumentFragment();
  data.filters.forEach(function(f, i) {
    var btn = document.createElement('button');
    btn.className = 'filter-pill' + (i === 0 ? ' active' : '');
    btn.textContent = f.text;
    btn.setAttribute('data-target', f.id);
    btn.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    btn.addEventListener('click', function() { filterCategory(f.id, this); });
    filterFrag.appendChild(btn);
  });
  filterBox.appendChild(filterFrag);

  var toolsGrid = document.getElementById('toolsList');
  toolsGrid.innerHTML = '';
  var toolsFrag = document.createDocumentFragment();
  data.toolsRegistry.filter(function(t) { return t.isUtilityCard; }).forEach(function(t) {
    var a = document.createElement('a');
    a.href = t.href;
    a.className = 'tool-link';
    a.setAttribute('data-category', t.cat || '');
    var card = document.createElement('div');
    card.className = 'tool-card';
    var iconWrap = document.createElement('div');
    iconWrap.className = 'tool-icon-wrapper';
    iconWrap.setAttribute('aria-hidden', 'true');
    iconWrap.textContent = t.emoji;
    var infoPane = document.createElement('div');
    infoPane.className = 'tool-info-pane';
    var h3 = document.createElement('h3');
    h3.textContent = t.title;
    var p = document.createElement('p');
    p.textContent = t.desc;
    infoPane.appendChild(h3);
    infoPane.appendChild(p);
    var arrow = document.createElement('span');
    arrow.className = 'tool-card-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    var arrowIcon = document.createElement('i');
    arrowIcon.className = 'fa-solid fa-arrow-up-right';
    arrow.appendChild(arrowIcon);
    card.appendChild(iconWrap);
    card.appendChild(infoPane);
    card.appendChild(arrow);
    a.appendChild(card);
    toolsFrag.appendChild(a);
  });
  toolsGrid.appendChild(toolsFrag);

  var footerBox = document.getElementById('footerLinks');
  footerBox.innerHTML = '';
  var footerFrag = document.createDocumentFragment();
  data.footer.forEach(function(item) {
    var a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.text;
    footerFrag.appendChild(a);
  });
  footerBox.appendChild(footerFrag);

  var sidebarBox = document.getElementById('sidebarLinks');
  sidebarBox.innerHTML = '';
  var sf = document.createDocumentFragment();
  function makeSidebarLink(t) {
    var a = document.createElement('a');
    a.href = t.href;
    var icon = document.createElement('i');
    icon.className = 'fa-solid ' + t.icon;
    icon.setAttribute('aria-hidden', 'true');
    a.appendChild(icon);
    a.appendChild(document.createTextNode(' ' + t.text));
    return a;
  }
  var homeLink = data.toolsRegistry.find(function(t) { return t.section === 'home'; });
  if (homeLink) sf.appendChild(makeSidebarLink(homeLink));
  ['image', 'doc', 'utility'].forEach(function(sec) {
    var title = document.createElement('div');
    title.className = 'menu-section-title';
    title.textContent = data.sidebarTitles[sec];
    sf.appendChild(title);
    data.toolsRegistry.filter(function(t) { return t.section === sec; }).forEach(function(t) {
      sf.appendChild(makeSidebarLink(t));
    });
  });
  var hr = document.createElement('div');
  hr.style.cssText = 'height:1px;background:var(--border2);margin:10px 0;';
  sf.appendChild(hr);
  var infoTitle = document.createElement('div');
  infoTitle.className = 'menu-section-title';
  infoTitle.textContent = data.sidebarTitles.info;
  sf.appendChild(infoTitle);
  data.toolsRegistry.filter(function(t) { return t.section === 'info'; }).forEach(function(t) {
    sf.appendChild(makeSidebarLink(t));
  });
  sidebarBox.appendChild(sf);

  renderSeoSection(data);
  evaluateLiveSearchFilters();
}

function renderSeoSection(data) {
  if (!data.seo) return;
  var s = data.seo;
  function set(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }
  function setHtml(id, val) { var el = document.getElementById(id); if (el) el.innerHTML = val; }
  set('seoH2Main', s.mainH2);
  set('seoIntro', s.intro);
  set('seoCat1', s.cat1);
  set('seoCat2', s.cat2);
  set('seoCat3', s.cat3);
  set('seoWhyH2', s.whyH2);
  setHtml('seoWhyP', s.whyP);
  set('seoFaqH2', s.faqH2);
  set('seoFaqQ1', s.q1); set('seoFaqA1', s.a1);
  set('seoFaqQ2', s.q2); set('seoFaqA2', s.a2);
  set('seoFaqQ3', s.q3); set('seoFaqA3', s.a3);
}

function evaluateLiveSearchFilters() {
  var query = (document.getElementById('toolSearch').value || '').toLowerCase().trim();
  var activePill = document.querySelector('.filter-pill.active');
  var targetCat = activePill ? activePill.getAttribute('data-target') : 'all';
  var count = 0;
  document.querySelectorAll('.tool-link').forEach(function(link) {
    var h3El = link.querySelector('h3');
    var pEl = link.querySelector('p');
    var h3Text = h3El ? h3El.textContent.toLowerCase() : '';
    var pText = pEl ? pEl.textContent.toLowerCase() : '';
    var cats = (link.getAttribute('data-category') || '').split(' ');
    var matchesSearch = !query || h3Text.indexOf(query) !== -1 || pText.indexOf(query) !== -1;
    var matchesCat = targetCat === 'all' || cats.indexOf(targetCat) !== -1;
    var show = matchesSearch && matchesCat;
    if (show) {
      link.classList.remove('hidden');
      count++;
    } else {
      link.classList.add('hidden');
    }
  });
  var noResults = document.getElementById('noResults');
  noResults.style.display = count === 0 ? 'block' : 'none';
}

function filterCategory(category, element) {
  document.querySelectorAll('.filter-pill').forEach(function(btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });
  element.classList.add('active');
  element.setAttribute('aria-pressed', 'true');
  evaluateLiveSearchFilters();
}

function toggleMenu(show) {
  document.getElementById('sideMenu').classList.toggle('open', show);
  document.getElementById('menuOverlay').classList.toggle('show', show);
  var trigger = document.getElementById('menuTrigger');
  if (trigger) trigger.setAttribute('aria-expanded', show ? 'true' : 'false');
  if (show) {
    var escHandler = function(e) {
      if (e.key === 'Escape') {
        toggleMenu(false);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }
}

document.addEventListener('keydown', function(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('toolSearch').focus();
  }
});

document.getElementById('toolSearch').addEventListener('input', evaluateLiveSearchFilters);

(function() {
  function isSafeUrl(u) {
    try {
      var p = new URL(u, window.location.origin);
      return p.protocol === 'http:' || p.protocol === 'https:';
    } catch(e) { return false; }
  }
  function showError(msg) {
    var box = document.createElement('div');
    box.style.cssText = 'text-align:center;padding:4rem;font-family:sans-serif';
    var h = document.createElement('h2');
    h.textContent = msg;
    var a = document.createElement('a');
    a.href = './index.html';
    a.textContent = 'Go Home';
    box.appendChild(h);
    box.appendChild(a);
    document.body.innerHTML = '';
    document.body.appendChild(box);
  }
  var hash = window.location.hash;
  if (hash.indexOf('#/s/') !== 0) return;
  var shortId = hash.replace('#/s/', '').split('?')[0];
  if (!shortId) { showError('URL Not Found'); return; }
  var stored = localStorage.getItem('redirect_' + shortId);
  if (!stored) { showError('URL Not Found'); return; }
  var entry;
  try { entry = JSON.parse(stored); } catch(e) { showError('URL Not Found'); return; }
  if (!entry || typeof entry.long !== 'string' || !isSafeUrl(entry.long)) {
    showError('Invalid Link');
    return;
  }
  if (entry.expiry && Date.now() > entry.expiry) { showError('Link Expired'); return; }
  entry.clicks = (entry.clicks || 0) + 1;
  try { localStorage.setItem('redirect_' + shortId, JSON.stringify(entry)); } catch(e) {}
  window.location.replace(entry.long);
})();

renderUI();