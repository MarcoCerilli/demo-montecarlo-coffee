import { ProductItem } from '../types';

export const ECOMMERCE_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-01',
    name: 'Selezione Riserva Monorigine Etiopia Yirgacheffe',
    tagline: 'Note floreali di gelsomino, bergamotto e miele d\'acacia',
    category: 'caffe',
    price: 18.50,
    originalPrice: 22.00,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Coltivato ad oltre 2.000 metri di altitudine nei giardini vulcanici di Yirgacheffe. Tostatura lenta ad aria pulita per esaltare l\'acidità citrica nobile e il finale vellutato.',
    origin: 'Etiopia (Altitudine: 2.100m)',
    roastLevel: 'Chiara',
    notes: ['Gelsomino', 'Bergamotto', 'Miele', 'Limone'],
    inStock: true,
    stockLeft: 14,
    isBestSeller: true,
    options: {
      label: 'Macinatura',
      values: ['Chicchi Interi', 'Moka Tradizionale', 'Espresso Macchina', 'Filtro / V60']
    }
  },
  {
    id: 'prod-02',
    name: 'Blend Signature "Velluto Nero" 100% Arabica',
    tagline: 'Cioccolato fondente 85%, caramello salato e nocciola tostata',
    category: 'caffe',
    price: 15.00,
    originalPrice: 17.50,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'La nostra miscela iconica per espresso italiano: corpo pieno, crema densa color nocciola e retrogusto persistente di cacao criollo.',
    origin: 'Brasile Fazenda & Guatemala Antigua',
    roastLevel: 'Media',
    notes: ['Cioccolato', 'Caramello', 'Mandorla'],
    inStock: true,
    stockLeft: 28,
    isBestSeller: true,
    options: {
      label: 'Macinatura',
      values: ['Chicchi Interi', 'Moka Tradizionale', 'Espresso Macchina', 'Cialde ESE 44']
    }
  },
  {
    id: 'prod-03',
    name: 'Macchina Espresso Manuale Copper Heritage Edition',
    tagline: 'Caldaia in rame massiccio, gruppo termocompensato e lancia vapore professionale',
    category: 'macchine',
    price: 489.00,
    originalPrice: 549.00,
    rating: 5.0,
    reviewsCount: 47,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Capolavoro di ingegneria e design milanese. Permette l\'estrazione a 9 bar stabili con controllo PID della temperatura digitale (+/- 0.5°C).',
    notes: ['Caldaia Rame 1.5L', 'Portafiltro 58mm', 'Manometro analogico'],
    inStock: true,
    stockLeft: 4,
    isBestSeller: false,
    options: {
      label: 'Finitura',
      values: ['Rame Satinato', 'Nero Opaco & Ottone', 'Acciaio Inox Lucidato']
    }
  },
  {
    id: 'prod-04',
    name: 'Macinacaffè Micrometrico a Macine Coniche in Titanio',
    tagline: 'Regolazione continua a 60 step, zero ritenzione polvere',
    category: 'accessori',
    price: 139.00,
    originalPrice: 165.00,
    rating: 4.9,
    reviewsCount: 63,
    image: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Corpo in alluminio ricavato dal pieno con macine coniche da 48mm rivestite in nitruro di titanio per una macinatura uniforme e senza riscaldamento.',
    notes: ['Titanio 48mm', 'Alluminio aeronautico', 'Capienza 35g'],
    inStock: true,
    stockLeft: 19,
    options: {
      label: 'Colore',
      values: ['Nero Anodizzato', 'Grigio Ardesia', 'Argento Naturale']
    }
  },
  {
    id: 'prod-05',
    name: 'Cofanetto Degustazione "Giro del Mondo in 4 Origini"',
    tagline: '4 confezioni da 250g in astuccio regalo serigrafato a mano',
    category: 'gift-box',
    price: 49.90,
    originalPrice: 58.00,
    rating: 5.0,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Include Colombia Geisha, Kenya AA Nyeri, Etiopia Guji e Guatemala San Marcos, con guida alla degustazione e ruota degli aromi SCAA.',
    notes: ['4x 250g', 'Guida inclusa', 'Packaging lusso ecosostenibile'],
    inStock: true,
    stockLeft: 31,
    isBestSeller: true,
    options: {
      label: 'Macinatura Box',
      values: ['Chicchi Interi', 'Moka & Espresso Mix', 'Macinato Fine']
    }
  },
  {
    id: 'prod-06',
    name: 'Kettle Elettrico a Collo d\'Oca Termoregolato 0.9L',
    tagline: 'Beccuccio a flusso costante, mantenimento calore 60 min',
    category: 'accessori',
    price: 89.00,
    originalPrice: 99.00,
    rating: 4.7,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Ideale per estrazioni filtro, V60, Chemex e Aeropress. Display LCD retroilluminato con cronometro integrato.',
    notes: ['1200W rapido', 'Acciaio 304', 'Controllo a 1°C'],
    inStock: true,
    stockLeft: 8,
    options: {
      label: 'Finitura',
      values: ['Nero Satinato', 'Bianco Opaco']
    }
  }
];
