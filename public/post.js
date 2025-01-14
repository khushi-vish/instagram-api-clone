const heart = document.querySelector(".heart");
const bookmark = document.querySelector(".bookmark");

heart.addEventListener("click", () => {
  if (heart.style.color === "red") {
    heart.style.color = "black";
  } else {
    heart.style.color = "red";
  }

  if (heart.classList.contains("fa-regular")) {
    heart.classList.remove("fa-regular");
    heart.classList.add("fa-solid");
  } else {
    heart.classList.remove("fa-solid");
    heart.classList.add("fa-regular");
  }
});

bookmark.addEventListener("click", () => {
  if (bookmark.classList.contains("fa-regular")) {
    bookmark.classList.remove("fa-regular");
    bookmark.classList.add("fa-solid");
  } else {
    bookmark.classList.remove("fa-solid");
    bookmark.classList.add("fa-regular");
  }
});
