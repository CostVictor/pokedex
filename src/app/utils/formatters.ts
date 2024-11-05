/**
 * Deixa o número no formato `#000`.
 * @param posNumber - Valor a ser formatado.
 * @returns - Valor formatado.
 */
export const positionFormatter = (posNumber: number) => {
  return `#${posNumber.toString().padStart(3, "0")}`
}
