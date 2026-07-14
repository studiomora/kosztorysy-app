import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import type { Estimate, EstimateItem } from "@/db/schema";

// Дані фірми — постав свої актуальні реквізити тут.
export const COMPANY = {
  name: "Brodacze z Lasu Maksym Zakharov",
  addressLine: "ul. Reduta 46/41",
  cityLine: "31-421 Kraków",
  nip: "9452246371",
  regon: "389539536",
  phone: "+48 572 487 476",
  // Постав файл public/logo.png (наприклад 300x300), щоб він з'явився в шапці PDF.
  logoPath: undefined as string | undefined,
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  companyBlock: {
    fontSize: 8,
    lineHeight: 1.4,
  },
  companyName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  metaBlock: {
    fontSize: 8,
    textAlign: "right",
  },
  clientBlock: {
    marginBottom: 16,
    fontSize: 9,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginTop: 14,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  table: {
    display: "flex",
    width: "100%",
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f0",
    borderBottomWidth: 1,
    borderBottomColor: "#d0d0d0",
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f0",
    fontFamily: "Helvetica-Bold",
  },
  cell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#e5e5e5",
  },
  cellName: { width: "40%" },
  cellUnit: { width: "10%" },
  cellQty: { width: "12%", textAlign: "right" },
  cellPrice: { width: "14%", textAlign: "right" },
  cellSum: { width: "14%", textAlign: "right" },
  headerCellText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },
  summaryBox: {
    marginTop: 16,
    alignSelf: "flex-end",
    width: 220,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  summaryTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    marginTop: 2,
    borderTopWidth: 1.5,
    borderTopColor: "#1a1a1a",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  notes: {
    marginTop: 24,
    fontSize: 7.5,
    color: "#555555",
    lineHeight: 1.4,
  },
  footer: {
    marginTop: 24,
    fontSize: 8,
  },
});

function money(value: number, currency: string) {
  const formatted = value.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return currency === "PLN" ? `${formatted} zł` : `${formatted} €`;
}

function num(v: string | number) {
  return typeof v === "string" ? parseFloat(v) : v;
}

function ItemsTable({
  items,
  currency,
  title,
}: {
  items: EstimateItem[];
  currency: string;
  title: string;
}) {
  if (items.length === 0) return null;
  const total = items.reduce((sum, i) => sum + num(i.quantity) * num(i.unitPrice), 0);

  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.cell, styles.cellName, styles.headerCellText]}>Nazwa</Text>
          <Text style={[styles.cell, styles.cellUnit, styles.headerCellText]}>Jedn.</Text>
          <Text style={[styles.cell, styles.cellQty, styles.headerCellText]}>Ilość</Text>
          <Text style={[styles.cell, styles.cellPrice, styles.headerCellText]}>Cena jedn.</Text>
          <Text style={[styles.cell, styles.cellSum, styles.headerCellText, { borderRightWidth: 0 }]}>Suma</Text>
        </View>
        {items.map((item) => (
          <View style={styles.tableRow} key={item.id}>
            <Text style={[styles.cell, styles.cellName]}>{item.name}</Text>
            <Text style={[styles.cell, styles.cellUnit]}>{item.unit}</Text>
            <Text style={[styles.cell, styles.cellQty]}>{item.quantity}</Text>
            <Text style={[styles.cell, styles.cellPrice]}>{money(num(item.unitPrice), currency)}</Text>
            <Text style={[styles.cell, styles.cellSum, { borderRightWidth: 0 }]}>
              {money(num(item.quantity) * num(item.unitPrice), currency)}
            </Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={[styles.cell, { width: "76%" }]}>RAZEM — {title}</Text>
          <Text style={[styles.cell, styles.cellSum, { borderRightWidth: 0 }]}>{money(total, currency)}</Text>
        </View>
      </View>
    </View>
  );
}

export function EstimateDocument({
  estimate,
  items,
}: {
  estimate: Estimate;
  items: EstimateItem[];
}) {
  const currency = estimate.currency;
  const roboty = items.filter((i) => i.section === "robocizna");
  const materialy = items.filter((i) => i.section === "materialy");

  const netto = items.reduce((sum, i) => sum + num(i.quantity) * num(i.unitPrice), 0);
  const vatRate = num(estimate.vatRate);
  const vat = netto * (vatRate / 100);
  const brutto = netto + vat;

  return (
    <Document title={`Kosztorys — ${estimate.clientName}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.companyBlock}>
            {COMPANY.logoPath && <Image src={COMPANY.logoPath} style={{ width: 48, height: 48, marginBottom: 6 }} />}
            <Text style={styles.companyName}>{COMPANY.name}</Text>
            <Text>{COMPANY.addressLine}</Text>
            <Text>{COMPANY.cityLine}</Text>
            <Text>NIP: {COMPANY.nip}</Text>
            <Text>REGON: {COMPANY.regon}</Text>
            <Text>tel: {COMPANY.phone}</Text>
          </View>
          <View style={styles.metaBlock}>
            <Text>{estimate.city}, {estimate.date}</Text>
            {estimate.validUntil && <Text>Wycena ważna do {estimate.validUntil}</Text>}
          </View>
        </View>

        <View style={styles.clientBlock}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Klient: {estimate.clientName}</Text>
          {estimate.clientAddress && <Text>{estimate.clientAddress}</Text>}
          {estimate.clientNip && <Text>NIP: {estimate.clientNip}</Text>}
        </View>

        <ItemsTable items={roboty} currency={currency} title="Robocizna" />
        <ItemsTable items={materialy} currency={currency} title="Materiały" />

        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text>Netto</Text>
            <Text>{money(netto, currency)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>VAT ({vatRate}%)</Text>
            <Text>{money(vat, currency)}</Text>
          </View>
          <View style={styles.summaryTotalRow}>
            <Text>RAZEM (brutto)</Text>
            <Text>{money(brutto, currency)}</Text>
          </View>
        </View>

        {estimate.notes && <Text style={styles.notes}>{estimate.notes}</Text>}

        <View style={styles.footer}>
          <Text>Maksym Zakharov</Text>
          <Text>tel: {COMPANY.phone}</Text>
        </View>
      </Page>
    </Document>
  );
}
