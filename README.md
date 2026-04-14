# Kasvikatalogi

Full-stack verkkosovellus, jossa vinkkejä kasveilla värjäämiseen.

Palvelinpuoli on rakennettu Node.js:llä ja Expressillä. Kasvidata tallennetaan JSON-tiedostoon. Sivusto on responsiivinen.

Vain admin voi muokata kasvilistaa. Adminille on toteutettu suojattu kirjautuminen, jonka kautta voi lisätä ja poistaa kasveja suoraan selaimen kautta.


## Käynnistys

Tätä projektia ei voi avata Live Serverillä.

1. Käynnistä palvelin terminaalissa:
node server.js

2. Avaa selaimessa:
http://localhost:3000

## PÄIVITETTY VERSIO 
-Gallery sivulle lisätty suodatus ominaisuuksia, kuten suodatus värin ja materiaalin perusteella. Myös adminille on annettu uusi ominaisuus, jolla admin voi lisätä kasville latinankielisen nimen. 

-Myös suodatuksen nollaamis nappi on tehty, sekä teksti, joka näyttää montako kasvia galleriassa näytetään juuri sillä hetkellä. Teksti myös kertoo jos yhtään kasveja ei löytynyt valitsemillasi suodattimilla.