export type Listing = {
  id: number;
  title: string;
  commodity: string;
  grade: string;
  origin: string;
  volumeMt: number;
  price: number;
  delta: number;
  incoterm: string;
  certs: string[];
  image: string;
  moisture: string;
  protein: string;
  inspection: string;
  loadWindow: string;
};

export const LISTINGS: Listing[] = [
  {
    id: 1, title: "Soybeans Non-GMO", commodity: "Soybeans", grade: "BR No.2 · Non-GMO",
    origin: "Mato Grosso", volumeMt: 25000, price: 482.5, delta: 2.4, incoterm: "FOB Santos",
    certs: ["Non-GMO", "SGS-inspected"], image: "/commodity-soy.jpg",
    moisture: "12.5% max", protein: "36.0% min", inspection: "SGS Brazil", loadWindow: "Mar 10 – Mar 24, 2025",
  },
  {
    id: 2, title: "Corn Yellow #2", commodity: "Corn", grade: "US #2 Yellow",
    origin: "Paraná", volumeMt: 40000, price: 215.4, delta: -0.6, incoterm: "FOB Paranaguá",
    certs: ["SGS-inspected"], image: "/commodity-corn.jpg",
    moisture: "14.0% max", protein: "8.5% min", inspection: "Bureau Veritas", loadWindow: "Apr 02 – Apr 18, 2025",
  },
  {
    id: 3, title: "Raw Sugar ICUMSA 45", commodity: "Sugar", grade: "ICUMSA 45 RBU",
    origin: "São Paulo", volumeMt: 12500, price: 423.8, delta: 1.8, incoterm: "CIF Jebel Ali",
    certs: ["Halal", "SGS-inspected"], image: "/commodity-sugar.jpg",
    moisture: "0.04% max", protein: "—", inspection: "Intertek", loadWindow: "Mar 15 – Mar 30, 2025",
  },
  {
    id: 4, title: "Coffee Arabica 17/18", commodity: "Coffee", grade: "17/18 NY 2/3",
    origin: "Minas Gerais", volumeMt: 500, price: 4250.0, delta: 5.2, incoterm: "FOB Santos",
    certs: ["Organic", "SGS-inspected"], image: "/commodity-coffee.jpg",
    moisture: "11.0% max", protein: "—", inspection: "SGS Brazil", loadWindow: "May 05 – May 19, 2025",
  },
  {
    id: 5, title: "Beef Frozen 90VL", commodity: "Beef", grade: "90VL Boneless",
    origin: "Goiás", volumeMt: 2000, price: 5850.0, delta: 3.1, incoterm: "CIF Shanghai",
    certs: ["Halal", "SGS-inspected"], image: "/commodity-beef.jpg",
    moisture: "—", protein: "90% VL", inspection: "SCS Global", loadWindow: "Mar 20 – Apr 05, 2025",
  },
  {
    id: 6, title: "Chicken Whole Frozen", commodity: "Chicken", grade: "Grade A Whole",
    origin: "Santa Catarina", volumeMt: 5000, price: 1850.0, delta: 1.2, incoterm: "CFR Dubai",
    certs: ["Halal", "SGS-inspected"], image: "/commodity-chicken.jpg",
    moisture: "—", protein: "—", inspection: "Bureau Veritas", loadWindow: "Mar 12 – Mar 26, 2025",
  },
  {
    id: 7, title: "Wheat Hard Red", commodity: "Wheat", grade: "HRW 11.5%",
    origin: "Rio Grande do Sul", volumeMt: 15000, price: 298.5, delta: -1.2, incoterm: "FOB Rio Grande",
    certs: ["Non-GMO"], image: "/commodity-wheat.jpg",
    moisture: "13.5% max", protein: "11.5% min", inspection: "Intertek", loadWindow: "Apr 10 – Apr 28, 2025",
  },
  {
    id: 8, title: "Soybean Meal 48%", commodity: "Soybean Meal", grade: "48% Protein",
    origin: "Mato Grosso", volumeMt: 30000, price: 385.2, delta: 0.8, incoterm: "FOB Santos",
    certs: ["Non-GMO", "SGS-inspected"], image: "/commodity-soy.jpg",
    moisture: "12.0% max", protein: "48.0% min", inspection: "SGS Brazil", loadWindow: "Mar 18 – Apr 02, 2025",
  },
  {
    id: 9, title: "Ethanol Anhydrous", commodity: "Ethanol", grade: "99.5% Fuel Grade",
    origin: "São Paulo", volumeMt: 8000, price: 620.0, delta: 2.1, incoterm: "FOB Santos",
    certs: ["SGS-inspected"], image: "/commodity-sugar.jpg",
    moisture: "0.5% max", protein: "—", inspection: "Saybolt", loadWindow: "Mar 22 – Apr 06, 2025",
  },
  {
    id: 10, title: "Cotton Lint 28mm", commodity: "Cotton", grade: "SLM 1-1/8\"",
    origin: "Bahia", volumeMt: 10000, price: 1850.0, delta: -0.4, incoterm: "CIF Mumbai",
    certs: ["Organic"], image: "/commodity-cotton.jpg",
    moisture: "8.5% max", protein: "—", inspection: "Bureau Veritas", loadWindow: "Apr 15 – May 02, 2025",
  },
];

export const COMMODITIES = [...new Set(LISTINGS.map((l) => l.commodity))];
export const CERTS = ["Non-GMO", "Organic", "Halal", "SGS-inspected"];
