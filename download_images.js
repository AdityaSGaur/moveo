const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'client', 'public', 'images');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const images = {
  'grid-1.jpg': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60',
  'grid-2.jpg': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=60',
  'grid-3.jpg': 'https://images.unsplash.com/photo-1558288599-23c723f5b842?w=800&auto=format&fit=crop&q=60',
  'grid-4.jpg': 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60',
  'grid-5.jpg': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=60',
  'grid-6.jpg': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60',
  'community-1.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60',
  'community-2.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
  'community-3.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
  'testimonial-1.jpg': 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=800&auto=format&fit=crop&q=60',
};

for (const [filename, url] of Object.entries(images)) {
  const filepath = path.join(dir, filename);
  https.get(url, (res) => {
    const fileStream = fs.createWriteStream(filepath);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
}
