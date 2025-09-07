import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */

function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  // Cover (con o sin imagen)
  let cover = `<div class="cover"><img src="${variables.background ||
    "https://images.unsplash.com/photo-1511974035430-5de47d3b95da"}" /></div>`;
  if (variables.includeCover === false) cover = "<div class='cover'></div>";

  // Avatar por defecto si viene null
  const avatar =
    variables.avatarURL || "https://randomuser.me/api/portraits/women/42.jpg";

  // Nombre completo con fallbacks
  const name = [variables.name || "Lucy", variables.lastName || "Boilett"]
    .join(" ")
    .trim();

  // Rol
  const role = variables.role || "Web Developer";

  // Localización (city, country) con coma solo si ambos existen
  const city = variables.city || "Miami";
  const country = variables.country || "USA";
  const location = [city, country].filter(Boolean).join(", ");

  // Clase de posición de la barra (admite "left"/"right" o "position-left"/"position-right")
  const pos = (variables.socialMediaPosition || "position-right")
    .replace(/^left$/, "position-left")
    .replace(/^right$/, "position-right");
  const positionClass =
    pos === "position-left" || pos === "position-right"
      ? pos
      : "position-right";

  // Links de redes SOLO si hay username
  const socials = [
    variables.twitter
      ? {
          href: `https://twitter.com/${variables.twitter}`,
          icon: "fab fa-twitter"
        }
      : null,
    variables.github
      ? {
          href: `https://github.com/${variables.github}`,
          icon: "fab fa-github"
        }
      : null,
    variables.linkedin
      ? {
          href: `https://linkedin.com/in/${variables.linkedin}`,
          icon: "fab fa-linkedin"
        }
      : null,
    variables.instagram
      ? {
          href: `https://instagram.com/${variables.instagram}`,
          icon: "fab fa-instagram"
        }
      : null
  ].filter(Boolean);

  const socialList = socials.length
    ? `<ul class="${positionClass}">
         ${socials
           .map(
             s =>
               `<li><a href="${s.href}" target="_blank" rel="noopener"><i class="${s.icon}"></i></a></li>`
           )
           .join("")}
       </ul>`
    : ""; // si no hay redes, no pintamos la UL

  // Render final
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${avatar}" class="photo" />
      <h1>${name}</h1>
      <h2>${role}</h2>
      <h3>${location}</h3>
      ${socialList}
    </div>
  `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
