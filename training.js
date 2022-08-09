const cards = document.querySelectorAll(".parallax-cards-item");

class Card {
  constructor(object) {
    this.item = object.item;
    this.image = object.image;
    this.imageBack = object.imageBack;
    this.title = object.title;
    this.titleBack = object.titleBack;
    this.cardBack = object.cardBack;
  }

  transformPanel(e) {
    let mouseX, mouseY;
    mouseX = e.layerX;
    mouseY = e.layerY;

    const centerX = this.clientWidth / 2;
    const centerY = this.clientHeight / 2;
    const percentX = ((mouseX - centerX) * 5) / (this.clientWidth / 8);
    const percentY = -(((mouseY - centerY) * 5) / (this.clientHeight / 8));

    if (this.classList.contains("parallax-cards-item-rotate")) {
      this.childNodes[3].childNodes[1].style.transform = `perspective(800px) translateY(${percentX}px) translateX(${percentY}px) rotateX(180deg)`;

      this.style.transform = `perspective(800px) rotateY(
        ${percentX}deg) rotateX(
        ${percentY + 180}deg)`;
    } else {
      this.childNodes[1].childNodes[1].style.transform = `perspective(800px) translateY(${percentX}px) translateX(${percentY}px)`;

      this.style.transform = `perspective(800px) rotateY(
          ${percentX}deg) rotateX(
          ${percentY}deg`;
    }
  }

  flipCard() {
    const timeout = 160;
    setTimeout(() => {
      this.cardBack.classList.toggle("parallax-cards-item-card-back");
      this.titleBack.classList.toggle("parallax-cards-item-title-back");
    }, timeout);
    this.item.classList.toggle("parallax-cards-item-rotate");

    if (this.item.classList.contains("parallax-cards-item-rotate")) {
      setTimeout(() => {
        this.title.style.opacity = "0";
        this.titleBack.style = "transform : rotateX(180deg); top : 45px";
      }, timeout);

      setTimeout(() => {
        this.item.style = "pointer-events: auto; transition: transform 0s;";
      }, 500);

      this.item.style =
        "transform: rotateX(180deg); transition: transform 0.5s; pointer-events: none";
    } else {
      setTimeout(() => {
        this.title.style.opacity = "1";
        this.titleBack.style = "transform: rotateX(180deg); top: 45px";
      }, timeout);

      setTimeout(() => {
        this.item.style = "pointer-events: auto; transition: transform 0s";
      }, 500);

      this.item.style =
        "transform: rotateX(0deg); transition: transform 0.5s; pointer-events: none";
    }
  }

  handleMouseLeave() {
    setTimeout(() => {
      this.item.style =
        "transition: transform 0.3s; transform: translate(0px,0px)";
    }, 1500);

    setTimeout(() => {
      this.item.style.transition = "transform 0s";
    }, 1600);

    this.item.style.transition = "transform 0s";
  }
}

cards.forEach((el) => {
  const card = new Card({
    item: el,
    image: el.querySelector(".parallax-cards-item-image"),
    imageBack: el.querySelector(".parallax-cards-item-image-back"),
    title: el.querySelector(".parallax-cards-item-title"),
    titleBack: el.querySelector(".parallax-cards-item-title-back"),
    cardBack: el.querySelector(".parallax-cards-item-card-back"),
  });

  el.onclick = () => card.flipCard();
  el.onmousemove = card.transformPanel;
  el.onmouseleave = card.handleMouseLeave;
});
