export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    // Gera um índice aleatório entre 0 e i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    // Troca os elementos nas posições i e j
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}