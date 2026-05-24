const https = require('https');
const fs = require('fs');
const path = require('path');

const movies = [
  { id: 1, title: "Oppenheimer_(film)" },
  { id: 2, title: "Dune:_Part_Two" },
  { id: 3, title: "Interstellar_(film)" },
  { id: 4, title: "The_Dark_Knight" },
  { id: 5, title: "Avatar:_The_Way_of_Water" },
  { id: 6, title: "Spider-Man:_Across_the_Spider-Verse" },
  { id: 7, title: "Inception" },
  { id: 8, title: "Parasite_(2019_film)" },
  { id: 9, title: "Deadpool_%26_Wolverine" },
  { id: 10, title: "The_Conjuring" },
  { id: 11, title: "Joker_(2019_film)" },
  { id: 12, title: "Avengers:_Endgame" }
];

const fetchPoster = (movie) => {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${movie.title}`;
    https.get(url, { headers: { 'User-Agent': 'NodejsScraper/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          const imgUrl = pages[pageId].original.source;
          
          const dest = path.join(__dirname, 'client/public/images', `poster-${movie.id}.jpg`);
          https.get(imgUrl, (imgRes) => {
            const file = fs.createWriteStream(dest);
            imgRes.pipe(file);
            file.on('finish', () => {
              file.close();
              console.log(`Downloaded poster-${movie.id}.jpg`);
              resolve();
            });
          }).on('error', (e) => {
            console.error(`Error downloading image for ${movie.title}:`, e);
            resolve();
          });
        } catch (e) {
          console.error(`Failed to parse poster for ${movie.title}:`, e);
          resolve();
        }
      });
    }).on('error', (e) => {
      console.error(`Error fetching data for ${movie.title}:`, e);
      resolve();
    });
  });
};

(async () => {
  for (const m of movies) {
    await fetchPoster(m);
  }
})();
