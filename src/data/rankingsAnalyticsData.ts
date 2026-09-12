// 100% Actual Master Datasets from Indentor & Manufacturer Annual Business Rankings
export interface ManufacturerRankingItem {
  rank: number;
  name: string;
  valueUsdJulJun: number;
  valuePkrJulJun: number;
  sharePctJulJun: number;
  cumShareJulJun: number;
  valueUsd2025: number;
  valuePkr2025: number;
  sharePct2025: number;
  currency: string;
  category: string;
  materials: string[];
}

export interface IndentorRankingItem {
  rank: number;
  name: string;
  valueUsdJulJun: number;
  valuePkrJulJun: number;
  sharePctJulJun: number;
  cumShareJulJun: number;
  valueUsd2025: number;
  valuePkr2025: number;
  sharePct2025: number;
  cumShare2025: number;
  currency: string;
  category: string;
  materials: string[];
  origins: string[];
}

export const TOTAL_MANUFACTURER_USD_JUL_JUN = 14464801;
export const TOTAL_MANUFACTURER_USD_2025 = 13451548;

export const TOTAL_INDENTOR_PKR_JUL_JUN = 4022677219;
export const TOTAL_INDENTOR_PKR_2025 = 3740890798;
export const TOTAL_INDENTOR_USD_JUL_JUN = 14366704;
export const TOTAL_INDENTOR_USD_2025 = 13360324;

export const MANUFACTURER_RANKINGS_DATA: ManufacturerRankingItem[] = [
  {
    "rank": 1,
    "name": "NANTONG HUIDESENG PACKAG",
    "valueUsdJulJun": 1019165,
    "valuePkrJulJun": 283429867,
    "sharePctJulJun": 7.05,
    "cumShareJulJun": 7.05,
    "valueUsd2025": 788959,
    "valuePkr2025": 219409544,
    "sharePct2025": 5.87,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ALU ALU Base Foil (Printed) 214 mm  ±1mm",
      "ALU ALU Base Foil (Printed) 142 mm  ±1mm",
      "ALU ALU Base Foil (Printed) 202 mm  ±1mm",
      "ALU ALU Base Foil (Printed) 235 mm ±1mm/",
      "ALU ALU Base Foil (Printed) 230 mm  ±1mm",
      "ALU ALU Base Foil (Printed) 211 mm  ±1mm",
      "BASE FOIL ASCARD 75MG TAB. 214MM",
      "ALU ALU Base Foil (Printed) 245 mm  ±1mm",
      "ALU ALU Base Foil (Printed) 235 mm  ±1mm",
      "ALU ALU Base Foil (Printed) 224 mm  ±1mm",
      "ALU ALU Base Foil (Printed) 215 mm  ±1mm",
      "ALU ALU Base Foil (Printed) 210 mm  ±1mm"
    ]
  },
  {
    "rank": 2,
    "name": "ASENCE PHARMA PVT LTD",
    "valueUsdJulJun": 628875,
    "valuePkrJulJun": 174890138,
    "sharePctJulJun": 4.35,
    "cumShareJulJun": 11.39,
    "valueUsd2025": 317625,
    "valuePkr2025": 88331513,
    "sharePct2025": 2.36,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CROTAMITON BP"
    ]
  },
  {
    "rank": 3,
    "name": "MAYOLY INDUSTRIE",
    "valueUsdJulJun": 626745,
    "valuePkrJulJun": 174297729,
    "sharePctJulJun": 4.33,
    "cumShareJulJun": 15.73,
    "valueUsd2025": 415633,
    "valuePkr2025": 115587537,
    "sharePct2025": 3.09,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DIOCTAHEDRAL SMECTITE",
      "DIOCTAHEDRAL SMECTITE IPSEN SP."
    ]
  },
  {
    "rank": 4,
    "name": "CHIN CHEM",
    "valueUsdJulJun": 404250,
    "valuePkrJulJun": 112421925,
    "sharePctJulJun": 2.79,
    "cumShareJulJun": 18.52,
    "valueUsd2025": 339500,
    "valuePkr2025": 94414950,
    "sharePct2025": 2.52,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "GLYCERYL TRINITRATE(DILU. NITROGLYCERIN"
    ]
  },
  {
    "rank": 5,
    "name": "ROSE POLYMER IRAN",
    "valueUsdJulJun": 387900,
    "valuePkrJulJun": 107875000,
    "sharePctJulJun": 2.68,
    "cumShareJulJun": 21.2,
    "valueUsd2025": 266886,
    "valuePkr2025": 74221000,
    "sharePct2025": 1.98,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "WHITE SOFT PARAFFIN BP"
    ]
  },
  {
    "rank": 6,
    "name": "ZHEJIANG HUAHAI PHARMACE",
    "valueUsdJulJun": 345050,
    "valuePkrJulJun": 95958405,
    "sharePctJulJun": 2.39,
    "cumShareJulJun": 23.59,
    "valueUsd2025": 352800,
    "valuePkr2025": 98113680,
    "sharePct2025": 2.62,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "AZELAIC ACID",
      "LISINOPRIL DIHYDRATE USP",
      "VALSARTAN USP",
      "VORICONAZOLE(USP)"
    ]
  },
  {
    "rank": 7,
    "name": "ANUH PHARMA",
    "valueUsdJulJun": 312625,
    "valuePkrJulJun": 86941013,
    "sharePctJulJun": 2.16,
    "cumShareJulJun": 25.75,
    "valueUsd2025": 357150,
    "valuePkr2025": 99323415,
    "sharePct2025": 2.66,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CLOBETASOL PROPIONATE USP",
      "BETAMETHASONE DIPROPIONATE MICRONIZED BP",
      "BETAMETHASONE VALERATE (MICRONIZED) BP",
      "BETAMETHASONE SODIUM PHOSPHATE BP"
    ]
  },
  {
    "rank": 8,
    "name": "SRIKEM LABORATORIES",
    "valueUsdJulJun": 286600,
    "valuePkrJulJun": 79703460,
    "sharePctJulJun": 1.98,
    "cumShareJulJun": 27.73,
    "valueUsd2025": 202875,
    "valuePkr2025": 56419538,
    "sharePct2025": 1.51,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PERMETHRIN BP",
      "HYDROQUINONE (MICRONIZED) USP",
      "CLOTRIMAZOLE USP"
    ]
  },
  {
    "rank": 9,
    "name": "ANTIBIOTICE S.A.",
    "valueUsdJulJun": 267408,
    "valuePkrJulJun": 74366165,
    "sharePctJulJun": 1.85,
    "cumShareJulJun": 29.58,
    "valueUsd2025": 188176,
    "valuePkr2025": 52331746,
    "sharePct2025": 1.4,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "NYSTATIN BP"
    ]
  },
  {
    "rank": 10,
    "name": "KUNSHAN CHEMICALS (KUNSH",
    "valueUsdJulJun": 263900,
    "valuePkrJulJun": 73390590,
    "sharePctJulJun": 1.82,
    "cumShareJulJun": 31.4,
    "valueUsd2025": 449100,
    "valuePkr2025": 124894710,
    "sharePct2025": 3.34,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DOXYCYCLINE HYCLATE BP"
    ]
  },
  {
    "rank": 11,
    "name": "MICRO ORGO CHEM",
    "valueUsdJulJun": 262500,
    "valuePkrJulJun": 73001250,
    "sharePctJulJun": 1.81,
    "cumShareJulJun": 33.22,
    "valueUsd2025": 330000,
    "valuePkr2025": 91773000,
    "sharePct2025": 2.45,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "EFLORNITHINE HYDROCHLORIDE MONOHYDRATE M"
    ]
  },
  {
    "rank": 12,
    "name": "XELLIA PHARMACEUTICALS L",
    "valueUsdJulJun": 261670,
    "valuePkrJulJun": 72770427,
    "sharePctJulJun": 1.81,
    "cumShareJulJun": 35.03,
    "valueUsd2025": 170170,
    "valuePkr2025": 47324277,
    "sharePct2025": 1.27,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "BACITRACIN BP",
      "GRAMICIDIN USP"
    ]
  },
  {
    "rank": 13,
    "name": "IPCA LABORATOREIS LTD",
    "valueUsdJulJun": 253700,
    "valuePkrJulJun": 70553970,
    "sharePctJulJun": 1.75,
    "cumShareJulJun": 36.78,
    "valueUsd2025": 179500,
    "valuePkr2025": 49918950,
    "sharePct2025": 1.33,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "METOPROLOL TARTRATE USP"
    ]
  },
  {
    "rank": 14,
    "name": "AARTI DRUGS INDIA.",
    "valueUsdJulJun": 252000,
    "valuePkrJulJun": 70081200,
    "sharePctJulJun": 1.74,
    "cumShareJulJun": 38.52,
    "valueUsd2025": 396100,
    "valuePkr2025": 110155410,
    "sharePct2025": 2.94,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "KETOCONAZOLE BP"
    ]
  },
  {
    "rank": 15,
    "name": "EVONIK OPERATIONS GMBH",
    "valueUsdJulJun": 246174,
    "valuePkrJulJun": 68461027,
    "sharePctJulJun": 1.7,
    "cumShareJulJun": 40.23,
    "valueUsd2025": 151422,
    "valuePkr2025": 42110496,
    "sharePct2025": 1.13,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "METHACRYLIC ACID COPOLYMER DISPERSION"
    ]
  },
  {
    "rank": 16,
    "name": "JIANGXI MEDICINES AND HEALTH PRODUCTS I/E CO. LTD",
    "valueUsdJulJun": 221100,
    "valuePkrJulJun": 61487910,
    "sharePctJulJun": 1.53,
    "cumShareJulJun": 41.75,
    "valueUsd2025": 255610,
    "valuePkr2025": 71085141,
    "sharePct2025": 1.9,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DIPHENHYDRAMINE HYDROCHLORIDE BP",
      "CLINDAMYCIN PHOSPHATE USP",
      "GEMFIBROZIL USP",
      "GENTAMICIN SULPHATE BP"
    ]
  },
  {
    "rank": 17,
    "name": "ZHEJIANG TIANYU PHARMACEUTICAL CO. LTD.",
    "valueUsdJulJun": 213900,
    "valuePkrJulJun": 59485590,
    "sharePctJulJun": 1.48,
    "cumShareJulJun": 43.23,
    "valueUsd2025": 56550,
    "valuePkr2025": 15726555,
    "sharePct2025": 0.42,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "VALSARTAN USP",
      "OTESECONAZOLE",
      "MONTELUKAST SODIUM BP"
    ]
  },
  {
    "rank": 18,
    "name": "EDENOR TECHNOLOGY",
    "valueUsdJulJun": 202264,
    "valuePkrJulJun": 56249540,
    "sharePctJulJun": 1.4,
    "cumShareJulJun": 44.63,
    "valueUsd2025": 169270,
    "valuePkr2025": 47074030,
    "sharePct2025": 1.26,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SODIUM LAURYL SULPHATE BP",
      "SODIUM LAURYL ETHER SULPHATE BP",
      "STEARYL ALCOHOL BP",
      "CETYL ALCOHOL BP"
    ]
  },
  {
    "rank": 19,
    "name": "PHARMNOVA PVT LTD",
    "valueUsdJulJun": 198301,
    "valuePkrJulJun": 55147500,
    "sharePctJulJun": 1.37,
    "cumShareJulJun": 46,
    "valueUsd2025": 257039,
    "valuePkr2025": 71482500,
    "sharePct2025": 1.91,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HG CAP SIZE 3,CAP PURPLE,BODY PURPLE SYN",
      "HG CAP SIZE 2,CAP GREEN,BODY GREEN DOXYN",
      "HG CAP SIZE 3,CAP D-BLUE ,BODY D-BLUE EC",
      "HG CAP SIZE 2,CAP LIGHT GREN,BODY WHIT T",
      "HG CAPS SIZE 1 CAP DARK BLUE, BODY WHITE"
    ]
  },
  {
    "rank": 20,
    "name": "DFE PHARMA",
    "valueUsdJulJun": 194040,
    "valuePkrJulJun": 53962524,
    "sharePctJulJun": 1.34,
    "cumShareJulJun": 47.34,
    "valueUsd2025": 87800,
    "valuePkr2025": 24417180,
    "sharePct2025": 0.65,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LACTOSE ANHYDROUS 21 AN (DC GRADE USP/NF"
    ]
  },
  {
    "rank": 21,
    "name": "SHANDONG XINHUA PHARMACE",
    "valueUsdJulJun": 185595,
    "valuePkrJulJun": 51614107,
    "sharePctJulJun": 1.28,
    "cumShareJulJun": 48.63,
    "valueUsd2025": 142600,
    "valuePkr2025": 39657119,
    "sharePct2025": 1.06,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SALICYLIC ACID BP",
      "ASPIRIN (ACETYLSALICYLIC ACID) BP"
    ]
  },
  {
    "rank": 22,
    "name": "HABIB SUGAR MILLS LTD",
    "valueUsdJulJun": 174182,
    "valuePkrJulJun": 48440000,
    "sharePctJulJun": 1.2,
    "cumShareJulJun": 49.83,
    "valueUsd2025": 222006,
    "valuePkr2025": 61740000,
    "sharePct2025": 1.65,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SUCROSE BP"
    ]
  },
  {
    "rank": 23,
    "name": "AARIVA PHARMA PVT LTD",
    "valueUsdJulJun": 171600,
    "valuePkrJulJun": 47721960,
    "sharePctJulJun": 1.19,
    "cumShareJulJun": 51.02,
    "valueUsd2025": 171600,
    "valuePkr2025": 47721960,
    "sharePct2025": 1.28,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PERMETHRIN BP"
    ]
  },
  {
    "rank": 24,
    "name": "JRS PHARMA",
    "valueUsdJulJun": 166020,
    "valuePkrJulJun": 46170162,
    "sharePctJulJun": 1.15,
    "cumShareJulJun": 52.17,
    "valueUsd2025": 169544,
    "valuePkr2025": 47139008,
    "sharePct2025": 1.26,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MICROCRYSTALLINE CELLULOSE (PH 102) BP",
      "CROSCARMELLOSE SODIUM BP",
      "MICROCRYSTALLINE CELLULOSE (PH 112) BP",
      "MICROCRYSTALLINE CELLULOSE (PH 101) BP",
      "HYDROGENATED VEGETABLE OIL BP"
    ]
  },
  {
    "rank": 25,
    "name": "CRODA CHEMICALS, SINGAPORE.",
    "valueUsdJulJun": 164682,
    "valuePkrJulJun": 45798000,
    "sharePctJulJun": 1.14,
    "cumShareJulJun": 53.3,
    "valueUsd2025": 188734,
    "valuePkr2025": 52487000,
    "sharePct2025": 1.4,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SORBITAN MONOSTEARATE USP",
      "SORBITAN SESQUIOLEATE (SP 83-LQ-(SG) BP",
      "CETOMACROGOL 1000 BP 98",
      "STEARYL ALCOHOL BP",
      "LANOLIN ANHYDROUS USP/NF"
    ]
  },
  {
    "rank": 26,
    "name": "OM LABORATORIES",
    "valueUsdJulJun": 162875,
    "valuePkrJulJun": 45295538,
    "sharePctJulJun": 1.13,
    "cumShareJulJun": 54.43,
    "valueUsd2025": 174250,
    "valuePkr2025": 48458925,
    "sharePct2025": 1.3,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "IVERMECTIN (MICRONIZED)"
    ]
  },
  {
    "rank": 27,
    "name": "DOW CHEMICAL PACIFIC PTE LTD",
    "valueUsdJulJun": 155891,
    "valuePkrJulJun": 43353150,
    "sharePctJulJun": 1.08,
    "cumShareJulJun": 55.51,
    "valueUsd2025": 88141,
    "valuePkr2025": 24512150,
    "sharePct2025": 0.66,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PROPYLENE GLYCOL BP"
    ]
  },
  {
    "rank": 28,
    "name": "TIANJIN TIANYAO PHARMACEUTICAL CO. LTD",
    "valueUsdJulJun": 151300,
    "valuePkrJulJun": 42076530,
    "sharePctJulJun": 1.05,
    "cumShareJulJun": 56.55,
    "valueUsd2025": 148400,
    "valuePkr2025": 41270040,
    "sharePct2025": 1.1,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DIFLUCORTOLONE VALERATE (MICRONIZED) BP",
      "DEXAMETHASONE (MICRONIZED) BP",
      "FLUOCINOLONE ACETONIDE USP"
    ]
  },
  {
    "rank": 29,
    "name": "HANGZHOU ZHONGBAO IMP. &",
    "valueUsdJulJun": 137290,
    "valuePkrJulJun": 38180349,
    "sharePctJulJun": 0.95,
    "cumShareJulJun": 57.5,
    "valueUsd2025": 144980,
    "valuePkr2025": 40318938,
    "sharePct2025": 1.08,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "D-CHIROINOSITOL",
      "MYO-INOSITOL",
      "UREA",
      "ETHYL VANILLIN",
      "IMIDUREA"
    ]
  },
  {
    "rank": 30,
    "name": "OPTIMUS DRUGS PRIVATE LIMITED",
    "valueUsdJulJun": 133750,
    "valuePkrJulJun": 37195875,
    "sharePctJulJun": 0.92,
    "cumShareJulJun": 58.43,
    "valueUsd2025": 89425,
    "valuePkr2025": 24869093,
    "sharePct2025": 0.66,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LULICONAZOLE MS"
    ]
  },
  {
    "rank": 31,
    "name": "JRS PHARMA-RETTENMAIER NATURAL FIBER (CHANGZHOU)",
    "valueUsdJulJun": 131446,
    "valuePkrJulJun": 36555220,
    "sharePctJulJun": 0.91,
    "cumShareJulJun": 59.34,
    "valueUsd2025": 21580,
    "valuePkr2025": 6001398,
    "sharePct2025": 0.16,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MICROCRYSTALLINE CELLULOSE (PH 112) BP"
    ]
  },
  {
    "rank": 32,
    "name": "LCY CHEMICAL CORP.",
    "valueUsdJulJun": 131237,
    "valuePkrJulJun": 36497120,
    "sharePctJulJun": 0.91,
    "cumShareJulJun": 60.24,
    "valueUsd2025": 137882,
    "valuePkr2025": 38344950,
    "sharePct2025": 1.03,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM FORMATE MS",
      "ISOPROPOYL ALCOHOL BP"
    ]
  },
  {
    "rank": 33,
    "name": "KOHINOOR SOAP, PAKISTAN",
    "valueUsdJulJun": 127328,
    "valuePkrJulJun": 35410000,
    "sharePctJulJun": 0.88,
    "cumShareJulJun": 61.12,
    "valueUsd2025": 119399,
    "valuePkr2025": 33205000,
    "sharePct2025": 0.89,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "GLYCEROL BP",
      "GLYCERIN (GLYCEROL) BP"
    ]
  },
  {
    "rank": 34,
    "name": "SURIACHEM SDN BHD",
    "valueUsdJulJun": 121405,
    "valuePkrJulJun": 33762753,
    "sharePctJulJun": 0.84,
    "cumShareJulJun": 61.96,
    "valueUsd2025": 79997,
    "valuePkr2025": 22247274,
    "sharePct2025": 0.59,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ISOPROPYL MYRISTATE BP",
      "CETOSTEARYL ALCOHOL BP"
    ]
  },
  {
    "rank": 35,
    "name": "ROQUETTE",
    "valueUsdJulJun": 120400,
    "valuePkrJulJun": 33483240,
    "sharePctJulJun": 0.83,
    "cumShareJulJun": 62.79,
    "valueUsd2025": 20200,
    "valuePkr2025": 5617620,
    "sharePct2025": 0.15,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PREGELATINIZED STARCH USP/NF"
    ]
  },
  {
    "rank": 36,
    "name": "STAR-TECH & JRS SPECIALT",
    "valueUsdJulJun": 120250,
    "valuePkrJulJun": 33441525,
    "sharePctJulJun": 0.83,
    "cumShareJulJun": 63.63,
    "valueUsd2025": 92500,
    "valuePkr2025": 25724250,
    "sharePct2025": 0.69,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "COPOVIDONE (PLASDONE-S630) BP"
    ]
  },
  {
    "rank": 37,
    "name": "COLORCON LIMITED,UK",
    "valueUsdJulJun": 119130,
    "valuePkrJulJun": 33129914,
    "sharePctJulJun": 0.82,
    "cumShareJulJun": 64.45,
    "valueUsd2025": 82700,
    "valuePkr2025": 22998731,
    "sharePct2025": 0.61,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "OPADRY ENTERIC YELLOW 94S52698 MS",
      "OPADRY WHITE Y-1-7000 MS",
      "OPADRY II BLUE (85F205025)",
      "OPADRY II GREEN 85G11948 MS",
      "OPADRY II YELLOW (85G32558)",
      "OPADRY II PINK (85F240248)",
      "OPADRY II RED (85F25467)",
      "OPADRY II BLUE 85F90618"
    ]
  },
  {
    "rank": 38,
    "name": "MEDIC FOIL",
    "valueUsdJulJun": 110280,
    "valuePkrJulJun": 30668785,
    "sharePctJulJun": 0.76,
    "cumShareJulJun": 65.21,
    "valueUsd2025": 59600,
    "valuePkr2025": 16574677,
    "sharePct2025": 0.44,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "AL.FOIL 211MM CARDNIT 2.6MG TAB.(COM)",
      "AL.FOIL ASCARD 75MG 214MM"
    ]
  },
  {
    "rank": 39,
    "name": "SHANGHAI PHARMA GROUP CHONGZHOU KONY PHARMACEUTICAL CO., LTD.",
    "valueUsdJulJun": 108550,
    "valuePkrJulJun": 30187755,
    "sharePctJulJun": 0.75,
    "cumShareJulJun": 65.96,
    "valueUsd2025": 91850,
    "valuePkr2025": 25543485,
    "sharePct2025": 0.68,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "FAMCICLOVIR USP"
    ]
  },
  {
    "rank": 40,
    "name": "WEIFANG SHENTAI MEDICINE CO LTD",
    "valueUsdJulJun": 106889,
    "valuePkrJulJun": 29725900,
    "sharePctJulJun": 0.74,
    "cumShareJulJun": 66.7,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ANHYDROUS GLUCOSE(EXP) BP"
    ]
  },
  {
    "rank": 41,
    "name": "ALPHAMED FORMULATION, INDIA",
    "valueUsdJulJun": 105900,
    "valuePkrJulJun": 29450790,
    "sharePctJulJun": 0.73,
    "cumShareJulJun": 67.43,
    "valueUsd2025": 69000,
    "valuePkr2025": 19188900,
    "sharePct2025": 0.51,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ITRACONAZOLE PELLETS 22.2% W/W(MS)"
    ]
  },
  {
    "rank": 42,
    "name": "ZHEJIANG HISUN PHARMACEUTICAL CO. LTD.",
    "valueUsdJulJun": 104450,
    "valuePkrJulJun": 29047545,
    "sharePctJulJun": 0.72,
    "cumShareJulJun": 68.16,
    "valueUsd2025": 92400,
    "valuePkr2025": 25696440,
    "sharePct2025": 0.69,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "IVERMECTIN USP",
      "IVERMECTIN (MICRONIZED)"
    ]
  },
  {
    "rank": 43,
    "name": "MSM PRAI BERHAD (3573-D)",
    "valueUsdJulJun": 99283,
    "valuePkrJulJun": 27610500,
    "sharePctJulJun": 0.69,
    "cumShareJulJun": 68.84,
    "valueUsd2025": 76090,
    "valuePkr2025": 21160500,
    "sharePct2025": 0.57,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SUCROSE (IMPORTED) BP"
    ]
  },
  {
    "rank": 44,
    "name": "PRECISE BIOPHARMA PVT LT",
    "valueUsdJulJun": 94050,
    "valuePkrJulJun": 26155305,
    "sharePctJulJun": 0.65,
    "cumShareJulJun": 69.49,
    "valueUsd2025": 47850,
    "valuePkr2025": 13307085,
    "sharePct2025": 0.36,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DORZOLAMIDE HYDROCHLORIDE USP",
      "TIMOLOL MALEATE USP"
    ]
  },
  {
    "rank": 45,
    "name": "NITIKA PHARMACEUTICAL SP",
    "valueUsdJulJun": 93010,
    "valuePkrJulJun": 25866081,
    "sharePctJulJun": 0.64,
    "cumShareJulJun": 70.14,
    "valueUsd2025": 100846,
    "valuePkr2025": 28045265,
    "sharePct2025": 0.75,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MAGNESIUM STEARATE BP",
      "PURIFIED TALC BP",
      "MICROCRYSTALLINE CELLULOSE (PH 112) BP",
      "DIMETHICONE 350",
      "POTASSIUM CHLORIDE (API) BP",
      "CROSCARMELLOSE SODIUM BP",
      "SODIUM STEARYL FUMARATE"
    ]
  },
  {
    "rank": 46,
    "name": "SMAART PHARMACEUTICALS",
    "valueUsdJulJun": 91700,
    "valuePkrJulJun": 25501770,
    "sharePctJulJun": 0.63,
    "cumShareJulJun": 70.77,
    "valueUsd2025": 66000,
    "valuePkr2025": 18354600,
    "sharePct2025": 0.49,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "NEBIVILOL HCL BP"
    ]
  },
  {
    "rank": 47,
    "name": "PETROLEUM SPECIALITIES FZE,",
    "valueUsdJulJun": 86300,
    "valuePkrJulJun": 24000000,
    "sharePctJulJun": 0.6,
    "cumShareJulJun": 71.37,
    "valueUsd2025": 75939,
    "valuePkr2025": 21118500,
    "sharePct2025": 0.56,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIGHT LIQUID PARAFFIN BP"
    ]
  },
  {
    "rank": 48,
    "name": "ZHEJIANG XIANJU PHARMACEUICAL CO.,LTD",
    "valueUsdJulJun": 85000,
    "valuePkrJulJun": 23638500,
    "sharePctJulJun": 0.59,
    "cumShareJulJun": 71.95,
    "valueUsd2025": 91555,
    "valuePkr2025": 25461446,
    "sharePct2025": 0.68,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "BETAMETHASONE VALERATE (MICRONIZED) BP",
      "BETAMETHASONE DIPROPIONATE MICRONIZED BP"
    ]
  },
  {
    "rank": 49,
    "name": "SYNERGENE ACTIVE INGREDI",
    "valueUsdJulJun": 81756,
    "valuePkrJulJun": 22736205,
    "sharePctJulJun": 0.57,
    "cumShareJulJun": 72.52,
    "valueUsd2025": 43012,
    "valuePkr2025": 11961637,
    "sharePct2025": 0.32,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SUMATRIPTAN SUCCINATE BP",
      "TERBINAFINE HYDROCHLORIDE BP",
      "FLUCONAZOLE(MICRONIZED) USP"
    ]
  },
  {
    "rank": 50,
    "name": "PIRAMAL HEALTHCARE UK LT",
    "valueUsdJulJun": 81100,
    "valuePkrJulJun": 22553910,
    "sharePctJulJun": 0.56,
    "cumShareJulJun": 73.08,
    "valueUsd2025": 49883,
    "valuePkr2025": 13872462,
    "sharePct2025": 0.37,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MISOPROSTOL DISPERSION (1% W/W) USP"
    ]
  },
  {
    "rank": 51,
    "name": "HANGZHOU ZHONGMEI HUADONG PHARMACEUTICAL CO., LTD.",
    "valueUsdJulJun": 78500,
    "valuePkrJulJun": 21830850,
    "sharePctJulJun": 0.54,
    "cumShareJulJun": 73.62,
    "valueUsd2025": 26000,
    "valuePkr2025": 7230600,
    "sharePct2025": 0.19,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "POLYMYXIN B SULPHATE BP"
    ]
  },
  {
    "rank": 52,
    "name": "MERCK KGAA, GERMANY",
    "valueUsdJulJun": 73939,
    "valuePkrJulJun": 20562400,
    "sharePctJulJun": 0.51,
    "cumShareJulJun": 74.13,
    "valueUsd2025": 68582,
    "valuePkr2025": 19072733,
    "sharePct2025": 0.51,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SALICYLIC ACID (MICRONIZED) BP",
      "ORTHO PHOSPHORIC ACID 85 % BP"
    ]
  },
  {
    "rank": 53,
    "name": "VIRDEV INTERMEDIATES PVT. LTD",
    "valueUsdJulJun": 72600,
    "valuePkrJulJun": 20190060,
    "sharePctJulJun": 0.5,
    "cumShareJulJun": 74.64,
    "valueUsd2025": 34500,
    "valuePkr2025": 9594450,
    "sharePct2025": 0.26,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ADAPALENE BP"
    ]
  },
  {
    "rank": 54,
    "name": "RAFHAN MAIZE PRODUCTS CO",
    "valueUsdJulJun": 70812,
    "valuePkrJulJun": 19692756,
    "sharePctJulJun": 0.49,
    "cumShareJulJun": 75.12,
    "valueUsd2025": 96368,
    "valuePkr2025": 26800019,
    "sharePct2025": 0.72,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "DEXTROSE MONOHYDRATE USP",
      "MAIZE STARCH BP",
      "LIQUID GLUCOSE USP/NF"
    ]
  },
  {
    "rank": 55,
    "name": "WOCKHARDT LIMITED",
    "valueUsdJulJun": 68475,
    "valuePkrJulJun": 19042898,
    "sharePctJulJun": 0.47,
    "cumShareJulJun": 75.6,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DEXTROMETHORPHAN HYDROBROMIDE BP"
    ]
  },
  {
    "rank": 56,
    "name": "HABIB RICE PRODUCTS",
    "valueUsdJulJun": 67917,
    "valuePkrJulJun": 18887800,
    "sharePctJulJun": 0.47,
    "cumShareJulJun": 76.07,
    "valueUsd2025": 43492,
    "valuePkr2025": 12095050,
    "sharePct2025": 0.32,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIQUID SORBITOL (NON-CRYSTALLISING)  BP"
    ]
  },
  {
    "rank": 57,
    "name": "HENAN PURUI PHARMACEUTICAL CO LTD",
    "valueUsdJulJun": 67338,
    "valuePkrJulJun": 18726559,
    "sharePctJulJun": 0.47,
    "cumShareJulJun": 76.53,
    "valueUsd2025": 71300,
    "valuePkr2025": 19828530,
    "sharePct2025": 0.53,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "BRINZOLAMIDE (MICRONIZED AND STERILE)USP",
      "NEPAFENAC MS",
      "OLOPATADINE HYDROCHLORIDE USP"
    ]
  },
  {
    "rank": 58,
    "name": "MERCK GERMANY",
    "valueUsdJulJun": 64725,
    "valuePkrJulJun": 18000000,
    "sharePctJulJun": 0.45,
    "cumShareJulJun": 76.98,
    "valueUsd2025": 62567,
    "valuePkr2025": 17400000,
    "sharePct2025": 0.47,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SULFUR BP"
    ]
  },
  {
    "rank": 59,
    "name": "IPCA LABORATORIES LIMITE",
    "valueUsdJulJun": 60075,
    "valuePkrJulJun": 16706858,
    "sharePctJulJun": 0.42,
    "cumShareJulJun": 77.4,
    "valueUsd2025": 70125,
    "valuePkr2025": 19501763,
    "sharePct2025": 0.52,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HYDROXYCHLOROQUINE SULFATE USP"
    ]
  },
  {
    "rank": 60,
    "name": "CRODA EUROPE (RAWCLIFFE BRIDGE)",
    "valueUsdJulJun": 58972,
    "valuePkrJulJun": 16400000,
    "sharePctJulJun": 0.41,
    "cumShareJulJun": 77.8,
    "valueUsd2025": 58972,
    "valuePkr2025": 16400000,
    "sharePct2025": 0.44,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LANOLIN ANHYDROUS USP/NF"
    ]
  },
  {
    "rank": 61,
    "name": "KOPRAN RESEARCH LABORATORIES",
    "valueUsdJulJun": 56775,
    "valuePkrJulJun": 15789128,
    "sharePctJulJun": 0.39,
    "cumShareJulJun": 78.2,
    "valueUsd2025": 28125,
    "valuePkr2025": 7821563,
    "sharePct2025": 0.21,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TICAGRELOR"
    ]
  },
  {
    "rank": 62,
    "name": "CHIERON ACTIVE INGREDIENTS PVT. LTD",
    "valueUsdJulJun": 54100,
    "valuePkrJulJun": 15045210,
    "sharePctJulJun": 0.37,
    "cumShareJulJun": 78.57,
    "valueUsd2025": 35500,
    "valuePkr2025": 9872550,
    "sharePct2025": 0.26,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "VILDAGLIPTIN MS",
      "LACOSAMIDE BP"
    ]
  },
  {
    "rank": 63,
    "name": "MERCK GERMANY.",
    "valueUsdJulJun": 53015,
    "valuePkrJulJun": 14743446,
    "sharePctJulJun": 0.37,
    "cumShareJulJun": 78.94,
    "valueUsd2025": 46395,
    "valuePkr2025": 12902518,
    "sharePct2025": 0.34,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ANHYDROUS SODIUM SULPHITE BP",
      "SODIUM METABISULPHITE BP",
      "BORIC ACID BP",
      "DISODIUM HYDROGEN PHOSPHATE DIHYDRATE BP",
      "BUTYLATED HYDROXYTOLUENE BP",
      "SODIUM PERBORATE BP",
      "BENZYL ALCOHOL BP"
    ]
  },
  {
    "rank": 64,
    "name": "DSM-FIRMENICH",
    "valueUsdJulJun": 52780,
    "valuePkrJulJun": 14678118,
    "sharePctJulJun": 0.36,
    "cumShareJulJun": 79.3,
    "valueUsd2025": 26000,
    "valuePkr2025": 7230600,
    "sharePct2025": 0.19,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "VANILLA DURAROME FLAVOR 501465 TD1591"
    ]
  },
  {
    "rank": 65,
    "name": "TAIZHOU BONA CHEMICAL CO",
    "valueUsdJulJun": 52500,
    "valuePkrJulJun": 14600250,
    "sharePctJulJun": 0.36,
    "cumShareJulJun": 79.66,
    "valueUsd2025": 53550,
    "valuePkr2025": 14892255,
    "sharePct2025": 0.4,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TRETINOIN(MICRONIZED) USP"
    ]
  },
  {
    "rank": 66,
    "name": "MERCK KGAA",
    "valueUsdJulJun": 51742,
    "valuePkrJulJun": 14389500,
    "sharePctJulJun": 0.36,
    "cumShareJulJun": 80.02,
    "valueUsd2025": 48696,
    "valuePkr2025": 13542360,
    "sharePct2025": 0.36,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "MEGLUMINE",
      "ANHYDROUS CALCIUM HYDROGEN PHOSPHATE",
      "HYDROCHLORIC ACID 37% BP"
    ]
  },
  {
    "rank": 67,
    "name": "JOYANG LABORATORIES",
    "valueUsdJulJun": 50304,
    "valuePkrJulJun": 13989542,
    "sharePctJulJun": 0.35,
    "cumShareJulJun": 80.37,
    "valueUsd2025": 54500,
    "valuePkr2025": 15156450,
    "sharePct2025": 0.41,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "FUSIDIC ACID (MICRONIZED) BP",
      "BACITRACIN ZINC BP"
    ]
  },
  {
    "rank": 68,
    "name": "LUBRIZOL",
    "valueUsdJulJun": 49932,
    "valuePkrJulJun": 13886202,
    "sharePctJulJun": 0.35,
    "cumShareJulJun": 80.72,
    "valueUsd2025": 49920,
    "valuePkr2025": 13882891,
    "sharePct2025": 0.37,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CARBOMER 971P",
      "CARBOMER 980"
    ]
  },
  {
    "rank": 69,
    "name": "INTERMED SDN BHD.",
    "valueUsdJulJun": 49650,
    "valuePkrJulJun": 13807665,
    "sharePctJulJun": 0.34,
    "cumShareJulJun": 81.06,
    "valueUsd2025": 72000,
    "valuePkr2025": 20023200,
    "sharePct2025": 0.54,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "STEARIC ACID (MICRONIZED) USP/NF"
    ]
  },
  {
    "rank": 70,
    "name": "SHANDONG BOYUAN PHARMACEUTICAL CO LTD.",
    "valueUsdJulJun": 49500,
    "valuePkrJulJun": 13765950,
    "sharePctJulJun": 0.34,
    "cumShareJulJun": 81.4,
    "valueUsd2025": 90000,
    "valuePkr2025": 25029000,
    "sharePct2025": 0.67,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TERBINAFINE HYDROCHLORIDE BP"
    ]
  },
  {
    "rank": 71,
    "name": "SNA HEALTHCARE PVT. LTD.",
    "valueUsdJulJun": 48875,
    "valuePkrJulJun": 13592138,
    "sharePctJulJun": 0.34,
    "cumShareJulJun": 81.74,
    "valueUsd2025": 9625,
    "valuePkr2025": 2676713,
    "sharePct2025": 0.07,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HYDROQUINONE (MICRONIZED) USP"
    ]
  },
  {
    "rank": 72,
    "name": "BENOVA LABS PVT. LTD.",
    "valueUsdJulJun": 47475,
    "valuePkrJulJun": 13202798,
    "sharePctJulJun": 0.33,
    "cumShareJulJun": 82.07,
    "valueUsd2025": 43600,
    "valuePkr2025": 12125160,
    "sharePct2025": 0.32,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LINEZOLID USP"
    ]
  },
  {
    "rank": 73,
    "name": "YANTAI JUSTAWARE PHARMA (FUAN PHARMACEUTICAL GROUP)",
    "valueUsdJulJun": 47000,
    "valuePkrJulJun": 13070700,
    "sharePctJulJun": 0.32,
    "cumShareJulJun": 82.39,
    "valueUsd2025": 23000,
    "valuePkr2025": 6396300,
    "sharePct2025": 0.17,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "GENTAMICIN SULPHATE BP"
    ]
  },
  {
    "rank": 74,
    "name": "SYNTHIMED LABS PRIVATE LIMITED",
    "valueUsdJulJun": 45000,
    "valuePkrJulJun": 12514500,
    "sharePctJulJun": 0.31,
    "cumShareJulJun": 82.7,
    "valueUsd2025": 20750,
    "valuePkr2025": 5770575,
    "sharePct2025": 0.15,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CLOPIDOGREL BISULFATE USP"
    ]
  },
  {
    "rank": 75,
    "name": "MOREPEN LABORATORIES LIM",
    "valueUsdJulJun": 43721,
    "valuePkrJulJun": 12158880,
    "sharePctJulJun": 0.3,
    "cumShareJulJun": 83.01,
    "valueUsd2025": 60846,
    "valuePkr2025": 16921342,
    "sharePct2025": 0.45,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LORATADINE (MICRONIZED) USP",
      "MONTELUKAST SODIUM BP"
    ]
  },
  {
    "rank": 76,
    "name": "NEXCHEM PHARMACEUTICALS.CO.,LTD",
    "valueUsdJulJun": 42600,
    "valuePkrJulJun": 11847060,
    "sharePctJulJun": 0.29,
    "cumShareJulJun": 83.3,
    "valueUsd2025": 55300,
    "valuePkr2025": 15378930,
    "sharePct2025": 0.41,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "AZITHROMYCIN DIHYDRATE USP",
      "AZITHROMYCIN DIHYDRATE USP (MICRONIZED)"
    ]
  },
  {
    "rank": 77,
    "name": "REDSON PHARMACEUTICAL / REXIN LABORATORIES LTD",
    "valueUsdJulJun": 42400,
    "valuePkrJulJun": 11791440,
    "sharePctJulJun": 0.29,
    "cumShareJulJun": 83.59,
    "valueUsd2025": 42400,
    "valuePkr2025": 11791440,
    "sharePct2025": 0.32,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PRALIDOXIME CHLORIDE USP"
    ]
  },
  {
    "rank": 78,
    "name": "VIKRAM THERMO INDIA LTD",
    "valueUsdJulJun": 40500,
    "valuePkrJulJun": 11263050,
    "sharePctJulJun": 0.28,
    "cumShareJulJun": 83.87,
    "valueUsd2025": 59400,
    "valuePkr2025": 16519140,
    "sharePct2025": 0.44,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "METHACRYLIC ACID COPOLYMER DISPERSION"
    ]
  },
  {
    "rank": 79,
    "name": "SHANDONG CHENGHUISHUANGD",
    "valueUsdJulJun": 40450,
    "valuePkrJulJun": 11249145,
    "sharePctJulJun": 0.28,
    "cumShareJulJun": 84.15,
    "valueUsd2025": 28900,
    "valuePkr2025": 8037090,
    "sharePct2025": 0.21,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LIDOCAINE BP",
      "VONOPRAZAN FUMARATE"
    ]
  },
  {
    "rank": 80,
    "name": "KAHL GMBH & CO. KG",
    "valueUsdJulJun": 38475,
    "valuePkrJulJun": 10700000,
    "sharePctJulJun": 0.27,
    "cumShareJulJun": 84.42,
    "valueUsd2025": 17799,
    "valuePkr2025": 4950000,
    "sharePct2025": 0.13,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "WHITE BEESWAX BP",
      "BEESWAX SUBSTITUTE (KAHL WAX 1540)"
    ]
  },
  {
    "rank": 81,
    "name": "PERFUME SUPPLY COMPANY.",
    "valueUsdJulJun": 38018,
    "valuePkrJulJun": 10572800,
    "sharePctJulJun": 0.26,
    "cumShareJulJun": 84.68,
    "valueUsd2025": 35642,
    "valuePkr2025": 9912000,
    "sharePct2025": 0.26,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PHENYLETHYL ALCOHOL USP/NF"
    ]
  },
  {
    "rank": 82,
    "name": "FUJIAN COMHONY BIO TECHN",
    "valueUsdJulJun": 37980,
    "valuePkrJulJun": 10562238,
    "sharePctJulJun": 0.26,
    "cumShareJulJun": 84.94,
    "valueUsd2025": 37980,
    "valuePkr2025": 10562238,
    "sharePct2025": 0.28,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "FUSIDIC ACID (MICRONIZED) BP"
    ]
  },
  {
    "rank": 83,
    "name": "HUBEI HENGAN FULIN PHARM",
    "valueUsdJulJun": 36000,
    "valuePkrJulJun": 10011600,
    "sharePctJulJun": 0.25,
    "cumShareJulJun": 85.19,
    "valueUsd2025": 30000,
    "valuePkr2025": 8343000,
    "sharePct2025": 0.22,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HYDROQUINONE (MICRONIZED) USP"
    ]
  },
  {
    "rank": 84,
    "name": "CHANGZHOU PHARMACEUTICAL",
    "valueUsdJulJun": 35250,
    "valuePkrJulJun": 9803025,
    "sharePctJulJun": 0.24,
    "cumShareJulJun": 85.44,
    "valueUsd2025": 36000,
    "valuePkr2025": 10011600,
    "sharePct2025": 0.27,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "THALIDOMIDE USP"
    ]
  },
  {
    "rank": 85,
    "name": "ZHEJIANG YONGTAI PHARMACEUTICAL CO., LTD",
    "valueUsdJulJun": 35200,
    "valuePkrJulJun": 9789120,
    "sharePctJulJun": 0.24,
    "cumShareJulJun": 85.68,
    "valueUsd2025": 18000,
    "valuePkr2025": 5005800,
    "sharePct2025": 0.13,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SITAGLIPTIN PHOSPHATE USP"
    ]
  },
  {
    "rank": 86,
    "name": "IFF",
    "valueUsdJulJun": 34406,
    "valuePkrJulJun": 9577214,
    "sharePctJulJun": 0.24,
    "cumShareJulJun": 85.92,
    "valueUsd2025": 37846,
    "valuePkr2025": 10534935,
    "sharePct2025": 0.28,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [
      "ORANGE POWDER FLAVOUR TS7017 MS"
    ]
  },
  {
    "rank": 87,
    "name": "WEIFANG SHENGTAI MEDICIN",
    "valueUsdJulJun": 34375,
    "valuePkrJulJun": 9559688,
    "sharePctJulJun": 0.24,
    "cumShareJulJun": 86.16,
    "valueUsd2025": 86375,
    "valuePkr2025": 24020888,
    "sharePct2025": 0.64,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ANHYDROUS GLUCOSE BP"
    ]
  },
  {
    "rank": 88,
    "name": "ZHEJIANG EAST-ASIA PHARM",
    "valueUsdJulJun": 34313,
    "valuePkrJulJun": 9542306,
    "sharePctJulJun": 0.24,
    "cumShareJulJun": 86.39,
    "valueUsd2025": 36613,
    "valuePkr2025": 10181936,
    "sharePct2025": 0.27,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LEVOFLOXACIN HEMIHYDRATE USP"
    ]
  },
  {
    "rank": 89,
    "name": "CTX LIFESCIENCES PVT. LTD",
    "valueUsdJulJun": 34200,
    "valuePkrJulJun": 9511020,
    "sharePctJulJun": 0.24,
    "cumShareJulJun": 86.63,
    "valueUsd2025": 11400,
    "valuePkr2025": 3170340,
    "sharePct2025": 0.08,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PREGABALIN BP"
    ]
  },
  {
    "rank": 90,
    "name": "MATRIX OLEOCHEM SDN-BHD,MALAYSIA",
    "valueUsdJulJun": 32927,
    "valuePkrJulJun": 9157000,
    "sharePctJulJun": 0.23,
    "cumShareJulJun": 86.86,
    "valueUsd2025": 31223,
    "valuePkr2025": 8683000,
    "sharePct2025": 0.23,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "COCONUT DIETHANOLAMIDE MS",
      "COCAMIDOPROPYL BETAINE 30%"
    ]
  },
  {
    "rank": 91,
    "name": "SUPRIYA LIFESCIENCE LTD.",
    "valueUsdJulJun": 32388,
    "valuePkrJulJun": 9006964,
    "sharePctJulJun": 0.22,
    "cumShareJulJun": 87.08,
    "valueUsd2025": 47425,
    "valuePkr2025": 13188893,
    "sharePct2025": 0.35,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CHLORPHENAMINE MALEATE BP",
      "TRAMADOL HYDROCHLORIDE USP",
      "SALBUTAMOL SULPHATE BP"
    ]
  },
  {
    "rank": 92,
    "name": "SUZHOU CAPSUGEL",
    "valueUsdJulJun": 31005,
    "valuePkrJulJun": 8622491,
    "sharePctJulJun": 0.21,
    "cumShareJulJun": 87.29,
    "valueUsd2025": 44124,
    "valuePkr2025": 12270815,
    "sharePct2025": 0.33,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "EMPTY VEGETABLE CAPS WHITE OPAQUE Sz ‘0’",
      "HG CAP SIZE-0, CAP ORANGE, BODY WHITE TR",
      "HG CAP SIZE 3,CAP PURPL OPQ,BODY WHIT OP",
      "HG  CAP SIZE 3,CAP BODY PINK SYNGAB 75mg",
      "HG CAP SIZE 2,CAP YELLOW,BODY YELLOW SYN",
      "HG CAP SIZE 0,CAP WHITE,BODY LIGHT GREEN",
      "HG CAP SIZE 3,CAP D-PURPLE,BODY D-PURPLE",
      "HG CAP SIZE 3,CAP PURPLE,BODY PURPLE SYN",
      "HG CAP SIZE 3,CAP D-BLUE ,BODY D-BLUE EC",
      "HG CAP SIZE 2,CAP GREEN,BODY GREEN DOXYN",
      "HG CAP SIZE-1, CAP BLUE-OP, BODY WHITE-O",
      "HG CAPSULES SZ=2,CAPS ORCHID BODY(WHITE)",
      "HG CAP SIZE 0,CAP LIGHT PINK,BODY PINK O",
      "HG CAP SIZE 2,CAP LIGHT PINK,BODY WHITE"
    ]
  },
  {
    "rank": 93,
    "name": "DIVI’S LABORATORIES LIMI",
    "valueUsdJulJun": 30400,
    "valuePkrJulJun": 8454240,
    "sharePctJulJun": 0.21,
    "cumShareJulJun": 87.5,
    "valueUsd2025": 25200,
    "valuePkr2025": 7008120,
    "sharePct2025": 0.19,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "NAPROXEN SODIUM USP"
    ]
  },
  {
    "rank": 94,
    "name": "CRODA SINGAPORE PTE LTD",
    "valueUsdJulJun": 30295,
    "valuePkrJulJun": 8425000,
    "sharePctJulJun": 0.21,
    "cumShareJulJun": 87.71,
    "valueUsd2025": 27585,
    "valuePkr2025": 7671300,
    "sharePct2025": 0.21,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POLYSORBATE 20 (TWEEN 20)",
      "POLYSORBATE 80(TWEEN 80)USP/NF/BP",
      "ARLACEL 983",
      "ARLACEL 165"
    ]
  },
  {
    "rank": 95,
    "name": "EVONIC INDUSTRIES",
    "valueUsdJulJun": 30064,
    "valuePkrJulJun": 8360770,
    "sharePctJulJun": 0.21,
    "cumShareJulJun": 87.92,
    "valueUsd2025": 29752,
    "valuePkr2025": 8273980,
    "sharePct2025": 0.22,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "COLLOIDAL SILICON DIOXIDE USP/NF"
    ]
  },
  {
    "rank": 96,
    "name": "CADILA PHARMACEUTICALS LTD",
    "valueUsdJulJun": 30000,
    "valuePkrJulJun": 8343000,
    "sharePctJulJun": 0.21,
    "cumShareJulJun": 88.13,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "NEBIVILOL HCL BP"
    ]
  },
  {
    "rank": 97,
    "name": "S.M.C PAKISTAN",
    "valueUsdJulJun": 28576,
    "valuePkrJulJun": 7947073,
    "sharePctJulJun": 0.2,
    "cumShareJulJun": 88.33,
    "valueUsd2025": 30480,
    "valuePkr2025": 8476477,
    "sharePct2025": 0.23,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PERFUME APPLE MS",
      "OIL OF SWEET ORANGE 3720 MS",
      "OIL OF LEMON EXCELLENT EF MS"
    ]
  },
  {
    "rank": 98,
    "name": "OLEOFINE ORGANICS SDN. BHD, MALAYSIA",
    "valueUsdJulJun": 27630,
    "valuePkrJulJun": 7684000,
    "sharePctJulJun": 0.19,
    "cumShareJulJun": 88.52,
    "valueUsd2025": 25095,
    "valuePkr2025": 6979000,
    "sharePct2025": 0.19,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "GLYCERYL MONOSTEARATE USP/NF"
    ]
  },
  {
    "rank": 99,
    "name": "JIANGSU NHWA PHARMACEUTICAL CO. LTD.",
    "valueUsdJulJun": 27591,
    "valuePkrJulJun": 7673057,
    "sharePctJulJun": 0.19,
    "cumShareJulJun": 88.71,
    "valueUsd2025": 20891,
    "valuePkr2025": 5809787,
    "sharePct2025": 0.16,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LETROZOLE USP",
      "MICONAZOLE NITRATE USP"
    ]
  },
  {
    "rank": 100,
    "name": "ZHEJIANG HONGYUAN PHARMA",
    "valueUsdJulJun": 26725,
    "valuePkrJulJun": 7432223,
    "sharePctJulJun": 0.18,
    "cumShareJulJun": 88.89,
    "valueUsd2025": 8375,
    "valuePkr2025": 2329088,
    "sharePct2025": 0.06,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ERTUGLIFLOZIN L-PYROGLUTAMIC ACID",
      "EMPAGLIFLOZINE MS"
    ]
  },
  {
    "rank": 101,
    "name": "TIANJIN JINJIN PHARMACEU",
    "valueUsdJulJun": 26510,
    "valuePkrJulJun": 7372431,
    "sharePctJulJun": 0.18,
    "cumShareJulJun": 89.08,
    "valueUsd2025": 24935,
    "valuePkr2025": 6934424,
    "sharePct2025": 0.19,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HYDROCORTISONE ACETATE BP",
      "HYDROCORTISONE BP"
    ]
  },
  {
    "rank": 102,
    "name": "NATUREX",
    "valueUsdJulJun": 26335,
    "valuePkrJulJun": 7323650,
    "sharePctJulJun": 0.18,
    "cumShareJulJun": 89.26,
    "valueUsd2025": 15431,
    "valuePkr2025": 4291400,
    "sharePct2025": 0.11,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CRANBERRY EXTRACT(VACCINIUM MACROCARPON"
    ]
  },
  {
    "rank": 103,
    "name": "YICHANG SANXIA PHARMACEU",
    "valueUsdJulJun": 26250,
    "valuePkrJulJun": 7300125,
    "sharePctJulJun": 0.18,
    "cumShareJulJun": 89.44,
    "valueUsd2025": 8000,
    "valuePkr2025": 2224800,
    "sharePct2025": 0.06,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "NEOMYCIN SULPHATE BP"
    ]
  },
  {
    "rank": 104,
    "name": "VASUDHA PHARMACHEM LTD",
    "valueUsdJulJun": 26088,
    "valuePkrJulJun": 7254934,
    "sharePctJulJun": 0.18,
    "cumShareJulJun": 89.62,
    "valueUsd2025": 16200,
    "valuePkr2025": 4505220,
    "sharePct2025": 0.12,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DOMPERIDONE(BASE) BP",
      "DONEPEZIL HYDROCHLORIDE USP"
    ]
  },
  {
    "rank": 105,
    "name": "ASHLAND SPECIALTY INGREDIENTS USA",
    "valueUsdJulJun": 25620,
    "valuePkrJulJun": 7124922,
    "sharePctJulJun": 0.18,
    "cumShareJulJun": 89.8,
    "valueUsd2025": 17934,
    "valuePkr2025": 4987445,
    "sharePct2025": 0.13,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CROSPOVIDONE BP"
    ]
  },
  {
    "rank": 106,
    "name": "HEBEI GUANGXIANG PHARMACEUTICAL",
    "valueUsdJulJun": 25480,
    "valuePkrJulJun": 7085988,
    "sharePctJulJun": 0.18,
    "cumShareJulJun": 89.97,
    "valueUsd2025": 18660,
    "valuePkr2025": 5189346,
    "sharePct2025": 0.14,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "AMINOPHYLLINE (ANHYDROUS) BP"
    ]
  },
  {
    "rank": 107,
    "name": "HERBION PAKISTAN (PVT) L",
    "valueUsdJulJun": 25038,
    "valuePkrJulJun": 6963050,
    "sharePctJulJun": 0.17,
    "cumShareJulJun": 90.15,
    "valueUsd2025": 25038,
    "valuePkr2025": 6963050,
    "sharePct2025": 0.19,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIQUORICE EXTRACT",
      "IVY LEAF POWDER EXTRACT"
    ]
  },
  {
    "rank": 108,
    "name": "DFE PHARMA, GERMANY (DMV FONTERRA EXCIPIENTS GMBH& CO. GOCH GERMANY)",
    "valueUsdJulJun": 24631,
    "valuePkrJulJun": 6850000,
    "sharePctJulJun": 0.17,
    "cumShareJulJun": 90.32,
    "valueUsd2025": 35095,
    "valuePkr2025": 9760000,
    "sharePct2025": 0.26,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SPRAY DRIED LACTOSE (SUPER TAB)"
    ]
  },
  {
    "rank": 109,
    "name": "NEELIKON FOOD DYES AND C",
    "valueUsdJulJun": 24497,
    "valuePkrJulJun": 6812572,
    "sharePctJulJun": 0.17,
    "cumShareJulJun": 90.49,
    "valueUsd2025": 17613,
    "valuePkr2025": 4898230,
    "sharePct2025": 0.13,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TARTRAZINE (CI 19140) MS",
      "SUNSET YELLOW FCF (CI 15985) MS",
      "ERYTHROSINE RED LAKE (CI 45430:1) MS",
      "ERYTHROSINE RED 3 (CI 45430) MS",
      "NEELICERT FD & C GREEN 3 (008 P 03 01)",
      "BRILLIANT BLUE LAKE (CI 42090:2) MS",
      "RED IRON OXIDE (CI 77491) MS"
    ]
  },
  {
    "rank": 110,
    "name": "AARTI PHARMALABS LIMITED",
    "valueUsdJulJun": 23650,
    "valuePkrJulJun": 6577065,
    "sharePctJulJun": 0.16,
    "cumShareJulJun": 90.65,
    "valueUsd2025": 26750,
    "valuePkr2025": 7439175,
    "sharePct2025": 0.2,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "IPRATROPIUM BROMIDE BP",
      "FLUTICASONE PROPIONATE BP"
    ]
  },
  {
    "rank": 111,
    "name": "VENUS PRINTERS",
    "valueUsdJulJun": 22941,
    "valuePkrJulJun": 6380000,
    "sharePctJulJun": 0.16,
    "cumShareJulJun": 90.81,
    "valueUsd2025": 22941,
    "valuePkr2025": 6380000,
    "sharePct2025": 0.17,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "AL.FOIL 211MM CARDNIT 6.4MG TAB.(COM)",
      "AL.FOIL ASCARD 75MG 214MM"
    ]
  },
  {
    "rank": 112,
    "name": "SHANDONG KANBO",
    "valueUsdJulJun": 22490,
    "valuePkrJulJun": 6254469,
    "sharePctJulJun": 0.16,
    "cumShareJulJun": 90.96,
    "valueUsd2025": 30168,
    "valuePkr2025": 8389582,
    "sharePct2025": 0.22,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SUCRALOSE"
    ]
  },
  {
    "rank": 113,
    "name": "ASHLAND SPECIALTIES BELGIUM",
    "valueUsdJulJun": 22425,
    "valuePkrJulJun": 6236297,
    "sharePctJulJun": 0.16,
    "cumShareJulJun": 91.12,
    "valueUsd2025": 41672,
    "valuePkr2025": 11588857,
    "sharePct2025": 0.31,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HPMC K100M Ph BP",
      "HYPROMELLOSE (HPMC 2910, 4000 CPS) BP"
    ]
  },
  {
    "rank": 114,
    "name": "TEXOL LUBRITECH FZC",
    "valueUsdJulJun": 22229,
    "valuePkrJulJun": 6181746,
    "sharePctJulJun": 0.15,
    "cumShareJulJun": 91.27,
    "valueUsd2025": 22229,
    "valuePkr2025": 6181746,
    "sharePct2025": 0.17,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "WHITE SOFT PARAFFIN BP"
    ]
  },
  {
    "rank": 115,
    "name": "GNOSIS BIORESEARCH S.R",
    "valueUsdJulJun": 22000,
    "valuePkrJulJun": 6118200,
    "sharePctJulJun": 0.15,
    "cumShareJulJun": 91.43,
    "valueUsd2025": 6000,
    "valuePkr2025": 1668600,
    "sharePct2025": 0.04,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "VITAMIN K2 (MENAQUINONE-7)"
    ]
  },
  {
    "rank": 116,
    "name": "BENZO CHEM INDUSTRIES PVT. LTD.",
    "valueUsdJulJun": 21000,
    "valuePkrJulJun": 5840100,
    "sharePctJulJun": 0.15,
    "cumShareJulJun": 91.57,
    "valueUsd2025": 12600,
    "valuePkr2025": 3504060,
    "sharePct2025": 0.09,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CHLOROCRESOL BP"
    ]
  },
  {
    "rank": 117,
    "name": "CHONGQING DAXIN PHARMA",
    "valueUsdJulJun": 20760,
    "valuePkrJulJun": 5773356,
    "sharePctJulJun": 0.14,
    "cumShareJulJun": 91.71,
    "valueUsd2025": 17600,
    "valuePkr2025": 4894560,
    "sharePct2025": 0.13,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TOBRAMYCIN SULFATE USP",
      "TOBRAMYCIN  BASE USP"
    ]
  },
  {
    "rank": 118,
    "name": "IOI ESTERCHEM (M) SDN BH",
    "valueUsdJulJun": 20678,
    "valuePkrJulJun": 5750663,
    "sharePctJulJun": 0.14,
    "cumShareJulJun": 91.86,
    "valueUsd2025": 13970,
    "valuePkr2025": 3885168,
    "sharePct2025": 0.1,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MIGLYOL OIL"
    ]
  },
  {
    "rank": 119,
    "name": "KAIFENG PHARMACEUTICAL GROUP CO LTD",
    "valueUsdJulJun": 19950,
    "valuePkrJulJun": 5548095,
    "sharePctJulJun": 0.14,
    "cumShareJulJun": 91.99,
    "valueUsd2025": 20350,
    "valuePkr2025": 5659335,
    "sharePct2025": 0.15,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TOFACITINIB  CITRATE(MS)"
    ]
  },
  {
    "rank": 120,
    "name": "INDOCO REMEDIES LTD",
    "valueUsdJulJun": 19500,
    "valuePkrJulJun": 5422950,
    "sharePctJulJun": 0.13,
    "cumShareJulJun": 92.13,
    "valueUsd2025": 20800,
    "valuePkr2025": 5784480,
    "sharePct2025": 0.15,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "BRIMONIDINE TARTRATE BP"
    ]
  },
  {
    "rank": 121,
    "name": "AMI LIFESCIENCE PVT LTD",
    "valueUsdJulJun": 19500,
    "valuePkrJulJun": 5422950,
    "sharePctJulJun": 0.13,
    "cumShareJulJun": 92.26,
    "valueUsd2025": 19500,
    "valuePkr2025": 5422950,
    "sharePct2025": 0.14,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TAPENTADOL HYDROCHLORIDE BP"
    ]
  },
  {
    "rank": 122,
    "name": "JIAHERB PHYTOCHEM",
    "valueUsdJulJun": 19375,
    "valuePkrJulJun": 5388188,
    "sharePctJulJun": 0.13,
    "cumShareJulJun": 92.4,
    "valueUsd2025": 23625,
    "valuePkr2025": 6570113,
    "sharePct2025": 0.18,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "UBIQUINONE (COENZYME Q10)"
    ]
  },
  {
    "rank": 123,
    "name": "HUNAN NUTRAMAX INC",
    "valueUsdJulJun": 18360,
    "valuePkrJulJun": 5105916,
    "sharePctJulJun": 0.13,
    "cumShareJulJun": 92.53,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "D-CHIROINOSITOL"
    ]
  },
  {
    "rank": 124,
    "name": "SUDEEP PHARMA",
    "valueUsdJulJun": 18250,
    "valuePkrJulJun": 5075325,
    "sharePctJulJun": 0.13,
    "cumShareJulJun": 92.65,
    "valueUsd2025": 7700,
    "valuePkr2025": 2141370,
    "sharePct2025": 0.06,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SIMETHICONE (ANTIFOAM) USP",
      "DIBASIC CALCIUM PHOSPHATE USP"
    ]
  },
  {
    "rank": 125,
    "name": "STANDARD MANUFACTURING C",
    "valueUsdJulJun": 17730,
    "valuePkrJulJun": 4930717,
    "sharePctJulJun": 0.12,
    "cumShareJulJun": 92.77,
    "valueUsd2025": 17245,
    "valuePkr2025": 4795809,
    "sharePct2025": 0.13,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "STRAWBERRY RED COLOUR MS",
      "COOL BREEZE EF",
      "FLAVOUR BANANA 3722 MS",
      "PINEAPPLE 900 MS",
      "ANISE OIL BP",
      "BULGARIAN ROSE EF MS",
      "PEPPERMINT OIL EF MS"
    ]
  },
  {
    "rank": 126,
    "name": "ALCON BIOSCIENCE LTD",
    "valueUsdJulJun": 17400,
    "valuePkrJulJun": 4838940,
    "sharePctJulJun": 0.12,
    "cumShareJulJun": 92.89,
    "valueUsd2025": 11830,
    "valuePkr2025": 3289923,
    "sharePct2025": 0.09,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ZINC SULFATE MONOHYDRATE USP"
    ]
  },
  {
    "rank": 127,
    "name": "COREL PHARMA-CHEM",
    "valueUsdJulJun": 17260,
    "valuePkrJulJun": 4800000,
    "sharePctJulJun": 0.12,
    "cumShareJulJun": 93.01,
    "valueUsd2025": 20942,
    "valuePkr2025": 5824000,
    "sharePct2025": 0.16,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POLYACRYLIC ACID (CARBOMER 940 BP)",
      "CARBOMER 974P"
    ]
  },
  {
    "rank": 128,
    "name": "INDIA PHOSPHATE",
    "valueUsdJulJun": 17250,
    "valuePkrJulJun": 4797225,
    "sharePctJulJun": 0.12,
    "cumShareJulJun": 93.13,
    "valueUsd2025": 18900,
    "valuePkr2025": 5256090,
    "sharePct2025": 0.14,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "POTASSIUM CHLORIDE (API) BP"
    ]
  },
  {
    "rank": 129,
    "name": "CHANGZHOU PHARMACEUTICALS",
    "valueUsdJulJun": 17100,
    "valuePkrJulJun": 4755510,
    "sharePctJulJun": 0.12,
    "cumShareJulJun": 93.25,
    "valueUsd2025": 21600,
    "valuePkr2025": 6006960,
    "sharePct2025": 0.16,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LENALIDOMIDE(MS)"
    ]
  },
  {
    "rank": 130,
    "name": "QINGDAO BRIGHT.",
    "valueUsdJulJun": 16800,
    "valuePkrJulJun": 4672080,
    "sharePctJulJun": 0.12,
    "cumShareJulJun": 93.37,
    "valueUsd2025": 24610,
    "valuePkr2025": 6844041,
    "sharePct2025": 0.18,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MANNITOL BP"
    ]
  },
  {
    "rank": 131,
    "name": "DMV-FONTERRA EXCIPIENTS GMBH CO. KG.",
    "valueUsdJulJun": 16800,
    "valuePkrJulJun": 4672080,
    "sharePctJulJun": 0.12,
    "cumShareJulJun": 93.48,
    "valueUsd2025": 25200,
    "valuePkr2025": 7008120,
    "sharePct2025": 0.19,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LACTOSE MONOHYDRATE(200 MESH) B.P"
    ]
  },
  {
    "rank": 132,
    "name": "INTERNATIONAL FLAVOUR & FRAGRANCE",
    "valueUsdJulJun": 16600,
    "valuePkrJulJun": 4620699,
    "sharePctJulJun": 0.11,
    "cumShareJulJun": 93.6,
    "valueUsd2025": 14661,
    "valuePkr2025": 4077224,
    "sharePct2025": 0.11,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ESSENCES POMEGRANATE MS"
    ]
  },
  {
    "rank": 133,
    "name": "SYMBIOTICA SPECIALTY ING",
    "valueUsdJulJun": 16400,
    "valuePkrJulJun": 4560840,
    "sharePctJulJun": 0.11,
    "cumShareJulJun": 93.71,
    "valueUsd2025": 49200,
    "valuePkr2025": 13682520,
    "sharePct2025": 0.37,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "METHYLPREDNISOLONE ACEPONATE MS"
    ]
  },
  {
    "rank": 134,
    "name": "SHANDONG LUKANG SANYE PHARMACEUTICAL",
    "valueUsdJulJun": 16400,
    "valuePkrJulJun": 4560840,
    "sharePctJulJun": 0.11,
    "cumShareJulJun": 93.83,
    "valueUsd2025": 9020,
    "valuePkr2025": 2508462,
    "sharePct2025": 0.07,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DAPRODUSTAT MS"
    ]
  },
  {
    "rank": 135,
    "name": "AMSAL CHEM PRIVATE LIMITED.",
    "valueUsdJulJun": 16200,
    "valuePkrJulJun": 4505220,
    "sharePctJulJun": 0.11,
    "cumShareJulJun": 93.94,
    "valueUsd2025": 7900,
    "valuePkr2025": 2196990,
    "sharePct2025": 0.06,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "AMLODIPINE BESILATE USP"
    ]
  },
  {
    "rank": 136,
    "name": "UENOFINE CHEM JAPAN",
    "valueUsdJulJun": 16153,
    "valuePkrJulJun": 4492050,
    "sharePctJulJun": 0.11,
    "cumShareJulJun": 94.05,
    "valueUsd2025": 10307,
    "valuePkr2025": 2866300,
    "sharePct2025": 0.08,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PROPYLPARABEN USP/NF",
      "METHYLPARABEN USP/NF"
    ]
  },
  {
    "rank": 137,
    "name": "AVIK PHARMACEUTICAL LTD",
    "valueUsdJulJun": 16000,
    "valuePkrJulJun": 4449600,
    "sharePctJulJun": 0.11,
    "cumShareJulJun": 94.16,
    "valueUsd2025": 4100,
    "valuePkr2025": 1140210,
    "sharePct2025": 0.03,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "METHYLPREDNISOLONE ACEPONATE MS"
    ]
  },
  {
    "rank": 138,
    "name": "MEDICFOIL PACKAGING SDN.",
    "valueUsdJulJun": 15782,
    "valuePkrJulJun": 4388974,
    "sharePctJulJun": 0.11,
    "cumShareJulJun": 94.27,
    "valueUsd2025": 60120,
    "valuePkr2025": 16719372,
    "sharePct2025": 0.45,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "AL-FOIL ASCARD PLUS TABLETS 211MM",
      "AL-FOIL GEMPID 600MG TAB 212MM",
      "AL-FOIL DIOPLUS 5/160MG TABLETS 230MM",
      "AL-FOIL MEROL 100MG TAB 236MM",
      "AL-FOIL DIOPLUS 10/160MG TABLETS 230MM",
      "AL-FOIL DIROXX 50MG CAPS.235MM",
      "AL-FOIL ASCARD 75MG TABLETS 214MM",
      "AL.FOIL 211MM CARDNIT 2.6MG TAB.(COM)",
      "AL-FOIL ASCARD 75MG TAB.240.5MM(EXP.SUDA",
      "AL-FOIL ASCARD-75 TAB.240.5mm(EXP.NEW)",
      "AL-FOIL SYNGAB 100MG CAPSULES 230MM"
    ]
  },
  {
    "rank": 139,
    "name": "NINGXIA HENGKANG TECHNOLOGY CO., LTD.",
    "valueUsdJulJun": 15600,
    "valuePkrJulJun": 4338360,
    "sharePctJulJun": 0.11,
    "cumShareJulJun": 94.38,
    "valueUsd2025": 33475,
    "valuePkr2025": 9309398,
    "sharePct2025": 0.25,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "METFORMIN HYDROCHLORIDE BP"
    ]
  },
  {
    "rank": 140,
    "name": "BIOPOLE PHARMATEC CO., LTD.",
    "valueUsdJulJun": 15250,
    "valuePkrJulJun": 4241025,
    "sharePctJulJun": 0.11,
    "cumShareJulJun": 94.48,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CROTAMITON BP"
    ]
  },
  {
    "rank": 141,
    "name": "ZHEJIANG LIAOYUAN",
    "valueUsdJulJun": 15060,
    "valuePkrJulJun": 4188186,
    "sharePctJulJun": 0.1,
    "cumShareJulJun": 94.59,
    "valueUsd2025": 33100,
    "valuePkr2025": 9205110,
    "sharePct2025": 0.25,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CLOPIDOGREL BISULFATE USP",
      "IVABRADINE HCL MS"
    ]
  },
  {
    "rank": 142,
    "name": "RZBC (JUXIAN) CO LTD",
    "valueUsdJulJun": 14646,
    "valuePkrJulJun": 4073000,
    "sharePctJulJun": 0.1,
    "cumShareJulJun": 94.69,
    "valueUsd2025": 28834,
    "valuePkr2025": 8018775,
    "sharePct2025": 0.21,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM CITRATE BP",
      "SODIUM CITRATE (API) BP"
    ]
  },
  {
    "rank": 143,
    "name": "PETER GREVEN, MALAYSIA",
    "valueUsdJulJun": 14531,
    "valuePkrJulJun": 4041000,
    "sharePctJulJun": 0.1,
    "cumShareJulJun": 94.79,
    "valueUsd2025": 16284,
    "valuePkr2025": 4528500,
    "sharePct2025": 0.12,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "MAGNESIUM STEARATE BP"
    ]
  },
  {
    "rank": 144,
    "name": "PARTICLE DYNAMICS",
    "valueUsdJulJun": 14240,
    "valuePkrJulJun": 3960144,
    "sharePctJulJun": 0.1,
    "cumShareJulJun": 94.89,
    "valueUsd2025": 14240,
    "valuePkr2025": 3960144,
    "sharePct2025": 0.11,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ELEMENTAL CALCIUM(AS CALCIUM CARBONAT95s"
    ]
  },
  {
    "rank": 145,
    "name": "O-BASF",
    "valueUsdJulJun": 14114,
    "valuePkrJulJun": 3925152,
    "sharePctJulJun": 0.1,
    "cumShareJulJun": 94.98,
    "valueUsd2025": 16746,
    "valuePkr2025": 4656960,
    "sharePct2025": 0.12,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POLYQUARTERNIUM 44(POLYQ 44)"
    ]
  },
  {
    "rank": 146,
    "name": "SIGMA ALDRICH, GERMANY",
    "valueUsdJulJun": 13648,
    "valuePkrJulJun": 3795625,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.08,
    "valueUsd2025": 9227,
    "valuePkr2025": 2566000,
    "sharePct2025": 0.07,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "DISODIUM EDETATE BP",
      "SODIUM BORATE USP/NF",
      "HYDROCHLORIC ACID 37% BP"
    ]
  },
  {
    "rank": 147,
    "name": "DESTILACIONES BORDAS",
    "valueUsdJulJun": 13450,
    "valuePkrJulJun": 3740445,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.17,
    "valueUsd2025": 10900,
    "valuePkr2025": 3031290,
    "sharePct2025": 0.08,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TERPENE HYDRATE BP"
    ]
  },
  {
    "rank": 148,
    "name": "RAJ PIONEER LABORATORIES",
    "valueUsdJulJun": 13350,
    "valuePkrJulJun": 3712635,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.26,
    "valueUsd2025": 15475,
    "valuePkr2025": 4303598,
    "sharePct2025": 0.12,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "FLUCONAZOLE USP"
    ]
  },
  {
    "rank": 149,
    "name": "FIRMENICH",
    "valueUsdJulJun": 13310,
    "valuePkrJulJun": 3701511,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.36,
    "valueUsd2025": 19500,
    "valuePkr2025": 5422950,
    "sharePct2025": 0.14,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ORANGE DURAROME FLAVOR 501289 TD0990B",
      "VANILLA DURAROME FLAVOR 501465 TD1591"
    ]
  },
  {
    "rank": 150,
    "name": "TIANJIN CHANGJIE, CHINA.",
    "valueUsdJulJun": 13139,
    "valuePkrJulJun": 3654000,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.45,
    "valueUsd2025": 8918,
    "valuePkr2025": 2480000,
    "sharePct2025": 0.07,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SACCHARIN SODIUM BP"
    ]
  },
  {
    "rank": 151,
    "name": "ZHEJIANG ZHONGBAO CHEMICALS",
    "valueUsdJulJun": 13118,
    "valuePkrJulJun": 3648000,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.54,
    "valueUsd2025": 10787,
    "valuePkr2025": 3000000,
    "sharePct2025": 0.08,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "DL-ALPHA-TOCOPHERYL ACETATE USP"
    ]
  },
  {
    "rank": 152,
    "name": "ENALTEC LABS PVT LTD",
    "valueUsdJulJun": 13060,
    "valuePkrJulJun": 3631986,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.63,
    "valueUsd2025": 18110,
    "valuePkr2025": 5036391,
    "sharePct2025": 0.13,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MOXIFLOXACIN HYDROCHLORIDE BP",
      "NEPAFENAC MS"
    ]
  },
  {
    "rank": 153,
    "name": "SICHUAN QINGMU PHARMACEU",
    "valueUsdJulJun": 12900,
    "valuePkrJulJun": 3587490,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.72,
    "valueUsd2025": 7750,
    "valuePkr2025": 2155275,
    "sharePct2025": 0.06,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "BISOPROLOL FUMARATE USP"
    ]
  },
  {
    "rank": 154,
    "name": "KRONOS INTERNATIONAL",
    "valueUsdJulJun": 12765,
    "valuePkrJulJun": 3550000,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.8,
    "valueUsd2025": 6832,
    "valuePkr2025": 1900000,
    "sharePct2025": 0.05,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "TITANIUM DIOXIDE BP"
    ]
  },
  {
    "rank": 155,
    "name": "MERCK KGA",
    "valueUsdJulJun": 12535,
    "valuePkrJulJun": 3486000,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.89,
    "valueUsd2025": 16128,
    "valuePkr2025": 4485320,
    "sharePct2025": 0.12,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "VITAMIN A (AS RETINYL PALMITATE) USP"
    ]
  },
  {
    "rank": 156,
    "name": "VISWA LABORATORIES PVT.",
    "valueUsdJulJun": 12475,
    "valuePkrJulJun": 3469298,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 95.98,
    "valueUsd2025": 23075,
    "valuePkr2025": 6417158,
    "sharePct2025": 0.17,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LORNOXICAM MS",
      "TIZANIDINE HYDROCHLORIDE USP"
    ]
  },
  {
    "rank": 157,
    "name": "MATCO FOOD",
    "valueUsdJulJun": 12246,
    "valuePkrJulJun": 3405600,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.06,
    "valueUsd2025": 12246,
    "valuePkr2025": 3405600,
    "sharePct2025": 0.09,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIQUID GLUCOSE USP/NF"
    ]
  },
  {
    "rank": 158,
    "name": "INTERNATIAONAL N&H MFG. IRELAND",
    "valueUsdJulJun": 12054,
    "valuePkrJulJun": 3352217,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.15,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "AVICEL RC-591"
    ]
  },
  {
    "rank": 159,
    "name": "CITI PHARMA LIMITED",
    "valueUsdJulJun": 11866,
    "valuePkrJulJun": 3300000,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.23,
    "valueUsd2025": 21656,
    "valuePkr2025": 6022500,
    "sharePct2025": 0.16,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PARACETAMOL BP"
    ]
  },
  {
    "rank": 160,
    "name": "JIANGXI SYNERGY PHARMACE",
    "valueUsdJulJun": 11775,
    "valuePkrJulJun": 3274628,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.31,
    "valueUsd2025": 7800,
    "valuePkr2025": 2169180,
    "sharePct2025": 0.06,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "VONOPRAZAN FUMARATE"
    ]
  },
  {
    "rank": 161,
    "name": "HEBEI WELCOME",
    "valueUsdJulJun": 11750,
    "valuePkrJulJun": 3267675,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.39,
    "valueUsd2025": 14675,
    "valuePkr2025": 4081118,
    "sharePct2025": 0.11,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SODIUM ASCORBATE BP/USP"
    ]
  },
  {
    "rank": 162,
    "name": "LIJIANG YINGHUA BIOCHEMICAL AND PHARMACEUTICAL CO., LTD.",
    "valueUsdJulJun": 11700,
    "valuePkrJulJun": 3253770,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.47,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HYDROCORTISONE BP"
    ]
  },
  {
    "rank": 163,
    "name": "RASINO HERBS",
    "valueUsdJulJun": 11484,
    "valuePkrJulJun": 3193676,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.55,
    "valueUsd2025": 44762,
    "valuePkr2025": 12448305,
    "sharePct2025": 0.33,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "POTASSIUM CHLORIDE (API) BP",
      "AMMONIUM CHLORIDE BP",
      "AMMONIUM CHLORIDE BP (API)"
    ]
  },
  {
    "rank": 164,
    "name": "WUHAN WUYAO PHARMACEUTIC",
    "valueUsdJulJun": 11200,
    "valuePkrJulJun": 3114720,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.63,
    "valueUsd2025": 19000,
    "valuePkr2025": 5283900,
    "sharePct2025": 0.14,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "NOREPINEPHRINE BITARTRATE USP"
    ]
  },
  {
    "rank": 165,
    "name": "HERCULES / ASHLAND GLOBAL SPECIALITY CHEMICALS INC.",
    "valueUsdJulJun": 11171,
    "valuePkrJulJun": 3106728,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.7,
    "valueUsd2025": 10952,
    "valuePkr2025": 3045673,
    "sharePct2025": 0.08,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "KLUCEL EXF"
    ]
  },
  {
    "rank": 166,
    "name": "SHAOXING JINGXIN PHARMACEUTICAL CO., LTD.",
    "valueUsdJulJun": 11138,
    "valuePkrJulJun": 3097478,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.78,
    "valueUsd2025": 7869,
    "valuePkr2025": 2188369,
    "sharePct2025": 0.06,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ROSUVASTATIN CALCIUM BP"
    ]
  },
  {
    "rank": 167,
    "name": "COMERCIAL QUIMICA MASSÓ,SA",
    "valueUsdJulJun": 10962,
    "valuePkrJulJun": 3051405,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.86,
    "valueUsd2025": 6055,
    "valuePkr2025": 1685538,
    "sharePct2025": 0.05,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [
      "OLETH-2"
    ]
  },
  {
    "rank": 168,
    "name": "CADCHEM LABORATORIES LTD",
    "valueUsdJulJun": 10875,
    "valuePkrJulJun": 3024338,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 96.93,
    "valueUsd2025": 180000,
    "valuePkr2025": 50058000,
    "sharePct2025": 1.34,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CLOPIDOGREL BISULFATE USP",
      "STRONTIUM RANELATE MS"
    ]
  },
  {
    "rank": 169,
    "name": "MERCK, GERMANY",
    "valueUsdJulJun": 10836,
    "valuePkrJulJun": 3013600,
    "sharePctJulJun": 0.07,
    "cumShareJulJun": 97.01,
    "valueUsd2025": 10500,
    "valuePkr2025": 2920000,
    "sharePct2025": 0.08,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SORBIC ACID BP",
      "SODIUM BICARBONATE BP/USP",
      "SODIUM DIHYDROGEN PHOSPHATE DIHYDRATE BP",
      "POLYVINYL ALCOHOL BP"
    ]
  },
  {
    "rank": 170,
    "name": "ANUGRAHA CHEMICALS",
    "valueUsdJulJun": 10280,
    "valuePkrJulJun": 2858868,
    "sharePctJulJun": 0.07,
    "cumShareJulJun": 97.08,
    "valueUsd2025": 2720,
    "valuePkr2025": 756432,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ONDANSETRON HYDROCHLORIDE DIHYDRATE(BP)",
      "ONDANSETRON HCL DIHYDRATE (MICRONIZED)BP"
    ]
  },
  {
    "rank": 171,
    "name": "KERRY USA",
    "valueUsdJulJun": 10000,
    "valuePkrJulJun": 2781000,
    "sharePctJulJun": 0.07,
    "cumShareJulJun": 97.15,
    "valueUsd2025": 35900,
    "valuePkr2025": 9983790,
    "sharePct2025": 0.27,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LACTOSE MONOHYDRATE(200 MESH) B.P",
      "LACTOSE ANHYDROUS 21 AN (DC GRADE USP/NF"
    ]
  },
  {
    "rank": 172,
    "name": "ARABIAN ZINC OXIDE FACTORY",
    "valueUsdJulJun": 9924,
    "valuePkrJulJun": 2760000,
    "sharePctJulJun": 0.07,
    "cumShareJulJun": 97.22,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ZINC OXIDE"
    ]
  },
  {
    "rank": 173,
    "name": "HONGKONG EYERIS COMPANY",
    "valueUsdJulJun": 9500,
    "valuePkrJulJun": 2641950,
    "sharePctJulJun": 0.07,
    "cumShareJulJun": 97.28,
    "valueUsd2025": 9500,
    "valuePkr2025": 2641950,
    "sharePct2025": 0.07,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CHOLICALCIFEROL CONCNTRT(POWDR FORM)VITD"
    ]
  },
  {
    "rank": 174,
    "name": "BAJAJ HEALTHCARE LTD",
    "valueUsdJulJun": 9450,
    "valuePkrJulJun": 2628045,
    "sharePctJulJun": 0.07,
    "cumShareJulJun": 97.35,
    "valueUsd2025": 10125,
    "valuePkr2025": 2815763,
    "sharePct2025": 0.08,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CHLORHEXIDINE GLUCONATE SOLUTION USP"
    ]
  },
  {
    "rank": 175,
    "name": "HEFEI TNJ CHEMICAL",
    "valueUsdJulJun": 9250,
    "valuePkrJulJun": 2572425,
    "sharePctJulJun": 0.06,
    "cumShareJulJun": 97.41,
    "valueUsd2025": 9250,
    "valuePkr2025": 2572425,
    "sharePct2025": 0.07,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ACID HYPOPHOSPHOROUS 50%"
    ]
  },
  {
    "rank": 176,
    "name": "RZBC IMP. & EXP. CORP.",
    "valueUsdJulJun": 9237,
    "valuePkrJulJun": 2568800,
    "sharePctJulJun": 0.06,
    "cumShareJulJun": 97.48,
    "valueUsd2025": 13431,
    "valuePkr2025": 3735175,
    "sharePct2025": 0.1,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM CITRATE (API) BP"
    ]
  },
  {
    "rank": 177,
    "name": "GANGWAL HEALTHCARE PVT. LTD.",
    "valueUsdJulJun": 9200,
    "valuePkrJulJun": 2558520,
    "sharePctJulJun": 0.06,
    "cumShareJulJun": 97.54,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TYLOXAPOL USP/NF"
    ]
  },
  {
    "rank": 178,
    "name": "KAZTEJIS JAYKANTH ESTABLISHMENT SINGAPORE",
    "valueUsdJulJun": 9126,
    "valuePkrJulJun": 2538000,
    "sharePctJulJun": 0.06,
    "cumShareJulJun": 97.6,
    "valueUsd2025": 7627,
    "valuePkr2025": 2121000,
    "sharePct2025": 0.06,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HYDROXYPROPYL CELLULOSE USP"
    ]
  },
  {
    "rank": 179,
    "name": "HUBEI BIOCAUSE HEILEN PH",
    "valueUsdJulJun": 8325,
    "valuePkrJulJun": 2315183,
    "sharePctJulJun": 0.06,
    "cumShareJulJun": 97.66,
    "valueUsd2025": 15675,
    "valuePkr2025": 4359218,
    "sharePct2025": 0.12,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "IBUPROFEN. BP(27 GRADE)"
    ]
  },
  {
    "rank": 180,
    "name": "MICHANG",
    "valueUsdJulJun": 8235,
    "valuePkrJulJun": 2290125,
    "sharePctJulJun": 0.06,
    "cumShareJulJun": 97.72,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIGHT LIQUID PARAFFIN BP"
    ]
  },
  {
    "rank": 181,
    "name": "MERCK",
    "valueUsdJulJun": 7956,
    "valuePkrJulJun": 2212500,
    "sharePctJulJun": 0.06,
    "cumShareJulJun": 97.77,
    "valueUsd2025": 7407,
    "valuePkr2025": 2060000,
    "sharePct2025": 0.06,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POLYSORBATE 60 USP",
      "FUMARIC ACID",
      "POTASSIUM IODIDE USP",
      "GLYCINE BP"
    ]
  },
  {
    "rank": 182,
    "name": "PREMIUM FOODS CO LTD",
    "valueUsdJulJun": 7778,
    "valuePkrJulJun": 2163120,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 97.83,
    "valueUsd2025": 11538,
    "valuePkr2025": 3208628,
    "sharePct2025": 0.09,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "BANANA SP BNA MS"
    ]
  },
  {
    "rank": 183,
    "name": "HUB PAK SALT REFINERY",
    "valueUsdJulJun": 7413,
    "valuePkrJulJun": 2061675,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 97.88,
    "valueUsd2025": 4137,
    "valuePkr2025": 1150575,
    "sharePct2025": 0.03,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM CHLORIDE USP"
    ]
  },
  {
    "rank": 184,
    "name": "JUNG BUNZLAVER, AUSTRIA.",
    "valueUsdJulJun": 7272,
    "valuePkrJulJun": 2022375,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 97.93,
    "valueUsd2025": 8727,
    "valuePkr2025": 2426850,
    "sharePct2025": 0.06,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "XANTHAN GUM BP/USP"
    ]
  },
  {
    "rank": 185,
    "name": "QUIMICALITEDS.L.",
    "valueUsdJulJun": 7200,
    "valuePkrJulJun": 2002320,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 97.98,
    "valueUsd2025": 7200,
    "valuePkr2025": 2002320,
    "sharePct2025": 0.05,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "THIOMERSAL BP"
    ]
  },
  {
    "rank": 186,
    "name": "SYMBIOTICA SPECIALITY INGREDIENTS",
    "valueUsdJulJun": 7200,
    "valuePkrJulJun": 2002320,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 98.03,
    "valueUsd2025": 5000,
    "valuePkr2025": 1390500,
    "sharePct2025": 0.04,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "EXEMESTANE(USP)"
    ]
  },
  {
    "rank": 187,
    "name": "ZHUCHENG HAOTIAN PHARM CO., LTD",
    "valueUsdJulJun": 6900,
    "valuePkrJulJun": 1918890,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 98.07,
    "valueUsd2025": 14500,
    "valuePkr2025": 4032450,
    "sharePct2025": 0.11,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MYO-INOSITOL"
    ]
  },
  {
    "rank": 188,
    "name": "JQC (HUAYIN) PHARMACEUTICAL CO LTD",
    "valueUsdJulJun": 6900,
    "valuePkrJulJun": 1918890,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 98.12,
    "valueUsd2025": 5350,
    "valuePkr2025": 1487835,
    "sharePct2025": 0.04,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "METHYL SALICYLATE"
    ]
  },
  {
    "rank": 189,
    "name": "ALPHA CHEMICAL CO.",
    "valueUsdJulJun": 6731,
    "valuePkrJulJun": 1872000,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 98.17,
    "valueUsd2025": 72410,
    "valuePkr2025": 20137100,
    "sharePct2025": 0.54,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ZINC OXIDE",
      "EPHEDRINE HYDROCHLORIDE BP"
    ]
  },
  {
    "rank": 190,
    "name": "HEMA PHARMACEUTICALS PRIVATE LIMITED",
    "valueUsdJulJun": 6400,
    "valuePkrJulJun": 1779840,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.21,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "FLUCONAZOLE USP"
    ]
  },
  {
    "rank": 191,
    "name": "CHEMIWORLD PRIVATE LIMITED",
    "valueUsdJulJun": 6320,
    "valuePkrJulJun": 1757500,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.26,
    "valueUsd2025": 6320,
    "valuePkr2025": 1757500,
    "sharePct2025": 0.05,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "IRON(III) HYDROXIDE POLYMALTOSE CMPLX MS"
    ]
  },
  {
    "rank": 192,
    "name": "SHANGHAI YUKING, CHINA",
    "valueUsdJulJun": 6239,
    "valuePkrJulJun": 1735000,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.3,
    "valueUsd2025": 8198,
    "valuePkr2025": 2280000,
    "sharePct2025": 0.06,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POVIDONE (K 30) BP"
    ]
  },
  {
    "rank": 193,
    "name": "SHANDONG BINZHOU ZHIYUAN",
    "valueUsdJulJun": 6150,
    "valuePkrJulJun": 1710315,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.34,
    "valueUsd2025": 6675,
    "valuePkr2025": 1856318,
    "sharePct2025": 0.05,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HYDROXYPROPYL GAMA CYCLODEXTRIN",
      "ALPHA CYCLODEXTRIN"
    ]
  },
  {
    "rank": 194,
    "name": "FLEMING LABORATORIES LIM",
    "valueUsdJulJun": 6150,
    "valuePkrJulJun": 1710315,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.38,
    "valueUsd2025": 9225,
    "valuePkr2025": 2565473,
    "sharePct2025": 0.07,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "RISEDRONATE SODIUM USP"
    ]
  },
  {
    "rank": 195,
    "name": "CTX LIFESCIENCE PVT LTD",
    "valueUsdJulJun": 6100,
    "valuePkrJulJun": 1696410,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.43,
    "valueUsd2025": 1600,
    "valuePkr2025": 444960,
    "sharePct2025": 0.01,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LINAGLIPTIN",
      "ROSUVASTATIN CALCIUM BP"
    ]
  },
  {
    "rank": 196,
    "name": "IFTEKHAR INTERNATIONAL",
    "valueUsdJulJun": 6068,
    "valuePkrJulJun": 1687500,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.47,
    "valueUsd2025": 8765,
    "valuePkr2025": 2437500,
    "sharePct2025": 0.07,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "AL-FOIL ASCARD-75 TAB.240.5mm(EXP.NEW)"
    ]
  },
  {
    "rank": 197,
    "name": "XIAN GUOKANG RUIJIN PHARMACEUTICAL CO. LTD",
    "valueUsdJulJun": 5950,
    "valuePkrJulJun": 1654695,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.51,
    "valueUsd2025": 1700,
    "valuePkr2025": 472770,
    "sharePct2025": 0.01,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DEXAMETHASONE SODIUM PHOSPHATE USP"
    ]
  },
  {
    "rank": 198,
    "name": "AL KHALEEJ SUGAR",
    "valueUsdJulJun": 5897,
    "valuePkrJulJun": 1640000,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.55,
    "valueUsd2025": 5897,
    "valuePkr2025": 1640000,
    "sharePct2025": 0.04,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SUCROSE BP"
    ]
  },
  {
    "rank": 199,
    "name": "MEDIC FOILS",
    "valueUsdJulJun": 5776,
    "valuePkrJulJun": 1606306,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.59,
    "valueUsd2025": 2808,
    "valuePkr2025": 780905,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "AL.FOIL 211MM CARDNIT 6.4MG TAB.(COM)"
    ]
  },
  {
    "rank": 200,
    "name": "SMILAX LABORATORIES LIMI",
    "valueUsdJulJun": 5250,
    "valuePkrJulJun": 1460025,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.63,
    "valueUsd2025": 6340,
    "valuePkr2025": 1763154,
    "sharePct2025": 0.05,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ESCITALOPRAM OXALATE USP"
    ]
  },
  {
    "rank": 201,
    "name": "FUXIN LONG RUI PHARMACEUTICAL LTD",
    "valueUsdJulJun": 5200,
    "valuePkrJulJun": 1446120,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.66,
    "valueUsd2025": 67700,
    "valuePkr2025": 18827370,
    "sharePct2025": 0.5,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DAPAGLIFLOZIN PROPANEDIOL MONOHYDRATE",
      "SITAGLIPTIN PHOSPHATE USP",
      "ERTUGLIFLOZIN L-PYROGLUTAMIC ACID",
      "EMPAGLIFLOZINE MS",
      "IVABRADINE HCL MS"
    ]
  },
  {
    "rank": 202,
    "name": "ENDURA S.P.A",
    "valueUsdJulJun": 5100,
    "valuePkrJulJun": 1418310,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 98.7,
    "valueUsd2025": 7100,
    "valuePkr2025": 1974510,
    "sharePct2025": 0.05,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PIPERONYL BUTOXIDE"
    ]
  },
  {
    "rank": 203,
    "name": "SCHARLAB S.L.",
    "valueUsdJulJun": 4854,
    "valuePkrJulJun": 1350000,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 98.73,
    "valueUsd2025": 5124,
    "valuePkr2025": 1425000,
    "sharePct2025": 0.04,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "FORMALDEHYDE SOLUTION 37% USP"
    ]
  },
  {
    "rank": 204,
    "name": "SICHUAN PROVINCE YUXIN PHARMACEUTICAL CO., LTD.",
    "valueUsdJulJun": 4800,
    "valuePkrJulJun": 1334880,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 98.76,
    "valueUsd2025": 4800,
    "valuePkr2025": 1334880,
    "sharePct2025": 0.04,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CHOLECALCIFEROL(VIT.D3) USP"
    ]
  },
  {
    "rank": 205,
    "name": "DIVI'S LABORATORIES",
    "valueUsdJulJun": 4700,
    "valuePkrJulJun": 1307070,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 98.8,
    "valueUsd2025": 75950,
    "valuePkr2025": 21121695,
    "sharePct2025": 0.56,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DEXTROMETHORPHAN HYDROBROMIDE BP",
      "PHENYLEPHRINE HYDROCHLORIDE USP"
    ]
  },
  {
    "rank": 206,
    "name": "TTCA",
    "valueUsdJulJun": 4697,
    "valuePkrJulJun": 1306200,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 98.83,
    "valueUsd2025": 4188,
    "valuePkr2025": 1164700,
    "sharePct2025": 0.03,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CITRIC ACID MONOHYDRATE BP"
    ]
  },
  {
    "rank": 207,
    "name": "BFL INDUSTRIES (PRIVATE)",
    "valueUsdJulJun": 4695,
    "valuePkrJulJun": 1305720,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 98.86,
    "valueUsd2025": 20948,
    "valuePkr2025": 5825520,
    "sharePct2025": 0.16,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HONEY"
    ]
  },
  {
    "rank": 208,
    "name": "WUHAN YOUJI INDUSTRIES",
    "valueUsdJulJun": 4523,
    "valuePkrJulJun": 1257725,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 98.89,
    "valueUsd2025": 3533,
    "valuePkr2025": 982475,
    "sharePct2025": 0.03,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM BENZOATE BP/USP"
    ]
  },
  {
    "rank": 209,
    "name": "WEST BENGAL CHEMICAL IND",
    "valueUsdJulJun": 4495,
    "valuePkrJulJun": 1250000,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 98.92,
    "valueUsd2025": 5034,
    "valuePkr2025": 1400000,
    "sharePct2025": 0.04,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CALCIUM L-5-METHYLTETRAHYDROFOLATE"
    ]
  },
  {
    "rank": 210,
    "name": "INTERNATIONAL FLAVOURS & FRAGRANCES",
    "valueUsdJulJun": 4421,
    "valuePkrJulJun": 1230572,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 98.96,
    "valueUsd2025": 6210,
    "valuePkr2025": 1728451,
    "sharePct2025": 0.05,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "LEMON FLAVOR SC736612",
      "STRAWBERRY FLAVOR LIQUID (SC740667) SP"
    ]
  },
  {
    "rank": 211,
    "name": "HUB – PAK, PAKISTAN",
    "valueUsdJulJun": 4357,
    "valuePkrJulJun": 1211775,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 98.99,
    "valueUsd2025": 5387,
    "valuePkr2025": 1498249,
    "sharePct2025": 0.04,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM CHLORIDE (API) BP",
      "SODIUM CHLORIDE (API) USP",
      "SODIUM CHLORIDE USP"
    ]
  },
  {
    "rank": 212,
    "name": "SHANXI JIAHE PHYTOCHEM",
    "valueUsdJulJun": 4350,
    "valuePkrJulJun": 1209735,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.02,
    "valueUsd2025": 6523,
    "valuePkr2025": 1813933,
    "sharePct2025": 0.05,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "GINSENG EXTRACT",
      "PIMPINELLA ANISUM"
    ]
  },
  {
    "rank": 213,
    "name": "PALM OLEO (KLANG) SDN.BHD",
    "valueUsdJulJun": 4147,
    "valuePkrJulJun": 1153270,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.04,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MIGLYOL OIL"
    ]
  },
  {
    "rank": 214,
    "name": "KUKDONG OIL, KOREA.",
    "valueUsdJulJun": 4108,
    "valuePkrJulJun": 1142400,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.07,
    "valueUsd2025": 6088,
    "valuePkr2025": 1693200,
    "sharePct2025": 0.05,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIGHT LIQUID PARAFFIN BP"
    ]
  },
  {
    "rank": 215,
    "name": "UNIMAX LABORATORIES PVT. LTD.",
    "valueUsdJulJun": 4100,
    "valuePkrJulJun": 1140210,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.1,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DIFLUCORTOLONE VALERATE (MICRONIZED) BP"
    ]
  },
  {
    "rank": 216,
    "name": "LUCKY CORE INDUSTRIES",
    "valueUsdJulJun": 4072,
    "valuePkrJulJun": 1132380,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.13,
    "valueUsd2025": 4806,
    "valuePkr2025": 1336500,
    "sharePct2025": 0.04,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "DICHLOROMETHANE BP"
    ]
  },
  {
    "rank": 217,
    "name": "SIGMA ALDRICH",
    "valueUsdJulJun": 3955,
    "valuePkrJulJun": 1100000,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.16,
    "valueUsd2025": 7548,
    "valuePkr2025": 2099000,
    "sharePct2025": 0.06,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CHLOROCRESOL BP",
      "TRIBASIC SODIUM PHOSPHATE DODECAHYDRATE"
    ]
  },
  {
    "rank": 218,
    "name": "R A WATTS LTD.",
    "valueUsdJulJun": 3888,
    "valuePkrJulJun": 1078272,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.18,
    "valueUsd2025": 5684,
    "valuePkr2025": 1576224,
    "sharePct2025": 0.04,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIGHT KAOLIN BP"
    ]
  },
  {
    "rank": 219,
    "name": "LUNAN BETTER PHARMACEUTICAL CO. LTD.",
    "valueUsdJulJun": 3840,
    "valuePkrJulJun": 1067904,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.21,
    "valueUsd2025": 9390,
    "valuePkr2025": 2611359,
    "sharePct2025": 0.07,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MILRINONE USP"
    ]
  },
  {
    "rank": 220,
    "name": "SHANGHAI POLAR BEAR PHARMACEUTICAL CO., LTD",
    "valueUsdJulJun": 3706,
    "valuePkrJulJun": 1030500,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.24,
    "valueUsd2025": 2650,
    "valuePkr2025": 736875,
    "sharePct2025": 0.02,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "MENTHOL (API) BP",
      "MENTHOL ( LEVOMENTHOL)",
      "MENTHOL BP"
    ]
  },
  {
    "rank": 221,
    "name": "GUFIC BIOSCIENCES LTD",
    "valueUsdJulJun": 3625,
    "valuePkrJulJun": 1008113,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.26,
    "valueUsd2025": 3625,
    "valuePkr2025": 1008113,
    "sharePct2025": 0.03,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ISOCONAZOLE NITRATE (MICRONIZED) BP"
    ]
  },
  {
    "rank": 222,
    "name": "SYMED LAB.",
    "valueUsdJulJun": 3500,
    "valuePkrJulJun": 973350,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.28,
    "valueUsd2025": 3500,
    "valuePkr2025": 973350,
    "sharePct2025": 0.03,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ESZOPICLONE USP"
    ]
  },
  {
    "rank": 223,
    "name": "HONEYWELL SPECIALITY CHEMICALS SEELZE GMBH",
    "valueUsdJulJun": 3146,
    "valuePkrJulJun": 875000,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.31,
    "valueUsd2025": 1888,
    "valuePkr2025": 525000,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM HYDROXIDE BP"
    ]
  },
  {
    "rank": 224,
    "name": "ZHEJIANG TIANTAI PHARMACEUTICAL. CO., LTD.",
    "valueUsdJulJun": 3125,
    "valuePkrJulJun": 869063,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.33,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CLINDAMYCIN PHOSPHATE USP"
    ]
  },
  {
    "rank": 225,
    "name": "ZHEJIANG APELOA JIAYUAN PHARMACEUTICAL CO., LTD",
    "valueUsdJulJun": 3100,
    "valuePkrJulJun": 862110,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.35,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "METOPROLOL TARTRATE USP"
    ]
  },
  {
    "rank": 226,
    "name": "QINGDAO JINFENG PHARMACEUTICAL CO.,LTD",
    "valueUsdJulJun": 3000,
    "valuePkrJulJun": 834300,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.37,
    "valueUsd2025": 5966,
    "valuePkr2025": 1659145,
    "sharePct2025": 0.04,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DONEPEZIL HYDROCHLORIDE USP"
    ]
  },
  {
    "rank": 227,
    "name": "YUNG ZIP CHEMICAL IND. C",
    "valueUsdJulJun": 2900,
    "valuePkrJulJun": 806490,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.39,
    "valueUsd2025": 2900,
    "valuePkr2025": 806490,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SODIUM STARCH GLYCOLATE (TYPE A) BP"
    ]
  },
  {
    "rank": 228,
    "name": "THERMO FISHER SCIENTIFIC",
    "valueUsdJulJun": 2900,
    "valuePkrJulJun": 806380,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.41,
    "valueUsd2025": 2342,
    "valuePkr2025": 651193,
    "sharePct2025": 0.02,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "GLYCINE BP",
      "BENZALKONIUM CHLORIDE SOL (50% W/V) BP"
    ]
  },
  {
    "rank": 229,
    "name": "CHANGZHOU PHARMA FACTORY",
    "valueUsdJulJun": 2863,
    "valuePkrJulJun": 796200,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.43,
    "valueUsd2025": 1680,
    "valuePkr2025": 467208,
    "sharePct2025": 0.01,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HYDROCHLOROTHIAZIDE USP"
    ]
  },
  {
    "rank": 230,
    "name": "DAICEL CHEMICALS JAPAN.",
    "valueUsdJulJun": 2814,
    "valuePkrJulJun": 782450,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.45,
    "valueUsd2025": 1861,
    "valuePkr2025": 517450,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CARBOXYMETHYLCELULOSE SODIUM MED VISC GR"
    ]
  },
  {
    "rank": 231,
    "name": "KERRY INGREDIENTS",
    "valueUsdJulJun": 2770,
    "valuePkrJulJun": 770337,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.47,
    "valueUsd2025": 3930,
    "valuePkr2025": 1092933,
    "sharePct2025": 0.03,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SHEFFCOAT WHITE - 5Y00347",
      "SHEFFCOAT PVA WHITE 5Y01440"
    ]
  },
  {
    "rank": 232,
    "name": "GATTEFOSSE",
    "valueUsdJulJun": 2755,
    "valuePkrJulJun": 766807,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.49,
    "valueUsd2025": 1115,
    "valuePkr2025": 310468,
    "sharePct2025": 0.01,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [
      "TRANSCUTOL HP"
    ]
  },
  {
    "rank": 233,
    "name": "VERDANT LIFE SCIENCE PVT.,LTD",
    "valueUsdJulJun": 2750,
    "valuePkrJulJun": 764775,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.51,
    "valueUsd2025": 5500,
    "valuePkr2025": 1529550,
    "sharePct2025": 0.04,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TELMISARTAN USP"
    ]
  },
  {
    "rank": 234,
    "name": "SHAANXI JIAHE PHYTOCHEM",
    "valueUsdJulJun": 2625,
    "valuePkrJulJun": 730013,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.52,
    "valueUsd2025": 1575,
    "valuePkr2025": 438008,
    "sharePct2025": 0.01,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "THYMUS VULGARIS EXTRACT"
    ]
  },
  {
    "rank": 235,
    "name": "SHANGHAI CHEMICAL & PHARMA, CHINA",
    "valueUsdJulJun": 2571,
    "valuePkrJulJun": 715067,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.54,
    "valueUsd2025": 2550,
    "valuePkr2025": 709027,
    "sharePct2025": 0.02,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POVIDONE (K 90) BP"
    ]
  },
  {
    "rank": 236,
    "name": "AMS FLAVOURS & FRAGRANCES PVT. LTD",
    "valueUsdJulJun": 2496,
    "valuePkrJulJun": 694204,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.56,
    "valueUsd2025": 1294,
    "valuePkr2025": 360000,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CHERRY FLAVOUR 2217 MS",
      "SUNSET YELLOW FCF LAKE (CI 15985:1) MS"
    ]
  },
  {
    "rank": 237,
    "name": "HUNAN DONGTING",
    "valueUsdJulJun": 2450,
    "valuePkrJulJun": 681345,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.58,
    "valueUsd2025": 5200,
    "valuePkr2025": 1446120,
    "sharePct2025": 0.04,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TRANEXAMIC ACID BP"
    ]
  },
  {
    "rank": 238,
    "name": "SINOSWEET CO., LTD",
    "valueUsdJulJun": 2250,
    "valuePkrJulJun": 625725,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.59,
    "valueUsd2025": 2700,
    "valuePkr2025": 750870,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ASPARTAME BP"
    ]
  },
  {
    "rank": 239,
    "name": "ASHLAND SPECIALITY INGREDIENTS G.P.",
    "valueUsdJulJun": 2224,
    "valuePkrJulJun": 618425,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.61,
    "valueUsd2025": 1035,
    "valuePkr2025": 287834,
    "sharePct2025": 0.01,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "GUAR GUM (N-HANCE)"
    ]
  },
  {
    "rank": 240,
    "name": "CONCORD BIOTECH LIMITED",
    "valueUsdJulJun": 2200,
    "valuePkrJulJun": 611820,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.62,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CICLOSPORIN BP"
    ]
  },
  {
    "rank": 241,
    "name": "JIAOZUO ZHONGWEI SPECIAL PRODUCTS PHARMACEUTICAL CO., LTD",
    "valueUsdJulJun": 2157,
    "valuePkrJulJun": 600000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.64,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POVIDONE (K 30) BP"
    ]
  },
  {
    "rank": 242,
    "name": "MEDI GRAPH PHARMACEUTICALS PRIVATE LIMITED",
    "valueUsdJulJun": 2100,
    "valuePkrJulJun": 584010,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.65,
    "valueUsd2025": 2100,
    "valuePkr2025": 584010,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "OLOPATADINE HYDROCHLORIDE USP"
    ]
  },
  {
    "rank": 243,
    "name": "NANTONG CHANYOO PHARMATE",
    "valueUsdJulJun": 2100,
    "valuePkrJulJun": 584010,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.67,
    "valueUsd2025": 2100,
    "valuePkr2025": 584010,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "RIVAROXABAN BP"
    ]
  },
  {
    "rank": 244,
    "name": "PT.MANE INDONESIA",
    "valueUsdJulJun": 2046,
    "valuePkrJulJun": 569125,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.68,
    "valueUsd2025": 2046,
    "valuePkr2025": 569125,
    "sharePct2025": 0.02,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CHOCOLATE FLAVOR (K-0309816)"
    ]
  },
  {
    "rank": 245,
    "name": "HUBEI GUANGJI PHARMACEUTICAL CO., LTD",
    "valueUsdJulJun": 1800,
    "valuePkrJulJun": 500580,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.69,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "VITAMIN B2 (AS RIBOFLAVIN 5-PHOSPHATE SO"
    ]
  },
  {
    "rank": 246,
    "name": "RZBC IMP & EXP CORP",
    "valueUsdJulJun": 1592,
    "valuePkrJulJun": 442650,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.7,
    "valueUsd2025": 14132,
    "valuePkr2025": 3930050,
    "sharePct2025": 0.11,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SODIUM CITRATE BP",
      "SODIUM CITRATE (API) BP"
    ]
  },
  {
    "rank": 247,
    "name": "SHANGDONG XINHUA, CHINA.",
    "valueUsdJulJun": 1590,
    "valuePkrJulJun": 442125,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.72,
    "valueUsd2025": 1590,
    "valuePkr2025": 442125,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "MENTHOL BP"
    ]
  },
  {
    "rank": 248,
    "name": "HABIB ADM LTD",
    "valueUsdJulJun": 1509,
    "valuePkrJulJun": 419650,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.73,
    "valueUsd2025": 7329,
    "valuePkr2025": 2038300,
    "sharePct2025": 0.05,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIQUID SORBITOL (NON-CRYSTALLISING)  BP"
    ]
  },
  {
    "rank": 249,
    "name": "KRY GLOBAL TRADING",
    "valueUsdJulJun": 1505,
    "valuePkrJulJun": 418500,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.74,
    "valueUsd2025": 1505,
    "valuePkr2025": 418500,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HONEY"
    ]
  },
  {
    "rank": 250,
    "name": "YUNPENG PHARMACEUTICAL GROUP CO., LTD.",
    "valueUsdJulJun": 1500,
    "valuePkrJulJun": 417150,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.75,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CHLORPHENAMINE MALEATE BP"
    ]
  },
  {
    "rank": 251,
    "name": "ORGANIC HERBS",
    "valueUsdJulJun": 1493,
    "valuePkrJulJun": 415254,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.76,
    "valueUsd2025": 2240,
    "valuePkr2025": 622881,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MILLET EXTRACT (PANICUM MILIACEUM, FRUIT"
    ]
  },
  {
    "rank": 252,
    "name": "ALGRY QUMICA",
    "valueUsdJulJun": 1485,
    "valuePkrJulJun": 413312,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.77,
    "valueUsd2025": 650,
    "valuePkr2025": 180824,
    "sharePct2025": 0,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [
      "CHOLINE CHLORIDE USP"
    ]
  },
  {
    "rank": 253,
    "name": "THIMUS GMBH & C0",
    "valueUsdJulJun": 1438,
    "valuePkrJulJun": 400000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.78,
    "valueUsd2025": 863,
    "valuePkr2025": 240000,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "BENZALKONIUM CHLORIDE (80% W/W) MS"
    ]
  },
  {
    "rank": 254,
    "name": "HUZHOU MIZUDA BIOSCIENCE CO.,LTD",
    "valueUsdJulJun": 1430,
    "valuePkrJulJun": 397613,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.79,
    "valueUsd2025": 2209,
    "valuePkr2025": 614184,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HPMC 15CPS"
    ]
  },
  {
    "rank": 255,
    "name": "ZHONGBAO CHEMICALS, CHINA",
    "valueUsdJulJun": 1402,
    "valuePkrJulJun": 390000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.8,
    "valueUsd2025": 1998,
    "valuePkr2025": 555750,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "MALTODEXTRIN BP"
    ]
  },
  {
    "rank": 256,
    "name": "D.D.WILLIAMSON INGREDIENTS (SHANGHAI) LTD.",
    "valueUsdJulJun": 1346,
    "valuePkrJulJun": 374400,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.81,
    "valueUsd2025": 777,
    "valuePkr2025": 216000,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CARAMEL MS"
    ]
  },
  {
    "rank": 257,
    "name": "TECHNO (FUJIAN) FOOD INGREDIENTS",
    "valueUsdJulJun": 1340,
    "valuePkrJulJun": 372654,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.82,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SUCRALOSE"
    ]
  },
  {
    "rank": 258,
    "name": "UNITOP CHEMICAL PRIVATE LIMITED",
    "valueUsdJulJun": 1294,
    "valuePkrJulJun": 360000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.82,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POLYSORBATE 20 (TWEEN 20)"
    ]
  },
  {
    "rank": 259,
    "name": "REHMAN TRADERS",
    "valueUsdJulJun": 1214,
    "valuePkrJulJun": 337500,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.83,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM CITRATE BP"
    ]
  },
  {
    "rank": 260,
    "name": "KL-KEPONG OLEOMAS SDN BHD",
    "valueUsdJulJun": 1208,
    "valuePkrJulJun": 336000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.84,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM LAURYL SULPHATE BP"
    ]
  },
  {
    "rank": 261,
    "name": "JINAN QINMU FINE CHEMICA",
    "valueUsdJulJun": 1200,
    "valuePkrJulJun": 333720,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.85,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "POLIDRONIUM CHLORIDE"
    ]
  },
  {
    "rank": 262,
    "name": "HUB-PAK SALT REFINERY",
    "valueUsdJulJun": 1160,
    "valuePkrJulJun": 322528,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.86,
    "valueUsd2025": 8266,
    "valuePkr2025": 2298649,
    "sharePct2025": 0.06,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM CHLORIDE (API) USP",
      "SODIUM CHLORIDE USP"
    ]
  },
  {
    "rank": 263,
    "name": "SABIC INDUSTRIES",
    "valueUsdJulJun": 1149,
    "valuePkrJulJun": 319470,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.87,
    "valueUsd2025": 661,
    "valuePkr2025": 183770,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "TRIETHANOLAMINE BP"
    ]
  },
  {
    "rank": 264,
    "name": "SHANDONG GUANGDA TECHNOLOGICAL DEVELOPMENT CO. LTD.",
    "valueUsdJulJun": 992,
    "valuePkrJulJun": 276000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.87,
    "valueUsd2025": 2316,
    "valuePkr2025": 644000,
    "sharePct2025": 0.02,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HPMC E5 BP"
    ]
  },
  {
    "rank": 265,
    "name": "ALLIED AXIOM CHEMICAL (P",
    "valueUsdJulJun": 971,
    "valuePkrJulJun": 270000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.88,
    "valueUsd2025": 971,
    "valuePkr2025": 270000,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CHOCOLATE AGST SP 01 POWDER FLAVOR"
    ]
  },
  {
    "rank": 266,
    "name": "PAN ASIA",
    "valueUsdJulJun": 949,
    "valuePkrJulJun": 263850,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.89,
    "valueUsd2025": 714,
    "valuePkr2025": 198500,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POLYETHYLENE GLYCOL  6000 BP/USP"
    ]
  },
  {
    "rank": 267,
    "name": "DSM NUTRITIONAL PRODUCTS",
    "valueUsdJulJun": 920,
    "valuePkrJulJun": 255852,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.89,
    "valueUsd2025": 1840,
    "valuePkr2025": 511704,
    "sharePct2025": 0.01,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PANTHENOL USP"
    ]
  },
  {
    "rank": 268,
    "name": "MAGNESIA GMBH",
    "valueUsdJulJun": 827,
    "valuePkrJulJun": 230066,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.9,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [
      "CALCIUM CHLORIDE"
    ]
  },
  {
    "rank": 269,
    "name": "MAGHESIUM GMBH",
    "valueUsdJulJun": 812,
    "valuePkrJulJun": 226030,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.9,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [
      "MAGNESIUM CHLORIDE"
    ]
  },
  {
    "rank": 270,
    "name": "TIANJIN DONGDA CHEMICAL GROUP CO., LTD.",
    "valueUsdJulJun": 750,
    "valuePkrJulJun": 208575,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.91,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "BENZOIC ACID"
    ]
  },
  {
    "rank": 271,
    "name": "ELLIS & EVARAD ENGLAND",
    "valueUsdJulJun": 748,
    "valuePkrJulJun": 208000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.91,
    "valueUsd2025": 561,
    "valuePkr2025": 156000,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "YELLOW IRON OXIDE MS"
    ]
  },
  {
    "rank": 272,
    "name": "EUROROME.",
    "valueUsdJulJun": 746,
    "valuePkrJulJun": 207600,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.92,
    "valueUsd2025": 1493,
    "valuePkr2025": 415200,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "STRAWBERRY POWDER FLAVOUR 17027 MS",
      "PINEAPPLE POWDER FLAVOUR 23002 MS"
    ]
  },
  {
    "rank": 273,
    "name": "HENAN JINDAN",
    "valueUsdJulJun": 746,
    "valuePkrJulJun": 207500,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.92,
    "valueUsd2025": 746,
    "valuePkr2025": 207500,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LACTIC ACID BP"
    ]
  },
  {
    "rank": 274,
    "name": "HEBEI YUXING BIOENGINEERING CO LTD",
    "valueUsdJulJun": 705,
    "valuePkrJulJun": 196000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.93,
    "valueUsd2025": 705,
    "valuePkr2025": 196000,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "VITAMIN B12 (AS CYANOCOBALAMIN) USP"
    ]
  },
  {
    "rank": 275,
    "name": "JINNENG SCIENCE AND TECHNOLOGY CO. LTD",
    "valueUsdJulJun": 678,
    "valuePkrJulJun": 188600,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.93,
    "valueUsd2025": 474,
    "valuePkr2025": 131850,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POTASSIUM SORBATE BP"
    ]
  },
  {
    "rank": 276,
    "name": "KERRY DO BRAZIL",
    "valueUsdJulJun": 650,
    "valuePkrJulJun": 180765,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.94,
    "valueUsd2025": 1300,
    "valuePkr2025": 361530,
    "sharePct2025": 0.01,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SHEFFCOAT PVA ORANGE 5Y02849"
    ]
  },
  {
    "rank": 277,
    "name": "LUBRIZOL ADVANCED MATERI",
    "valueUsdJulJun": 633,
    "valuePkrJulJun": 176000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.94,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CETEARYL OCTANOATE"
    ]
  },
  {
    "rank": 278,
    "name": "JIANGXI ALPHA HI-TECH PHARMACEUTICAL CO., LTD",
    "valueUsdJulJun": 617,
    "valuePkrJulJun": 171588,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.95,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PHENOXYETHANOL"
    ]
  },
  {
    "rank": 279,
    "name": "REEPHOS CHEMICAL CO.,LTD",
    "valueUsdJulJun": 560,
    "valuePkrJulJun": 155750,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.95,
    "valueUsd2025": 560,
    "valuePkr2025": 155750,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "TRIBASIC CALCIUM PHOSPHATE USP/NF"
    ]
  },
  {
    "rank": 280,
    "name": "ZHONGSHANG CHEMICAL CO. LTD.",
    "valueUsdJulJun": 542,
    "valuePkrJulJun": 150625,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.95,
    "valueUsd2025": 182,
    "valuePkr2025": 50625,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ALLANTOIN"
    ]
  },
  {
    "rank": 281,
    "name": "TTCA CO. LTD",
    "valueUsdJulJun": 530,
    "valuePkrJulJun": 147350,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.96,
    "valueUsd2025": 426,
    "valuePkr2025": 118500,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ANHYDROUS CITRIC ACID BP"
    ]
  },
  {
    "rank": 282,
    "name": "FISHER SCIENTIFIC, UK",
    "valueUsdJulJun": 503,
    "valuePkrJulJun": 140000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.96,
    "valueUsd2025": 503,
    "valuePkr2025": 140000,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "GLYCINE BP"
    ]
  },
  {
    "rank": 283,
    "name": "HANGZHAU FAMO PHARMACEUTICAL",
    "valueUsdJulJun": 458,
    "valuePkrJulJun": 127500,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.96,
    "valueUsd2025": 458,
    "valuePkr2025": 127500,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "MAGNESIUM GLUCONATE USP"
    ]
  },
  {
    "rank": 284,
    "name": "JIAXING ZHONGHUA CHEM, CHINA",
    "valueUsdJulJun": 434,
    "valuePkrJulJun": 120750,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.97,
    "valueUsd2025": 473,
    "valuePkr2025": 131500,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "VANILLIN BP"
    ]
  },
  {
    "rank": 285,
    "name": "HERBAL EXTRACT CO, KARACHI",
    "valueUsdJulJun": 429,
    "valuePkrJulJun": 119250,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.97,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ALOE VERA GEL"
    ]
  },
  {
    "rank": 286,
    "name": "STANDARD MANUFECTURING COMPANY",
    "valueUsdJulJun": 371,
    "valuePkrJulJun": 103306,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.97,
    "valueUsd2025": 371,
    "valuePkr2025": 103306,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PERFUME APPLE MS"
    ]
  },
  {
    "rank": 287,
    "name": "KINGHERBS",
    "valueUsdJulJun": 368,
    "valuePkrJulJun": 102439,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.98,
    "valueUsd2025": 368,
    "valuePkr2025": 102439,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "L-CYSTINE"
    ]
  },
  {
    "rank": 288,
    "name": "UNID CO",
    "valueUsdJulJun": 338,
    "valuePkrJulJun": 94100,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.98,
    "valueUsd2025": 241,
    "valuePkr2025": 66900,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POTASSIUM HYDROXIDE BP"
    ]
  },
  {
    "rank": 289,
    "name": "TIANJIN ZHONGRUI PHARMACUTICAL CO, LTD",
    "valueUsdJulJun": 324,
    "valuePkrJulJun": 90000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.98,
    "valueUsd2025": 324,
    "valuePkr2025": 90000,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "NICOTINAMIDE BP"
    ]
  },
  {
    "rank": 290,
    "name": "HANGZHOU FAMO PHARMTECH",
    "valueUsdJulJun": 321,
    "valuePkrJulJun": 89250,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.98,
    "valueUsd2025": 992,
    "valuePkr2025": 276000,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "FERROUS GLUCONATE USP",
      "BORON CITRATE"
    ]
  },
  {
    "rank": 291,
    "name": "ORCHID PRINTING",
    "valueUsdJulJun": 280,
    "valuePkrJulJun": 78000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.98,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "AL-FOIL ASCARD 75MG TABLETS 214MM"
    ]
  },
  {
    "rank": 292,
    "name": "RAKESH SANDAL IND",
    "valueUsdJulJun": 280,
    "valuePkrJulJun": 77825,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.99,
    "valueUsd2025": 280,
    "valuePkr2025": 77825,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "TEA TREE OIL"
    ]
  },
  {
    "rank": 293,
    "name": "LEINER PAK GELATIN PAKISTAN.",
    "valueUsdJulJun": 270,
    "valuePkrJulJun": 75000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.99,
    "valueUsd2025": 270,
    "valuePkr2025": 75000,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "GELATIN BP"
    ]
  },
  {
    "rank": 294,
    "name": "SYNAROME MANUFACTURING CO. (PVT.) LTD.",
    "valueUsdJulJun": 249,
    "valuePkrJulJun": 69360,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.99,
    "valueUsd2025": 249,
    "valuePkr2025": 69360,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LEMON OIL 9623 MS"
    ]
  },
  {
    "rank": 295,
    "name": "NIPPON SEIRO CO LTD",
    "valueUsdJulJun": 242,
    "valuePkrJulJun": 67200,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.99,
    "valueUsd2025": 287,
    "valuePkr2025": 79700,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HARD PARAFFIN"
    ]
  },
  {
    "rank": 296,
    "name": "HEBEI JIHENG (GROUP) PHA",
    "valueUsdJulJun": 200,
    "valuePkrJulJun": 55620,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.99,
    "valueUsd2025": 200,
    "valuePkr2025": 55620,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "FOLIC ACID USP"
    ]
  },
  {
    "rank": 297,
    "name": "D.D. WILLIAMSON FOOD ING, IRELAND",
    "valueUsdJulJun": 194,
    "valuePkrJulJun": 54000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.99,
    "valueUsd2025": 194,
    "valuePkr2025": 54000,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CARAMEL MS"
    ]
  },
  {
    "rank": 298,
    "name": "ORGANIC HERB",
    "valueUsdJulJun": 192,
    "valuePkrJulJun": 53400,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TURMERIC EXTRACT (CURCUMA LONG 95%)"
    ]
  },
  {
    "rank": 299,
    "name": "ALLIOD AXIOM CHEMICAL (PVT) LTD",
    "valueUsdJulJun": 146,
    "valuePkrJulJun": 40534,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 133,
    "valuePkr2025": 37000,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HONEY FLAVOUR 20"
    ]
  },
  {
    "rank": 300,
    "name": "SHANDONG LUWEI PHARMA CO. LTD.",
    "valueUsdJulJun": 145,
    "valuePkrJulJun": 40250,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 145,
    "valuePkr2025": 40250,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "VITAMIN C (ASCORBIC ACID)"
    ]
  },
  {
    "rank": 301,
    "name": "LABCHEM INTERNATIONAL",
    "valueUsdJulJun": 107,
    "valuePkrJulJun": 29661,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 139,
    "valuePkr2025": 38559,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CHLOROFORM SPIRIT BP"
    ]
  },
  {
    "rank": 302,
    "name": "PURFUME SUPPLY COMPANY",
    "valueUsdJulJun": 104,
    "valuePkrJulJun": 28827,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 104,
    "valuePkr2025": 28827,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CARAWAY OIL MS"
    ]
  },
  {
    "rank": 303,
    "name": "LUWEI PHARMA CO LTD",
    "valueUsdJulJun": 67,
    "valuePkrJulJun": 18500,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ASCORBIC ACID"
    ]
  },
  {
    "rank": 304,
    "name": "ALLIED AXION CHEMICAL (PVT) LTD",
    "valueUsdJulJun": 63,
    "valuePkrJulJun": 17500,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LEMON FLAVOR SC736612"
    ]
  },
  {
    "rank": 305,
    "name": "BUSH BOAKE ALLEN UK",
    "valueUsdJulJun": 33,
    "valuePkrJulJun": 9280,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 1759,
    "valuePkr2025": 489280,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SUNSET YELLOW FCF LAKE (CI 15985:1) MS",
      "CHERRY FLAVOUR 2217 MS"
    ]
  },
  {
    "rank": 306,
    "name": "DALDA FOODS LTD.",
    "valueUsdJulJun": 16,
    "valuePkrJulJun": 4440,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 16,
    "valuePkr2025": 4440,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "OLIVE OIL (NEW)"
    ]
  },
  {
    "rank": 307,
    "name": "RZBC JUXIAN CO.LTD",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 88,
    "valuePkr2025": 24500,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ANHYDROUS CITRIC ACID BP"
    ]
  },
  {
    "rank": 308,
    "name": "KRONOS WORLD WIDE",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 1079,
    "valuePkr2025": 300000,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "TITANIUM DIOXIDE BP"
    ]
  },
  {
    "rank": 309,
    "name": "PURPONG ESSENCESS MFG",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 609,
    "valuePkr2025": 169450,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "EUCALYPTUS OIL"
    ]
  },
  {
    "rank": 310,
    "name": "BROTHERS ENTERPRISES (PV",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 71,
    "valuePkr2025": 19650,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SUCROSE (IMPORTED) BP"
    ]
  },
  {
    "rank": 311,
    "name": "ASIF OIL",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 64,
    "valuePkr2025": 17760,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CASTOR OIL USP/NF"
    ]
  },
  {
    "rank": 312,
    "name": "HANGZHOU XINFU SCIENCE AND TECHNOLOGY",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 306,
    "valuePkr2025": 85000,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CALCIUM PANTOTHENATE (CALCIUM D-PANTOTHE"
    ]
  },
  {
    "rank": 313,
    "name": "BIONORM",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 1573,
    "valuePkr2025": 437500,
    "sharePct2025": 0.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "IVY LEAF POWDER EXTRACT"
    ]
  },
  {
    "rank": 314,
    "name": "LONZA (THAILAND) CO., LT",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 2050,
    "valuePkr2025": 570105,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HG CAP SIZE 0,CAP WHITE,BODY LIGHT GREEN"
    ]
  },
  {
    "rank": 315,
    "name": "HANGZHOU DELI CHEMICAL CO. LTD.",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 4800,
    "valuePkr2025": 1334880,
    "sharePct2025": 0.04,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "BRIMONIDINE TARTRATE BP"
    ]
  },
  {
    "rank": 316,
    "name": "AARTI INDUSTRIES LTD",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 383,
    "valuePkr2025": 106373,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "IPRATROPIUM BROMIDE BP"
    ]
  },
  {
    "rank": 317,
    "name": "CAPSUGEL LONZA",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 13200,
    "valuePkr2025": 3670920,
    "sharePct2025": 0.1,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "EMPTY VEGETABLE CAPS WHITE OPAQUE Sz ‘0’"
    ]
  },
  {
    "rank": 318,
    "name": "EUROAPI FRANCE (FORMERLY SANOFI CHEMI)",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 16240,
    "valuePkr2025": 4520600,
    "sharePct2025": 0.12,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [
      "FLUOROMETHOLONE BP"
    ]
  },
  {
    "rank": 319,
    "name": "PHARMNOVA",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 23786,
    "valuePkr2025": 6615000,
    "sharePct2025": 0.18,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HGC SIZE=2 CAP&BODY GREEN-DOXYN(UNPRINTD"
    ]
  },
  {
    "rank": 320,
    "name": "RUGER CHEMICALS INC",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 15642,
    "valuePkr2025": 4350000,
    "sharePct2025": 0.12,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "TYLOXAPOL USP/NF"
    ]
  },
  {
    "rank": 321,
    "name": "MAIDO CORPORATION/TAKEHARA KAGAKU KOGYO CO LTD",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 4651,
    "valuePkr2025": 1294125,
    "sharePct2025": 0.03,
    "currency": "JPY",
    "category": "IMPORT",
    "materials": [
      "CALCIUM CARBONATE USP"
    ]
  },
  {
    "rank": 322,
    "name": "CENTRIENT PHARMACEUTICAL",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 13978,
    "valuePkr2025": 3890945,
    "sharePct2025": 0.1,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [
      "METOPROLOL TARTRATE USP"
    ]
  },
  {
    "rank": 323,
    "name": "MOEHS CATALANA S.L.",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 14210,
    "valuePkr2025": 3955525,
    "sharePct2025": 0.11,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "BISOPROLOL FUMARATE USP"
    ]
  },
  {
    "rank": 324,
    "name": "CANTON LABORATORIES PVT. LTD.",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 3218,
    "valuePkr2025": 894787,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ZINC SULFATE MONOHYDRATE USP"
    ]
  },
  {
    "rank": 325,
    "name": "PRECISE CHEMIPHARMA PVT.",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 4751,
    "valuePkr2025": 1321253,
    "sharePct2025": 0.04,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DORZOLAMIDE HYDROCHLORIDE USP",
      "TIMOLOL MALEATE USP"
    ]
  },
  {
    "rank": 326,
    "name": "SHANDONG BOSHAN / BEIJING JINGFENG PHARMACEUTICAL (SHANDONG) CO. LTD",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 98,
    "valuePkr2025": 27115,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CLOTRIMAZOLE USP"
    ]
  },
  {
    "rank": 327,
    "name": "INT’L FLAVOUR & FRAG",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 18923,
    "valuePkr2025": 5267468,
    "sharePct2025": 0.14,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ORANGE POWDER FLAVOUR TS7017 MS"
    ]
  },
  {
    "rank": 328,
    "name": "VENKATA NARAYANA ACTIVE INGREDIENTS PRIVATE LIMITED",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 42600,
    "valuePkr2025": 11847060,
    "sharePct2025": 0.32,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "VILDAGLIPTIN MS"
    ]
  },
  {
    "rank": 329,
    "name": "I.S.P, CANADA/ASHLNAD",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 512,
    "valuePkr2025": 142356,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CROSPOVIDONE BP"
    ]
  },
  {
    "rank": 330,
    "name": "IFF AROMA ESANS",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 1821,
    "valuePkr2025": 506490,
    "sharePct2025": 0.01,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "FLAVOR TUTTI FRUTI"
    ]
  },
  {
    "rank": 331,
    "name": "ALPHAMED PHARMA LTD",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 9375,
    "valuePkr2025": 2607188,
    "sharePct2025": 0.07,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ITRACONAZOLE PELLETS 22.2% W/W(MS)"
    ]
  },
  {
    "rank": 332,
    "name": "TITAN LABORATORIES PVT.",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 89945,
    "valuePkr2025": 25013705,
    "sharePct2025": 0.67,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DULOXETINE HYDROCHLORIDE EC PELLETS 14.8"
    ]
  },
  {
    "rank": 333,
    "name": "JIANGSU WEIQIDA PHARMACEUTICAL CO LTD",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 19000,
    "valuePkr2025": 5283900,
    "sharePct2025": 0.14,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "NEBIVILOL HCL BP"
    ]
  },
  {
    "rank": 334,
    "name": "HANDAN YONGNIAN DISTRICT LIYE CHEMICAL / YONGNIAN COUNTY LIYE CHEMICAL PRODUCTS",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 49500,
    "valuePkr2025": 13765950,
    "sharePct2025": 0.37,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CROTAMITON BP"
    ]
  },
  {
    "rank": 335,
    "name": "SHANGDONG ANHONG PHARMACEUTICAL CO.",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 3700,
    "valuePkr2025": 1028970,
    "sharePct2025": 0.03,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "EXEMESTANE(USP)"
    ]
  },
  {
    "rank": 336,
    "name": "ALPHAMED FORMULATION (PV",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 23180,
    "valuePkr2025": 6446358,
    "sharePct2025": 0.17,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ESOMEPRAZOLE ENTERIC COATED PELLETS 22.5"
    ]
  },
  {
    "rank": 337,
    "name": "CSPC WEISHENG PHARMACEUT",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 1250,
    "valuePkr2025": 347625,
    "sharePct2025": 0.01,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CALCIUM ASCORBATE(VITAMIN C)"
    ]
  },
  {
    "rank": 338,
    "name": "JIANGXI XINGANJIANG",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 2500,
    "valuePkr2025": 695250,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CALCIUM GLUCONATE USP"
    ]
  },
  {
    "rank": 339,
    "name": "HUNAN JIUDIAN HONGYUAN",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 97680,
    "valuePkr2025": 27164808,
    "sharePct2025": 0.73,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "WHITE SOFT PARAFFIN BP"
    ]
  },
  {
    "rank": 340,
    "name": "XIWANG PHARMACEUTICAL CO. LTD.",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 67915,
    "valuePkr2025": 18887162,
    "sharePct2025": 0.5,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ANHYDROUS GLUCOSE BP"
    ]
  },
  {
    "rank": 341,
    "name": "HUNAN HUAKANG BIOTECH INC",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 2150,
    "valuePkr2025": 597915,
    "sharePct2025": 0.02,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CHAMOMILE EXTRACT (10:1)",
      "PYRETHRUM EXTRACT"
    ]
  },
  {
    "rank": 342,
    "name": "KALI",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 8554,
    "valuePkr2025": 2379000,
    "sharePct2025": 0.06,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POTASSIUM CHLORIDE (API) BP"
    ]
  },
  {
    "rank": 343,
    "name": "CRODA BRAZIL",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 17260,
    "valuePkr2025": 4800000,
    "sharePct2025": 0.13,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LANOLIN ANHYDROUS USP/NF"
    ]
  },
  {
    "rank": 344,
    "name": "GLUCORP PVT. LTD",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 5280,
    "valuePkr2025": 1468269,
    "sharePct2025": 0.04,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIQUID GLUCOSE USP/NF"
    ]
  },
  {
    "rank": 345,
    "name": "MALAYAN SUGAR",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 14024,
    "valuePkr2025": 3900000,
    "sharePct2025": 0.1,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SUCROSE (IMPORTED) BP"
    ]
  },
  {
    "rank": 346,
    "name": "HAZIM INDUSTRIES (PVT) LTD",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 33,
    "valuePkr2025": 9300,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "GREEN LAKE COLOR MS",
      "ALLURA RED COLOR MS"
    ]
  },
  {
    "rank": 347,
    "name": "LYONDELL SOUTH ASIA PTE.LTD",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 72267,
    "valuePkr2025": 20097340,
    "sharePct2025": 0.54,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PROPYLENE GLYCOL BP"
    ]
  },
  {
    "rank": 348,
    "name": "DUKSAN PURE CHEM",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 59,
    "valuePkr2025": 16500,
    "sharePct2025": 0,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SELENIUM(AS SODIM SELENITE PENTAHYDRATE)"
    ]
  },
  {
    "rank": 349,
    "name": "BIONORM DOGAL URUNLER SAN",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 3776,
    "valuePkr2025": 1050000,
    "sharePct2025": 0.03,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "IVY LEAF POWDER EXTRACT"
    ]
  },
  {
    "rank": 350,
    "name": "HERCULES USA/ASHLAND.",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 453,
    "valuePkr2025": 126049,
    "sharePct2025": 0,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "HYPROMELLOSE (HPMC 2910, 4000 CPS) BP"
    ]
  },
  {
    "rank": 351,
    "name": "ZHEJIAN ZHONG BAV CHINA",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 2330,
    "valuePkr2025": 648000,
    "sharePct2025": 0.02,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "DL-ALPHA-TOCOPHERYL ACETATE USP"
    ]
  },
  {
    "rank": 352,
    "name": "MAIDO CORPORATION",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 3056,
    "valuePkr2025": 850000,
    "sharePct2025": 0.02,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "MAGNESIUM HYDROXIDE BP"
    ]
  },
  {
    "rank": 353,
    "name": "KAHL WAX GERMANY",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 16316,
    "valuePkr2025": 4537500,
    "sharePct2025": 0.12,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "WHITE BEESWAX BP"
    ]
  }
];

export const INDENTOR_RANKINGS_DATA: IndentorRankingItem[] = [
  {
    "rank": 1,
    "name": "IRIS INTERNATIONAL",
    "valueUsdJulJun": 1552813,
    "valuePkrJulJun": 431837156,
    "sharePctJulJun": 10.74,
    "cumShareJulJun": 10.74,
    "valueUsd2025": 988590,
    "valuePkr2025": 274926879,
    "sharePct2025": 7.35,
    "cumShare2025": 7.35,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CHLOROCRESOL BP (250 KG, $21,000.00)",
      "VITAMIN B2 (AS RIBOFLAVIN 5-PHOSPHATE SO (10 KG, $1,800.00)",
      "UBIQUINONE (COENZYME Q10) (125 KG, $19,375.00)",
      "GINSENG EXTRACT (275 KG, $4,350.00)",
      "SUCRALOSE (1,200 KG, $22,490.00)",
      "PERMETHRIN BP (2,000 KG, $59,500.00)",
      "AMINOPHYLLINE (ANHYDROUS) BP (2,800 KG, $25,480.00)",
      "CROTAMITON BP (21,000 KG, $628,875.00)",
      "TERBINAFINE HYDROCHLORIDE BP (1,775 KG, $86,687.50)",
      "NEBIVILOL HCL BP (70 KG, $91,700.00)",
      "AZITHROMYCIN DIHYDRATE USP (300 KG, $42,600.00)",
      "METFORMIN HYDROCHLORIDE BP (6,000 KG, $15,600.00)",
      "ANHYDROUS GLUCOSE(EXP) BP (125,000 KG, $89,000.00)",
      "PRALIDOXIME CHLORIDE USP (62 KG, $42,400.00)",
      "LULICONAZOLE MS (375 KG, $133,750.00)",
      "ANHYDROUS GLUCOSE BP (50,000 KG, $34,375.00)",
      "VONOPRAZAN FUMARATE (30 KG, $7,800.00)",
      "SUMATRIPTAN SUCCINATE BP (48 KG, $14,880.00)",
      "FLUCONAZOLE USP (75 KG, $6,900.00)",
      "VORICONAZOLE(USP) (250 KG, $152,750.00)",
      "LACOSAMIDE BP (100 KG, $10,000.00)",
      "CHOLICALCIFEROL CONCNTRT(POWDR FORM)VITD (100 KG, $9,500.00)",
      "FLUCONAZOLE(MICRONIZED) USP (75 KG, $7,900.00)",
      "BISOPROLOL FUMARATE USP (100 KG, $12,900.00)",
      "ESCITALOPRAM OXALATE USP (25 KG, $5,250.00)",
      "DEXAMETHASONE SODIUM PHOSPHATE USP (7,000 G, $5,950.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA",
      "TAIWAN",
      "BANGLADESH"
    ]
  },
  {
    "rank": 2,
    "name": "MORGAN",
    "valueUsdJulJun": 1315305,
    "valuePkrJulJun": 365786319,
    "sharePctJulJun": 9.09,
    "cumShareJulJun": 19.83,
    "valueUsd2025": 1009816,
    "valuePkr2025": 280829854,
    "sharePct2025": 7.51,
    "cumShare2025": 14.86,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "METHACRYLIC ACID COPOLYMER DISPERSION (28,600 KG, $232,420.09)",
      "PREGELATINIZED STARCH USP/NF (20,000 KG, $120,400.00)",
      "ACID HYPOPHOSPHOROUS 50% (500 KG, $9,250.00)",
      "PIPERONYL BUTOXIDE (100 KG, $5,100.00)",
      "ASPIRIN (ACETYLSALICYLIC ACID) BP (61,900 KG, $180,417.50)",
      "IVERMECTIN (MICRONIZED) (75 KG, $162,875.00)",
      "CARBOMER 971P (1,056 KG, $49,040.64)",
      "PERMETHRIN BP (2,000 KG, $61,000.00)",
      "HYDROCORTISONE ACETATE BP (20 KG, $4,560.00)",
      "ITRACONAZOLE PELLETS 22.2% W/W(MS) (1,500 KG, $105,900.00)",
      "SODIUM ASCORBATE BP/USP (500 KG, $2,325.00)",
      "OTESECONAZOLE (50 KG, $135,000.00)",
      "TELMISARTAN USP (50 KG, $2,750.00)",
      "TAPENTADOL HYDROCHLORIDE BP (25 KG, $19,500.00)",
      "CLOBETASOL PROPIONATE USP (135,000 G, $103,550.00)",
      "BETAMETHASONE DIPROPIONATE MICRONIZED BP (50,000 G, $35,000.00)",
      "BETAMETHASONE VALERATE (MICRONIZED) BP (75,000 G, $57,625.00)",
      "BETAMETHASONE SODIUM PHOSPHATE BP (40,000 G, $27,700.00)",
      "CARBOMER 980 (20 KG, $891.77)"
    ],
    "origins": [
      "CHINA",
      "GERMANY",
      "INDIA",
      "FRANCE",
      "ITALY"
    ]
  },
  {
    "rank": 3,
    "name": "NEON",
    "valueUsdJulJun": 1140330,
    "valuePkrJulJun": 317125800,
    "sharePctJulJun": 7.88,
    "cumShareJulJun": 27.71,
    "valueUsd2025": 1028123,
    "valuePkr2025": 285921033,
    "sharePct2025": 7.64,
    "cumShare2025": 22.5,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TEA TREE OIL (1 KG, $279.85)",
      "MYO-INOSITOL (2,000 KG, $6,900.00)",
      "FUSIDIC ACID (MICRONIZED) BP (48 KG, $14,304.00)",
      "TERPENE HYDRATE BP (450 KG, $13,450.00)",
      "LENALIDOMIDE(MS) (2 KG, $17,100.00)",
      "ERTUGLIFLOZIN L-PYROGLUTAMIC ACID (8 KG, $10,100.00)",
      "ROSUVASTATIN CALCIUM BP (72 KG, $12,738.00)",
      "AMLODIPINE BESILATE USP (365 KG, $16,200.00)",
      "HYDROCHLOROTHIAZIDE USP (74 KG, $2,863.00)",
      "VONOPRAZAN FUMARATE (15 KG, $3,975.00)",
      "SUMATRIPTAN SUCCINATE BP (72 KG, $20,088.00)",
      "FAMCICLOVIR USP (325 KG, $108,550.00)",
      "LETROZOLE USP (4 KG, $5,341.00)",
      "DIFLUCORTOLONE VALERATE (MICRONIZED) BP (2 KG, $17,000.00)",
      "NAPROXEN SODIUM USP (600 KG, $30,400.00)",
      "HYDROQUINONE (MICRONIZED) USP (4,000 KG, $89,375.00)",
      "PREGABALIN BP (300 KG, $11,400.00)",
      "DEXAMETHASONE (MICRONIZED) BP (2 KG, $1,700.00)",
      "LORATADINE (MICRONIZED) USP (275 KG, $23,481.25)",
      "LEVOFLOXACIN HEMIHYDRATE USP (400 KG, $14,800.00)",
      "PERMETHRIN BP (2,000 KG, $61,000.00)",
      "RIVAROXABAN BP (6 KG, $2,100.00)",
      "SITAGLIPTIN PHOSPHATE USP (400 KG, $18,000.00)",
      "TOBRAMYCIN SULFATE USP (3 KG, $3,600.00)",
      "NEOMYCIN SULPHATE BP (1,500 KG, $26,250.00)",
      "MICONAZOLE NITRATE USP (500 KG, $22,250.00)",
      "FLUCONAZOLE USP (200 KG, $12,850.00)",
      "ALPHA CYCLODEXTRIN (200 KG, $4,300.00)",
      "DOMPERIDONE(BASE) BP (100 KG, $4,850.00)",
      "EMPAGLIFLOZINE MS (100 KG, $16,625.00)",
      "DIBASIC CALCIUM PHOSPHATE USP (50 KG, $1,250.00)",
      "HYDROCORTISONE ACETATE BP (50 KG, $10,250.00)",
      "THALIDOMIDE USP (75 KG, $35,250.00)",
      "CLOTRIMAZOLE USP (75 KG, $2,725.00)",
      "CLINDAMYCIN PHOSPHATE USP (25 KG, $3,125.00)",
      "FLUCONAZOLE(MICRONIZED) USP (25 KG, $1,700.00)",
      "ISOCONAZOLE NITRATE (MICRONIZED) BP (25 KG, $3,625.00)",
      "LORNOXICAM MS (25 KG, $11,625.00)",
      "POLYMYXIN B SULPHATE BP (40,000 G, $78,500.00)",
      "HYDROCORTISONE BP (120,000 G, $23,400.00)",
      "FLUOCINOLONE ACETONIDE USP (26,000 G, $132,600.00)",
      "PHENYLEPHRINE HYDROCHLORIDE USP (5,000 G, $4,700.00)",
      "BRIMONIDINE TARTRATE BP (3,000 G, $19,500.00)",
      "MONTELUKAST SODIUM BP (44,000 G, $20,240.00)",
      "BETAMETHASONE VALERATE (MICRONIZED) BP (50,000 G, $34,000.00)",
      "BETAMETHASONE DIPROPIONATE MICRONIZED BP (150,000 G, $103,500.00)",
      "TOBRAMYCIN  BASE USP (7,000 G, $8,760.00)",
      "ADAPALENE BP (15,000 G, $34,500.00)",
      "TIZANIDINE HYDROCHLORIDE USP (1,000 G, $850.00)",
      "D-CHIROINOSITOL (120 KG, $18,360.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA",
      "SPAIN"
    ]
  },
  {
    "rank": 4,
    "name": "MRI",
    "valueUsdJulJun": 1020505,
    "valuePkrJulJun": 283802521,
    "sharePctJulJun": 7.06,
    "cumShareJulJun": 34.77,
    "valueUsd2025": 788959,
    "valuePkr2025": 219409544,
    "sharePct2025": 5.87,
    "cumShare2025": 28.36,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ALU ALU Base Foil (Printed) 142 mm  ±1mm (2,820 KG, $14,450.00)",
      "ALU ALU Base Foil (Printed) 202 mm  ±1mm (6,380 KG, $32,945.00)",
      "ALU ALU Base Foil (Printed) 235 mm ±1mm/ (6,820 KG, $35,355.00)",
      "ALU ALU Base Foil (Printed) 230 mm  ±1mm (23,460 KG, $120,440.00)",
      "ALU ALU Base Foil (Printed) 211 mm  ±1mm (47,730 KG, $245,775.29)",
      "ALU ALU Base Foil (Printed) 214 mm  ±1mm (91,340 KG, $475,330.00)",
      "BASE FOIL ASCARD 75MG TAB. 214MM (8,000 KG, $42,800.00)",
      "ALU ALU Base Foil (Printed) 245 mm  ±1mm (3,000 KG, $15,250.00)",
      "ALU ALU Base Foil (Printed) 235 mm  ±1mm (3,180 KG, $16,445.00)",
      "ALU ALU Base Foil (Printed) 224 mm  ±1mm (4,000 KG, $20,375.00)",
      "SUCRALOSE (100 KG, $1,340.00)"
    ],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 5,
    "name": "DAWN IMPEX",
    "valueUsdJulJun": 743141,
    "valuePkrJulJun": 206667404,
    "sharePctJulJun": 5.14,
    "cumShareJulJun": 39.9,
    "valueUsd2025": 699338,
    "valuePkr2025": 194486010,
    "sharePct2025": 5.2,
    "cumShare2025": 33.56,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SODIUM CITRATE BP (11,050 KG, $8,972.85)",
      "SODIUM CITRATE (API) BP (1,775 KG, $1,448.85)",
      "POTASSIUM CHLORIDE (API) BP (4,025 KG, $11,476.41)",
      "AMMONIUM CHLORIDE BP (5,850 KG, $11,407.50)",
      "METHYL SALICYLATE (2,000 KG, $6,900.00)",
      "TICAGRELOR (205 KG, $56,775.00)",
      "GLYCERYL TRINITRATE(DILU. NITROGLYCERIN (24,500 KG, $404,250.00)",
      "PREGABALIN BP (600 KG, $22,800.00)",
      "PURIFIED TALC BP (3,300 KG, $13,485.00)",
      "LINAGLIPTIN (9 KG, $4,500.00)",
      "MICROCRYSTALLINE CELLULOSE (PH 112) BP (20,000 KG, $64,000.00)",
      "LACTOSE MONOHYDRATE(200 MESH) B.P (4,000 KG, $10,000.00)",
      "DIMETHICONE 350 (30 KG, $875.00)",
      "SHEFFCOAT PVA ORANGE 5Y02849 (10 KG, $650.00)",
      "METHACRYLIC ACID COPOLYMER DISPERSION (9,000 KG, $40,500.00)",
      "SHEFFCOAT WHITE - 5Y00347 (100 KG, $1,170.00)",
      "ZINC SULFATE MONOHYDRATE USP (500 KG, $2,625.00)",
      "SHEFFCOAT PVA WHITE 5Y01440 (500 KG, $1,600.00)",
      "SODIUM STEARYL FUMARATE (50 KG, $3,250.00)",
      "TYLOXAPOL USP/NF (2,000 G, $9,200.00)",
      "EMPTY VEGETABLE CAPS WHITE OPAQUE Sz ‘0’ (25,000 HND, $15,000.00)",
      "HG CAP SIZE-0, CAP ORANGE, BODY WHITE TR (10,000 HND, $2,050.00)",
      "HG CAP SIZE 3,CAP PURPL OPQ,BODY WHIT OP (11,250 HND, $2,193.75)",
      "HG  CAP SIZE 3,CAP BODY PINK SYNGAB 75mg (26,250 HND, $5,118.75)",
      "HG CAP SIZE 2,CAP YELLOW,BODY YELLOW SYN (11,250 HND, $2,193.75)",
      "HG CAP SIZE 0,CAP WHITE,BODY LIGHT GREEN (11,000 HND, $2,255.00)",
      "HG CAP SIZE 3,CAP D-PURPLE,BODY D-PURPLE (11,250 HND, $2,193.75)",
      "BETAMETHASONE SODIUM PHOSPHATE BP (25,000 G, $17,000.00)",
      "BETAMETHASONE VALERATE (MICRONIZED) BP (25,000 G, $19,250.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA",
      "MALAYSIA",
      "USA",
      "Brazil"
    ]
  },
  {
    "rank": 6,
    "name": "RASHEED SONS",
    "valueUsdJulJun": 627296,
    "valuePkrJulJun": 174454009,
    "sharePctJulJun": 4.34,
    "cumShareJulJun": 44.24,
    "valueUsd2025": 430923,
    "valuePkr2025": 119841270,
    "sharePct2025": 3.2,
    "cumShare2025": 36.77,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SPRAY DRIED LACTOSE (SUPER TAB) (3,425 KG, $24,631.43)",
      "THYMUS VULGARIS EXTRACT (125 KG, $2,625.00)",
      "LACTOSE ANHYDROUS 21 AN (DC GRADE USP/NF (31,000 KG, $194,040.00)",
      "NEBIVILOL HCL BP (30 KG, $30,000.00)",
      "SIMETHICONE (ANTIFOAM) USP (800 KG, $15,400.00)",
      "NYSTATIN BP (1,080 KG, $267,408.00)",
      "FUSIDIC ACID (MICRONIZED) BP (108 KG, $37,980.00)",
      "LACTOSE MONOHYDRATE(200 MESH) B.P (6,000 KG, $16,800.00)",
      "DIBASIC CALCIUM PHOSPHATE USP (50 KG, $1,600.00)",
      "OLETH-2 (360 KG, $10,962.00)",
      "IPRATROPIUM BROMIDE BP (6,000 G, $16,750.00)",
      "FLUTICASONE PROPIONATE BP (1,000 G, $6,900.00)",
      "CICLOSPORIN BP (1,000 G, $2,200.00)"
    ],
    "origins": [
      "CHINA",
      "GERMANY",
      "INDIA",
      "SPAIN",
      "ROMANIA"
    ]
  },
  {
    "rank": 7,
    "name": "IPSEN",
    "valueUsdJulJun": 626745,
    "valuePkrJulJun": 174297729,
    "sharePctJulJun": 4.33,
    "cumShareJulJun": 48.57,
    "valueUsd2025": 415633,
    "valuePkr2025": 115587537,
    "sharePct2025": 3.09,
    "cumShare2025": 39.86,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DIOCTAHEDRAL SMECTITE (44,180 KG, $469,633.40)",
      "DIOCTAHEDRAL SMECTITE IPSEN SP. (14,780 KG, $157,111.40)"
    ],
    "origins": [
      "FRANCE"
    ]
  },
  {
    "rank": 8,
    "name": "MANSOOR",
    "valueUsdJulJun": 575181,
    "valuePkrJulJun": 159957845,
    "sharePctJulJun": 3.98,
    "cumShareJulJun": 52.55,
    "valueUsd2025": 650031,
    "valuePkr2025": 180773585,
    "sharePct2025": 4.83,
    "cumShare2025": 44.69,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "SUCROSE (IMPORTED) BP (66,550 KG, $99,282.63)",
      "D-CHIROINOSITOL (390 KG, $100,020.00)",
      "MANNITOL BP (6,000 KG, $16,800.00)",
      "MYO-INOSITOL (2,000 KG, $6,400.00)",
      "UREA (6,400 KG, $26,320.00)",
      "MIGLYOL OIL (4,640 KG, $20,678.40)",
      "ETHYL VANILLIN (5 KG, $2,100.00)",
      "ONDANSETRON HYDROCHLORIDE DIHYDRATE(BP) (60 KG, $6,300.00)",
      "ONDANSETRON HCL DIHYDRATE (MICRONIZED)BP (40 KG, $3,980.00)",
      "VALSARTAN USP (2,150 KG, $78,900.00)",
      "STEARIC ACID (MICRONIZED) USP/NF (11,000 KG, $49,650.00)",
      "DAPRODUSTAT MS (4 KG, $16,400.00)",
      "PERMETHRIN BP (2,000 KG, $61,000.00)",
      "VILDAGLIPTIN MS (600 KG, $39,900.00)",
      "IMIDUREA (10 KG, $2,450.00)",
      "TOFACITINIB  CITRATE(MS) (10 KG, $13,350.00)",
      "SODIUM ASCORBATE BP/USP (2,000 KG, $9,425.00)",
      "SODIUM STARCH GLYCOLATE (TYPE A) BP (500 KG, $2,900.00)",
      "ASPARTAME BP (125 KG, $2,250.00)",
      "LACOSAMIDE BP (50 KG, $4,200.00)",
      "CLOTRIMAZOLE USP (25 KG, $875.00)",
      "THIOMERSAL BP (2,000 G, $7,200.00)",
      "CHOLECALCIFEROL(VIT.D3) USP (2,000 G, $4,800.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA",
      "MALAYSIA",
      "SPAIN",
      "TAIWAN"
    ]
  },
  {
    "rank": 9,
    "name": "JIANGXI DIRECT",
    "valueUsdJulJun": 533817,
    "valuePkrJulJun": 148454508,
    "sharePctJulJun": 3.69,
    "cumShareJulJun": 56.24,
    "valueUsd2025": 727710,
    "valuePkr2025": 202376151,
    "sharePct2025": 5.41,
    "cumShare2025": 50.1,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PHENOXYETHANOL (5 KG, $617.00)",
      "DIPHENHYDRAMINE HYDROCHLORIDE BP (700 KG, $9,450.00)",
      "POLIDRONIUM CHLORIDE (0 KG, $1,200.00)",
      "CLINDAMYCIN PHOSPHATE USP (400 KG, $42,900.00)",
      "GEMFIBROZIL USP (4,500 KG, $168,750.00)",
      "DOXYCYCLINE HYCLATE BP (5,800 KG, $263,900.00)",
      "GENTAMICIN SULPHATE BP (200,000 G, $47,000.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA"
    ]
  },
  {
    "rank": 10,
    "name": "SPIRIT",
    "valueUsdJulJun": 520438,
    "valuePkrJulJun": 144733669,
    "sharePctJulJun": 3.6,
    "cumShareJulJun": 59.84,
    "valueUsd2025": 503803,
    "valuePkr2025": 140107475,
    "sharePct2025": 3.75,
    "cumShare2025": 53.84,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "IVERMECTIN USP (99 KG, $95,700.00)",
      "IVERMECTIN (MICRONIZED) (5 KG, $8,750.00)",
      "KETOCONAZOLE BP (4,500 KG, $252,000.00)",
      "TOBRAMYCIN SULFATE USP (8 KG, $8,400.00)",
      "HYDROQUINONE (MICRONIZED) USP (3,000 KG, $36,000.00)",
      "LEVOFLOXACIN HEMIHYDRATE USP (525 KG, $19,512.50)",
      "ZINC SULFATE MONOHYDRATE USP (2,500 KG, $14,775.00)",
      "CROTAMITON BP (500 KG, $15,250.00)",
      "ALPHA CYCLODEXTRIN (100 KG, $1,850.00)",
      "ADAPALENE BP (18,000 G, $38,100.00)",
      "IVABRADINE HCL MS (6,000 G, $15,060.00)",
      "MILRINONE USP (600 G, $3,840.00)",
      "NOREPINEPHRINE BITARTRATE USP (4,000 G, $11,200.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA"
    ]
  },
  {
    "rank": 11,
    "name": "TRANS",
    "valueUsdJulJun": 462109,
    "valuePkrJulJun": 128512600,
    "sharePctJulJun": 3.19,
    "cumShareJulJun": 63.03,
    "valueUsd2025": 290029,
    "valuePkr2025": 80645887,
    "sharePct2025": 2.16,
    "cumShare2025": 56,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CETOSTEARYL ALCOHOL BP (15,200 KG, $31,388.00)",
      "COPOVIDONE (PLASDONE-S630) BP (6,500 KG, $120,250.00)",
      "MICROCRYSTALLINE CELLULOSE (PH 112) BP (40,000 KG, $169,746.31)",
      "TOFACITINIB  CITRATE(MS) (5 KG, $6,600.00)",
      "MICROCRYSTALLINE CELLULOSE (PH 102) BP (24,000 KG, $67,200.00)",
      "CROSCARMELLOSE SODIUM BP (6,000 KG, $59,400.00)",
      "MICROCRYSTALLINE CELLULOSE (PH 101) BP (400 KG, $1,120.00)",
      "CROSPOVIDONE BP (250 KG, $6,405.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA",
      "MALAYSIA",
      "FRANCE"
    ]
  },
  {
    "rank": 12,
    "name": "A.M.YOUSUF & CO.",
    "valueUsdJulJun": 461911,
    "valuePkrJulJun": 128457400,
    "sharePctJulJun": 3.19,
    "cumShareJulJun": 66.23,
    "valueUsd2025": 476461,
    "valuePkr2025": 132503750,
    "sharePct2025": 3.54,
    "cumShare2025": 59.54,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SORBITAN MONOSTEARATE USP (50 KG, $575.33)",
      "LIGHT LIQUID PARAFFIN BP (47,040 KG, $90,407.77)",
      "STEARYL ALCOHOL BP (635 KG, $1,826.68)",
      "POLYSORBATE 20 (TWEEN 20) (2,050 KG, $12,162.89)",
      "SORBITAN SESQUIOLEATE (SP 83-LQ-(SG) BP (1,710 KG, $13,527.51)",
      "GLYCERYL MONOSTEARATE USP/NF (10,300 KG, $27,630.35)",
      "CETYL ALCOHOL BP (7,525 KG, $25,062.93)",
      "POLYSORBATE 80(TWEEN 80)USP/NF/BP (2,500 KG, $13,709.10)",
      "CETOMACROGOL 1000 BP 98 (16,180 KG, $150,233.73)",
      "LANOLIN ANHYDROUS USP/NF (2,050 KG, $58,971.59)",
      "WHITE SOFT PARAFFIN BP (25,000 KG, $46,278.32)",
      "SODIUM LAURYL ETHER SULPHATE BP (6,500 KG, $15,893.56)",
      "ARLACEL 983 (60 KG, $2,696.87)",
      "SODIUM LAURYL SULPHATE BP (280 KG, $1,208.20)",
      "ARLACEL 165 (300 KG, $1,726.00)"
    ],
    "origins": [
      "SINGAPORE",
      "INDIA",
      "MALAYSIA",
      "KOREA",
      "EUROPE",
      "IRAN",
      "UAE",
      "Brazil"
    ]
  },
  {
    "rank": 13,
    "name": "PENTALAM",
    "valueUsdJulJun": 457900,
    "valuePkrJulJun": 127341990,
    "sharePctJulJun": 3.17,
    "cumShareJulJun": 69.39,
    "valueUsd2025": 588300,
    "valuePkr2025": 163606230,
    "sharePct2025": 4.37,
    "cumShare2025": 63.92,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "AZELAIC ACID (325 KG, $78,000.00)",
      "EFLORNITHINE HYDROCHLORIDE MONOHYDRATE M (250 KG, $262,500.00)",
      "LISINOPRIL DIHYDRATE USP (270 KG, $67,500.00)",
      "VALSARTAN USP (1,525 KG, $46,800.00)",
      "METOPROLOL TARTRATE USP (100 KG, $3,100.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA"
    ]
  },
  {
    "rank": 14,
    "name": "GUDIA",
    "valueUsdJulJun": 432638,
    "valuePkrJulJun": 120316489,
    "sharePctJulJun": 2.99,
    "cumShareJulJun": 72.38,
    "valueUsd2025": 428675,
    "valuePkr2025": 119214518,
    "sharePct2025": 3.19,
    "cumShare2025": 67.1,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CHLORPHENAMINE MALEATE BP (600 KG, $20,337.50)",
      "METOPROLOL TARTRATE USP (7,000 KG, $253,700.00)",
      "HYDROXYCHLOROQUINE SULFATE USP (475 KG, $60,075.00)",
      "IBUPROFEN. BP(27 GRADE) (225 KG, $8,325.00)",
      "CLOPIDOGREL BISULFATE USP (1,000 KG, $45,000.00)",
      "SALBUTAMOL SULPHATE BP (125 KG, $12,050.00)",
      "TRANEXAMIC ACID BP (50 KG, $2,450.00)",
      "METHYLPREDNISOLONE ACEPONATE MS (4,000 G, $16,000.00)",
      "DONEPEZIL HYDROCHLORIDE USP (20,000 G, $12,600.00)",
      "OLOPATADINE HYDROCHLORIDE USP (750 G, $2,100.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA"
    ]
  },
  {
    "rank": 15,
    "name": "BIOINVENTIA",
    "valueUsdJulJun": 341863,
    "valuePkrJulJun": 95072200,
    "sharePctJulJun": 2.36,
    "cumShareJulJun": 74.75,
    "valueUsd2025": 212656,
    "valuePkr2025": 59139700,
    "sharePct2025": 1.58,
    "cumShare2025": 68.68,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HARD PARAFFIN (84 KG, $241.64)",
      "WHITE SOFT PARAFFIN BP (178,375 KG, $341,621.72)"
    ],
    "origins": [
      "CHINA",
      "JAPAN",
      "IRAN"
    ]
  },
  {
    "rank": 16,
    "name": "PROGRESSIVE",
    "valueUsdJulJun": 262590,
    "valuePkrJulJun": 73026279,
    "sharePctJulJun": 1.82,
    "cumShareJulJun": 76.56,
    "valueUsd2025": 172010,
    "valuePkr2025": 47835981,
    "sharePct2025": 1.28,
    "cumShare2025": 69.96,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PANTHENOL USP (20 KG, $920.00)",
      "BACITRACIN BP (390 KG, $239,500.00)",
      "GRAMICIDIN USP (1,000 G, $22,170.00)"
    ],
    "origins": [
      "CHINA",
      "FRANCE",
      "DENMARK"
    ]
  },
  {
    "rank": 17,
    "name": "BROTHERS ENTERPRISES (PV",
    "valueUsdJulJun": 220921,
    "valuePkrJulJun": 61438220,
    "sharePctJulJun": 1.53,
    "cumShareJulJun": 78.09,
    "valueUsd2025": 141560,
    "valuePkr2025": 39367930,
    "sharePct2025": 1.05,
    "cumShare2025": 71.01,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "XANTHAN GUM BP/USP (375 KG, $7,272.11)",
      "ISOPROPYL ALCOHOL BP (640 KG, $966.56)",
      "PROPYLENE GLYCOL BP (73,285 KG, $155,890.51)",
      "COLLOIDAL SILICON DIOXIDE USP/NF (2,890 KG, $30,063.90)",
      "LIGHT LIQUID PARAFFIN BP (3,855 KG, $8,234.90)",
      "CITRIC ACID MONOHYDRATE BP (800 KG, $604.10)",
      "ANHYDROUS GLUCOSE(EXP) BP (12,500 KG, $17,889.25)"
    ],
    "origins": [
      "CHINA",
      "GERMANY",
      "PAKISTAN",
      "SINGAPORE",
      "TURKEY",
      "KOREA",
      "TAIWAN",
      "AUSTRIA"
    ]
  },
  {
    "rank": 18,
    "name": "HABIB RICE",
    "valueUsdJulJun": 219988,
    "valuePkrJulJun": 61178800,
    "sharePctJulJun": 1.52,
    "cumShareJulJun": 79.61,
    "valueUsd2025": 255414,
    "valuePkr2025": 71030600,
    "sharePct2025": 1.9,
    "cumShare2025": 72.91,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIQUID SORBITOL (NON-CRYSTALLISING)  BP (58,275 KG, $45,806.54)",
      "SUCROSE BP (280,000 KG, $174,181.95)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 19,
    "name": "PHARMNOVA (PRIVATE) LIMI",
    "valueUsdJulJun": 198301,
    "valuePkrJulJun": 55147500,
    "sharePctJulJun": 1.37,
    "cumShareJulJun": 80.98,
    "valueUsd2025": 280825,
    "valuePkr2025": 78097500,
    "sharePct2025": 2.09,
    "cumShare2025": 75,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HG CAP SIZE 3,CAP PURPLE,BODY PURPLE SYN (41,250 HND, $13,349.51)",
      "HG CAP SIZE 2,CAP GREEN,BODY GREEN DOXYN (556,000 HND, $179,935.28)",
      "HG CAP SIZE 2,CAP LIGHT GREN,BODY WHIT T (10,500 HND, $3,398.06)",
      "HG CAPS SIZE 1 CAP DARK BLUE, BODY WHITE (5,000 HND, $1,618.12)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 20,
    "name": "CAUSWAY",
    "valueUsdJulJun": 185663,
    "valuePkrJulJun": 51632741,
    "sharePctJulJun": 1.28,
    "cumShareJulJun": 82.26,
    "valueUsd2025": 315624,
    "valuePkr2025": 87775034,
    "sharePct2025": 2.35,
    "cumShare2025": 77.35,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MISOPROSTOL DISPERSION (1% W/W) USP (90 KG, $81,100.00)",
      "SITAGLIPTIN PHOSPHATE USP (400 KG, $17,200.00)",
      "BRINZOLAMIDE (MICRONIZED AND STERILE)USP (4 KG, $52,537.50)",
      "RISEDRONATE SODIUM USP (10 KG, $6,150.00)",
      "CLOPIDOGREL BISULFATE USP (250 KG, $10,875.00)",
      "NEPAFENAC MS (1,500 G, $12,000.00)",
      "DONEPEZIL HYDROCHLORIDE USP (5,000 G, $3,000.00)",
      "OLOPATADINE HYDROCHLORIDE USP (1,000 G, $2,800.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA",
      "UK"
    ]
  },
  {
    "rank": 21,
    "name": "MARTIN DOW SPECIALITIES",
    "valueUsdJulJun": 173606,
    "valuePkrJulJun": 48279790,
    "sharePctJulJun": 1.2,
    "cumShareJulJun": 83.46,
    "valueUsd2025": 175087,
    "valuePkr2025": 48691603,
    "sharePct2025": 1.3,
    "cumShare2025": 78.65,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ANHYDROUS SODIUM SULPHITE BP (175 KG, $2,535.06)",
      "VITAMIN A (AS RETINYL PALMITATE) USP (100 KG, $12,535.06)",
      "SODIUM METABISULPHITE BP (200 KG, $2,293.60)",
      "BORIC ACID BP (125 KG, $2,076.59)",
      "MEGLUMINE (50 KG, $5,970.87)",
      "DISODIUM HYDROGEN PHOSPHATE DIHYDRATE BP (295 KG, $9,546.93)",
      "SODIUM BICARBONATE BP/USP (125 KG, $719.17)",
      "BUTYLATED HYDROXYTOLUENE BP (239 KG, $19,371.45)",
      "CHLOROCRESOL BP (50 KG, $3,955.41)",
      "POLYSORBATE 60 USP (100 KG, $6,112.91)",
      "SODIUM DIHYDROGEN PHOSPHATE DIHYDRATE BP (675 KG, $8,606.98)",
      "FUMARIC ACID (14 KG, $1,285.51)",
      "SALICYLIC ACID (MICRONIZED) BP (1,075 KG, $69,623.88)",
      "ORTHO PHOSPHORIC ACID 85 % BP (275 L, $4,314.99)",
      "BENZYL ALCOHOL BP (728 L, $17,109.82)",
      "GLYCINE BP (5 KG, $341.60)",
      "ANHYDROUS CALCIUM HYDROGEN PHOSPHATE (300 KG, $5,695.79)",
      "SORBIC ACID BP (50 KG, $1,510.25)"
    ],
    "origins": [
      "CHINA",
      "GERMANY"
    ]
  },
  {
    "rank": 22,
    "name": "SMART CHEM",
    "valueUsdJulJun": 173100,
    "valuePkrJulJun": 48139110,
    "sharePctJulJun": 1.2,
    "cumShareJulJun": 84.66,
    "valueUsd2025": 171600,
    "valuePkr2025": 47721960,
    "sharePct2025": 1.28,
    "cumShare2025": 79.92,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "PERMETHRIN BP (6,000 KG, $171,600.00)",
      "CHLORPHENAMINE MALEATE BP (25 KG, $1,500.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA"
    ]
  },
  {
    "rank": 23,
    "name": "OLSTAR ENTERPRISES",
    "valueUsdJulJun": 153357,
    "valuePkrJulJun": 42648500,
    "sharePctJulJun": 1.06,
    "cumShareJulJun": 85.72,
    "valueUsd2025": 66994,
    "valuePkr2025": 18631000,
    "sharePct2025": 0.5,
    "cumShare2025": 80.42,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM LAURYL ETHER SULPHATE BP (59,325 KG, $153,356.71)"
    ],
    "origins": [
      "MALAYSIA",
      "EUROPE"
    ]
  },
  {
    "rank": 24,
    "name": "SABCON CHEMICALS",
    "valueUsdJulJun": 142653,
    "valuePkrJulJun": 39671750,
    "sharePctJulJun": 0.99,
    "cumShareJulJun": 86.71,
    "valueUsd2025": 119778,
    "valuePkr2025": 33310350,
    "sharePct2025": 0.89,
    "cumShare2025": 81.31,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "NICOTINAMIDE BP (50 KG, $323.62)",
      "ISOPROPYL MYRISTATE BP (14,100 KG, $81,063.47)",
      "SALICYLIC ACID BP (1,200 KG, $5,177.99)",
      "WHITE BEESWAX BP (3,000 KG, $35,598.71)",
      "DL-ALPHA-TOCOPHERYL ACETATE USP (360 KG, $13,117.58)",
      "CALCIUM L-5-METHYLTETRAHYDROFOLATE (5 KG, $4,494.79)",
      "BEESWAX SUBSTITUTE (KAHL WAX 1540) (400 KG, $2,876.66)"
    ],
    "origins": [
      "CHINA",
      "GERMANY",
      "INDIA",
      "JAPAN",
      "MALAYSIA",
      "KOREA",
      "SAUDIA ARAB"
    ]
  },
  {
    "rank": 25,
    "name": "BIOFAR CHEM",
    "valueUsdJulJun": 132059,
    "valuePkrJulJun": 36726435,
    "sharePctJulJun": 0.91,
    "cumShareJulJun": 87.62,
    "valueUsd2025": 98045,
    "valuePkr2025": 27266609,
    "sharePct2025": 0.73,
    "cumShare2025": 82.04,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "IRON(III) HYDROXIDE POLYMALTOSE CMPLX MS (925 KG, $6,319.67)",
      "VITAMIN K2 (MENAQUINONE-7) (100 KG, $22,000.00)",
      "LIDOCAINE BP (2,800 KG, $39,400.00)",
      "VONOPRAZAN FUMARATE (5 KG, $1,050.00)",
      "LINEZOLID USP (725 KG, $47,475.00)",
      "TRANSCUTOL HP (50 KG, $2,754.71)",
      "MOXIFLOXACIN HYDROCHLORIDE BP (39,000 G, $13,060.00)"
    ],
    "origins": [
      "CHINA",
      "PAKISTAN",
      "INDIA",
      "FRANCE",
      "ITALY"
    ]
  },
  {
    "rank": 26,
    "name": "LARGO INTERNATIONAL",
    "valueUsdJulJun": 131838,
    "valuePkrJulJun": 36664064,
    "sharePctJulJun": 0.91,
    "cumShareJulJun": 88.53,
    "valueUsd2025": 122528,
    "valuePkr2025": 34074953,
    "sharePct2025": 0.91,
    "cumShare2025": 82.95,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "AL-FOIL ASCARD PLUS TABLETS 211MM (800 KG, $5,904.00)",
      "AL-FOIL GEMPID 600MG TAB 212MM (200 KG, $1,468.00)",
      "AL.FOIL 211MM CARDNIT 2.6MG TAB.(COM) (4,660 KG, $33,476.20)",
      "AL.FOIL ASCARD 75MG 214MM (10,600 KG, $76,803.50)",
      "AL-FOIL DIOPLUS 5/160MG TABLETS 230MM (400 KG, $2,878.00)",
      "AL.FOIL 211MM CARDNIT 6.4MG TAB.(COM) (800 KG, $5,776.00)",
      "AL-FOIL MEROL 100MG TAB 236MM (200 KG, $1,394.00)",
      "AL-FOIL DIOPLUS 10/160MG TABLETS 230MM (400 KG, $2,744.00)",
      "AL-FOIL DIROXX 50MG CAPS.235MM (200 KG, $1,394.00)"
    ],
    "origins": [
      "MALAYSIA"
    ]
  },
  {
    "rank": 27,
    "name": "KOHINOOR SOAP & DETERGEN",
    "valueUsdJulJun": 127328,
    "valuePkrJulJun": 35410000,
    "sharePctJulJun": 0.88,
    "cumShareJulJun": 89.41,
    "valueUsd2025": 119399,
    "valuePkr2025": 33205000,
    "sharePct2025": 0.89,
    "cumShare2025": 83.84,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "GLYCEROL BP (103,000 KG, $118,464.58)",
      "GLYCERIN (GLYCEROL) BP (8,500 KG, $8,863.72)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 28,
    "name": "PARADISE",
    "valueUsdJulJun": 119130,
    "valuePkrJulJun": 33129914,
    "sharePctJulJun": 0.82,
    "cumShareJulJun": 90.24,
    "valueUsd2025": 82700,
    "valuePkr2025": 22998731,
    "sharePct2025": 0.61,
    "cumShare2025": 84.46,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "OPADRY ENTERIC YELLOW 94S52698 MS (225 KG, $41,670.50)",
      "OPADRY WHITE Y-1-7000 MS (575 KG, $49,459.00)",
      "OPADRY II BLUE (85F205025) (325 KG, $20,119.00)",
      "OPADRY II GREEN 85G11948 MS (50 KG, $3,117.50)",
      "OPADRY II PINK (85F240248) (25 KG, $1,605.50)",
      "OPADRY II YELLOW (85G32558) (25 KG, $1,599.25)",
      "OPADRY II RED (85F25467) (25 KG, $1,558.75)"
    ],
    "origins": [
      "UK"
    ]
  },
  {
    "rank": 29,
    "name": "CHEMMCO",
    "valueUsdJulJun": 104465,
    "valuePkrJulJun": 29051656,
    "sharePctJulJun": 0.72,
    "cumShareJulJun": 90.96,
    "valueUsd2025": 92739,
    "valuePkr2025": 25790828,
    "sharePct2025": 0.69,
    "cumShare2025": 85.14,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM PERBORATE BP (4 KG, $81.47)",
      "SULFUR BP (3,750 KG, $64,724.92)",
      "ANHYDROUS CALCIUM HYDROGEN PHOSPHATE (2,600 KG, $39,266.45)",
      "POTASSIUM IODIDE USP (1 KG, $215.75)",
      "BENZALKONIUM CHLORIDE SOL (50% W/V) BP (5 L, $176.20)"
    ],
    "origins": [
      "CHINA",
      "GERMANY",
      "MALAYSIA",
      "BELGIUM"
    ]
  },
  {
    "rank": 30,
    "name": "SYNAPSE",
    "valueUsdJulJun": 97550,
    "valuePkrJulJun": 27128655,
    "sharePctJulJun": 0.67,
    "cumShareJulJun": 91.63,
    "valueUsd2025": 56101,
    "valuePkr2025": 15601688,
    "sharePct2025": 0.42,
    "cumShare2025": 85.56,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ESZOPICLONE USP (1 KG, $3,500.00)",
      "DORZOLAMIDE HYDROCHLORIDE USP (50 KG, $80,000.00)",
      "TIMOLOL MALEATE USP (31,000 G, $14,050.00)"
    ],
    "origins": [
      "INDIA"
    ]
  },
  {
    "rank": 31,
    "name": "RAFHAN",
    "valueUsdJulJun": 70812,
    "valuePkrJulJun": 19692756,
    "sharePctJulJun": 0.49,
    "cumShareJulJun": 92.12,
    "valueUsd2025": 96368,
    "valuePkr2025": 26800019,
    "sharePct2025": 0.72,
    "cumShare2025": 86.28,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "MAIZE STARCH BP (8,325 KG, $8,834.05)",
      "LIQUID GLUCOSE USP/NF (79,200 KG, $61,850.61)",
      "DEXTROSE MONOHYDRATE USP (125 KG, $127.11)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 32,
    "name": "UNITED CHEMICAL CORPORAT",
    "valueUsdJulJun": 70566,
    "valuePkrJulJun": 19624435,
    "sharePctJulJun": 0.49,
    "cumShareJulJun": 92.61,
    "valueUsd2025": 105885,
    "valuePkr2025": 29446740,
    "sharePct2025": 0.79,
    "cumShare2025": 87.07,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "VITAMIN C (ASCORBIC ACID) (50 KG, $144.73)",
      "POTASSIUM SORBATE BP (150 KG, $412.08)",
      "VANILLIN BP (50 KG, $434.20)",
      "TRIBASIC CALCIUM PHOSPHATE USP/NF (350 KG, $560.05)",
      "LACTIC ACID BP (500 KG, $746.13)",
      "LIQUID SORBITOL (NON-CRYSTALLISING)  BP (28,600 KG, $22,110.75)",
      "SODIUM BENZOATE BP/USP (2,575 KG, $3,190.31)",
      "CARAMEL MS (960 KG, $1,540.45)",
      "SACCHARIN SODIUM BP (1,100 KG, $6,307.08)",
      "ISOPROPYL ALCOHOL BP (14,560 KG, $23,297.23)",
      "METHYLPARABEN USP/NF (1,600 KG, $11,823.09)"
    ],
    "origins": [
      "CHINA",
      "PAKISTAN",
      "SINGAPORE",
      "JAPAN",
      "TAIWAN",
      "Ireland"
    ]
  },
  {
    "rank": 33,
    "name": "BIOCHEM",
    "valueUsdJulJun": 68475,
    "valuePkrJulJun": 19042898,
    "sharePctJulJun": 0.47,
    "cumShareJulJun": 93.08,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "cumShare2025": 87.07,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DEXTROMETHORPHAN HYDROBROMIDE BP (825 KG, $68,475.00)"
    ],
    "origins": [
      "INDIA"
    ]
  },
  {
    "rank": 34,
    "name": "BA ENTERPRISES",
    "valueUsdJulJun": 66090,
    "valuePkrJulJun": 18379629,
    "sharePctJulJun": 0.46,
    "cumShareJulJun": 93.54,
    "valueUsd2025": 45500,
    "valuePkr2025": 12653550,
    "sharePct2025": 0.34,
    "cumShare2025": 87.4,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ORANGE DURAROME FLAVOR 501289 TD0990B (200 KG, $13,310.00)",
      "VANILLA DURAROME FLAVOR 501465 TD1591 (800 KG, $52,780.00)"
    ],
    "origins": [
      "BELGIUM"
    ]
  },
  {
    "rank": 35,
    "name": "SBR",
    "valueUsdJulJun": 58938,
    "valuePkrJulJun": 16390519,
    "sharePctJulJun": 0.41,
    "cumShareJulJun": 93.95,
    "valueUsd2025": 88225,
    "valuePkr2025": 24535373,
    "sharePct2025": 0.66,
    "cumShare2025": 88.06,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "CHLORHEXIDINE GLUCONATE SOLUTION USP (1,400 KG, $9,450.00)",
      "POTASSIUM CHLORIDE (API) BP (7,000 KG, $17,250.00)",
      "EXEMESTANE(USP) (3 KG, $7,200.00)",
      "DOMPERIDONE(BASE) BP (125 KG, $8,637.50)",
      "METHYLPREDNISOLONE ACEPONATE MS (4,000 G, $16,400.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA",
      "MALAYSIA"
    ]
  },
  {
    "rank": 36,
    "name": "ARFEEN",
    "valueUsdJulJun": 56600,
    "valuePkrJulJun": 15740460,
    "sharePctJulJun": 0.39,
    "cumShareJulJun": 94.34,
    "valueUsd2025": 53550,
    "valuePkr2025": 14892255,
    "sharePct2025": 0.4,
    "cumShare2025": 88.46,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "DIFLUCORTOLONE VALERATE (MICRONIZED) BP (1 KG, $4,100.00)",
      "TRETINOIN(MICRONIZED) USP (78,000 G, $52,500.00)"
    ],
    "origins": [
      "CHINA",
      "INDIA",
      "ITALY"
    ]
  },
  {
    "rank": 37,
    "name": "AL-MEHRAN CHEMICALS",
    "valueUsdJulJun": 56599,
    "valuePkrJulJun": 15740230,
    "sharePctJulJun": 0.39,
    "cumShareJulJun": 94.73,
    "valueUsd2025": 62690,
    "valuePkr2025": 17433970,
    "sharePct2025": 0.47,
    "cumShare2025": 88.92,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ISOPROPYL ALCOHOL BP (31,400 KG, $55,450.41)",
      "TRIETHANOLAMINE BP (690 KG, $1,148.76)"
    ],
    "origins": [
      "KOREA",
      "TAIWAN",
      "SAUDIA ARAB"
    ]
  },
  {
    "rank": 38,
    "name": "GUIDES",
    "valueUsdJulJun": 56464,
    "valuePkrJulJun": 15702754,
    "sharePctJulJun": 0.39,
    "cumShareJulJun": 95.12,
    "valueUsd2025": 67783,
    "valuePkr2025": 18850564,
    "sharePct2025": 0.5,
    "cumShare2025": 89.43,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "GUAR GUM (N-HANCE) (100 KG, $2,223.75)",
      "KLUCEL EXF (181 KG, $11,171.26)",
      "CROSPOVIDONE BP (750 KG, $19,215.00)",
      "HYPROMELLOSE (HPMC 2910, 4000 CPS) BP (1,000 KG, $17,965.00)",
      "HPMC K100M Ph BP (212 KG, $4,459.66)",
      "HPMC 15CPS (100 KG, $1,429.75)"
    ],
    "origins": [
      "CHINA",
      "USA",
      "EUROPE",
      "FRANCE",
      "BELGIUM"
    ]
  },
  {
    "rank": 39,
    "name": "BC AGA",
    "valueUsdJulJun": 51005,
    "valuePkrJulJun": 14197913,
    "sharePctJulJun": 0.35,
    "cumShareJulJun": 95.47,
    "valueUsd2025": 71430,
    "valuePkr2025": 19879627,
    "sharePct2025": 0.53,
    "cumShare2025": 89.96,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ORANGE POWDER FLAVOUR TS7017 MS (2,000 KG, $34,405.60)",
      "ESSENCES POMEGRANATE MS (600 L, $16,599.60)"
    ],
    "origins": [
      "Slovenia",
      "NETHERLAND"
    ]
  },
  {
    "rank": 40,
    "name": "S.M.C PAKISTAN",
    "valueUsdJulJun": 39610,
    "valuePkrJulJun": 11015435,
    "sharePctJulJun": 0.27,
    "cumShareJulJun": 95.75,
    "valueUsd2025": 33058,
    "valuePkr2025": 9193345,
    "sharePct2025": 0.25,
    "cumShare2025": 90.2,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "STRAWBERRY RED COLOUR MS (50 KG, $276.37)",
      "PERFUME APPLE MS (600 KG, $8,915.28)",
      "COOL BREEZE EF (5 KG, $132.99)",
      "FLAVOUR BANANA 3722 MS (20 L, $159.88)",
      "PINEAPPLE 900 MS (80 L, $786.92)",
      "ANISE OIL BP (130 L, $3,202.67)",
      "OIL OF SWEET ORANGE 3720 MS (519 L, $11,166.56)",
      "BULGARIAN ROSE EF MS (375 L, $9,973.96)",
      "OIL OF LEMON EXCELLENT EF MS (300 L, $4,974.72)",
      "PEPPERMINT OIL EF MS (1 L, $20.27)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 41,
    "name": "Z.A.TRADERS",
    "valueUsdJulJun": 36114,
    "valuePkrJulJun": 10043266,
    "sharePctJulJun": 0.25,
    "cumShareJulJun": 96,
    "valueUsd2025": 21489,
    "valuePkr2025": 5976027,
    "sharePct2025": 0.16,
    "cumShare2025": 90.36,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "L-CYSTINE (2 KG, $368.35)",
      "PHENYLETHYL ALCOHOL USP/NF (3,000 L, $35,641.86)",
      "CARAWAY OIL MS (2 L, $103.66)"
    ],
    "origins": [
      "CHINA",
      "PAKISTAN"
    ]
  },
  {
    "rank": 42,
    "name": "HCP",
    "valueUsdJulJun": 36000,
    "valuePkrJulJun": 10011600,
    "sharePctJulJun": 0.25,
    "cumShareJulJun": 96.25,
    "valueUsd2025": 36000,
    "valuePkr2025": 10011600,
    "sharePct2025": 0.27,
    "cumShare2025": 90.63,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "FUSIDIC ACID (MICRONIZED) BP (96 KG, $32,160.00)",
      "BACITRACIN ZINC BP (8 KG, $3,840.00)"
    ],
    "origins": [
      "CHINA",
      "SPAIN"
    ]
  },
  {
    "rank": 43,
    "name": "WAFCO INTERNATIONAL",
    "valueUsdJulJun": 34186,
    "valuePkrJulJun": 9507000,
    "sharePctJulJun": 0.24,
    "cumShareJulJun": 96.48,
    "valueUsd2025": 42848,
    "valuePkr2025": 11916000,
    "sharePct2025": 0.32,
    "cumShare2025": 90.95,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "COCONUT DIETHANOLAMIDE MS (3,000 KG, $7,756.20)",
      "COCAMIDOPROPYL BETAINE 30% (12,000 KG, $17,475.73)",
      "CETOSTEARYL ALCOHOL BP (3,000 KG, $8,953.61)"
    ],
    "origins": [
      "CHINA",
      "MALAYSIA"
    ]
  },
  {
    "rank": 44,
    "name": "MARS CHEMICALS (PRIVATE)",
    "valueUsdJulJun": 33641,
    "valuePkrJulJun": 9355600,
    "sharePctJulJun": 0.23,
    "cumShareJulJun": 96.72,
    "valueUsd2025": 22462,
    "valuePkr2025": 6246570,
    "sharePct2025": 0.17,
    "cumShare2025": 91.12,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ISOPROPYL ALCOHOL BP (20,760 KG, $33,641.14)"
    ],
    "origins": [
      "TAIWAN"
    ]
  },
  {
    "rank": 45,
    "name": "MEHRAN TRADERS",
    "valueUsdJulJun": 30863,
    "valuePkrJulJun": 8582992,
    "sharePctJulJun": 0.21,
    "cumShareJulJun": 96.93,
    "valueUsd2025": 29521,
    "valuePkr2025": 8209727,
    "sharePct2025": 0.22,
    "cumShare2025": 91.34,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "MENTHOL (API) BP (75 KG, $1,588.46)",
      "MENTHOL ( LEVOMENTHOL) (75 KG, $1,588.46)",
      "CARBOXYMETHYLCELULOSE SODIUM MED VISC GR (200 KG, $1,860.66)",
      "POLYETHYLENE GLYCOL  6000 BP/USP (300 KG, $948.76)",
      "PROPYLPARABEN USP/NF (100 KG, $988.85)",
      "MENTHOL BP (100 KG, $2,118.39)",
      "MALTODEXTRIN BP (1,000 KG, $1,402.37)",
      "HYDROXYPROPYL CELLULOSE USP (600 KG, $9,126.21)",
      "POVIDONE (K 30) BP (1,000 KG, $6,238.76)",
      "POVIDONE (K 90) BP (150 KG, $2,571.26)",
      "BENZALKONIUM CHLORIDE (80% W/W) MS (125 L, $1,438.33)",
      "HPMC E5 BP (75 KG, $992.45)"
    ],
    "origins": [
      "CHINA",
      "GERMANY",
      "SINGAPORE",
      "JAPAN",
      "MALAYSIA",
      "TAIWAN"
    ]
  },
  {
    "rank": 46,
    "name": "OPEN MARKET",
    "valueUsdJulJun": 26335,
    "valuePkrJulJun": 7323650,
    "sharePctJulJun": 0.18,
    "cumShareJulJun": 97.11,
    "valueUsd2025": 15431,
    "valuePkr2025": 4291400,
    "sharePct2025": 0.11,
    "cumShare2025": 91.45,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CRANBERRY EXTRACT(VACCINIUM MACROCARPON (451 KG, $26,334.59)"
    ],
    "origins": [
      "CHINA",
      "ITALY"
    ]
  },
  {
    "rank": 47,
    "name": "HERBION PAKISTAN (PVT) L",
    "valueUsdJulJun": 25038,
    "valuePkrJulJun": 6963050,
    "sharePctJulJun": 0.17,
    "cumShareJulJun": 97.28,
    "valueUsd2025": 25038,
    "valuePkr2025": 6963050,
    "sharePct2025": 0.19,
    "cumShare2025": 91.64,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIQUORICE EXTRACT (145 KG, $1,880.80)",
      "IVY LEAF POWDER EXTRACT (460 KG, $23,157.14)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 48,
    "name": "INTERNATIONAL FLAVORS AN",
    "valueUsdJulJun": 24711,
    "valuePkrJulJun": 6873414,
    "sharePctJulJun": 0.17,
    "cumShareJulJun": 97.45,
    "valueUsd2025": 20978,
    "valuePkr2025": 5835565,
    "sharePct2025": 0.16,
    "cumShare2025": 91.79,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ALLANTOIN (75 KG, $541.62)",
      "AVICEL RC-591 (600 KG, $12,054.00)",
      "LEMON FLAVOR SC736612 (140 KG, $4,420.76)",
      "COCONUT DIETHANOLAMIDE MS (400 KG, $1,150.67)",
      "COCAMIDOPROPYL BETAINE 30% (4,000 KG, $6,544.41)"
    ],
    "origins": [
      "CHINA",
      "MALAYSIA",
      "KOREA",
      "Ireland",
      "Slovenia",
      "NETHERLAND"
    ]
  },
  {
    "rank": 49,
    "name": "VENUS PRINTERS",
    "valueUsdJulJun": 22941,
    "valuePkrJulJun": 6380000,
    "sharePctJulJun": 0.16,
    "cumShareJulJun": 97.61,
    "valueUsd2025": 22941,
    "valuePkr2025": 6380000,
    "sharePct2025": 0.17,
    "cumShare2025": 91.96,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "AL.FOIL 211MM CARDNIT 6.4MG TAB.(COM) (100 KG, $1,006.83)",
      "AL.FOIL ASCARD 75MG 214MM (2,100 KG, $21,934.56)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 50,
    "name": "TEXOL",
    "valueUsdJulJun": 22229,
    "valuePkrJulJun": 6181746,
    "sharePctJulJun": 0.15,
    "cumShareJulJun": 97.77,
    "valueUsd2025": 22229,
    "valuePkr2025": 6181746,
    "sharePct2025": 0.17,
    "cumShare2025": 92.13,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "WHITE SOFT PARAFFIN BP (15,225 KG, $22,228.50)"
    ],
    "origins": [
      "UAE"
    ]
  },
  {
    "rank": 51,
    "name": "MOBIN BASHIR",
    "valueUsdJulJun": 20024,
    "valuePkrJulJun": 5568575,
    "sharePctJulJun": 0.14,
    "cumShareJulJun": 97.91,
    "valueUsd2025": 13355,
    "valuePkr2025": 3713905,
    "sharePct2025": 0.1,
    "cumShare2025": 92.23,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ERYTHROSINE RED LAKE (CI 45430:1) MS (275 KG, $19,594.39)",
      "BRILLIANT BLUE LAKE (CI 42090:2) MS (12,500 G, $287.67)",
      "RED IRON OXIDE (CI 77491) MS (12,500 G, $141.59)"
    ],
    "origins": [
      "INDIA"
    ]
  },
  {
    "rank": 52,
    "name": "AM YUSUF",
    "valueUsdJulJun": 17260,
    "valuePkrJulJun": 4800000,
    "sharePctJulJun": 0.12,
    "cumShareJulJun": 98.02,
    "valueUsd2025": 8342,
    "valuePkr2025": 2320000,
    "sharePct2025": 0.06,
    "cumShare2025": 92.29,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POLYACRYLIC ACID (CARBOMER 940 BP) (1,600 KG, $17,259.98)"
    ],
    "origins": [
      "INDIA"
    ]
  },
  {
    "rank": 53,
    "name": "ALPHA CHEMICAL CO.",
    "valueUsdJulJun": 17141,
    "valuePkrJulJun": 4767000,
    "sharePctJulJun": 0.12,
    "cumShareJulJun": 98.14,
    "valueUsd2025": 82503,
    "valuePkr2025": 22944200,
    "sharePct2025": 0.61,
    "cumShare2025": 92.9,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM FORMATE MS (450 KG, $485.44)",
      "ZINC OXIDE (4,000 KG, $16,655.88)"
    ],
    "origins": [
      "CHINA",
      "PAKISTAN",
      "SINGAPORE",
      "MALAYSIA",
      "KOREA",
      "SAUDIA ARAB"
    ]
  },
  {
    "rank": 54,
    "name": "AXIS CHEMICALS",
    "valueUsdJulJun": 15484,
    "valuePkrJulJun": 4306000,
    "sharePctJulJun": 0.11,
    "cumShareJulJun": 98.25,
    "valueUsd2025": 17713,
    "valuePkr2025": 4926000,
    "sharePct2025": 0.13,
    "cumShare2025": 93.04,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CARBOXYMETHYLCELULOSE SODIUM MED VISC GR (100 KG, $952.89)",
      "MAGNESIUM STEARATE BP (2,540 KG, $14,530.74)"
    ],
    "origins": [
      "CHINA",
      "JAPAN",
      "MALAYSIA",
      "UK"
    ]
  },
  {
    "rank": 55,
    "name": "PARTICLE DYNAMICS",
    "valueUsdJulJun": 14240,
    "valuePkrJulJun": 3960144,
    "sharePctJulJun": 0.1,
    "cumShareJulJun": 98.35,
    "valueUsd2025": 14240,
    "valuePkr2025": 3960144,
    "sharePct2025": 0.11,
    "cumShare2025": 93.14,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "ELEMENTAL CALCIUM(AS CALCIUM CARBONAT95s (2,000 KG, $14,240.00)"
    ],
    "origins": [
      "USA"
    ]
  },
  {
    "rank": 56,
    "name": "COSMATEC",
    "valueUsdJulJun": 14114,
    "valuePkrJulJun": 3925152,
    "sharePctJulJun": 0.1,
    "cumShareJulJun": 98.45,
    "valueUsd2025": 16746,
    "valuePkr2025": 4656960,
    "sharePct2025": 0.12,
    "cumShare2025": 93.27,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POLYQUARTERNIUM 44(POLYQ 44) (1,320 KG, $14,114.17)"
    ],
    "origins": [
      "EUROPE",
      "UK"
    ]
  },
  {
    "rank": 57,
    "name": "SAMI PHARMA",
    "valueUsdJulJun": 13754,
    "valuePkrJulJun": 3825000,
    "sharePctJulJun": 0.1,
    "cumShareJulJun": 98.54,
    "valueUsd2025": 13754,
    "valuePkr2025": 3825000,
    "sharePct2025": 0.1,
    "cumShare2025": 93.37,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "METHACRYLIC ACID COPOLYMER DISPERSION (1,500 KG, $13,754.05)"
    ],
    "origins": [
      "GERMANY"
    ]
  },
  {
    "rank": 58,
    "name": "S.S. SCIENTIFIC SYSTEM",
    "valueUsdJulJun": 13562,
    "valuePkrJulJun": 3771625,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 98.63,
    "valueUsd2025": 9214,
    "valuePkr2025": 2562500,
    "sharePct2025": 0.07,
    "cumShare2025": 93.44,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "DISODIUM EDETATE BP (525 KG, $13,562.12)"
    ],
    "origins": [
      "GERMANY",
      "KOREA"
    ]
  },
  {
    "rank": 59,
    "name": "HUB-PAK SALT REFINERY",
    "valueUsdJulJun": 12931,
    "valuePkrJulJun": 3595978,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 98.72,
    "valueUsd2025": 17790,
    "valuePkr2025": 4947473,
    "sharePct2025": 0.13,
    "cumShare2025": 93.57,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM CHLORIDE USP (22,475 KG, $8,384.93)",
      "SODIUM CHLORIDE (API) USP (550 KG, $197.87)",
      "SODIUM CHLORIDE (API) BP (11,300 KG, $4,347.72)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 60,
    "name": "ELITE",
    "valueUsdJulJun": 12765,
    "valuePkrJulJun": 3550000,
    "sharePctJulJun": 0.09,
    "cumShareJulJun": 98.81,
    "valueUsd2025": 7911,
    "valuePkr2025": 2200000,
    "sharePct2025": 0.06,
    "cumShare2025": 93.63,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "TITANIUM DIOXIDE BP (900 KG, $12,765.19)"
    ],
    "origins": [
      "CANADA"
    ]
  },
  {
    "rank": 61,
    "name": "LUCKY CORE INDUSTRIES LI",
    "valueUsdJulJun": 12265,
    "valuePkrJulJun": 3410780,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 98.9,
    "valueUsd2025": 26950,
    "valuePkr2025": 7494900,
    "sharePct2025": 0.2,
    "cumShare2025": 93.83,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "DICHLOROMETHANE BP (3,240 KG, $4,071.84)",
      "ISOPROPYL ALCOHOL BP (5,120 KG, $8,192.74)"
    ],
    "origins": [
      "PAKISTAN",
      "SINGAPORE",
      "TAIWAN"
    ]
  },
  {
    "rank": 62,
    "name": "MATCO FOODS LIMITED",
    "valueUsdJulJun": 12246,
    "valuePkrJulJun": 3405600,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 98.98,
    "valueUsd2025": 12246,
    "valuePkr2025": 3405600,
    "sharePct2025": 0.09,
    "cumShare2025": 93.92,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "LIQUID GLUCOSE USP/NF (19,800 KG, $12,245.95)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 63,
    "name": "CITI PHARMA LIMITED",
    "valueUsdJulJun": 11866,
    "valuePkrJulJun": 3300000,
    "sharePctJulJun": 0.08,
    "cumShareJulJun": 99.06,
    "valueUsd2025": 21656,
    "valuePkr2025": 6022500,
    "sharePct2025": 0.16,
    "cumShare2025": 94.08,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PARACETAMOL BP (3,000 KG, $11,866.24)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 64,
    "name": "ABDOOLALLY MOOSABHOY",
    "valueUsdJulJun": 10274,
    "valuePkrJulJun": 2857324,
    "sharePctJulJun": 0.07,
    "cumShareJulJun": 99.14,
    "valueUsd2025": 13695,
    "valuePkr2025": 3808628,
    "sharePct2025": 0.1,
    "cumShare2025": 94.18,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "BANANA SP BNA MS (240 KG, $7,778.21)",
      "CHERRY FLAVOUR 2217 MS (320 L, $2,459.55)",
      "SUNSET YELLOW FCF LAKE (CI 15985:1) MS (2 KG, $36.69)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 65,
    "name": "INNOVA INGREDIENTS (PVT.",
    "valueUsdJulJun": 10090,
    "valuePkrJulJun": 2806060,
    "sharePctJulJun": 0.07,
    "cumShareJulJun": 99.2,
    "valueUsd2025": 37760,
    "valuePkr2025": 10500935,
    "sharePct2025": 0.28,
    "cumShare2025": 94.46,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM CITRATE (API) BP (12,100 KG, $9,840.70)",
      "LEMON OIL 9623 MS (12 L, $249.41)"
    ],
    "origins": [
      "CHINA",
      "PAKISTAN",
      "SINGAPORE"
    ]
  },
  {
    "rank": 66,
    "name": "AROCHEM",
    "valueUsdJulJun": 8449,
    "valuePkrJulJun": 2349800,
    "sharePctJulJun": 0.06,
    "cumShareJulJun": 99.26,
    "valueUsd2025": 5345,
    "valuePkr2025": 1486550,
    "sharePct2025": 0.04,
    "cumShare2025": 94.5,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "FERROUS GLUCONATE USP (75 KG, $320.93)",
      "MAGNESIUM GLUCONATE USP (100 KG, $458.47)",
      "PROPYLPARABEN USP/NF (100 KG, $838.01)",
      "SACCHARIN SODIUM BP (800 KG, $6,832.07)"
    ],
    "origins": [
      "CHINA",
      "JAPAN",
      "SWITZERLAND"
    ]
  },
  {
    "rank": 67,
    "name": "HAAMEEM",
    "valueUsdJulJun": 7448,
    "valuePkrJulJun": 2071200,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 99.31,
    "valueUsd2025": 4662,
    "valuePkr2025": 1296450,
    "sharePct2025": 0.03,
    "cumShare2025": 94.54,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POTASSIUM SORBATE BP (100 KG, $266.09)",
      "ANHYDROUS CITRIC ACID BP (300 KG, $248.11)",
      "CITRIC ACID MONOHYDRATE BP (5,100 KG, $4,092.77)",
      "CETYL ALCOHOL BP (1,000 KG, $2,840.70)"
    ],
    "origins": [
      "CHINA",
      "MALAYSIA"
    ]
  },
  {
    "rank": 68,
    "name": "ALLIED AXIOM",
    "valueUsdJulJun": 7077,
    "valuePkrJulJun": 1968034,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 99.36,
    "valueUsd2025": 7001,
    "valuePkr2025": 1947000,
    "sharePct2025": 0.05,
    "cumShare2025": 94.59,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CHOCOLATE AGST SP 01 POWDER FLAVOR (60 KG, $970.87)",
      "HONEY FLAVOUR 20 (10 KG, $145.75)",
      "SUCROSE BP (4,000 KG, $5,897.16)",
      "LEMON FLAVOR SC736612 (5 KG, $62.93)"
    ],
    "origins": [
      "PAKISTAN",
      "UAE"
    ]
  },
  {
    "rank": 69,
    "name": "STANDARD MANUFACTURING C",
    "valueUsdJulJun": 7068,
    "valuePkrJulJun": 1965661,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 99.41,
    "valueUsd2025": 15039,
    "valuePkr2025": 4182247,
    "sharePct2025": 0.11,
    "cumShare2025": 94.7,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PERFUME APPLE MS (175 KG, $2,600.29)",
      "PINEAPPLE 900 MS (20 L, $196.73)",
      "ANISE OIL BP (40 L, $985.44)",
      "BULGARIAN ROSE EF MS (75 L, $1,994.79)",
      "OIL OF SWEET ORANGE 3720 MS (60 L, $1,290.93)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 70,
    "name": "KASHIF ASSOCIATES",
    "valueUsdJulJun": 6587,
    "valuePkrJulJun": 1831920,
    "sharePctJulJun": 0.05,
    "cumShareJulJun": 99.46,
    "valueUsd2025": 6587,
    "valuePkr2025": 1831920,
    "sharePct2025": 0.05,
    "cumShare2025": 94.75,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ISOPROPYL ALCOHOL BP (4,080 KG, $6,587.27)"
    ],
    "origins": [
      "TAIWAN"
    ]
  },
  {
    "rank": 71,
    "name": "J.K. ENTERPRISES",
    "valueUsdJulJun": 6373,
    "valuePkrJulJun": 1772380,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 99.5,
    "valueUsd2025": 4645,
    "valuePkr2025": 1291693,
    "sharePct2025": 0.03,
    "cumShare2025": 94.78,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM HYDROXIDE BP (250 KG, $3,146.35)",
      "GLYCINE BP (40 KG, $2,013.66)",
      "BENZALKONIUM CHLORIDE SOL (50% W/V) BP (11 L, $1,213.16)"
    ],
    "origins": [
      "GERMANY",
      "SPAIN",
      "UK",
      "BELGIUM"
    ]
  },
  {
    "rank": 72,
    "name": "BFL INDUSTRIES (PRIVATE)",
    "valueUsdJulJun": 6200,
    "valuePkrJulJun": 1724220,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 99.54,
    "valueUsd2025": 22452,
    "valuePkr2025": 6244020,
    "sharePct2025": 0.17,
    "cumShare2025": 94.95,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HONEY (2,060 KG, $6,200.00)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 73,
    "name": "IFTEKHAR INTERNATIONAL",
    "valueUsdJulJun": 6068,
    "valuePkrJulJun": 1687500,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 99.59,
    "valueUsd2025": 8765,
    "valuePkr2025": 2437500,
    "sharePct2025": 0.07,
    "cumShare2025": 95.02,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "AL-FOIL ASCARD-75 TAB.240.5mm(EXP.NEW) (450 KG, $6,067.96)"
    ],
    "origins": []
  },
  {
    "rank": 74,
    "name": "NOSHAD TRADING",
    "valueUsdJulJun": 5200,
    "valuePkrJulJun": 1446120,
    "sharePctJulJun": 0.04,
    "cumShareJulJun": 99.62,
    "valueUsd2025": 67700,
    "valuePkr2025": 18827370,
    "sharePct2025": 0.5,
    "cumShare2025": 95.52,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "IVABRADINE HCL MS (2,000 G, $5,200.00)"
    ],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 75,
    "name": "MUSAJI ADAM & SONS",
    "valueUsdJulJun": 4854,
    "valuePkrJulJun": 1350000,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.66,
    "valueUsd2025": 5124,
    "valuePkr2025": 1425000,
    "sharePct2025": 0.04,
    "cumShare2025": 95.56,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "FORMALDEHYDE SOLUTION 37% USP (450 KG, $4,854.37)"
    ],
    "origins": [
      "SPAIN"
    ]
  },
  {
    "rank": 76,
    "name": "MODERN CHEMICALS",
    "valueUsdJulJun": 4764,
    "valuePkrJulJun": 1324820,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.69,
    "valueUsd2025": 859,
    "valuePkr2025": 238780,
    "sharePct2025": 0.01,
    "cumShare2025": 95.56,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POTASSIUM HYDROXIDE BP (250 KG, $338.37)",
      "SODIUM LAURYL SULPHATE BP (480 KG, $1,808.85)",
      "ISOPROPYL ALCOHOL BP (1,920 KG, $2,616.61)"
    ],
    "origins": [
      "MALAYSIA",
      "KOREA",
      "EUROPE",
      "TAIWAN"
    ]
  },
  {
    "rank": 77,
    "name": "SHAHEEN TRADING",
    "valueUsdJulJun": 4473,
    "valuePkrJulJun": 1243997,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.72,
    "valueUsd2025": 4259,
    "valuePkr2025": 1184325,
    "sharePct2025": 0.03,
    "cumShare2025": 95.6,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "TARTRAZINE (CI 19140) MS (25 KG, $175.30)",
      "ERYTHROSINE RED 3 (CI 45430) MS (30 KG, $2,427.90)",
      "NEELICERT FD & C GREEN 3 (008 P 03 01) (10 KG, $1,870.00)"
    ],
    "origins": [
      "INDIA"
    ]
  },
  {
    "rank": 78,
    "name": "COSMO CHEM",
    "valueUsdJulJun": 4147,
    "valuePkrJulJun": 1153270,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.75,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "cumShare2025": 95.6,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MIGLYOL OIL (740 KG, $4,146.96)"
    ],
    "origins": [
      "MALAYSIA"
    ]
  },
  {
    "rank": 79,
    "name": "GENERAL TRADING",
    "valueUsdJulJun": 3888,
    "valuePkrJulJun": 1078272,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.78,
    "valueUsd2025": 5684,
    "valuePkr2025": 1576224,
    "sharePct2025": 0.04,
    "cumShare2025": 95.64,
    "currency": "GBP",
    "category": "IMPORT",
    "materials": [
      "LIGHT KAOLIN BP (100 KG, $3,888.00)"
    ],
    "origins": [
      "UK"
    ]
  },
  {
    "rank": 80,
    "name": "REHMAN TRADERS",
    "valueUsdJulJun": 3644,
    "valuePkrJulJun": 1013500,
    "sharePctJulJun": 0.03,
    "cumShareJulJun": 99.8,
    "valueUsd2025": 3894,
    "valuePkr2025": 1082875,
    "sharePct2025": 0.03,
    "cumShare2025": 95.67,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM CITRATE (API) BP (3,000 KG, $2,430.78)",
      "SODIUM CITRATE BP (1,500 KG, $1,213.59)"
    ],
    "origins": [
      "CHINA",
      "Ireland"
    ]
  },
  {
    "rank": 81,
    "name": "EXCIPIENT HOUSE PAKISTAN",
    "valueUsdJulJun": 3452,
    "valuePkrJulJun": 960000,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.82,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "cumShare2025": 95.67,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "POVIDONE (K 30) BP (500 KG, $2,157.50)",
      "POLYSORBATE 20 (TWEEN 20) (200 KG, $1,294.50)"
    ],
    "origins": [
      "CHINA",
      "INDIA"
    ]
  },
  {
    "rank": 82,
    "name": "N.A. ENTERPISES.",
    "valueUsdJulJun": 3212,
    "valuePkrJulJun": 893350,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.85,
    "valueUsd2025": 16034,
    "valuePkr2025": 4459025,
    "sharePct2025": 0.12,
    "cumShare2025": 95.79,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ANHYDROUS CITRIC ACID BP (225 KG, $195.43)",
      "SODIUM CITRATE (API) BP (2,000 KG, $1,618.12)",
      "SODIUM BENZOATE BP/USP (1,000 KG, $1,332.25)",
      "ASCORBIC ACID (25 KG, $66.52)"
    ],
    "origins": [
      "CHINA",
      "SINGAPORE"
    ]
  },
  {
    "rank": 83,
    "name": "N.K.TRADERS",
    "valueUsdJulJun": 2679,
    "valuePkrJulJun": 745125,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.87,
    "valueUsd2025": 2046,
    "valuePkr2025": 569125,
    "sharePct2025": 0.02,
    "cumShare2025": 95.8,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CHOCOLATE FLAVOR (K-0309816) (125 KG, $2,046.48)",
      "CETEARYL OCTANOATE (16 KG, $632.87)"
    ],
    "origins": [
      "INDONESIA",
      "FRANCE"
    ]
  },
  {
    "rank": 84,
    "name": "SZUMEX INTERNATIONAL",
    "valueUsdJulJun": 2503,
    "valuePkrJulJun": 696000,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.88,
    "valueUsd2025": 411,
    "valuePkr2025": 114250,
    "sharePct2025": 0,
    "cumShare2025": 95.8,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PROPYLPARABEN USP/NF (300 KG, $2,502.70)"
    ],
    "origins": [
      "JAPAN"
    ]
  },
  {
    "rank": 85,
    "name": "HARMAIN TRADERS",
    "valueUsdJulJun": 2376,
    "valuePkrJulJun": 660800,
    "sharePctJulJun": 0.02,
    "cumShareJulJun": 99.9,
    "valueUsd2025": 12249,
    "valuePkr2025": 3406439,
    "sharePct2025": 0.09,
    "cumShare2025": 95.9,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "PHENYLETHYL ALCOHOL USP/NF (200 L, $2,376.12)"
    ],
    "origins": [
      "CHINA",
      "PAKISTAN",
      "INDIA"
    ]
  },
  {
    "rank": 86,
    "name": "DAWAWALA CHEMICAL CORPOR",
    "valueUsdJulJun": 1819,
    "valuePkrJulJun": 506000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.91,
    "valueUsd2025": 1819,
    "valuePkr2025": 506000,
    "sharePct2025": 0.01,
    "cumShare2025": 95.91,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM LAURYL SULPHATE BP (460 KG, $1,819.49)"
    ],
    "origins": [
      "MALAYSIA"
    ]
  },
  {
    "rank": 87,
    "name": "AL-CHEMIS CORP",
    "valueUsdJulJun": 1685,
    "valuePkrJulJun": 468654,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.92,
    "valueUsd2025": 4403,
    "valuePkr2025": 1224576,
    "sharePct2025": 0.03,
    "cumShare2025": 95.94,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "TURMERIC EXTRACT (CURCUMA LONG 95%) (2 KG, $192.02)",
      "MILLET EXTRACT (PANICUM MILIACEUM, FRUIT (100 KG, $1,493.18)"
    ],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 88,
    "name": "FATEH",
    "valueUsdJulJun": 1639,
    "valuePkrJulJun": 456096,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.93,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "cumShare2025": 95.94,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "MAGNESIUM CHLORIDE (25 KG, $812.00)",
      "CALCIUM CHLORIDE (25 KG, $826.50)"
    ],
    "origins": [
      "GERMANY",
      "INDIA"
    ]
  },
  {
    "rank": 89,
    "name": "AFTAB CHEMICAL CO.",
    "valueUsdJulJun": 1595,
    "valuePkrJulJun": 443650,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.95,
    "valueUsd2025": 41047,
    "valuePkr2025": 11415100,
    "sharePct2025": 0.31,
    "cumShare2025": 96.25,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ANHYDROUS CITRIC ACID BP (100 KG, $86.30)",
      "LIQUID SORBITOL (NON-CRYSTALLISING)  BP (1,925 KG, $1,508.99)"
    ],
    "origins": [
      "CHINA",
      "PAKISTAN",
      "SINGAPORE",
      "JAPAN",
      "MALAYSIA",
      "EUROPE",
      "TAIWAN"
    ]
  },
  {
    "rank": 90,
    "name": "ALGRY QUIMICA, S.L.",
    "valueUsdJulJun": 1485,
    "valuePkrJulJun": 413312,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.96,
    "valueUsd2025": 650,
    "valuePkr2025": 180824,
    "sharePct2025": 0,
    "cumShare2025": 96.25,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [
      "CHOLINE CHLORIDE USP (20 KG, $1,484.80)"
    ],
    "origins": [
      "SPAIN"
    ]
  },
  {
    "rank": 91,
    "name": "PRIMA AGENCIES",
    "valueUsdJulJun": 1163,
    "valuePkrJulJun": 323475,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.96,
    "valueUsd2025": 4020,
    "valuePkr2025": 1117975,
    "sharePct2025": 0.03,
    "cumShare2025": 96.28,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM CITRATE BP (25 KG, $20.41)",
      "SODIUM CITRATE (API) BP (1,400 KG, $1,142.75)"
    ],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 92,
    "name": "ALPINE CHEMICAL SOLUTION",
    "valueUsdJulJun": 809,
    "valuePkrJulJun": 225000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.97,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "cumShare2025": 96.28,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "HYDROCHLORIC ACID 37% BP (23 L, $809.06)"
    ],
    "origins": [
      "GERMANY",
      "TAIWAN"
    ]
  },
  {
    "rank": 93,
    "name": "ABS",
    "valueUsdJulJun": 750,
    "valuePkrJulJun": 208575,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 95.97,
    "valueUsd2025": 4800,
    "valuePkr2025": 1334880,
    "sharePct2025": 0.04,
    "cumShare2025": 96.32,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "BENZOIC ACID (25 KG, $750.00)"
    ],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 94,
    "name": "S.ATHER & BROTHERS",
    "valueUsdJulJun": 748,
    "valuePkrJulJun": 208000,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.98,
    "valueUsd2025": 561,
    "valuePkr2025": 156000,
    "sharePct2025": 0,
    "cumShare2025": 96.32,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "YELLOW IRON OXIDE MS (40 KG, $747.93)"
    ],
    "origins": [
      "USA"
    ]
  },
  {
    "rank": 95,
    "name": "LACTOBAKE SPECIALITY (PR",
    "valueUsdJulJun": 746,
    "valuePkrJulJun": 207600,
    "sharePctJulJun": 0.01,
    "cumShareJulJun": 99.99,
    "valueUsd2025": 1493,
    "valuePkr2025": 415200,
    "sharePct2025": 0.01,
    "cumShare2025": 96.33,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "STRAWBERRY POWDER FLAVOUR 17027 MS (6 KG, $280.47)",
      "PINEAPPLE POWDER FLAVOUR 23002 MS (12 KG, $466.02)"
    ],
    "origins": [
      "UAE"
    ]
  },
  {
    "rank": 96,
    "name": "WISDOM CORPORATION",
    "valueUsdJulJun": 705,
    "valuePkrJulJun": 196000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.99,
    "valueUsd2025": 2412,
    "valuePkr2025": 670860,
    "sharePct2025": 0.02,
    "cumShare2025": 96.35,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "VITAMIN B12 (AS CYANOCOBALAMIN) USP (50 G, $704.78)"
    ],
    "origins": [
      "CHINA",
      "INDIA"
    ]
  },
  {
    "rank": 97,
    "name": "N.F.K. ASSOCIATES",
    "valueUsdJulJun": 429,
    "valuePkrJulJun": 119250,
    "sharePctJulJun": 0,
    "cumShareJulJun": 99.99,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "cumShare2025": 96.35,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "ALOE VERA GEL (30 KG, $428.80)"
    ],
    "origins": [
      "CHINA",
      "PAKISTAN"
    ]
  },
  {
    "rank": 98,
    "name": "ORCHID PRINTING",
    "valueUsdJulJun": 280,
    "valuePkrJulJun": 78000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 0,
    "valuePkr2025": 0,
    "sharePct2025": 0,
    "cumShare2025": 96.35,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "AL-FOIL ASCARD 75MG TABLETS 214MM (26 KG, $280.47)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 99,
    "name": "LEINER PAK GELATINE LIMI",
    "valueUsdJulJun": 270,
    "valuePkrJulJun": 75000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 270,
    "valuePkr2025": 75000,
    "sharePct2025": 0,
    "cumShare2025": 96.35,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "GELATIN BP (50 KG, $269.69)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 100,
    "name": "SOURCING HUB",
    "valueUsdJulJun": 200,
    "valuePkrJulJun": 55620,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 200,
    "valuePkr2025": 55620,
    "sharePct2025": 0,
    "cumShare2025": 96.35,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [
      "FOLIC ACID USP (1 KG, $200.00)"
    ],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 101,
    "name": "LABCHEM INTERNATIONAL",
    "valueUsdJulJun": 107,
    "valuePkrJulJun": 29661,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 139,
    "valuePkr2025": 38559,
    "sharePct2025": 0,
    "cumShare2025": 96.36,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "CHLOROFORM SPIRIT BP (10 L, $106.66)"
    ],
    "origins": [
      "USA"
    ]
  },
  {
    "rank": 102,
    "name": "TOYO AND CO.",
    "valueUsdJulJun": 86,
    "valuePkrJulJun": 24000,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 158,
    "valuePkr2025": 44000,
    "sharePct2025": 0,
    "cumShare2025": 96.36,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SODIUM BORATE USP/NF (12 KG, $86.30)"
    ],
    "origins": [
      "GERMANY"
    ]
  },
  {
    "rank": 103,
    "name": "BUSH BOAKE",
    "valueUsdJulJun": 33,
    "valuePkrJulJun": 9280,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 896,
    "valuePkr2025": 249280,
    "sharePct2025": 0.01,
    "cumShare2025": 96.36,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "SUNSET YELLOW FCF LAKE (CI 15985:1) MS (2 KG, $33.37)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 104,
    "name": "DALDA FOODS LTD.",
    "valueUsdJulJun": 16,
    "valuePkrJulJun": 4440,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 16,
    "valuePkr2025": 4440,
    "sharePct2025": 0,
    "cumShare2025": 96.36,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [
      "OLIVE OIL (NEW) (1,000 G, $15.97)"
    ],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 105,
    "name": "HUNAN JIUDIAN HONGYANG P",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 97680,
    "valuePkr2025": 27164808,
    "sharePct2025": 0.73,
    "cumShare2025": 97.09,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 106,
    "name": "BIOPOLE PHARMATECH CO.,",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 77500,
    "valuePkr2025": 21552750,
    "sharePct2025": 0.58,
    "cumShare2025": 97.67,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 107,
    "name": "ROYAL CHEMICALS",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 35926,
    "valuePkr2025": 9991000,
    "sharePct2025": 0.27,
    "cumShare2025": 97.93,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [],
    "origins": [
      "PAKISTAN",
      "IRAN"
    ]
  },
  {
    "rank": 108,
    "name": "SEAWALL ENTERPRISES LIMI",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 34165,
    "valuePkr2025": 9501287,
    "sharePct2025": 0.25,
    "cumShare2025": 98.19,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 109,
    "name": "ZIBO WEIBIN IMWEIBIN IMP",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 33750,
    "valuePkr2025": 9385875,
    "sharePct2025": 0.25,
    "cumShare2025": 98.44,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 110,
    "name": "NINGXIA HENG KANG TECHNO",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 33475,
    "valuePkr2025": 9309398,
    "sharePct2025": 0.25,
    "cumShare2025": 98.69,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 111,
    "name": "MEDIST FZE",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 30575,
    "valuePkr2025": 8502908,
    "sharePct2025": 0.23,
    "cumShare2025": 98.91,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "INDIA"
    ]
  },
  {
    "rank": 112,
    "name": "HUBEI GRANULES BIOCAUSE",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 30000,
    "valuePkr2025": 8343000,
    "sharePct2025": 0.22,
    "cumShare2025": 99.14,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 113,
    "name": "EUROAPI FRANCE",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 16240,
    "valuePkr2025": 4520600,
    "sharePct2025": 0.12,
    "cumShare2025": 99.26,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "FRANCE"
    ]
  },
  {
    "rank": 114,
    "name": "TRANSWORLD PHARMACEUTICA",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 15642,
    "valuePkr2025": 4350000,
    "sharePct2025": 0.12,
    "cumShare2025": 99.37,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [],
    "origins": [
      "USA"
    ]
  },
  {
    "rank": 115,
    "name": "MOEHS CATALANA",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 14210,
    "valuePkr2025": 3955525,
    "sharePct2025": 0.11,
    "cumShare2025": 99.48,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "SPAIN"
    ]
  },
  {
    "rank": 116,
    "name": "CENTRIENT PHARMACEUTICAL",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 13978,
    "valuePkr2025": 3890945,
    "sharePct2025": 0.1,
    "cumShare2025": 99.58,
    "currency": "EUR",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "INDIA"
    ]
  },
  {
    "rank": 117,
    "name": "INFOARK INDUSTRY CO,.LIM",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 13568,
    "valuePkr2025": 3773122,
    "sharePct2025": 0.1,
    "cumShare2025": 99.68,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 118,
    "name": "ZHEJIANG LIAOYUAN",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 9055,
    "valuePkr2025": 2518196,
    "sharePct2025": 0.07,
    "cumShare2025": 99.75,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 119,
    "name": "SHANDONG ANHONG PHARMACE",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 6825,
    "valuePkr2025": 1898033,
    "sharePct2025": 0.05,
    "cumShare2025": 99.8,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 120,
    "name": "GNOSIS BIORESEARCH SA (C",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 6000,
    "valuePkr2025": 1668600,
    "sharePct2025": 0.04,
    "cumShare2025": 99.85,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "ITALY"
    ]
  },
  {
    "rank": 121,
    "name": "GLUCORP (PVT.) LTD.",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 5280,
    "valuePkr2025": 1468269,
    "sharePct2025": 0.04,
    "cumShare2025": 99.89,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 122,
    "name": "TIANJIN JINJIN PHARMACEU",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 5000,
    "valuePkr2025": 1390500,
    "sharePct2025": 0.04,
    "cumShare2025": 99.92,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 123,
    "name": "MAIDO CORPORATION",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 4651,
    "valuePkr2025": 1294125,
    "sharePct2025": 0.03,
    "cumShare2025": 99.96,
    "currency": "JPY",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "JAPAN"
    ]
  },
  {
    "rank": 124,
    "name": "AJAB ENTERPRISES",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 2376,
    "valuePkr2025": 660800,
    "sharePct2025": 0.02,
    "cumShare2025": 99.98,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 125,
    "name": "SHANGHAI J&H",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 1250,
    "valuePkr2025": 347625,
    "sharePct2025": 0.01,
    "cumShare2025": 99.99,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 126,
    "name": "MAK KEMIKAL",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 673,
    "valuePkr2025": 187210,
    "sharePct2025": 0.01,
    "cumShare2025": 99.99,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [],
    "origins": [
      "CHINA",
      "PAKISTAN",
      "MALAYSIA"
    ]
  },
  {
    "rank": 127,
    "name": "HUZHOU MIZUDAHOPE BIOSCI",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 578,
    "valuePkr2025": 160603,
    "sharePct2025": 0,
    "cumShare2025": 99.99,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 128,
    "name": "ALPHAMED FORMULATION (PV",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 380,
    "valuePkr2025": 105678,
    "sharePct2025": 0,
    "cumShare2025": 100,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "INDIA"
    ]
  },
  {
    "rank": 129,
    "name": "DELTA CHEMICALS",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 249,
    "valuePkr2025": 69360,
    "sharePct2025": 0,
    "cumShare2025": 100,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [],
    "origins": [
      "PAKISTAN"
    ]
  },
  {
    "rank": 130,
    "name": "BEIJING JINGFENG PHARMAC",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 98,
    "valuePkr2025": 27115,
    "sharePct2025": 0,
    "cumShare2025": 100,
    "currency": "USD",
    "category": "IMPORT",
    "materials": [],
    "origins": [
      "CHINA"
    ]
  },
  {
    "rank": 131,
    "name": "HAZIM INDUSTRIES (PVT) L",
    "valueUsdJulJun": 0,
    "valuePkrJulJun": 0,
    "sharePctJulJun": 0,
    "cumShareJulJun": 100,
    "valueUsd2025": 33,
    "valuePkr2025": 9300,
    "sharePct2025": 0,
    "cumShare2025": 100,
    "currency": "PKR",
    "category": "LOCAL",
    "materials": [],
    "origins": [
      "PAKISTAN"
    ]
  }
];
