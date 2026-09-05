import { VendorQuotationRecord, InquiryBenchmarkRecord, DocsStatusType, AuditStatusType } from '../types';

export interface ExtendedInquiryRecord extends InquiryBenchmarkRecord {
  perLotQty: number;
  shipmentMode: 'SEA' | 'AIR' | string;
  preferMfg: string;
  preferOrigin: string;
  initialSampleQtyReq: string;
  trialSampleQtyReq: string;
  sampleRemarks?: string;
  clientListReq?: string;
  fdaCepStatus?: string;
}

// Raw 88 Materials Dataset from Base Alternate Sourcing Inquiry
interface RawItemDef {
  code: string;
  name: string;
  annualQty: number;
  perLotQty: number;
  uom: string;
  mode: string;
  cat: 'API' | 'EXP';
  preferMfg: string;
  preferOrigin: string;
  sampleInit: string;
  sampleTrial: string;
  targetPriceUSD: number;
  lastPriceUSD: number;
}

const RAW_ITEMS: RawItemDef[] = [
  { code: '111000212', name: 'ALPHA CYCLODEXTRIN', annualQty: 300, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Roquette Freres; Wacker Chemie; Cyclolab; Ashland; CTD Holdings', preferOrigin: 'Belgium / Germany / France', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 24.50, lastPriceUSD: 27.00 },
  { code: '111000203', name: 'AMLODIPINE BESILATE USP', annualQty: 505, perLotQty: 140, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Pfizer (innovator, Norvasc); Cadila Pharmaceuticals; IPCA Laboratories; Zhejiang Huahai; Cipla', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 52.00, lastPriceUSD: 57.50 },
  { code: '111000071', name: 'ANHYDROUS CITRIC ACID BP', annualQty: 75, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'COFCO Biotechnology; RZBC Group; Jungbunzlauer; Weifang Ensign; Anhui BBCA', preferOrigin: 'China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 2.10, lastPriceUSD: 2.45 },
  { code: '111000156', name: 'ANHYDROUS SODIUM SULPHITE BP', annualQty: 225, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Esseco Group; Sulfochem; Aditya Birla Chemicals; Shandong Wonderful; local sulphite plants', preferOrigin: 'China / EU', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 3.20, lastPriceUSD: 3.65 },
  { code: '111000451', name: 'ARLACEL 165', annualQty: 300, perLotQty: 300, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Croda International; Gattefosse; Evonik; BASF; Lubrizol', preferOrigin: 'UK / France', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 9.80, lastPriceUSD: 11.20 },
  { code: '111000457', name: 'ARLACEL 983', annualQty: 100, perLotQty: 40, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Croda International; Gattefosse; Evonik; BASF; Lubrizol', preferOrigin: 'UK / France', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 8.90, lastPriceUSD: 10.10 },
  { code: '111000204', name: 'ASPARTAME BP', annualQty: 100, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: "Aurobindo Pharma; Divi's Laboratories; Hetero Drugs; Cipla; Sun Pharmaceutical Industries", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 16.50, lastPriceUSD: 18.20 },
  { code: '111000205', name: 'ASPIRIN (ACETYLSALICYLIC ACID) BP', annualQty: 46900, perLotQty: 7500, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: "Bayer AG (originator); Novacyl (Rhodia); Shandong Xinhua; Dr. Reddy's Laboratories; Xi'an Lijun", preferOrigin: 'Germany / China / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 5.80, lastPriceUSD: 6.45 },
  { code: '111000448', name: 'AVICEL RC-591', annualQty: 600, perLotQty: 600, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'DuPont / IFF Health & Biosciences (Avicel, ex-FMC); JRS Pharma (Vivapur); Asahi Kasei (Ceolus); Mingtai Chemical (Taiwan); Sunlead', preferOrigin: 'USA / Ireland', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 14.50, lastPriceUSD: 16.00 },
  { code: '111000456', name: 'AZELAIC ACID', annualQty: 500, perLotQty: 325, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Bayer (originator, Skinoren); Emery Oleochemicals; INEOS; Kumar Organic Products; Cathay Industrial Biotech', preferOrigin: 'China / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 42.00, lastPriceUSD: 46.50 },
  { code: '111000217', name: 'AZITHROMYCIN DIHYDRATE USP', annualQty: 600, perLotQty: 300, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Pfizer (innovator, Zithromax); Aurobindo Pharma; Sun Pharmaceutical; Teva API; Zhejiang Guobang', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 118.50, lastPriceUSD: 125.00 },
  { code: '111000216', name: 'AZITHROMYCIN DIHYDRATE USP (MICRONIZED)', annualQty: 150, perLotQty: 150, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Pfizer (innovator, Zithromax); Aurobindo Pharma; Sun Pharmaceutical; Teva API; Zhejiang Guobang', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 126.00, lastPriceUSD: 135.00 },
  { code: '111000297', name: 'BACITRACIN BP', annualQty: 390, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: "Sinopharm; DSM Sinochem; North China Pharmaceutical; Zhejiang Bo'ao; Xinjiang Kangxin", preferOrigin: 'China / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 245.00, lastPriceUSD: 268.00 },
  { code: '111000410', name: 'BENZALKONIUM CHLORIDE (80% W/W) MS', annualQty: 50, perLotQty: 2.128, uom: 'L', mode: 'AIR', cat: 'EXP', preferMfg: 'Lonza Group; Merck KGaA; Galaxy Surfactants; Stepan Company; Feixiang Chemicals', preferOrigin: 'Germany / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 28.00, lastPriceUSD: 32.00 },
  { code: '111000057', name: 'BENZALKONIUM CHLORIDE SOL (50% W/V) BP', annualQty: 24, perLotQty: 5, uom: 'L', mode: 'AIR', cat: 'EXP', preferMfg: 'Lonza Group; Merck KGaA; Galaxy Surfactants; Stepan Company; Feixiang Chemicals', preferOrigin: 'Germany / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 19.50, lastPriceUSD: 23.00 },
  { code: '111000458', name: 'BENZOIC ACID', annualQty: 25, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Emerald Kalama Chemical; Lanxess; Nantong Acetic Acid; INEOS Phenol; Kumar Organic Products', preferOrigin: 'China / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 4.80, lastPriceUSD: 5.50 },
  { code: '111000166', name: 'BENZYL ALCOHOL BP', annualQty: 777.5, perLotQty: 50, uom: 'L', mode: 'AIR', cat: 'EXP', preferMfg: 'Emerald Kalama Chemical; Lanxess; Zhejiang Wild Wind; Vertellus; Otto Chemie', preferOrigin: 'China / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 6.90, lastPriceUSD: 7.80 },
  { code: '111000167', name: 'BORIC ACID BP', annualQty: 125, perLotQty: 75, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Eti Maden (Turkey); Rio Tinto Borax; Quiborax; American Borate; Searles Valley Minerals', preferOrigin: 'Turkey / USA / Chile', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 3.60, lastPriceUSD: 4.10 },
  { code: '111000439', name: 'BRINZOLAMIDE (MICRONIZED AND STERILE)USP', annualQty: 8, perLotQty: 1.015, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Novartis/Alcon (innovator, Azopt); Sekhmet Pharmaventures; Metrochem API; Symed Labs; Unimark Remedies', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 2400.00, lastPriceUSD: 2650.00 },
  { code: '111000061', name: 'BUTYLATED HYDROXYTOLUENE BP', annualQty: 278.5, perLotQty: 20, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Eastman Chemical; Lanxess; Solvay; Songwon Industrial; ADEKA Corporation', preferOrigin: 'China / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 7.20, lastPriceUSD: 8.30 },
  { code: '111000310', name: 'CALCIUM CHLORIDE', annualQty: 150, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'BASF SE; Evonik Industries; DFE Pharma; JRS Pharma; Signet Excipients', preferOrigin: 'Germany / India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 2.80, lastPriceUSD: 3.20 },
  { code: '111000411', name: 'CARBOMER 971P', annualQty: 1584, perLotQty: 528, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Lubrizol Corporation (Carbopol); Sino Lion (China); 3V Sigma (Italy); Nouryon; Shandong Xiya', preferOrigin: 'USA / France', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 36.00, lastPriceUSD: 41.50 },
  { code: '111000038', name: 'CARBOXYMETHYLCELULOSE SODIUM MED VISC GR', annualQty: 250, perLotQty: 75, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'BASF SE; Evonik Industries; DFE Pharma; JRS Pharma; Signet Excipients', preferOrigin: 'Germany / India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 8.50, lastPriceUSD: 9.80 },
  { code: '111000455', name: 'CETEARYL OCTANOATE', annualQty: 25, perLotQty: 16, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'BASF SE; Croda International; Evonik Industries; Vantage Specialty Ingredients; KLK Oleo', preferOrigin: 'Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 12.00, lastPriceUSD: 14.20 },
  { code: '111000067', name: 'CETOMACROGOL 1000 BP 98', annualQty: 14020, perLotQty: 150, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Croda International; BASF SE; Clariant; Merck KGaA; Evonik', preferOrigin: 'Germany / UK', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 6.40, lastPriceUSD: 7.20 },
  { code: '111000307', name: 'CICLOSPORIN BP', annualQty: 1000, perLotQty: 1000, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Novartis (innovator, Sandimmune); Biocon Ltd; Sun Pharmaceutical; Dalian Meilun; Sichuan Xieli', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 3.50, lastPriceUSD: 3.90 },
  { code: '111000070', name: 'CITRIC ACID MONOHYDRATE BP', annualQty: 4900, perLotQty: 200, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'COFCO Biotechnology; RZBC Group; Jungbunzlauer; Weifang Ensign; Anhui BBCA', preferOrigin: 'China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 1.85, lastPriceUSD: 2.15 },
  { code: '111000000', name: 'COLLOIDAL SILICON DIOXIDE USP/NF', annualQty: 2490, perLotQty: 9, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'BASF SE; Evonik Industries; DFE Pharma; JRS Pharma; Signet Excipients', preferOrigin: 'Germany / India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 9.20, lastPriceUSD: 10.50 },
  { code: '114000156', name: 'CRANBERRY EXTRACT(VACCINIUM MACROCARPON', annualQty: 401.18, perLotQty: 50, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Natural Remedies Pvt Ltd; Sabinsa Corporation; Indena S.p.A. (Italy); Naturalin Bio-Resources (China); Umang Pharmatech', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 68.00, lastPriceUSD: 75.00 },
  { code: '111000175', name: 'CROSPOVIDONE BP', annualQty: 1250, perLotQty: 149.7, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'BASF SE (Kollidon CL); Ashland (Polyplasdone); Boai NKY Pharma; ISP; Anhui Sunhere', preferOrigin: 'Germany / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 18.50, lastPriceUSD: 21.00 },
  { code: '111000443', name: 'DAPRODUSTAT MS', annualQty: 4, perLotQty: 2, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'GSK (innovator, Jesduvroq); MSN Laboratories; Honour Lab; Optimus Drugs; Hetero Drugs', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 6500.00, lastPriceUSD: 7200.00 },
  { code: '111000079', name: 'DEXTROSE MONOHYDRATE USP', annualQty: 375, perLotQty: 75, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Cargill; Roquette Freres; Ingredion; Tate & Lyle; ADM', preferOrigin: 'USA / EU', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 1.60, lastPriceUSD: 1.90 },
  { code: '111000320', name: 'DIACERIN BP', annualQty: 100, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: "Aurobindo Pharma; Divi's Laboratories; Hetero Drugs; Cipla; Sun Pharmaceutical Industries", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 140.00, lastPriceUSD: 155.00 },
  { code: '111000082', name: 'DICHLOROMETHANE BP', annualQty: 3240, perLotQty: 810, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Dow Chemical; Occidental Chemical; INEOS; Solvay SA; Aditya Birla Chemicals', preferOrigin: 'Germany / USA / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 1.45, lastPriceUSD: 1.70 },
  { code: '111000315', name: 'DIPHENHYDRAMINE HYDROCHLORIDE BP', annualQty: 700, perLotQty: 200, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Pfizer (originator, Benadryl); Anhui BBCA; IPCA Laboratories; Global Calcium; Suzhou No.4 Pharma', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 26.00, lastPriceUSD: 29.50 },
  { code: '111000081', name: 'DISODIUM EDETATE BP', annualQty: 500, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Nouryon (Dissolvine); Lanxess; BASF SE; Merck KGaA; Zhenjiang Chembo', preferOrigin: 'Germany / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 4.20, lastPriceUSD: 4.80 },
  { code: '111000317', name: 'DOMPERIDONE(BASE) BP', annualQty: 225, perLotQty: 75, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Janssen (innovator, Motilium); IPCA Laboratories; Shandong Xinhua; Cadila Healthcare; Suzhou No.4 Pharma', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 48.00, lastPriceUSD: 54.00 },
  { code: '111000321', name: 'DULOXETINE HYDROCHLORIDE EC PELLETS 14.8', annualQty: 6, perLotQty: 3, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: "Eli Lilly (innovator, Cymbalta); Divi's Laboratories; Hetero Drugs; MSN Laboratories; Cadila Healthcare", preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 380.00, lastPriceUSD: 420.00 },
  { code: '111000336', name: 'EFLORNITHINE HYDROCHLORIDE MONOHYDRATE M', annualQty: 620, perLotQty: 150, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Sanofi (innovator, Vaniqa); Cambrex Corporation; Hovione; MSN Laboratories; Fine Organics', preferOrigin: 'India / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 195.00, lastPriceUSD: 215.00 },
  { code: '111000186', name: 'EPHEDRINE HYDROCHLORIDE BP', annualQty: 586.6, perLotQty: 586.6, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: "Aurobindo Pharma; Divi's Laboratories; Hetero Drugs; Cipla; Sun Pharmaceutical Industries", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 110.00, lastPriceUSD: 125.00 },
  { code: '111000086', name: 'ERYTHROSINE RED LAKE (CI 45430:1) MS', annualQty: 175, perLotQty: 75, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Neelikon Food Dyes & Chemicals; Sensient Colors; Roha Dyechem; Dynemic Products; Sun Chemical', preferOrigin: 'India / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 32.00, lastPriceUSD: 36.50 },
  { code: '111000326', name: 'ESOMEPRAZOLE ENTERIC COATED PELLETS 22.5', annualQty: 506, perLotQty: 3, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'AstraZeneca (innovator, Nexium); Hetero Drugs; MSN Laboratories; Ipca Laboratories; Sun Pharmaceutical', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 85.00, lastPriceUSD: 94.00 },
  { code: '111000334', name: 'ESZOPICLONE USP', annualQty: 1, perLotQty: 1, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Sunovion (innovator, Lunesta); MSN Laboratories; Hetero Drugs; Honour Lab; Optimus Drugs', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 2800.00, lastPriceUSD: 3100.00 },
  { code: '111000348', name: 'FLUCONAZOLE(MICRONIZED) USP', annualQty: 100, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Pfizer (innovator, Diflucan); Aurobindo Pharma; IPCA Laboratories; Cadila Healthcare; Zhejiang Guobang', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 95.00, lastPriceUSD: 108.00 },
  { code: '111000342', name: 'FLUOROMETHOLONE BP', annualQty: 2000, perLotQty: 1000, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Allergan (innovator, FML); Farmabios; Ami Lifesciences; Symbiotec Pharmalab; Pfizer API', preferOrigin: 'India / Italy', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 4.80, lastPriceUSD: 5.40 },
  { code: '111000349', name: 'FLUTICASONE PROPIONATE BP', annualQty: 3000, perLotQty: 1000, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'GSK (innovator, Flonase/Flovent); Symbiotec Pharmalab; Farmabios; Cipla; Hovione', preferOrigin: 'India / UK', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 8.50, lastPriceUSD: 9.60 },
  { code: '111000429', name: 'FUMARIC ACID', annualQty: 12, perLotQty: 4, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Polynt-Reichhold; Fuso Chemical; Yancheng Hongxin; Anhui Sealong; Bartek Ingredients', preferOrigin: 'China / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 5.20, lastPriceUSD: 6.00 },
  { code: '111000351', name: 'GEMFIBROZIL USP', annualQty: 4000, perLotQty: 1000, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Pfizer (originator, Lopid); IPCA Laboratories; Shandong Xinhua; Suzhou No.4 Pharma; Global Calcium', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 34.00, lastPriceUSD: 38.00 },
  { code: '114000134', name: 'GINSENG EXTRACT', annualQty: 375, perLotQty: 75, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Natural Remedies Pvt Ltd; Sabinsa Corporation; Indena S.p.A. (Italy); Naturalin Bio-Resources (China); Umang Pharmatech', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 85.00, lastPriceUSD: 95.00 },
  { code: '111000092', name: 'GLYCEROL BP', annualQty: 113000, perLotQty: 16000, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Wilmar International; KLK Oleo; IOI Group; Musim Mas; Cargill', preferOrigin: 'Indonesia / Malaysia / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 1.35, lastPriceUSD: 1.55 },
  { code: '111000354', name: 'GLYCERYL TRINITRATE(DILU. NITROGLYCERIN', annualQty: 34500, perLotQty: 5000, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'UCB/Bard Pharma (originator supply); Sekhmet Pharmaventures; Rusan Pharma; Cambrex Corporation; Symed Labs', preferOrigin: 'Germany / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 18.00, lastPriceUSD: 20.50 },
  { code: '111000353', name: 'GRAMICIDIN USP', annualQty: 2000, perLotQty: 1000, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Xellia Pharmaceuticals (originator supply); DSM Sinochem; Sinopharm; North China Pharmaceutical; Zhejiang Hisun', preferOrigin: 'China / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 6.20, lastPriceUSD: 7.10 },
  { code: '111000129', name: 'GUAR GUM (N-HANCE)', annualQty: 25, perLotQty: 75, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Ashland Inc. (N-Hance); Vikas WSP; Lucid Colloids; Hindustan Gum; DKS Group', preferOrigin: 'USA / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 14.00, lastPriceUSD: 16.50 },
  { code: '111000444', name: 'HPMC K100M Ph BP', annualQty: 624, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Shin-Etsu Chemical (Pharmacoat); DuPont/IFF (Methocel, ex-Dow); Ashland; Colorcon; SPI Pharma', preferOrigin: 'USA / Japan / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 26.50, lastPriceUSD: 29.50 },
  { code: '111000097', name: 'HYDROXYPROPYL CELLULOSE USP', annualQty: 600, perLotQty: 200, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Ashland Inc.; Nippon Soda Co.; Shin-Etsu Chemical; DuPont/IFF; Hercules', preferOrigin: 'USA / Japan', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 32.00, lastPriceUSD: 36.00 },
  { code: '111000096', name: 'HYPROMELLOSE (HPMC 2910, 4000 CPS) BP', annualQty: 1000, perLotQty: 500, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Shin-Etsu Chemical (Pharmacoat); DuPont/IFF (Methocel, ex-Dow); Ashland; Colorcon; SPI Pharma', preferOrigin: 'USA / Japan / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 22.00, lastPriceUSD: 25.00 },
  { code: '111000360', name: 'IBUPROFEN BP (27 GRADE)', annualQty: 400, perLotQty: 225, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'BASF SE; SI Group; Shasun Pharmaceuticals (Strides); Xinhua Pharmaceutical (Shandong); Granules India', preferOrigin: 'India / China / Spain', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 14.50, lastPriceUSD: 16.20 },
  { code: '111000363', name: 'IMIDUREA', annualQty: 10, perLotQty: 5, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Yara International; SABIC; Engro Fertilizers; Fauji Fertilizer; Qatar Fertiliser', preferOrigin: 'China / Middle East / Pakistan', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 18.00, lastPriceUSD: 21.00 },
  { code: '111000359', name: 'IPRATROPIUM BROMIDE BP', annualQty: 9000, perLotQty: 3125, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Boehringer Ingelheim (innovator, Atrovent); Sekhmet Pharmaventures; Symed Labs; Unimark Remedies; Farmhispania', preferOrigin: 'Germany / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 2.90, lastPriceUSD: 3.30 },
  { code: '111000412', name: 'ISOCONAZOLE NITRATE (MICRONIZED) BP', annualQty: 25, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Bayer (originator, Travogen); Symbiotec Pharmalab; Farmabios; Ami Lifesciences; Zhejiang Xianju', preferOrigin: 'India / Italy', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 380.00, lastPriceUSD: 420.00 },
  { code: '111000100', name: 'ISOPROPYL MYRISTATE BP', annualQty: 12825, perLotQty: 300, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'BASF SE; Croda International; KLK Oleo; Vantage Specialty Ingredients; Emery Oleochemicals', preferOrigin: 'Germany / Malaysia', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 5.80, lastPriceUSD: 6.60 },
  { code: '111000358', name: 'IVERMECTIN USP', annualQty: 66, perLotQty: 33, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Merck & Co. (innovator, Stromectol); Sino-Swiss Pharma; Hubei Tianyu; Uquifa; Cadila Healthcare', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 420.00, lastPriceUSD: 460.00 },
  { code: '111000005', name: 'KLUCEL EXF', annualQty: 226.8, perLotQty: 45.36, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Ashland Inc. (Klucel); Nippon Soda; Shin-Etsu; Hercules; DuPont (IFF Health & Biosciences)', preferOrigin: 'USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 38.00, lastPriceUSD: 43.00 },
  { code: '114000110', name: 'L-CYSTINE', annualQty: 2, perLotQty: 2, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Ajinomoto Co.; Wacker Chemie; Meihua Group; Kyowa Hakko Bio; Bioamber', preferOrigin: 'China / Japan', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 45.00, lastPriceUSD: 52.00 },
  { code: '111000407', name: 'LENALIDOMIDE(MS)', annualQty: 2, perLotQty: 1, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Bristol Myers Squibb/Celgene (innovator, Revlimid); MSN Laboratories; Natco Pharma; Hetero Drugs; Optimus Drugs', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 7800.00, lastPriceUSD: 8600.00 },
  { code: '111000123', name: 'LIGHT KAOLIN BP', annualQty: 300, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Imerys; KaMin LLC; English China Clays; Thiele Kaolin; 20 Microns Ltd', preferOrigin: 'UK / USA / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 2.40, lastPriceUSD: 2.80 },
  { code: '111000447', name: 'LINAGLIPTIN', annualQty: 4, perLotQty: 3, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Boehringer Ingelheim (innovator, Tradjenta); MSN Laboratories; Honour Lab; Hetero Drugs; Symed Labs', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 3200.00, lastPriceUSD: 3600.00 },
  { code: '111000230', name: 'LINEZOLID USP', annualQty: 725, perLotQty: 200, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: "Pfizer/Pharmacia (innovator, Zyvox); Optimus Drugs; MSN Laboratories; Hetero Drugs; Divi's Laboratories", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 145.00, lastPriceUSD: 160.00 },
  { code: '111000222', name: 'LISINOPRIL DIHYDRATE USP', annualQty: 270, perLotQty: 150, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'AstraZeneca/Merck (innovator, Zestril/Prinivil); IPCA Laboratories; Cadila Healthcare; Zhejiang Huahai; Global Calcium', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 175.00, lastPriceUSD: 195.00 },
  { code: '111000228', name: 'LORNOXICAM MS', annualQty: 25, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Nycomed (innovator, Xefo); Hetero Drugs; Ind-Swift Laboratories; Symed Labs; Honour Lab', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 550.00, lastPriceUSD: 620.00 },
  { code: '111000441', name: 'LULICONAZOLE MS', annualQty: 525, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Nihon Nohyaku/Sato (innovator); Neuland Laboratories; MSN Laboratories; Symed Labs; Hetero Drugs', preferOrigin: 'India / Japan', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 360.00, lastPriceUSD: 400.00 },
  { code: '111000239', name: 'MAGNESIUM CHLORIDE', annualQty: 150, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'K+S Aktiengesellschaft; ICL Group; Dead Sea Works; Qinghai Salt Lake; Nedmag', preferOrigin: 'China / Germany / Israel', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 2.60, lastPriceUSD: 3.00 },
  { code: '111000011', name: 'MAGNESIUM STEARATE BP', annualQty: 2214.668, perLotQty: 500, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Peter Greven Fett-Chemie; Faci S.p.A.; Baerlocher; VVF Ltd (India); Ferro Corporation', preferOrigin: 'Malaysia / Germany / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 4.80, lastPriceUSD: 5.50 },
  { code: '111000012', name: 'MAIZE STARCH BP', annualQty: 10825, perLotQty: 1725, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Roquette Freres; Ingredion; Cargill; Colorcon (Starch 1500 - DuPont/IFF); Grain Processing Corp', preferOrigin: 'Netherlands / France / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 1.15, lastPriceUSD: 1.35 },
  { code: '111000015', name: 'MALTODEXTRIN BP', annualQty: 800, perLotQty: 400, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Roquette Freres; Ingredion; Cargill; Grain Processing Corp; Tate & Lyle', preferOrigin: 'France / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 2.10, lastPriceUSD: 2.40 },
  { code: '114000137', name: 'MANGANESE GLUCONATE USP', annualQty: 50, perLotQty: 50, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Jost Chemical; Gadot Biochemical; Fooding Group; Panzhihua Non-Ferrous; Merck KGaA', preferOrigin: 'China / France', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 19.50, lastPriceUSD: 22.50 },
  { code: '111000104', name: 'METHYLPARABEN USP/NF', annualQty: 1200, perLotQty: 400, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Clariant; Sharon Laboratories; Salicylates and Chemicals; Ueno Fine Chemicals; Kumar Organic Products', preferOrigin: 'China / Spain / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 8.80, lastPriceUSD: 9.90 },
  { code: '111000002', name: 'MICROCRYSTALLINE CELLULOSE (PH 101) BP', annualQty: 400, perLotQty: 400, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'DuPont/IFF (Avicel); JRS Pharma (Vivapur); Asahi Kasei (Ceolus); Mingtai Chemical; Signet Excipients (India)', preferOrigin: 'USA / Germany / Japan / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 5.60, lastPriceUSD: 6.30 },
  { code: '111000237', name: 'MISOPROSTOL DISPERSION (1% W/W) USP', annualQty: 70, perLotQty: 20, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Pfizer (innovator, Cytotec); Pfizer CentreOne (Fine chemical supply); Sekhmet Pharmaventures; Symed Labs; Hetero Drugs', preferOrigin: 'India / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 850.00, lastPriceUSD: 950.00 },
  { code: '111000235', name: 'MOXIFLOXACIN HYDROCHLORIDE BP', annualQty: 39000, perLotQty: 7000, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Bayer (innovator, Avelox); Aurobindo Pharma; Zhejiang Guobang; Hetero Drugs; Shandong Lukang', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 0.18, lastPriceUSD: 0.21 },
  { code: '111000016', name: 'NEOMYCIN SULPHATE BP', annualQty: 1000, perLotQty: 500, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Pharmacia (originator); Sinopharm; DSM Sinochem; North China Pharmaceutical; Nectar Lifesciences', preferOrigin: 'China / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 85.00, lastPriceUSD: 96.00 },
  { code: '111000242', name: 'NOREPINEPHRINE BITARTRATE USP', annualQty: 9000, perLotQty: 3300, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Sanofi (originator, Levophed); Sekhmet Pharmaventures; Symed Labs; Cambrex Corporation; Honour Lab', preferOrigin: 'India / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 3.20, lastPriceUSD: 3.65 },
  { code: '111000240', name: 'NYSTATIN BP', annualQty: 1080, perLotQty: 360, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Bristol Myers Squibb (originator); Zhejiang Huahai; Sicor Biotech; North China Pharmaceutical; Hangzhou Sino-Swiss', preferOrigin: 'China / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 68.00, lastPriceUSD: 76.00 },
  { code: '111000367', name: 'OLETH-2', annualQty: 180, perLotQty: 180, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Croda International; Evonik Industries; BASF SE; Clariant; Stepan Company', preferOrigin: 'Belgium / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 11.50, lastPriceUSD: 13.00 },
  { code: '111000424', name: 'ONDANSETRON HCL DIHYDRATE (MICRONIZED)BP', annualQty: 40, perLotQty: 20, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'GSK (innovator, Zofran); Hetero Drugs; MSN Laboratories; Zhejiang Guobang; Cadila Healthcare', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 420.00, lastPriceUSD: 470.00 },
  { code: '111000406', name: 'ONDANSETRON HYDROCHLORIDE DIHYDRATE(BP)', annualQty: 65, perLotQty: 20, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'GSK (innovator, Zofran); Hetero Drugs; MSN Laboratories; Zhejiang Guobang; Cadila Healthcare', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 390.00, lastPriceUSD: 440.00 },
  { code: '111000020', name: 'ORTHO PHOSPHORIC ACID 85 % BP', annualQty: 250, perLotQty: 200, uom: 'L', mode: 'AIR', cat: 'EXP', preferMfg: 'Prayon; OCP Group; ICL Group; Innophos; Yunnan Yuntianhua', preferOrigin: 'Belgium / Morocco / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 3.40, lastPriceUSD: 3.90 },
  { code: '111000449', name: 'OTESECONAZOLE', annualQty: 50, perLotQty: 50, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Mycovia Pharmaceuticals (innovator, Vivjoa); MSN Laboratories; Honour Lab; Optimus Drugs; Hetero Drugs', preferOrigin: 'USA / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 1850.00, lastPriceUSD: 2100.00 },
  { code: '114000133', name: 'PANTHENOL USP', annualQty: 20, perLotQty: 20, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'DSM-Firmenich; BASF SE; Jiangsu Boya; Merck KGaA; NHU', preferOrigin: 'Switzerland / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 28.00, lastPriceUSD: 32.50 },
  { code: '114000197', name: 'PHENOXYETHANOL', annualQty: 50, perLotQty: 50, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'BASF SE; Evonik Industries; DFE Pharma; JRS Pharma; Signet Excipients', preferOrigin: 'Germany / India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 7.50, lastPriceUSD: 8.80 },
  { code: '111000252', name: 'PHENYLEPHRINE HYDROCHLORIDE USP', annualQty: 9000, perLotQty: 3000, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Sanofi (originator); IPCA Laboratories; Suzhou No.4 Pharma; Cadila Healthcare; Global Calcium', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 0.28, lastPriceUSD: 0.32 },
  { code: '111000134', name: 'PHENYLETHYL ALCOHOL USP/NF', annualQty: 3400, perLotQty: 400, uom: 'L', mode: 'SEA', cat: 'EXP', preferMfg: 'Solvay; BASF; Symrise; Firmenich; Kumar Organic Products', preferOrigin: 'France / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 14.50, lastPriceUSD: 16.80 },
  { code: '114000116', name: 'PIPERONYL BUTOXIDE', annualQty: 100, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Endura S.p.A.; Tagros Chemicals; Meghmani Organics; UPL Limited; Sumitomo Chemical', preferOrigin: 'China / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 38.00, lastPriceUSD: 44.00 },
  { code: '111000065', name: 'POLYACRYLIC ACID (CARBOMER 940 BP)', annualQty: 1600, perLotQty: 400, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Lubrizol Corporation (Carbopol); Sino Lion (China); 3V Sigma (Italy); Nouryon; Shandong Xiya', preferOrigin: 'USA / France', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 31.00, lastPriceUSD: 35.50 },
  { code: '111000025', name: 'POLYETHYLENE GLYCOL 6000 BP/USP', annualQty: 550, perLotQty: 50, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Dow Chemical; Clariant; BASF SE; Merck KGaA; India Glycols Limited', preferOrigin: 'USA / Germany / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 4.20, lastPriceUSD: 4.80 },
  { code: '111000138', name: 'POLYQUARTERNIUM 44(POLYQ 44)', annualQty: 1560, perLotQty: 240, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'BASF SE; Evonik Industries; DFE Pharma; JRS Pharma; Signet Excipients', preferOrigin: 'Germany / India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 16.50, lastPriceUSD: 19.00 },
  { code: '111000414', name: 'POLYSORBATE 60 USP', annualQty: 100, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Croda International; Evonik Industries; Merck KGaA; ICI/Uniqema; Vantage Specialty Ingredients', preferOrigin: 'USA / Belgium / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 7.80, lastPriceUSD: 8.90 },
  { code: '111000140', name: 'POTASSIUM HYDROXIDE BP', annualQty: 150, perLotQty: 50, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Olin Corporation; Covestro; Dow Chemical; Occidental Chemical; INOVYN', preferOrigin: 'Germany / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 3.10, lastPriceUSD: 3.60 },
  { code: '111000026', name: 'POTASSIUM SORBATE BP', annualQty: 150, perLotQty: 7, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Nutrite; Daicel Corporation; Eastman Chemical; Kian Ann Salt Works; Hebei Suli', preferOrigin: 'China / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 6.20, lastPriceUSD: 7.10 },
  { code: '111000137', name: 'POVIDONE (K 90) BP', annualQty: 99.8, perLotQty: 49.9, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'BASF SE (Kollidon); Ashland (Plasdone); Boai NKY Pharma; ISP; Anhui Sunhere', preferOrigin: 'Germany / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 24.00, lastPriceUSD: 27.50 },
  { code: '111000259', name: 'PRALIDOXIME CHLORIDE USP', annualQty: 94, perLotQty: 10, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Duphar (originator); Sekhmet Pharmaventures; Cambrex Corporation; Symed Labs; Rusan Pharma', preferOrigin: 'India / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 420.00, lastPriceUSD: 480.00 },
  { code: '111000027', name: 'PROPYLPARABEN USP/NF', annualQty: 500, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Clariant; Sharon Laboratories; Salicylates and Chemicals; Ueno Fine Chemicals; Kumar Organic Products', preferOrigin: 'China / Spain / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 11.50, lastPriceUSD: 13.00 },
  { code: '111000053', name: 'PURIFIED TALC BP', annualQty: 4800, perLotQty: 1500, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Imerys; Mondo Minerals; IMI Fabi; Golcha Associated Malls; Luzenac', preferOrigin: 'India / China / Italy', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 0.95, lastPriceUSD: 1.15 },
  { code: '111000265', name: 'RISEDRONATE SODIUM USP', annualQty: 20, perLotQty: 10, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Sanofi/Warner Chilcott (innovator, Actonel); Megafine Pharma; Hetero Drugs; MSN Laboratories; Symed Labs', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 950.00, lastPriceUSD: 1080.00 },
  { code: '111000041', name: 'SACCHARIN SODIUM BP', annualQty: 1100, perLotQty: 800, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: "Aurobindo Pharma; Divi's Laboratories; Hetero Drugs; Cipla; Sun Pharmaceutical Industries", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 7.20, lastPriceUSD: 8.20 },
  { code: '111000268', name: 'SALBUTAMOL SULPHATE BP', annualQty: 125, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'GSK (originator, Ventolin); Cipla; Neuland Laboratories; Shandong Xinhua; Symed Labs', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 165.00, lastPriceUSD: 185.00 },
  { code: '111000047', name: 'SALICYLIC ACID (MICRONIZED) BP', annualQty: 1075, perLotQty: 175, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: "Aurobindo Pharma; Divi's Laboratories; Hetero Drugs; Cipla; Sun Pharmaceutical Industries", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 6.50, lastPriceUSD: 7.40 },
  { code: '111000035', name: 'SALICYLIC ACID BP', annualQty: 900, perLotQty: 300, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: "Aurobindo Pharma; Divi's Laboratories; Hetero Drugs; Cipla; Sun Pharmaceutical Industries", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 5.90, lastPriceUSD: 6.80 },
  { code: '111000036', name: 'SIMETHICONE (ANTIFOAM) USP', annualQty: 1200, perLotQty: 300, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Dow Silicones (DuPont); Wacker Chemie; Evonik Industries; Bluestar Silicones; Elkem', preferOrigin: 'Germany / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 14.50, lastPriceUSD: 16.50 },
  { code: '111000267', name: 'SODIUM ASCORBATE BP/USP', annualQty: 3500, perLotQty: 500, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'BASF SE; Evonik Industries; DFE Pharma; JRS Pharma; Signet Excipients', preferOrigin: 'Germany / India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 8.20, lastPriceUSD: 9.30 },
  { code: '111000145', name: 'SODIUM BICARBONATE BP/USP', annualQty: 125, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Solvay SA; Tata Chemicals; Church & Dwight; Nirma Limited; Novacarb', preferOrigin: 'USA / Germany / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 1.20, lastPriceUSD: 1.45 },
  { code: '111000146', name: 'SODIUM BORATE USP/NF', annualQty: 12, perLotQty: 3, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Eti Maden; Rio Tinto Borax; American Borate; Searles Valley Minerals; Borax Argentina', preferOrigin: 'Turkey / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 4.50, lastPriceUSD: 5.20 },
  { code: '111000039', name: 'SODIUM CHLORIDE USP', annualQty: 19950, perLotQty: 12, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'K+S Aktiengesellschaft; Compass Minerals; Tata Chemicals; local salt works (PISI, Khewra); Cheetham Salt', preferOrigin: 'Pakistan / Germany / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 0.85, lastPriceUSD: 1.05 },
  { code: '114000074', name: 'SODIUM CITRATE (API) BP', annualQty: 26000, perLotQty: 2500, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: "Aurobindo Pharma; Divi's Laboratories; Hetero Drugs; Cipla; Sun Pharmaceutical Industries", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 2.30, lastPriceUSD: 2.65 },
  { code: '111000158', name: 'SODIUM DIHYDROGEN PHOSPHATE DIHYDRATE BP', annualQty: 675, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: "Aurobindo Pharma; Divi's Laboratories; Hetero Drugs; Cipla; Sun Pharmaceutical Industries", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 3.50, lastPriceUSD: 4.10 },
  { code: '111000150', name: 'SODIUM METABISULPHITE BP', annualQty: 225, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Esseco Group; Sulfochem; Aditya Birla Chemicals; Shandong Wonderful; local sulphite plants', preferOrigin: 'China / EU', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 2.90, lastPriceUSD: 3.40 },
  { code: '111000153', name: 'SODIUM PERBORATE BP', annualQty: 4, perLotQty: 2, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: "Aurobindo Pharma; Divi's Laboratories; Hetero Drugs; Cipla; Sun Pharmaceutical Industries", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 8.50, lastPriceUSD: 9.80 },
  { code: '111000045', name: 'SODIUM STARCH GLYCOLATE (TYPE A) BP', annualQty: 500, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Roquette Freres; Ingredion; Cargill; Colorcon (Starch 1500 - DuPont/IFF); Grain Processing Corp', preferOrigin: 'Netherlands / France / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 4.60, lastPriceUSD: 5.30 },
  { code: '111000050', name: 'SODIUM STEARYL FUMARATE', annualQty: 100, perLotQty: 50, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'BASF SE; Evonik Industries; DFE Pharma; JRS Pharma; Signet Excipients', preferOrigin: 'Germany / India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 19.50, lastPriceUSD: 22.00 },
  { code: '111000151', name: 'SORBIC ACID BP', annualQty: 25, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Nutrite; Daicel Corporation; Eastman Chemical; Kian Ann Salt Works; Hebei Suli', preferOrigin: 'China / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 7.80, lastPriceUSD: 8.90 },
  { code: '111000415', name: 'SORBITAN MONOSTEARATE USP', annualQty: 50, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Peter Greven Fett-Chemie; Faci S.p.A.; Baerlocher; VVF Ltd (India); Ferro Corporation', preferOrigin: 'Malaysia / Germany / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 6.90, lastPriceUSD: 7.90 },
  { code: '111000143', name: 'SORBITAN SESQUIOLEATE (SP 83-LQ-(SG) BP', annualQty: 1710, perLotQty: 190, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Croda International; Evonik Industries; Merck KGaA; Vantage Specialty Ingredients; Lonza', preferOrigin: 'USA / Belgium', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 10.50, lastPriceUSD: 12.00 },
  { code: '111000161', name: 'SPRAY DRIED LACTOSE (SUPER TAB)', annualQty: 4180, perLotQty: 500, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'DFE Pharma; Meggle Group; Kerry Group (Sheffield); Foremost Farms; Armor Proteines', preferOrigin: 'Netherlands / Germany / USA', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 3.20, lastPriceUSD: 3.70 },
  { code: '111000110', name: 'STEARIC ACID (MICRONIZED) USP/NF', annualQty: 17000, perLotQty: 100, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Peter Greven Fett-Chemie; Faci S.p.A.; KLK Oleo; Wilmar International; VVF Ltd', preferOrigin: 'Malaysia / Germany / Indonesia', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 2.80, lastPriceUSD: 3.25 },
  { code: '111000270', name: 'SUMATRIPTAN SUCCINATE BP', annualQty: 120, perLotQty: 24, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'GSK (innovator, Imitrex); Hetero Drugs; MSN Laboratories; Symed Labs; Honour Lab', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 390.00, lastPriceUSD: 440.00 },
  { code: '111000394', name: 'TAPENTADOL HYDROCHLORIDE BP', annualQty: 25, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Gruenenthal (innovator, Nucynta); MSN Laboratories; Honour Lab; Hetero Drugs; Optimus Drugs', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 950.00, lastPriceUSD: 1080.00 },
  { code: '111000274', name: 'TERPENE HYDRATE BP', annualQty: 200, perLotQty: 250, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: "Aurobindo Pharma; Divi's Laboratories; Hetero Drugs; Cipla; Sun Pharmaceutical Industries", preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 32.00, lastPriceUSD: 36.50 },
  { code: '111000286', name: 'THALIDOMIDE USP', annualQty: 100, perLotQty: 75, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Celgene/BMS (innovator, Thalomid); Sichuan Weikang; Andhra Organics; Lasa Supergenerics; Grunenthal API', preferOrigin: 'China / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 1200.00, lastPriceUSD: 1350.00 },
  { code: '111000275', name: 'THIOMERSAL BP', annualQty: 2000, perLotQty: 2000, uom: 'G', mode: 'AIR', cat: 'EXP', preferMfg: 'Alfa Chemistry; Merck KGaA; NovaBay; Sigma-Aldrich (Merck); Xinjiang manufacturers', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 1.80, lastPriceUSD: 2.10 },
  { code: '111000288', name: 'TICAGRELOR', annualQty: 75, perLotQty: 100, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: "AstraZeneca (innovator, Brilinta); MSN Laboratories; Divi's Laboratories; Hetero Drugs; Honour Lab", preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 650.00, lastPriceUSD: 720.00 },
  { code: '111000283', name: 'TIMOLOL MALEATE USP', annualQty: 31000, perLotQty: 25000, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Merck & Co. (originator, Timoptic); Sekhmet Pharmaventures; Symed Labs; Cadila Healthcare; Unimark Remedies', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 0.15, lastPriceUSD: 0.18 },
  { code: '111000284', name: 'TIZANIDINE HYDROCHLORIDE USP', annualQty: 1000, perLotQty: 1000, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Acorda/Novartis (originator, Zanaflex); MSN Laboratories; Hetero Drugs; Symed Labs; Honour Lab', preferOrigin: 'India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 0.85, lastPriceUSD: 0.98 },
  { code: '111000281', name: 'TOBRAMYCIN BASE USP', annualQty: 9500, perLotQty: 2000, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Eli Lilly (originator, Nebcin); Zhejiang Hisun; DSM Sinochem; Xinjiang Kangxin; Symed Labs', preferOrigin: 'China / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 1.45, lastPriceUSD: 1.68 },
  { code: '111000280', name: 'TOBRAMYCIN SULFATE USP', annualQty: 11, perLotQty: 8, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Eli Lilly (originator, Nebcin); Zhejiang Hisun; DSM Sinochem; Xinjiang Kangxin; Symed Labs', preferOrigin: 'China / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 1250.00, lastPriceUSD: 1400.00 },
  { code: '111000287', name: 'TRAMADOL HYDROCHLORIDE USP', annualQty: 200, perLotQty: 600, uom: 'KG', mode: 'SEA', cat: 'API', preferMfg: 'Grunenthal (originator, Ultram); IPCA Laboratories; Cadila Healthcare; Zhejiang Jianfeng; Global Calcium', preferOrigin: 'India / China', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 68.00, lastPriceUSD: 78.00 },
  { code: '111000276', name: 'TRANEXAMIC ACID BP', annualQty: 50, perLotQty: 50, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'Daiichi Sankyo (originator, Transamin); Fine Organics; Anhui Sealong; Nantong Baihe; Cadila Healthcare', preferOrigin: 'Japan / China / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 36.00, lastPriceUSD: 41.00 },
  { code: '111000285', name: 'TRETINOIN(MICRONIZED) USP', annualQty: 102000, perLotQty: 16000, uom: 'G', mode: 'AIR', cat: 'API', preferMfg: 'Janssen (originator, Retin-A); Farmabios; Ami Lifesciences; Symbiotec Pharmalab; Cipla', preferOrigin: 'India / Italy', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 0.95, lastPriceUSD: 1.10 },
  { code: '111000165', name: 'TRIBASIC CALCIUM PHOSPHATE USP/NF', annualQty: 350, perLotQty: 50, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'Chemische Fabrik Budenheim; Innophos; Roullier Group (Timab); Trifarma; JOST Chemical', preferOrigin: 'Germany / France / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 5.40, lastPriceUSD: 6.20 },
  { code: '111000164', name: 'TRIETHANOLAMINE BP', annualQty: 690, perLotQty: 230, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Dow Chemical; Huntsman Corporation; BASF SE; Ineos Oxide; Akzo Nobel', preferOrigin: 'USA / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 3.80, lastPriceUSD: 4.40 },
  { code: '114000060', name: 'VITAMIN A (AS RETINYL PALMITATE) USP', annualQty: 25, perLotQty: 25, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'DSM-Firmenich; BASF SE; Zhejiang NHU; CSPC Pharmaceutical Group; Jiangsu Aostar Vitamin', preferOrigin: 'Switzerland / China / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 95.00, lastPriceUSD: 110.00 },
  { code: '114000112', name: 'VITAMIN K2 (MENAQUINONE-7)', annualQty: 100, perLotQty: 100, uom: 'KG', mode: 'AIR', cat: 'API', preferMfg: 'DSM-Firmenich; BASF SE; Zhejiang NHU; CSPC Pharmaceutical Group; Jiangsu Aostar Vitamin', preferOrigin: 'Switzerland / China / Germany', sampleInit: '500GM 1st Lot + WS', sampleTrial: '1KG 2nd Lot', targetPriceUSD: 1400.00, lastPriceUSD: 1600.00 },
  { code: '111000055', name: 'WHITE BEESWAX BP', annualQty: 2500, perLotQty: 500, uom: 'KG', mode: 'SEA', cat: 'EXP', preferMfg: 'Koster Keunen; Kahlwax (H. Kahl Nachf.); Strahl & Pitsch; Poth Hille; Norevo', preferOrigin: 'Germany / Ethiopia / India', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 12.50, lastPriceUSD: 14.50 },
  { code: '111000034', name: 'XANTHAN GUM BP/USP', annualQty: 450, perLotQty: 4, uom: 'KG', mode: 'AIR', cat: 'EXP', preferMfg: 'CP Kelco; Deosen Biochemical; Fufeng Group; Meihua Group; Jungbunzlauer', preferOrigin: 'China / France', sampleInit: '500GM 1st Lot + WS', sampleTrial: '2KG 2nd Lot', targetPriceUSD: 8.90, lastPriceUSD: 10.20 },
];

const INDENTORS_POOL = [
  'Premier Agencies',
  'BioTech Sourcing',
  'PharmaTrade International',
  'Indenting Masters',
  'Apex Pharma Solutions',
  'ChemiSource Pakistan',
  'Orient Pharma Indenting',
  'Medico Sourcing',
];

// Helper to construct Initial Inquiries
export const INITIAL_INQUIRY_BENCHMARKS: ExtendedInquiryRecord[] = RAW_ITEMS.map((item, index) => {
  const mfgs = item.preferMfg.split(';').map((s) => s.trim()).filter(Boolean);
  const invited = INDENTORS_POOL.slice(index % 4, (index % 4) + 3);
  const discountFactor = 0.92 - ((index % 7) * 0.015);
  const lowestQuotedRate = Math.round(item.targetPriceUSD * discountFactor * 100) / 100;

  return {
    id: `INQ-${item.code}`,
    inquiryCode: `ATCO/INQ/2026/${item.cat}-${String(index + 1).padStart(2, '0')}`,
    issueDate: '2026-07-15',
    deadlineDate: '2026-08-30',
    company: 'LAB',
    category: item.cat,
    materialCode: item.code,
    materialName: item.name,
    gradeSpec: `${item.cat === 'API' ? 'Ph.Eur / USP / BP Active Substance' : 'Pharma Excipient Grade'}`,
    annualDemandQty: item.annualQty,
    perLotQty: item.perLotQty,
    uom: item.uom,
    shipmentMode: item.mode,
    targetPriceUSD: item.targetPriceUSD,
    lastPurchasePriceUSD: item.lastPriceUSD,
    preferredIncoterm: 'CFR Karachi',
    preferMfg: item.preferMfg,
    preferOrigin: item.preferOrigin,
    initialSampleQtyReq: item.sampleInit,
    trialSampleQtyReq: item.sampleTrial,
    requiredAuditLevel: item.cat === 'API' ? 'WHO-GMP PHYSICAL' : 'DESK AUDIT',
    requiredDocs: [
      'DMF (Open Part)',
      'GMP Certificate',
      'Batch COA',
      'Zone IVb Stability (36M)',
      'TSE/BSE Declaration',
      'Nitrosamine Risk Assessment',
    ],
    invitedIndentors: invited,
    responsesReceivedCount: Math.min(mfgs.length, 3),
    lowestQuotedRateUSD: lowestQuotedRate,
    status: 'QUOTATIONS_RECEIVED',
  };
});

// Helper to construct Initial Quotations
export const INITIAL_VENDOR_QUOTATIONS: VendorQuotationRecord[] = [];

RAW_ITEMS.forEach((item, itemIdx) => {
  const mfgs = item.preferMfg.split(';').map((s) => s.trim().replace(/\(innovator.*?\)/gi, '').replace(/\(originator.*?\)/gi, '').trim()).filter(Boolean);
  const quoteCount = Math.min(mfgs.length, 3);

  for (let qIdx = 0; qIdx < quoteCount; qIdx++) {
    const mfgName = mfgs[qIdx] || `Global Pharma Chemicals Co. #${qIdx + 1}`;
    const indentorName = INDENTORS_POOL[(itemIdx + qIdx) % INDENTORS_POOL.length];
    
    // Pricing variations: qIdx 0 is lowest winner, qIdx 1 is close, qIdx 2 is premium
    let rateFactor = 0.92;
    if (qIdx === 1) rateFactor = 0.98;
    if (qIdx === 2) rateFactor = 1.04;

    const quotedRateUSD = Math.round(item.targetPriceUSD * rateFactor * 100) / 100;
    const priceVarianceUSD = Math.round((item.targetPriceUSD - quotedRateUSD) * 100) / 100;
    const priceVariancePct = Math.round((priceVarianceUSD / item.targetPriceUSD) * 1000) / 10;
    const annualSavingsPotentialUSD = Math.round(priceVarianceUSD * item.annualQty * 100) / 100;

    const isLowest = qIdx === 0;
    const isWinner = qIdx === 0;

    const auditStatuses: AuditStatusType[] = ['APPROVED', 'DESK AUDIT ONLY', 'CAPA PENDING', 'SCHEDULED'];
    const auditStatus = auditStatuses[(itemIdx + qIdx) % auditStatuses.length];

    INITIAL_VENDOR_QUOTATIONS.push({
      id: `QUO-2026-${item.code}-${qIdx + 1}`,
      sourceType: qIdx % 2 === 0 ? 'OUTLOOK_EMAIL' : 'EXCEL_FILE',
      inquiryRefNumber: `ATCO/INQ/2026/${item.cat}-${String(itemIdx + 1).padStart(2, '0')}`,
      emailSubject: `Commercial Offer & Dossier: ${item.name} - ${mfgName}`,
      emailSender: `sales@${indentorName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      emailDate: `2026-08-${15 + (itemIdx % 10)} 11:${30 + qIdx * 5} AM`,
      receivedDate: `2026-08-${15 + (itemIdx % 10)}`,
      indentorName,
      vendorManufacturer: mfgName,
      originCountry: item.preferOrigin.split('/')[qIdx % item.preferOrigin.split('/').length]?.trim() || 'China',
      plantAddress: `${mfgName} Manufacturing Complex, Industrial Zone`,
      company: 'LAB',
      category: item.cat,
      materialCode: item.code,
      materialName: item.name,
      pharmacopoeiaGrade: `${item.cat === 'API' ? 'Ph.Eur / USP / BP' : 'Pharma Grade'}`,
      quotedRateUSD,
      currency: 'USD',
      originalCurrencyRate: quotedRateUSD,
      uom: item.uom,
      moq: Math.max(item.perLotQty, item.uom === 'G' ? 1000 : 25),
      packSize: `${item.perLotQty} ${item.uom} Export Drums`,
      leadTimeWeeks: 3 + (qIdx % 3),
      paymentTerms: qIdx === 0 ? '100% LC at 90 Days' : '100% LC at Sight',
      incoterms: 'CFR Karachi',
      validityDate: '2026-10-31',
      targetBenchmarkPriceUSD: item.targetPriceUSD,
      annualQtyRequirement: item.annualQty,
      priceVarianceUSD,
      priceVariancePct,
      annualSavingsPotentialUSD,
      docsAvailabilityStatus: isWinner ? 'FULL AVAILABLE' : (qIdx === 1 ? 'FULL AVAILABLE' : 'PARTIAL AVAILABLE'),
      dmfStatus: isWinner ? 'AVAILABLE (OPEN/USDMF)' : 'CEP AVAILABLE',
      gmpCertificateStatus: 'VALID WHO-GMP',
      gmpExpiryDate: '2028-06-30',
      coaAvailable: true,
      coaComplyAck: true,
      dmfOpenPart: true,
      dmfClosePart: isWinner,
      isoCertified: true,
      halalCertified: true,
      smfAvailable: true,
      transportationDeclared: true,
      stabilityDataAvailable: true,
      tseBseDeclared: true,
      nitrosamineResidualSolventsDeclared: true,
      docsScore: isWinner ? 5 : (qIdx === 1 ? 5 : 4),
      auditStatus,
      auditConductionDate: '2025-11-20',
      auditNextDueDate: '2027-11-20',
      auditedBy: auditStatus === 'APPROVED' ? 'ATCO QA TEAM' : 'DESK ASSESSMENT',
      auditScoreRating: auditStatus === 'APPROVED' ? 'A (HIGH COMPLIANCE)' : 'B (ACCEPTABLE WITH MINOR CAPA)',
      auditRemarks: auditStatus === 'APPROVED' ? 'On-site audit completed with zero critical findings.' : 'Desk audit verified based on technical pack.',
      sample1stLotAck: `Acknowledged (${item.sampleInit} FOC)`,
      sample2ndLotAck: `Acknowledged (${item.sampleTrial})`,
      sampleFocRemarks: 'Free of charge working standard and testing sample ready for shipment.',
      emailBodySnippet: `Quoting ${item.name} from ${mfgName} @ USD ${quotedRateUSD.toFixed(2)}/${item.uom} CFR Karachi. 100% LC at 90 Days. Tech pack and stability data attached.`,
      attachmentFileNames: [
        `${mfgName.replace(/[^a-zA-Z0-9]/g, '_')}_Commercial_Quote.xlsx`,
        `${item.name.replace(/[^a-zA-Z0-9]/g, '_')}_COA.pdf`,
        `WHO_GMP_Certificate.pdf`,
        `Stability_Zone_IVb_36M.pdf`,
      ],
      isLowestQuote: isLowest,
      isBestEvaluatedOffer: isWinner,
      evaluationNotes: isWinner ? 'Recommended L1 winner: best rate and complete dossier.' : 'Secondary backup vendor on AVL.',
    });
  }
});
