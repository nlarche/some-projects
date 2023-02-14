import { createDeck, Deck } from './pocker';

describe('poker', () => {
  it('should create randomized deck', () => {
    const deck: Deck = createDeck();
    const deck1: Deck = createDeck();
    expect(deck.cards).toHaveLength(52);
    expect(deck1.cards).toHaveLength(52);

    expect(deck1.cards).not.toEqual(deck.cards);
  });

  it('should deal for player', () => {
    const deck: Deck = createDeck();
    expect(deck.deal(3)).toHaveLength(3);
    expect(deck.cards).toHaveLength(49);
  });

  it('should get the flop', () => {
    const deck: Deck = createDeck();
    expect(deck.flop()).toHaveLength(5);
  });
});
