'use strict';

const assets = number => `assets/productos/${number}.png`;
const CLP = number => Number.isFinite(number) ? `$${new Intl.NumberFormat('es-CL').format(number)}` : 'A cotizar';
const pricesAdhesivos = {
  '3×3 cm': {105:3000, 140:4000, 175:5000, 210:6000, 245:7000, 350:8500},
  '4×4 cm': {72:3000, 96:4000, 120:5000, 144:6000, 168:7000, 240:8500},
  '5×5 cm': {45:3000, 60:4000, 75:5000, 90:6000, 105:7000, 150:8500},
  '6×6 cm': {36:3000, 48:4000, 60:5000, 72:6000, 84:7000, 120:8500}
};
const pricesChapitas58 = {
  'Alfiler': {1:1000,12:7800,25:13750,50:22500,100:35000},
  'Llavero espejo': {1:1200,12:10200,25:18750,50:32500,100:45000},
  'Imán': {12:12000,25:21250,50:37500,100:65000},
  'Llavero destapador': {12:12000,25:21250,50:37500,100:65000}
};

const products = [
  {id:'adhesivos',name:'Adhesivos personalizados',group:'ADHESIVOS Y ETIQUETAS',image:10,from:3000,short:'Etiquetas y stickers troquelados en pliegos A4, listos para despegar y pegar.',description:'Adhesivos personalizados para packaging y marcas. Cada promoción admite un solo diseño. Se entregan troquelados en pliegos A4, listos para despegar y pegar. Papel fotográfico brillante o kraft mate. Un diseño por promoción; cliente envía diseño. Troquelados en pliegos A4.',mode:'adhesivos'},
  {id:'tarjetas',name:'Tarjetas de presentación',group:'TARJETAS E IMPRESOS',image:9,from:3200,short:'Tarjetas de 9 × 5,5 cm aprox., con tres tipos de papel, impresión en una o ambas caras.',description:'Tarjetas de presentación de aproximadamente 9 × 5,5 cm, con opciones de impresión a una o dos caras. Disponibles en opalina lisa, opalina texturada y papel fotográfico. Personalizadas para emprendimientos y marcas.',mode:'tarjetas'},
  {id:'calendarios',name:'Mini calendarios 2027',group:'CALENDARIOS',image:11,from:7200,short:'Mini calendarios imantados año 2027, laminados y personalizados. Venta solo por docenas.',description:'Mini calendarios imantados para el año 2027, con imagen laminada y un imán completo en la parte trasera. Personalizados para empresas, eventos y recuerdos. Venta solo por docenas.',mode:'calendarios'},
  {id:'chapitas-58',name:'Chapitas 58 mm',group:'CHAPITAS',image:2,from:7800,short:'Chapitas personalizadas de 58 mm, elige entre alfiler, llavero espejo, imán y llavero destapador.',description:'Chapitas personalizadas de 58 mm, elige entre alfiler, llavero espejo, imán y llavero destapador. Ideales para recuerdos, eventos, empresas y regalos. Diseño y acabado a coordinar.',mode:'pins58'},
  {id:'chapitas-37',name:'Chapitas 37 mm',group:'CHAPITAS',image:3,from:5880,short:'Chapitas compactas para ferias, colegios, recuerdos y promociones. Tipo Alfiler.',description:'Chapitas compactas de 37 mm con alfiler, ideales para ferias, colegios, recuerdos, eventos y promociones. Puedes personalizarlas con tu imagen o diseño.',mode:'pins37'},
  {id:'chapitas-25',name:'Chapitas 25 mm',group:'CHAPITAS',image:1,from:5000,short:'Chapitas pequeñas y versátiles, ideales para accesorios, regalos y diseños únicos.',description:'Chapitas pequeñas de 25 mm, prácticas y versátiles. Ideales para accesorios, recuerdos, regalos y diseños únicos. Con cierre de alfiler y personalización a coordinar.',mode:'pins25'},
  {id:'fotos-6x8',name:'Fotografías 6 × 8 cm',group:'FOTOGRAFÍAS',image:5,from:4000,short:'Fotografías en formato mini, perfectas para conservar y compartir recuerdos especiales.',description:'Fotografías en formato mini de 6 × 8 cm, impresas en papel fotográfico brillante. Disponibles como fotografías normales o adhesivas, ideales para recuerdos, álbumes y regalos.',mode:'fotos6'},
  {id:'fotos-10x15',name:'Fotografías 10 × 15 cm',group:'FOTOGRAFÍAS',image:6,from:5000,short:'El formato clásico para tus recuerdos, ideal para álbumes, marcos y regalos.',description:'Fotografías de 10 × 15 cm en papel fotográfico brillante. El formato clásico para imprimir tus recuerdos, decorar álbumes, regalar y guardar momentos especiales.',mode:'fotos10'},
  {id:'fotos-13x18',name:'Fotografías 13 × 18 cm',group:'FOTOGRAFÍAS',image:7,from:5880,short:'Fotografías ideales para destacar tus mejores momentos, decorar y regalar.',description:'Fotografías de 13 × 18 cm impresas en papel fotográfico brillante, ideales para destacar tus mejores momentos, decorar espacios y hacer regalos especiales.',mode:'fotos13'},
  {id:'fotos-20x30',name:'Fotografías 20 × 30 cm',group:'FOTOGRAFÍAS',image:8,from:500,short:'Fotografías de gran formato, perfectas para enmarcar tus recuerdos favoritos.',description:'Fotografías de gran formato 20 × 30 cm, perfectas para enmarcar, decorar y destacar tus recuerdos favoritos. Impresión sobre papel fotográfico brillante.',mode:'fotos20'},
  {id:'lapices',name:'Lápices personalizados',group:'MERCHANDISING',image:4,from:1500,short:'Personaliza tus lápices con nombres, frases o logotipos para cualquier ocasión.',description:'Lápices personalizados con nombres, frases o logotipos para regalos, empresas, eventos y celebraciones. Los diseños y colores se coordinan según disponibilidad.',mode:'unitario'},
  {id:'tazas',name:'Tazas personalizadas',group:'FOTOGRAFÍAS',image:12,from:3500,short:'Tazas con fotografías, frases o diseños únicos para regalar o sorprender.',description:'Tazas personalizadas con fotografías, frases o diseños únicos para regalar o sorprender. Cada taza se prepara especialmente según los detalles que elijas.',mode:'unitario'},
  {id:'botellas',name:'Botellas personalizadas',group:'MERCHANDISING',image:13,from:7000,short:'Botellas reutilizables con diseños únicos para regalar o acompañarte cada día.',description:'Botellas reutilizables con diseños únicos para regalar o acompañarte cada día. Personaliza los colores, imágenes y detalles para crear un objeto especial.',mode:'unitario'},
  {id:'gorros',name:'Gorros personalizados',group:'TEXTILES',image:14,from:5000,short:'Gorros con diseños o logotipos, ideales para equipos, marcas y eventos.',description:'Gorros personalizados con diseños o logotipos, ideales para equipos, marcas, ferias, emprendimientos y eventos.',mode:'unitario'},
  {id:'poleras',name:'Poleras personalizadas',group:'TEXTILES',image:15,from:7500,short:'Poleras con estampados únicos para grupos, celebraciones y emprendimientos.',description:'Poleras personalizadas con estampados únicos para grupos, celebraciones y emprendimientos. Diseños, colores y tallas según disponibilidad.',mode:'unitario'}
];
const featured = ['adhesivos','chapitas-58','botellas','tarjetas','calendarios','fotos-10x15'];
const catalogOrder = ['adhesivos','tarjetas','calendarios','chapitas-58','chapitas-37','chapitas-25','fotos-6x8','fotos-10x15','fotos-13x18','fotos-20x30','lapices','tazas','botellas','gorros','poleras'];
const productById = id => products.find(product => product.id === id) || products[0];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const cardHTML = product => `<article class="product-card">
  <a class="product-card-image" href="#producto=${product.id}" aria-label="Ver ${escapeHTML(product.name)}"><img src="${assets(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy"></a>
  <p class="product-category">${escapeHTML(product.group)}</p>
  <h3><a href="#producto=${product.id}">${escapeHTML(product.name)}</a></h3>
  <p class="product-description">${escapeHTML(product.short)}</p>
  <strong class="product-price">Desde ${CLP(product.from)}</strong>
  <a class="product-cta" href="#producto=${product.id}">Ver y personalizar <img src="assets/iconos/flecha.png" alt=""></a>
</article>`;

let selectedProduct = products[0];
let selectedOptions = {};
function initialOptions(product) {
  switch (product.mode) {
    case 'adhesivos': return {papel:'Papel Fotográfico Adhesivo',medida:'4×4 cm',cantidad:'96'};
    case 'pins58': return {tipo:'Alfiler',cantidad:'12'};
    case 'pins37': case 'pins25': return {cantidad:'12'};
    case 'tarjetas': return {papel:'Opalina lisa',caras:'1 cara',cantidad:'40'};
    case 'calendarios': return {cantidad:'12'};
    case 'fotos6': return {acabado:'Normales',cantidad:'45'};
    case 'fotos10': return {cantidad:'50'};
    case 'fotos13': return {cantidad:'1'};
    case 'fotos20': return {cantidad:'1'};
    default: return {cantidad:'1'};
  }
}
function productGroups(product, options) {
  switch (product.mode) {
    case 'adhesivos': return [
      {key:'papel',label:'Tipo de papel',values:['Papel Fotográfico Adhesivo','Papel Matte Kraft Adhesivo']},
      {key:'medida',label:'Medida',values:Object.keys(pricesAdhesivos)},
      {key:'cantidad',label:'Cantidad',values:Object.keys(pricesAdhesivos[options.medida])}
    ];
    case 'pins58': return [{key:'tipo',label:'Tipo de chapita',values:Object.keys(pricesChapitas58)},{key:'cantidad',label:'Cantidad',values:Object.keys(pricesChapitas58[options.tipo])}];
    case 'pins37': case 'pins25': return [{key:'cantidad',label:'Cantidad',values:['1','12','25','50','100']}];
    case 'tarjetas': return [{key:'papel',label:'Tipo de papel',values:['Opalina lisa','Opalina texturada','Papel fotográfico']},{key:'caras',label:'Impresión',values:['1 cara','2 caras']},{key:'cantidad',label:'Cantidad',values:['40','60','80','100']}];
    case 'calendarios': return [{key:'cantidad',label:'Cantidad',values:['12','24','36','48','60','96','120']}];
    case 'fotos6': return [{key:'acabado',label:'Tipo de fotografía',values:['Normales','Adhesivas']},{key:'cantidad',label:'Cantidad',values:['45','90']}];
    case 'fotos10': return [{key:'cantidad',label:'Cantidad',values:['50','100']}];
    case 'fotos13': return [{key:'cantidad',label:'Cantidad',values:['1','50','100']}];
    case 'fotos20': return [{key:'cantidad',label:'Cantidad',values:['1','20','50']}];
    default: return [{key:'cantidad',label:'Cantidad',values:['1','5','10','25','50']}];
  }
}
function selectedPrice(product, options) {
  const n = Number(options.cantidad);
  switch (product.mode) {
    case 'adhesivos': return pricesAdhesivos[options.medida]?.[n] ?? null;
    case 'pins58': return pricesChapitas58[options.tipo]?.[n] ?? null;
    case 'pins37': return ({1:800,12:5880,25:10250,50:19500,100:31000})[n] ?? null;
    case 'pins25': return ({1:500,12:5040,25:8750,50:16000,100:25000})[n] ?? null;
    case 'calendarios': return ({12:7200,24:10800,36:18720,48:23040,60:21600,96:30720,120:34800})[n] ?? null;
    case 'fotos6': return ({Normales:{45:4000,90:6000},Adhesivas:{45:5000,90:7000}})[options.acabado]?.[n] ?? null;
    case 'fotos10': return ({50:5000,100:9000})[n] ?? null;
    case 'fotos13': return ({1:200,50:9000,100:15000})[n] ?? null;
    case 'fotos20': return ({1:500,20:9000,50:15000})[n] ?? null;
    case 'tarjetas': {
      const base = options.papel === 'Opalina lisa' && options.caras === '1 cara' ? {40:3200,60:4800,80:6400,100:7000} :
        options.papel === 'Opalina lisa' && options.caras === '2 caras' ? {40:3800,60:5700,80:7600,100:8500} :
        options.caras === '1 cara' ? {40:3800,60:5700,80:7600,100:8500} : {40:4400,60:6600,80:8800,100:10000};
      return base[n] ?? null;
    }
    default: return n === 1 ? product.from : null;
  }
}
function renderOptions() {
  document.getElementById('detail-options').innerHTML = productGroups(selectedProduct,selectedOptions).map(group => `<fieldset class="detail-fieldset"><legend>${escapeHTML(group.label)}</legend><div class="option-row">${group.values.map(value => {
    const on = String(selectedOptions[group.key]) === String(value);
    return `<button class="option-btn${on ? ' is-selected' : ''}" type="button" aria-pressed="${on}" data-option="${group.key}" data-value="${escapeHTML(value)}">${escapeHTML(value)}${group.key === 'cantidad' ? ' un.' : ''}</button>`;
  }).join('')}</div></fieldset>`).join('');
  const price = selectedPrice(selectedProduct,selectedOptions);
  document.getElementById('detail-price').textContent = CLP(price);
  document.getElementById('detail-helper').textContent = Number.isFinite(price) ?
    'Valor estimado del conjunto seleccionado. Diseños, plazos y disponibilidad se confirman al coordinar.' :
    'El valor de esta cantidad se confirma según los detalles de tu pedido.';
}
function changeOption(key,value) {
  if (selectedProduct.mode === 'adhesivos' && key === 'medida') {
    const oldList = Object.keys(pricesAdhesivos[selectedOptions.medida]);
    const newList = Object.keys(pricesAdhesivos[value]);
    const index = Math.max(0,oldList.indexOf(String(selectedOptions.cantidad)));
    selectedOptions.cantidad = newList[Math.min(index,newList.length-1)];
  }
  if (selectedProduct.mode === 'pins58' && key === 'tipo') {
    selectedOptions.cantidad = Object.keys(pricesChapitas58[value])[0];
  }
  selectedOptions[key] = value;
  renderOptions();
}
function showProduct(id) {
  selectedProduct = productById(id);
  selectedOptions = initialOptions(selectedProduct);
  document.getElementById('detail-title').textContent = selectedProduct.id === 'adhesivos' ? 'Adhesivos Personalizados' : selectedProduct.name;
  document.getElementById('detail-description').textContent = selectedProduct.description;
  const image = document.getElementById('detail-image');
  image.src = assets(selectedProduct.image);
  image.alt = selectedProduct.name;
  renderOptions();
}

let quote = [];
try { const saved = JSON.parse(localStorage.getItem('paperDesignCotizacion') || '[]'); if (Array.isArray(saved)) quote = saved; } catch (_) {}
function persistQuote() { try { localStorage.setItem('paperDesignCotizacion',JSON.stringify(quote)); } catch (_) {} }
function optionsText(options) { return Object.entries(options).map(([key,value]) => `${key === 'cantidad' ? 'Cantidad' : key === 'papel' ? 'Papel' : key === 'medida' ? 'Medida' : key === 'tipo' ? 'Tipo' : key === 'caras' ? 'Impresión' : key === 'acabado' ? 'Acabado' : key}: ${value}`).join(' · '); }
function renderQuote() {
  const total = quote.reduce((sum,item) => sum + (Number.isFinite(item.price) ? item.price : 0),0);
  document.getElementById('quote-items').innerHTML = quote.length ? quote.map(item => `<article class="quote-item"><img src="${assets(item.image)}" alt=""><div><strong>${escapeHTML(item.name)}</strong><p>${escapeHTML(optionsText(item.options))}</p><b>${CLP(item.price)}</b></div><button type="button" class="quote-remove" aria-label="Quitar ${escapeHTML(item.name)}" data-remove="${item.id}">×</button></article>`).join('') : '<div class="quote-empty"><h3>Tu cotización está vacía</h3><p>Selecciona un producto del catálogo para comenzar.</p><a class="button solid-pink" href="#catalogo">Ver catálogo</a></div>';
  document.getElementById('quote-total').textContent = CLP(total);
  document.getElementById('quote-send').disabled = quote.length === 0;
  const badge = document.getElementById('cart-count'); badge.textContent = quote.length; badge.hidden = !quote.length;
}
function addToQuote() {
  quote.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,name:selectedProduct.name,image:selectedProduct.image,options:{...selectedOptions},price:selectedPrice(selectedProduct,selectedOptions)});
  persistQuote(); renderQuote(); openDialog('quote'); showToast('Producto añadido a tu cotización');
}
function whatsapp(text) {
  const url = `https://wa.me/56984417242?text=${encodeURIComponent(text)}`;
  const popup = window.open(url,'_blank','noopener,noreferrer');
  if (!popup) window.location.href = url;
}
function sendQuote() {
  if (!quote.length) return;
  const parts = quote.map((item,index) => `${index+1}. ${item.name}\n   ${optionsText(item.options)}\n   ${CLP(item.price)}`);
  const sum = quote.reduce((acc,item) => acc + (Number.isFinite(item.price) ? item.price : 0),0);
  const notes = document.getElementById('quote-notes').value.trim();
  whatsapp(`¡Hola! Quiero consultar por los siguientes productos de Paper Design:\n\n${parts.join('\n\n')}\n\nTotal estimado: ${CLP(sum)}${notes ? '\n\nIndicaciones: '+notes : ''}\n\n¿Me podrían confirmar el valor y la disponibilidad?`);
}
function showToast(message) {
  const el=document.getElementById('toast'); el.textContent=message; el.hidden=false;
  clearTimeout(showToast.timeout); showToast.timeout=setTimeout(() => { el.hidden=true; },3000);
}
function openDialog(name) {
  document.getElementById(`${name}-modal`).hidden=false;
  document.body.style.overflow='hidden';
  if (name==='search') { updateSearch(); requestAnimationFrame(() => document.getElementById('search-input').focus()); }
}
function closeDialog(name) {
  document.getElementById(`${name}-modal`).hidden=true;
  if (document.getElementById('search-modal').hidden && document.getElementById('quote-modal').hidden) document.body.style.overflow='';
}
function updateSearch() {
  const term=document.getElementById('search-input').value.trim().toLocaleLowerCase('es');
  const results=term ? products.filter(p => [p.name,p.short,p.group].join(' ').toLocaleLowerCase('es').includes(term)) : products.slice(0,6);
  document.getElementById('search-results').innerHTML=results.length ? results.map(p => `<a class="search-result" href="#producto=${p.id}"><img src="${assets(p.image)}" alt=""><span><strong>${escapeHTML(p.name)}</strong><small>Desde ${CLP(p.from)}</small></span></a>`).join('') : '<p>Sin resultados para esta búsqueda.</p>';
}
function route() {
  const value=decodeURIComponent(window.location.hash.slice(1) || 'inicio');
  const view=value.startsWith('producto=') ? 'producto' : value === 'catalogo' ? 'catalogo' : 'inicio';
  document.querySelectorAll('.page-view').forEach(page => { page.hidden=page.dataset.view !== view; });
  if (view==='producto') showProduct(value.substring(9));
  document.querySelectorAll('.header-links a').forEach(link=>link.classList.toggle('is-current',link.getAttribute('href')===`#${value}`));
  document.title = `${view === 'producto' ? selectedProduct.name : view==='catalogo' ? 'Catálogo' : 'Inicio'} | Paper Design`;
  document.getElementById('menu-panel').hidden=true;
  document.getElementById('menu-open').setAttribute('aria-expanded','false');
  closeDialog('search'); closeDialog('quote');
  if (['empresas','historia','como-comprar','contacto'].includes(value)) {
    requestAnimationFrame(() => document.getElementById(value)?.scrollIntoView({behavior:'smooth',block:'start'}));
  } else window.scrollTo({top:0,behavior:'instant'});
}
function setup() {
  document.getElementById('home-products').innerHTML = featured.map(id => cardHTML(productById(id))).join('');
  document.getElementById('catalog-products').innerHTML = catalogOrder.map(id => cardHTML(productById(id))).join('');
  document.getElementById('search-open').addEventListener('click',()=>openDialog('search'));
  document.getElementById('quote-open').addEventListener('click',()=>openDialog('quote'));
  document.getElementById('search-input').addEventListener('input',updateSearch);
  document.getElementById('detail-add').addEventListener('click',addToQuote);
  document.getElementById('quote-send').addEventListener('click',sendQuote);
  document.getElementById('menu-open').addEventListener('click',()=>{ const menu=document.getElementById('menu-panel');menu.hidden=!menu.hidden;document.getElementById('menu-open').setAttribute('aria-expanded',String(!menu.hidden)); });
  document.getElementById('contact-form').addEventListener('submit',event=>{
    event.preventDefault();
    const name=document.getElementById('contact-name').value.trim();
    const email=document.getElementById('contact-email').value.trim();
    const phone=document.getElementById('contact-phone').value.trim();
    const message=document.getElementById('contact-message').value.trim();
    if (!name || !email || !message) return;
    whatsapp(`¡Hola! Soy ${name}. Quisiera cotizar en Paper Design.\n\nMi idea: ${message}\n\nCorreo: ${email}${phone ? '\nTeléfono: '+phone : ''}`);
  });
  document.addEventListener('click',event=>{
    const option=event.target.closest('[data-option]');
    if (option) { changeOption(option.dataset.option,option.dataset.value);return; }
    const remove=event.target.closest('[data-remove]');
    if (remove) { quote=quote.filter(item=>item.id!==remove.dataset.remove);persistQuote();renderQuote();return; }
    const close=event.target.closest('[data-close]');
    if (close) { closeDialog(close.dataset.close);return; }
    const anchor=event.target.closest('a[href^="#"]');
    if (anchor && anchor.hash === window.location.hash) route();
  });
  document.addEventListener('keydown',event=>{ if (event.key==='Escape') { closeDialog('search');closeDialog('quote');document.getElementById('menu-panel').hidden=true; } });
  window.addEventListener('hashchange',route);
  renderQuote();route();
}
if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup); else setup();
