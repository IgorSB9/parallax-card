const cards = document.querySelectorAll(".parallax-cards-item");

cards.forEach((el) => {
  const image = el.querySelector(".parallax-cards-item-image");
  const imageBack = el.querySelector(".parallax-cards-item-image-back");

  const title = el.querySelector(".parallax-cards-item-title");
  const titleBack = el.querySelector(".parallax-cards-item-title-back");

  const cardBack = el.querySelector(".parallax-cards-item-card-back");

  el.onmousemove = transformPanel;
  el.onmouseleave = handleMouseLeave;

  let mouseX, mouseY;

  const timeout = 160;

  function transformPanel(mouseEvent) {
    mouseX = mouseEvent.layerX;
    mouseY = mouseEvent.layerY;

    const centerX = el.clientWidth / 2;
    const centerY = el.clientHeight / 2;
    const percentX = ((mouseX - centerX) * 5) / (el.clientWidth / 8);
    const percentY = -(((mouseY - centerY) * 5) / (el.clientHeight / 8));

    if (el.classList.contains("parallax-cards-item-rotate")) {
      imageBack.style.transform =
        "perspective(800px) rotateY(" +
        percentX +
        "deg) rotateX(" +
        (percentY + 180) +
        "deg)";

      el.style.transform =
        "perspective(800px) rotateY(" +
        percentX +
        "deg) rotateX(" +
        (percentY + 180) +
        "deg)";
    } else {
      image.style.transform =
        "perspective(800px) rotateY(" +
        percentX +
        "deg) rotateX(" +
        percentY +
        "deg)";

      el.style.transform =
        "perspective(800px) rotateY(" +
        percentX +
        "deg) rotateX(" +
        percentY +
        "deg)";
    }
  }

  function flipCard() {
    setTimeout(() => {
      cardBack.classList.toggle("parallax-cards-item-card-back");
      titleBack.classList.toggle("parallax-cards-item-title-back");
    }, timeout);
    el.classList.toggle("parallax-cards-item-rotate");

    if (el.classList.contains("parallax-cards-item-rotate")) {
      setTimeout(() => {
        title.style.opacity = "0";
        titleBack.style.transform = "rotateX(180deg)";
        titleBack.style.top = "45px";
      }, timeout);

      setTimeout(() => {
        el.style.pointerEvents = "auto";
        el.style.transition = "transform 0s";
      }, 500);

      el.style.transform = "rotateX(180deg)";
      el.style.transition = "transform 0.5s";
      el.style.pointerEvents = "none";
    } else {
      setTimeout(() => {
        title.style.opacity = "1";
        titleBack.style.transform = "rotateX(180deg)";
        titleBack.style.top = "45px";
      }, timeout);

      setTimeout(() => {
        el.style.pointerEvents = "auto";
        el.style.transition = "transform 0s";
      }, 500);

      el.style.transform = "rotateX(0deg)";
      el.style.transition = "transform 0.5s";
      el.style.pointerEvents = "none";
    }
  }

  el.onclick = () => flipCard();

  function handleMouseLeave() {
    setTimeout(() => {
      el.style.transition = "transform 0.3s";
      el.style.transform = "translate(0px,0px)";
    }, 1500);

    setTimeout(() => {
      el.style.transition = "transform 0s";
    }, 1600);

    el.style.transition = "transform 0s";
  }
});
