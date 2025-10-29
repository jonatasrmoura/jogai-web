export function formatBRL(value: number) {
  // Formatar para Real Brasileiro (BRL)
  const valueBRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return valueBRL;
}
