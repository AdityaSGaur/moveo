const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'b9a5e69d'; // A common public OMDB test key
const movies = [
  { id: 1, title: "Oppenheimer", year: "2023" },
  { id: 2, title: "Dune: Part Two", year: "2024" },
  { id: 3, title: "Interstellar", year: "2014" },
  { id: 4, title: "The Dark Knight", year: "2008" },
  { id: 5, title: "Avatar: The Way of Water", year: "2022" },
  { id: 6, title: "Spider-Man: Across the Spider-Verse", year: "2023" },
  { id: 7, title: "Inception", year: "2010" },
  { id: 8, title: "Parasite", year: "2019" },
  { id: 9, title: "Deadpool & Wolverine", year: "2024" },
  { id: 10, title: "The Conjuring", year: "2013" },
  { id: 11, title: "Joker", year: "2019" },
  { id: 12, title: "Avengers: Endgame", year: "2019" }
];

const fetchPoster = (movie) => {
  return new Promise((resolve) => {
    // Try multiple API keys if one fails
    const tryDownload = (apiKey) => {
        const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&y=${movie.year}&apikey=${apiKey}`;
        https.get(url, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              if (json.Response === "False" && apiKey === 'b9a5e69d') {
                  return tryDownload('trilogy');
              }
              if (json.Poster && json.Poster !== 'N/A') {
                const dest = path.join(__dirname, 'client/public/images', `poster-${movie.id}.jpg`);
                https.get(json.Poster, (imgRes) => {
                  const file = fs.createWriteStream(dest);
                  imgRes.pipe(file);
                  file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded poster-${movie.id}.jpg for ${movie.title}`);
                    resolve();
                  });
                }).on('error', () => resolve());
              } else {
                console.log(`No poster found for ${movie.title}`);
                resolve();
              }
            } catch (e) {
              console.log(`Error parsing JSON for ${movie.title}`);
              resolve();
            }
          });
        }).on('error', () => resolve());
    };
    tryDownload(API_KEY);
  });
};

(async () => {
  // Ensure directory exists
  const dir = path.join(__dirname, 'client/public/images');
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  for (const m of movies) {
    await fetchPoster(m);
  }
})();
