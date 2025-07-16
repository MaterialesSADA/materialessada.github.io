const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

hamburger.addEventListener("click", () => {
  sidebar.style.left = "0";
});

closeSidebar.addEventListener("click", () => {
  sidebar.style.left = "-250px";
});