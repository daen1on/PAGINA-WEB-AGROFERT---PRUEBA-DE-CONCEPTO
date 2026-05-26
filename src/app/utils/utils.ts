// utils.ts
import { Leaf, Droplet, Zap, Shield } from "lucide-react";

export const getIconForCategory = (category: string) => {
    switch (category) {
        case "nitrogenados":
            return Leaf;
        case "fosforados":
        case "micronutrientes":
            return Droplet;
        case "potasicos":
            return Zap;
        case "organicos":
            return Shield;
        default:
            return Leaf;
    }
};

export const getDetailedSolutionText = (issue: "cors" | "credentials" | "not_found" | "generic_network" | "none") => {
    switch (issue) {
        case "cors":
            return "Habilite cabeceras CORS en el archivo functions.php de WordPress.";
        case "credentials":
            return "Verifique que las claves API de WooCommerce sean válidas y tengan permisos de lectura.";
        case "not_found":
            return "Asegúrese de activar los enlaces permanentes (Permalinks) en WordPress.";
        default:
            return "Verifique la conectividad de red con el dominio de WordPress.";
    }
};

export const parseWooCommerceDescription = (htmlDescription: string) => {
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

    const clean = (str: string) => str.replace(/\s+/g, ' ').trim();

    const formatComposition = (str: string) => {
        let c = clean(str).replace(/^[,:\s]+/, '');
        if (!c.includes(',')) {
            c = c
                .replace(/\s+(F[oó]sforo|Boro|Zinc|Solubilidad|Densidad|Nitr[oó]geno|Magnesio|Calcio|Azufre|Cobre|Manganeso|Potasio|pH|Carbono)/gi, ', $1')
                .replace(/^,\s*/, '');
        }
        return c;
    };

    const splitFirst = (str: string, regex: RegExp) => {
        const match = str.match(regex);
        if (!match) return [str];
        return [str.substring(0, match.index), str.substring(match.index! + match[0].length)];
    };

    const APP_REGEX = /APLICACI[OÓ]N/i;
    const COMP_REGEX = /COMPOSICI[OÓ]N(?:\s+GARANTIZADA)?/i;

    const partsApp = splitFirst(plainText, APP_REGEX);

    if (partsApp.length > 1) {
        const description = clean(partsApp[0]);
        const afterApp = partsApp[1];
        const partsComp = splitFirst(afterApp, COMP_REGEX);

        if (partsComp.length > 1) {
            const application = clean(partsComp[0]).replace(/^[:\s]+/, '');
            const composition = formatComposition(partsComp[1]);
            return { description, application, composition };
        }

        const application = clean(afterApp).replace(/^[:\s]+/, '');
        if (application) {
            return { description, application, composition: 'Ver especificaciones técnicas' };
        }
    }

    const partsComp = splitFirst(plainText, COMP_REGEX);
    if (partsComp.length > 1) {
        const composition = formatComposition(partsComp[1]);
        if (composition) {
            return {
                description: clean(partsComp[0]),
                application: 'Consulte con nuestros asesores',
                composition,
            };
        }
    }

    return null;
};