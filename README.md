# Tehtävälista-sovellus

Yksinkertainen tehtävälista-sovellus päivittäisten tehtäviesi hallintaan.

### Asennus (tietokanta on valmiiksi liitetty)

1. Kloonaa tämä repositorio
2. Asenna riippuvuudet:

```
npm i

```

### Sovelluksen käynnistäminen

Käynnistä kehityspalvelin:

```
npm run dev
```

### Tietokannan katselu (valinnainen)

toisessa terminaalissa:

```
npx prisma studio
```

## Käytetyt teknologiat

- **Nuxt.js** - frontend + backend
- **SQLite** - kevyt tietokanta
- **Prisma ORM** - tietokannan hallintaan
- **Tailwind CSS** - tyylittelyyn

## Miten harjoitus eteni

- Aluksi mietin minkä vaihtoehdon teen ja millä teknologialla.Tehtävälistojen teko Reactilla ja JavaScriptillä oli jo entuudestaan tuttua, joten päädyin tekemään tehtävälistan Nuxt:ia käyttämällä. Koska en ollut koskaan käyttänyt tätä, halusin mielenkiinnosta tutustua siihen.
- Ensimmäiset 2 tuntia meni asentaessa ja tutkiessa miten riippuvuudet yhdistetään Nuxt projektiin. Valitsin riippuvuuksiksi: SQL-liten jotta ei tarvitse tehdä erillista tietokanta konfiguraatiota , Prisma ORM jolla pystyn näkemään mitä tietokannassa tapahtuu ja nopeuttaakseen hakuja. Tailwind css nopeaan tyylittelyyn.

- Tämän jälkeen pääsin työstämään itse Tehtävälista applikaatiota. Tehtävälista oli melko helppo tehdä Nuxtilla, koska CRUD toiminnot ovat jo tuttuja. Nuxt documentaation kanssa sain tämän kivuttomasti tehtyä ja ~4 tuntia oli kulunut tehtävän aloituksen jälkeen.

- Sen jälkeen kun tehtävä oli valmis halusin tutustua Nuxtiin hieman enemmän kun vasta oli riippuvuudet asennettu ja tehtävän palautukselle oli annettu reilusti aikaa.

## Overtime

- Nyt kun Nuxt kehitysympäristö on asennettu ja tutustuttu, päätin käyttää toiset 4 tuntia jatkokehittääkseni Tehtävälistaa jossa yritin yhdistää kaikki 3 annettua tehtävää

-Lisähaasteena tein ensiksi endpointin joka generoi 50 random tehtävää. Tehtävät on listattu 10kpl / sivu(url paginaatio) , Tehtävät voi järjestää ajan luonti ajankohdan mukaan, voit myös etsiä tehtävää otsikon mukaan
