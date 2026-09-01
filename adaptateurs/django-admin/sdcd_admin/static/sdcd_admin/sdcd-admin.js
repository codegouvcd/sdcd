/* Repli du menu lateral de l'administration. Remplace nav_sidebar.js de
 * Django, dont les classes et le stockage sont lies a sa propre mise en page.
 * L'etat est memorise par navigateur ; sous 900 px le menu part replie. */
(function () {
  var CLE = "sdcd-admin-menu";
  var bouton = document.getElementById("toggle-nav-sidebar");
  var menu = document.getElementById("nav-sidebar");
  if (!bouton || !menu) return;

  function appliquer(ouvert) {
    menu.setAttribute("data-ouvert", ouvert ? "true" : "false");
    bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
    var icone = bouton.querySelector("i");
    if (icone) icone.className = ouvert ? "ri-menu-fold-line" : "ri-menu-unfold-line";
    document.body.classList.toggle("sdcd-admin--menu-replie", !ouvert);
  }

  var memorise = null;
  try { memorise = window.localStorage.getItem(CLE); } catch (e) { /* stockage indisponible */ }
  var etroit = window.matchMedia("(max-width: 900px)").matches;
  appliquer(memorise === null ? !etroit : memorise === "ouvert");

  bouton.addEventListener("click", function () {
    var ouvert = menu.getAttribute("data-ouvert") !== "true";
    appliquer(ouvert);
    try { window.localStorage.setItem(CLE, ouvert ? "ouvert" : "replie"); } catch (e) { /* idem */ }
  });

  // Sur petit ecran, un choix dans le menu le referme.
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a") && window.matchMedia("(max-width: 900px)").matches) appliquer(false);
  });
})();
