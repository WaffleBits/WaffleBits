const printButton = document.querySelector(".print-button");

if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 2
      }
    });
  }
});
