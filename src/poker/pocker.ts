const types = ['♠︎', '♣︎', '♡', '♢'] as const;
const heads = ['J', 'D', 'K'] as const;

function generateHeadCards(type: string) {
  return heads.map((h) => h + type);
}
function generateNumericCards(type: string) {
  const cards = [];
  for (let i = 1; i <= 10; i++) {
    cards.push(i + type);
  }
  return cards;
}

export class Deck {
  cards: string[] = [];
  constructor(cards: string[]) {
    this.cards = cards;
  }
  deal(count: number) {
    return this.cards.splice(0, count);
  }
  flop() {
    this.deal(1);
    const first = this.deal(3);
    this.deal(1);
    const second = this.deal(1);
    this.deal(1);
    const third = this.deal(1);
    return [...first, ...second, ...third];
  }
}

function randomize(a: string, b: string): number {
  return 0.5 - Math.random();
}

export function createDeck() {
  const deck = types.reduce((acc: string[], currentType: string) => {
    const numericCards = generateNumericCards(currentType);
    const headCards = generateHeadCards(currentType);
    return [...acc, ...numericCards, ...headCards];
  }, []);
  return new Deck(deck.sort(randomize));
}
