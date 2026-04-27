/**
 * Run this script once to generate placeholder images for development.
 * Usage: node scripts/generate-placeholders.js
 *
 * These are SVG placeholders. Replace with your actual photos.
 */

const fs = require('fs')
const path = require('path')

const images = [
  { dir: 'venue', file: '1_firepit.jpg', label: 'Firepit Area' },
  { dir: 'venue', file: '2_decking_views.jpg', label: 'Decking Views' },
  { dir: 'venue', file: '3_pool_exterior_dusk.jpg', label: 'Pool at Dusk' },
  { dir: 'venue', file: '4_sauna.jpg', label: 'Finnish Sauna' },
  { dir: 'venue', file: '5_bathroom.jpg', label: 'Bathroom' },
  { dir: 'venue', file: '6_kitchen.jpg', label: 'Kitchen' },
  { dir: 'venue', file: '7_venue_sunset.jpg', label: 'Venue Sunset' },
  { dir: 'venue', file: '8_pool.jpg', label: 'Pool' },
  { dir: 'venue', file: '9_games_room.jpg', label: 'Games Room' },
  { dir: 'venue', file: '10_bunk_room.jpg', label: 'Bunk Room' },
  { dir: 'venue', file: '11_floral_room.jpg', label: 'Floral Room' },
  { dir: 'venue', file: '12_botanical_room.jpg', label: 'Botanical Room' },
  { dir: 'venue', file: '13_orange_room.jpg', label: 'Orange Room' },
  { dir: 'venue', file: '14_green_floral.jpg', label: 'Green Floral' },
  { dir: 'venue', file: '15_pool_table.jpg', label: 'Pool Table' },
  { dir: 'venue', file: '16_chess.jpg', label: 'Chess' },
  { dir: 'venue', file: '17_exterior_day.jpg', label: 'Exterior Day' },
  { dir: 'venue', file: '18_garden.jpg', label: 'Garden' },
  { dir: 'venue', file: '19_outdoor_dining.jpg', label: 'Outdoor Dining' },
  { dir: 'venue', file: '20_full_venue.jpg', label: 'Full Venue' },
  { dir: 'people', file: 'steven.jpg', label: 'Steven Machin' },
  { dir: 'people', file: 'gaz.jpg', label: 'Gaz Crosby' },
  { dir: 'general', file: 'hero_bg.jpg', label: 'Hero Background' },
]

const svgPlaceholder = (label, w = 800, h = 600) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#16130E"/>
      <stop offset="100%" style="stop-color:#1E1A14"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <text x="${w/2}" y="${h/2 - 12}" font-family="Georgia, serif" font-size="32" fill="#C4963A" opacity="0.4" text-anchor="middle">${label}</text>
  <text x="${w/2}" y="${h/2 + 20}" font-family="Arial, sans-serif" font-size="12" fill="#5A5048" text-anchor="middle" letter-spacing="3">MC RETREATS</text>
</svg>`

images.forEach(({ dir, file, label }) => {
  const dirPath = path.join(__dirname, '..', 'public', 'images', dir)
  fs.mkdirSync(dirPath, { recursive: true })

  const svgPath = path.join(dirPath, file.replace('.jpg', '.svg'))
  const svgContent = svgPlaceholder(label)
  fs.writeFileSync(svgPath, svgContent)

  console.log(`✓ Created placeholder: /images/${dir}/${file.replace('.jpg', '.svg')}`)
})

console.log('\n✅ All placeholders created.')
console.log('📸 Replace .svg files with actual .jpg images using the same filenames.')
