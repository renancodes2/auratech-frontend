export const formatPrice = (value: number | string): string => {
  const amount = typeof value === "string" ? parseFloat(value) : value

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount)
}