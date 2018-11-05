// ------------------ K O R T - I N D S T I L L I N G E R ---------------------

// Angiv kortbredde og korthøjde på hjemmesiden. Du kan anvende px, vh, vw og 
// procentangivelser. I eksemplet her er kortet 600 pixels bredt og 350 pixels
// højt.
kortbredde = "600px";
korthoejde = "350px";

// Angiv centrum af kortet ved indlæsning. Brug https://nominatim.openstreetmap.org/ 
// eller https://www.latlong.net/ for at finde geografiske koordinater. 
// I eksemplet her er det koordinaterne for Odense, Danmark, som er
// kortets centrum.
kortcentrum_latitude = 55.403755;
kortcentrum_longitude = 10.402370;

// Angiv hvilket zoomniveau kortet skal have ved indlæsning. En passende værdi
// er mellem 0 (zoomet helt ud) og 15 (begge inkl.)
start_niveau_zoom = 4;

// Kopier linjen herunder for hvert sted på kortet du ønsker markeret med en pin
// og en tilhørende forklaring. Brug https://nominatim.openstreetmap.org/ eller 
// https://www.latlong.net/ for at finde de geografiske koordinater. 
// Eksemplet herunder sætter en pin i centrum af Aalborg, Danmark, med eksempeltekst.
// Format for pin med forklaring er ("Overskrift","Brødtekst", longitude, latitude)
stedliste[stedliste.length] = new sted("Aalborg", "Aalborg er med sine 114194 indbyggere Danmarks fjerde største by.", 9.9193939, 57.0482206);

// -- Du skal ikke ændre linjen herunder --
document.addEventListener("load", init());
// ----------------------------------------