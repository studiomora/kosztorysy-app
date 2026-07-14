import type { NewPriceItem } from "./schema";

// Стартова база цін, зібрана з попередніх кошторисів Brodacze z Lasu (06.2024–07.2026).
// category: 'robocizna' (робота) | 'materialy' (матеріали)
// currency: 'PLN' (Краків) | 'EUR' (Іспанія, Torrevieja/Alicante)
// priceMax заповнений лише там, де в оригінальних кошторисах була вилка цін (min-max).

type SeedItem = Omit<NewPriceItem, "id" | "createdAt" | "updatedAt">;

const pln = (
  category: "robocizna" | "materialy",
  name: string,
  unit: string,
  priceMin: number,
  priceMax: number | null,
  sourceNote: string
): SeedItem => ({
  category,
  currency: "PLN",
  name,
  unit,
  priceMin: priceMin.toFixed(2),
  priceMax: priceMax !== null ? priceMax.toFixed(2) : null,
  sourceNote,
});

const eur = (
  category: "robocizna" | "materialy",
  name: string,
  unit: string,
  priceMin: number,
  priceMax: number | null,
  sourceNote: string
): SeedItem => ({
  category,
  currency: "EUR",
  name,
  unit,
  priceMin: priceMin.toFixed(2),
  priceMax: priceMax !== null ? priceMax.toFixed(2) : null,
  sourceNote,
});

export const seedItems: SeedItem[] = [
  // ---- ROBOCIZNA PLN: ściany, sufity, gładzie, malowanie ----
  pln("robocizna", "Szpachlowanie ścian (2 warstwy)", "m²", 75, null, "Gajdur/Michał K., 01.02.2026"),
  pln("robocizna", "Szpachlowanie sufitu (2 warstwy)", "m²", 80, null, "01.02.2026"),
  pln("robocizna", "Gruntowanie", "m²", 18, null, "01.02.2026"),
  pln("robocizna", "Malowanie ścian (grunt + 2 warstwy farby)", "m²", 25, null, "01.02.2026"),
  pln("robocizna", "Malowanie sufitu (grunt + 2 warstwy)", "m²", 35, null, "01.02.2026"),
  pln("robocizna", "Akrylowanie ścian oraz sufitu", "mb", 7, null, "01.02.2026"),
  pln("robocizna", "Gładź polimerowa maszynowa (na gotowo)", "m²", 25, null, "Kosztorys kompleksowy, 06.2026"),
  pln("robocizna", "Gruntowanie + siatka anty-spękaniowa", "m²", 15, null, "Kosztorys kompleksowy, 06.2026"),
  pln("robocizna", "Gładź gipsowa (2 warstwy) — klatka schodowa", "m²", 85, null, "27.05.2026"),
  pln("robocizna", "Gładź gipsowa (2 warstwy) — poddasze", "m²", 70, null, "27.05.2026"),
  pln("robocizna", "Szlifowanie mechaniczne bezpyłowe — klatka schodowa", "m²", 50, null, "27.05.2026"),
  pln("robocizna", "Szlifowanie mechaniczne bezpyłowe — poddasze", "m²", 25, null, "27.05.2026"),
  pln("robocizna", "Przygotowanie (grunt + szpachlowanie łączeń) — poddasze", "m²", 35, null, "27.05.2026"),
  pln("robocizna", "Przygotowanie — klatka schodowa", "m²", 45, null, "27.05.2026"),
  pln("robocizna", "Malowanie — klatka schodowa", "m²", 55, null, "27.05.2026"),
  pln("robocizna", "Malowanie — poddasze", "m²", 30, null, "27.05.2026"),
  pln("robocizna", "Zabezpieczenie folią i taśmą (okna, podłogi, meble)", "ryczałt", 1000, null, "27.05.2026"),
  pln("robocizna", "Naprawa ubytków", "ryczałt", 1200, null, "27.05.2026"),
  pln("robocizna", "Transport i sprzątanie", "ryczałt", 1200, null, "01.02.2026"),

  // ---- ROBOCIZNA PLN: łazienka ----
  pln("robocizna", "Hydroizolacja", "m²", 60, null, "stałe we wszystkich kosztorysach"),
  pln("robocizna", "Hydroizolacja (system kompleksowy)", "m²", 45, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Kafle podłogowe (gres)", "m²", 190, null, "01.02.2026"),
  pln("robocizna", "Płytki ścienne ryflowane", "m²", 155, null, "stałe"),
  pln("robocizna", "Otwory w płytkach", "szt", 45, null, "stałe"),
  pln("robocizna", "Szlifowanie gresu pod kątem 45°", "mb", 20, null, "01.02.2026"),
  pln("robocizna", "Montaż ścianki g-k", "m²", 120, null, "10.2025"),
  pln("robocizna", "Montaż wanny", "szt", 700, null, "stałe"),
  pln("robocizna", "Montaż stelaża Geberit / WC podtynkowy", "szt", 550, null, "stałe"),
  pln("robocizna", "Podwieszany sufit", "m²", 178, null, "stałe"),
  pln("robocizna", "Armatura (umywalka, WC, bateria, prysznic) — montaż", "kpl", 900, null, "01.02.2026"),
  pln("robocizna", "Wykonanie punktu oświetleniowego (sufit podwieszany)", "szt", 55, null, "10.2025"),
  pln("robocizna", "Montaż punktu oświetleniowego", "szt", 80, null, "01.02.2026"),
  pln("robocizna", "Standardowe silikonowanie", "mb", 50, null, "01.02.2026"),
  pln("robocizna", "Montaż pralki", "szt", 250, null, "10.2025"),
  pln("robocizna", "Szlifowanie posadzki", "m²", 130, null, "10.2025"),
  pln("robocizna", "System mikrocementu — pełne wykonanie (podkłady, 2-3 warstwy, szlifowanie, lakier PU)", "m²", 250, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Biały montaż armatury podtynkowej / ceramiki / deszczownicy / odpływu", "ryczałt", 2500, null, "Kosztorys kompleksowy 06.2026"),

  // ---- ROBOCIZNA PLN: podłogi, drzwi ----
  pln("robocizna", "Ułożenie paneli / winylowych", "m²", 95, null, "01.02.2026"),
  pln("robocizna", "Listwy przypodłogowe", "mb", 18, null, "stałe"),
  pln("robocizna", "Montaż drzwi wewnętrznych (standard)", "szt", 350, null, "Kosztorys kompl. 06.2026"),
  pln("robocizna", "Osadzenie drzwi wejściowych wzmocnionych", "szt", 800, null, "Kosztorys kompl. 06.2026"),
  pln("robocizna", "Montaż okna 1-2 skrzydłowego + obróbka glifów", "szt", 750, null, "Kosztorys kompl. 06.2026"),
  pln("robocizna", "Płytki kuchnia (fartuch)", "mb", 200, null, "01.02.2026"),

  // ---- ROBOCIZNA PLN: prace przygotowawcze / demontaże / logistyka ----
  pln("robocizna", "Demontaż starego parkietu + zabezpieczenie deszczułek", "ryczałt", 6000, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Skuwanie starych tynków (odsłonięcie cegły)", "m²", 60, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Wywóz gruzu / logistyka / wnoszenie materiałów", "ryczałt", 6500, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Wyburzanie starych ścian działowych (karatówka)", "m²", 50, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Demontaż ościeżnic drzwiowych", "szt", 100, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Demontaż starego sufitu", "m²", 60, null, "Kosztorys kompleksowy 06.2026"),

  // ---- ROBOCIZNA PLN: ściany g-k, elektryka, hydraulika ----
  pln("robocizna", "Montaż ścian działowych g-k (konstrukcja + 2x płyta)", "m²", 50, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Wełna mineralna (montaż w ścianie)", "m²", 20, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Spoinowanie płyt g-k + taśmy + akryl", "m²", 18, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Punkty elektryczne (z bruzdowaniem, trasy)", "pkt", 125, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Montaż i uzbrojenie rozdzielnicy mieszkaniowej", "kpl", 800, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Przeniesienie / doprowadzenie instalacji wod-kan", "pkt", 700, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Stelaż WC podtynkowy + przygotowanie odpływu liniowego", "szt", 700, null, "Kosztorys kompleksowy 06.2026"),

  // ---- ROBOCIZNA PLN: cegła / loft ----
  pln("robocizna", "Piaskowanie / hydropiaskowanie lica cegły", "m²", 130, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Czyszczenie ręczne + uzupełnianie ubytków cegły", "m²", 45, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Fugowanie ścian z cegły", "m²", 50, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Impregnacja hydrofobowa cegły (2x)", "m²", 10, null, "Kosztorys kompleksowy 06.2026"),

  // ---- ROBOCIZNA PLN: podłogi drewniane / OSB ----
  pln("robocizna", "Poziomowanie legarów + montaż płyt OSB", "m²", 30, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Układanie parkietu dębowego w jodełkę (klej elastyczny)", "m²", 250, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Cyklinowanie + szpachlowanie + 3x lakier/olej", "m²", 45, null, "Kosztorys kompleksowy 06.2026"),

  // ---- ROBOCIZNA PLN: meble na wymiar / AGD montaż ----
  pln("robocizna", "Montaż AGD w zabudowie (płyta, piekarnik, zmywarka, lodówka, okap, pralka)", "ryczałt", 2500, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Montaż zabudowy kuchennej na wymiar", "mb", 1000, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Montaż blatu kuchennego (z wycięciem otworów)", "mb", 250, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Montaż i poziomowanie szafy / garderoby na wymiar", "szt", 2500, null, "Kosztorys kompleksowy 06.2026"),

  // ---- ROBOCIZNA PLN: sufity podwieszane, klimatyzacja, projekt ----
  pln("robocizna", "Sufit podwieszany (konstrukcja stalowa + płytowanie g-k)", "m²", 65, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Montaż klimatyzacji Split/Multi-Split (2 pomieszczenia)", "kpl", 4500, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Montaż rekuperacji ściennej / wewnątrz-lokalowej", "kpl", 5000, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Projekt wykonawczy wnętrza (kompleksowy)", "m²", 200, null, "Kosztorys kompleksowy 06.2026"),
  pln("robocizna", "Wizualizacje fotorealistyczne 3D", "pomieszczenie", 2500, null, "Kosztorys kompleksowy 06.2026"),

  // ---- ROBOCIZNA PLN: schody i taras ----
  pln("robocizna", "Schody na belce stalowej, stopnie bukowe — kompleksowo", "kpl", 18000, null, "27.05.2026"),
  pln("robocizna", "Poręcz na schodach", "kpl", 7000, 7500, "27.05.2026"),
  pln("robocizna", "Mikrocement na schodach", "kpl", 17500, null, "27.05.2026"),
  pln("robocizna", "Robocizna budowy tarasu (kompleksowo)", "ryczałt", 17330, null, "16.03.2026"),

  // ---- MATERIAŁY PLN: ogólnobudowlane (widełki min-max) ----
  pln("materialy", "Profile metalowe + płyty g-k (Regips)", "m²", 40, 70, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Wełna mineralna / skalna", "m²", 15, 30, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Taśmy flizelinowe, gipsy szpachlowe, akryle", "mb", 6, 12, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Zaprawa trasowa do fug + impregnat hydrofobowy (cegła)", "m²", 50, 90, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Okablowanie + rozdzielnica z RCD", "kpl", 2500, 3000, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Rury wod-kan PP/Alupex + stelaż WC", "kpl", 1300, 2500, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Tynki wyrównawcze + siatki + grunty + gładzie", "m²", 28, 41.25, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Farby lateksowe zmywalne", "m²", 8.5, 13.25, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Płyty OSB + legary + klej poliuretanowy", "m²", 35, 55, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Klej 2K elastyczny do parkietu", "m²", 40, 60, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Lakier podkładowy + szpachle + lakier/olej do parkietu", "m²", 25, 40, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Hydroizolacja + system mikrocementu (komplet, łazienka)", "m²", 125, 215, "Kosztorys kompleksowy 06.2026"),

  // ---- MATERIAŁY PLN: stolarka drzwiowa i sanitarna ----
  pln("materialy", "Drzwi wewnętrzne z ościeżnicami regulowanymi", "szt", 750, 1400, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Drzwi wejściowe wzmocnione akustycznie", "szt", 1500, 2300, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Armatura łazienkowa (WC wisząca, odpływ liniowy, baterie, ceramika)", "kpl", 700, 1200, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Okno 2-skrzydłowe", "szt", 2000, 2500, "Kosztorys kompleksowy 06.2026"),

  // ---- MATERIAŁY PLN: AGD ----
  pln("materialy", "Płyta indukcyjna 60 cm", "szt", 1050, 2200, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Piekarnik elektryczny do zabudowy", "szt", 1300, 2800, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Zmywarka pełna zabudowa 60 cm", "szt", 1450, 3000, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Lodówka do zabudowy (No Frost)", "szt", 2200, 4500, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Okap podszafkowy / do zabudowy", "szt", 400, 1500, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Pralka automatyczna / pralko-suszarka", "szt", 1600, 3500, "Kosztorys kompleksowy 06.2026"),

  // ---- MATERIAŁY PLN: meble na wymiar ----
  pln("materialy", "Zabudowa kuchenna na wymiar (fronty MDF, systemy Blum)", "mb", 2450, 3850, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Blat kuchenny (laminat premium → lity dąb/konglomerat)", "mb", 300, 1500, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Szafa przedpokojowa / garderoba na wymiar", "szt", 2800, 5250, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Zabudowa meblowa łazienki na wymiar", "kpl", 1750, 3150, "Kosztorys kompleksowy 06.2026"),

  // ---- MATERIAŁY PLN: wyposażenie ruchome ----
  pln("materialy", "Zlewozmywak granitowy / stalowy", "szt", 450, 1200, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Bateria kuchenna stojąca", "szt", 300, 950, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Stół jadalniany (lite drewno)", "szt", 1200, 3500, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Krzesła tapicerowane / loftowe", "szt", 250, 600, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Oświetlenie dedykowane (LED, szyny, lampy wiszące)", "kpl", 600, 1800, "Kosztorys kompleksowy 06.2026"),

  // ---- MATERIAŁY PLN: klimatyzacja / rekuperacja ----
  pln("materialy", "Klimatyzacja Multi-Split (2 pokoje)", "szt", 6000, 10000, "Kosztorys kompleksowy 06.2026"),
  pln("materialy", "Rekuperacja wewnątrz-lokalowa", "szt", 7500, 13000, "Kosztorys kompleksowy 06.2026"),

  // ---- MATERIAŁY PLN: system mikrocementu Fest (ceny netto, faktury proforma 13.07.2026) ----
  pln("materialy", "FESTPRIMER 0,5 kg (podkład pod lakier)", "szt", 41.46, null, "Faktura proforma 103/7/2026, Grupa Fest"),
  pln("materialy", "FESTPRIMER 1 kg", "szt", 67.72, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "PU FEST TURBO 0,6 kg (lakier mat)", "szt", 76.02, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "PU FEST TURBO 1,2 kg", "szt", 124.39, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "PU FEST 2K CARBON 5,4 kg (lakier podwyższona odporność)", "szt", 587.40, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "PU FEST 2K CARBON 1080 g", "szt", 124.39, null, "Faktura proforma 104/7/2026"),
  pln("materialy", "FEST KONTAKT 20 kg (mostek sczepny)", "szt", 193.50, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "HYDROFEST 5 kg (mikrocement odporny na wodę)", "szt", 165.85, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "HYDROFEST 20 kg", "szt", 594.31, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "Siatka z włókna szklanego Super thin", "szt", 6.56, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "FEST Liquid Life 3 kg", "szt", 44.92, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "FESTGRUNT 5 kg", "szt", 34.55, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "FESTGRUNT 1 kg", "szt", 10.37, null, "Faktura proforma 104/7/2026"),
  pln("materialy", "FEST TIMER 1 kg (opóźniacz do mikrocementu)", "szt", 31.71, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "FESTFLOOR TITAN 5 kg + 0,8 kg (twardy mikrocement)", "szt", 227.64, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "TITAN BASE 16 kg + 1,6 kg (podkład pod mikrocement)", "szt", 739.84, null, "Faktura proforma 103/7/2026"),
  pln("materialy", "FESTFLOOR GO! 10 kg (mikrocement)", "szt", 214.23, null, "Faktura proforma 104/7/2026"),
  pln("materialy", "FESTFLOOR GO! 20 kg", "szt", 414.63, null, "Faktura proforma 104/7/2026"),
  pln("materialy", "Przesyłka (kurier, Grupa Fest)", "ryczałt", 154.47, null, "Faktura proforma 103/7/2026"),

  // ---- MATERIAŁY PLN: taras kompozytowy (16.03.2026) ----
  pln("materialy", "Fundamenty + konstrukcja nośna tarasu (beton, zbrojenie, geowłóknina, żwir)", "kpl", 7900, null, "16.03.2026"),
  pln("materialy", "Deska tarasowa kompozyt Woody (+ legary, mocowania)", "kpl", 12800, null, "16.03.2026"),
  pln("materialy", "Deska tarasowa profilowana thermososna", "kpl", 11050, null, "16.03.2026"),
  pln("materialy", "Deska tarasowa z drewna egzotycznego Garapa", "kpl", 16900, null, "16.03.2026"),
  pln("materialy", "Deska tarasowa z drewna iglastego (modrzew europejski)", "kpl", 9500, null, "16.03.2026"),

  // ============ EUR — Hiszpania (Torrevieja/Alicante), VAT 21% ============

  // ---- ROBOCIZNA EUR: remont mieszkania (Vivienda Calle Estocolmo) ----
  eur("robocizna", "Demontaż wanny", "szt", 180, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Demontaż instalacji wod-kan", "m.b.", 45, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Demontaż ścian kuchennych", "m²", 50, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Demontaż płytek (łazienka/kuchnia/ściany)", "m²", 15, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Demontaż wykładziny podłogowej", "m²", 12, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Demontaż + wynoszenie zestawu kuchennego", "ryczałt", 200, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Wynoszenie i utylizacja mebli", "ryczałt", 150, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Hydroizolacja podłogi (z materiałem)", "m²", 40, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Wyrównanie podłogi pod panele winylowe", "m²", 16, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Układanie płytek wielkoformatowych", "m²", 65, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Układanie paneli winylowych", "m²", 45, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Otwory w płytce", "szt", 20, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Malowanie ścian (2 warstwy)", "m²", 12, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Malowanie sufitu (2 warstwy)", "m²", 15, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Malowanie drzwi (z materiałem)", "szt", 160, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Instalacja toalety (montaż + podłączenie)", "szt", 150, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Montaż umywalki (+ syfon + bateria)", "szt", 90, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Montaż baterii prysznicowej", "szt", 60, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Montaż brodzika", "szt", 100, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Usuwanie przegrody szklanej (prysznic)", "szt", 150, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Wymiana gniazdek / włączników", "szt", 15, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Wymiana klamek", "szt", 20, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Podłączenie pralki", "szt", 90, null, "Vivienda Calle Estocolmo"),
  eur("robocizna", "Instalacja i podłączenie bojlera", "szt", 250, null, "Vivienda Calle Estocolmo"),

  // ---- MATERIAŁY EUR: Vivienda Calle Estocolmo ----
  eur("materialy", "Farba do ścian 9 l", "szt", 90, null, "Vivienda Calle Estocolmo"),
  eur("materialy", "Klej do płytek", "szt", 12, null, "Vivienda Calle Estocolmo"),
  eur("materialy", "Brodzik", "szt", 110, null, "Vivienda Calle Estocolmo"),

  // ---- ROBOCIZNA EUR: dom wielopiętrowy Torrevieja (etapy, 06.2024) ----
  eur("robocizna", "Szpachlowanie ścian + sufitu (parter, ryczałt)", "ryczałt", 1050, null, "Torrevieja, etap 2, 06.2024"),
  eur("robocizna", "Naprawa łazienki (1 piętro)", "ryczałt", 450, null, "Torrevieja, etap 2, 06.2024"),
  eur("robocizna", "Naprawa łazienki (parter)", "ryczałt", 950, null, "Torrevieja, etap 2, 06.2024"),
  eur("robocizna", "Montaż suchej zabudowy w korytarzu", "ryczałt", 450, null, "Torrevieja, etap 2, 06.2024"),
  eur("robocizna", "Dokończenie poddasza", "ryczałt", 470, null, "Torrevieja, etap 2, 06.2024"),
  eur("robocizna", "Montaż schodów", "ryczałt", 350, null, "Torrevieja, etap 2, 06.2024"),
  eur("robocizna", "Wykonanie wentylacji", "ryczałt", 620, null, "Torrevieja, etap 2, 06.2024"),
  eur("robocizna", "Przygotowanie pod kominek", "ryczałt", 450, null, "Torrevieja, etap 2, 06.2024"),
  eur("robocizna", "Ułożenie płytek na podłogę (parter, ryczałt)", "ryczałt", 3500, null, "Torrevieja, etap 3, 06.2024"),
  eur("robocizna", "Ułożenie płytek na podłogę (1 piętro, ryczałt)", "ryczałt", 4500, null, "Torrevieja, etap 3, 06.2024"),
  eur("robocizna", "Ułożenie płytek na schody (13 st. + 14 podstopni + podest + barierka)", "ryczałt", 2200, null, "Torrevieja, etap 3, 06.2024"),
  eur("robocizna", "Ułożenie płytek na tarasie", "szt", 2500, null, "Torrevieja, etap 3, 06.2024"),
  eur("robocizna", "Obróbka elewacji budynku", "ryczałt", 1300, null, "Torrevieja, etap 4, 06.2024"),
  eur("robocizna", "Obróbka elewacji tarasów", "ryczałt", 900, null, "Torrevieja, etap 4, 06.2024"),
  eur("robocizna", "Malowanie elewacji + tarasów", "ryczałt", 1200, null, "Torrevieja, etap 4, 06.2024"),
  eur("robocizna", "Montaż parapetów", "ryczałt", 300, null, "Torrevieja, etap 4, 06.2024"),
  eur("robocizna", "Montaż drzwi pokojowych (5 szt., ryczałt)", "ryczałt", 500, null, "Torrevieja, etap 5, 06.2024"),
  eur("robocizna", "Malowanie całego mieszkania", "ryczałt", 2500, null, "Torrevieja, etap 5, 06.2024"),
  eur("robocizna", "Biały montaż (za piętro)", "piętro", 350, null, "Torrevieja, etap 5, 06.2024"),
  eur("robocizna", "Klejenie tapety", "ryczałt", 250, null, "Torrevieja, etap 6, 06.2024"),
  eur("robocizna", "Montaż kuchni", "ryczałt", 1000, null, "Torrevieja, etap 6, 06.2024"),
  eur("robocizna", "Montaż AGD", "ryczałt", 300, null, "Torrevieja, etap 6, 06.2024"),
  eur("robocizna", "Montaż RTV", "ryczałt", 200, null, "Torrevieja, etap 6, 06.2024"),
  eur("robocizna", "Montaż mebli", "ryczałt", 450, null, "Torrevieja, etap 6, 06.2024"),
  eur("robocizna", "Montaż kominka", "ryczałt", 450, null, "Torrevieja, etap 6, 06.2024"),
  eur("robocizna", "Ogrzewanie podłogowe — rozkładanie kabla", "ryczałt", 650, 750, "Torrevieja, 06.2024"),
  eur("robocizna", "Ogrzewanie podłogowe — klejenie maty kompensacyjnej", "ryczałt", 180, null, "Torrevieja, 06.2024"),
  eur("robocizna", "Ogrzewanie podłogowe — montaż termostatów", "ryczałt", 400, 500, "Torrevieja, 06.2024"),

  // ---- MATERIAŁY EUR: ogrzewanie podłogowe ----
  eur("materialy", "Mata kompensacyjna z miejscem pod ogrzewanie podłogowe", "kpl", 2400, 2560, "Torrevieja, 06.2024"),
  eur("materialy", "Kabel / mata grzewcza (ogrzewanie podłogowe)", "kpl", 700, null, "Torrevieja, 06.2024"),
];
