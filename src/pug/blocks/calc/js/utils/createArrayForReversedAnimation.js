export function createArrayForReversedAnimation(elems, pos) {
  return Array.from(elems).splice(pos).reverse();
} 