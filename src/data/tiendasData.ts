// src/data/tiendasData.ts

export interface Tienda {
    nombre: string;
    telefono: string;
    direccion: string;
}

export interface DepartamentoInfo {
    nombreLegible: string;
    tiendas: Tienda[];
}

export const infoTiendas: Record<string, DepartamentoInfo> = {
    BOYACA: {
        nombreLegible: "Boyacá",
        tiendas: [
            { nombre: "Tienda Toro", telefono: "+57 (315) 123 4567", direccion: "Calle Principal, Tunja" },
            { nombre: "Tienda Mulato", telefono: "+57 (316) 987 6543", direccion: "Av. Las Granjas, Duitama" }
        ]
    },
    ANTIOQUIA: {
        nombreLegible: "Antioquia",
        tiendas: [
            { nombre: "Agrofert Medellín", telefono: "+57 (317) 456 7890", direccion: "Central Mayorista, Bloque 4" },
            { nombre: "Punto de Venta Urabá", telefono: "+57 (318) 222 3333", direccion: "Zona Industrial, Apartadó" }
        ]
    },
    ATLANTICO: {
        nombreLegible: "Atlántico",
        tiendas: [
            { nombre: "Distribuidor Barranquilla", telefono: "+57 (300) 555 4444", direccion: "Vía 40 #70-20" }
        ]
    },
    SANTANDER: {
        nombreLegible: "Santander",
        tiendas: [
            { nombre: "Agencia Principal Bucaramanga", telefono: "+57 (312) 444 8888", direccion: "Anillo Vial Floridablanca" }
        ]
    }
    // Puedes seguir añadiendo los departamentos que uses con el NOMBRE_DPT en mayúsculas como llave...
};