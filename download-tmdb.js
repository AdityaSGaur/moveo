const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = '15d2ea6d0dc1d476efbca3eba2428bab'; // TMDB example key
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
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movie.title)}&year=${movie.year}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            const posterPath = json.results[0].poster_path;
            if (posterPath) {
              const imgUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
              const dest = path.join(__dirname, 'client/public/images', `poster-${movie.id}.jpg`);
              
              https.get(imgUrl, (imgRes) => {
                const file = fs.createWriteStream(dest);
                imgRes.pipe(file);
                file.on('finish', () => {
                  file.close();
                  console.log(`Downloaded TMDB poster-${movie.id}.jpg for ${movie.title}`);
                  resolve();
                });
              }).on('error', () => resolve());
              return;
            }
          }
          console.log(`No TMDB poster found for ${movie.title}`);
          resolve();
        } catch (e) {
          console.log(`Error parsing JSON for ${movie.title}`);
          resolve();
        }
      });
    }).on('error', () => resolve());
  });
};

(async () => {
  for (const m of movies) {
    await fetchPoster(m);
  }
})();
