const htmlDescription = `<p><strong>REGISTRO DE VENTA</strong><br /><strong>ICA NO. 6062</strong></p><p>Fósforo activado con ácidos húmicos y fúlvicos para inducción radicular y un óptimo arranque. Es el indicado para aportar fósforo, zinc, Boro y carbono orgánico a cultivos exigentes en estos elementos y/o suelos pobres en contenidos de los mismos, al tiempo que se aumenta la asimilabilidad, dada la fuerte sinergia de sus componentes</p><p><strong>APLICACIÓN</strong></p><p>Aplicaciones foliares en dosis de 1 L/200 L , ó 3-4 L/Ha, sólo ó en mezcla, siendo en general compatible con la mayoría de productos del mercado. Aplicación edáfica, 1,0 L/1000 L, en tanque para aplicación directa, ó 3 L/Ha</p><p><strong>COMPOSICIÓN</strong></p><ul><li>Potasio Total (K<sub>2</sub>O) 50 g/L</li><li>Fósforo Total (P<sub>2</sub>O<sub>5</sub>) 400 g/L</li></ul>`;

const parseWooCommerceDescription = (htmlDescription) => {
  if (!htmlDescription) return null;

  const plainText = htmlDescription
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&Oacute;/gi, 'Ó')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&#211;/g, 'Ó')
    .replace(/&#243;/g, 'ó')
    .replace(/&Iacute;/gi, 'Í')
    .replace(/&iacute;/gi, 'í')
    .replace(/&eacute;/gi, 'é')
    .replace(/&Eacute;/gi, 'É')
    .replace(/&aacute;/gi, 'á')
    .replace(/&uacute;/gi, 'ú')
    .replace(/<\/(p|div|li|ul|ol|h[1-6]|strong|b|em|span|sub|sup)[^>]*>/gi, ' ')
    .replace(/<(br|hr)[^>]*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  console.log('PlainText:', plainText);

  const clean = (str) => str.replace(/\s+/g, ' ').trim();

  const formatComposition = (str) => {
    let c = clean(str).replace(/^[,:\s]+/, '');
    if (!c.includes(',')) {
      c = c
        .replace(/\s+(F[oó]sforo|Boro|Zinc|Solubilidad|Densidad|Nitr[oó]geno|Magnesio|Calcio|Azufre|Cobre|Manganeso|Potasio|pH|Carbono)/gi, ', $1')
        .replace(/^,\s*/, '');
    }
    return c;
  };

  const APP_REGEX = /APLICACI[OÓ]N/i;
  const COMP_REGEX = /COMPOSICI[OÓ]N/i;

  const partsApp = plainText.split(APP_REGEX);
  if (partsApp.length > 1) {
    const description = clean(partsApp[0]);
    const afterApp = partsApp[1];
    const partsComp = afterApp.split(COMP_REGEX);
    if (partsComp.length > 1) {
      return {
        description,
        application: clean(partsComp[0]).replace(/^[:\s]+/, ''),
        composition: formatComposition(partsComp[1]),
      };
    }
    const application = clean(afterApp).replace(/^[:\s]+/, '');
    if (application) return { description, application, composition: 'Ver especificaciones técnicas' };
  }

  const partsComp = plainText.split(COMP_REGEX);
  if (partsComp.length > 1) {
    const composition = formatComposition(partsComp[1]);
    if (composition) return { description: clean(partsComp[0]), application: 'Consulte con nuestros asesores', composition };
  }

  return null;
};

console.log(parseWooCommerceDescription(htmlDescription));
