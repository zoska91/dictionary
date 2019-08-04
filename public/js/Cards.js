class Card {
  constructor(closeCard, openCard) {
    this.closeCard = closeCard;
    this.openCard = openCard;
    this.toggleCard = this.toggleCard;
  }

  toggleCard() {
    this.closeCard.style.opacity = '0';
    setTimeout(() => {
      this.closeCard.style.display = 'none';
      this.openCard.style.display = 'block';
      this.openCard.style.opacity = 1;
    }, 200);
  }
}
