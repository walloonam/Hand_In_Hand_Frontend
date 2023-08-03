const findIDRadio = document.getElementById("findID_radio");
const findPWRadio = document.getElementById("findPW_radio");
const findIDContent = document.querySelector(".wrap_findID_content");
const findPWContent = document.querySelector(".wrap_findPW_content");

findPWRadio.addEventListener("click", function () {
  findIDRadio.checked = false;
  findIDContent.style.display = "none";
  findPWContent.style.display = "block";
  findPWRadio.classList.add("active");
  findIDRadio.classList.remove("active");
});

findIDRadio.addEventListener("click", function () {
  findPWRadio.checked = false;
  findIDContent.style.display = "block";
  findPWContent.style.display = "none";
  findIDRadio.classList.add("active");
  findPWRadio.classList.remove("active");
});
