import { createClient } from '@libsql/client';
import { v2 as cloudinary } from 'cloudinary';
import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = join(__dirname, '..', 'client');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// use local file to avoid Node 16 / Headers issue with remote Turso
const db = createClient({ url: 'file:database.sqlite' });

async function uploadImage(localPath, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(localPath, { folder: `legoshop/${folder}` }, (err, result) => {
      if (err) reject(err);
      else resolve(result.secure_url);
    });
  });
}

const sqlLines = [];

async function migrate(table, folder) {
  const rows = (await db.execute(`SELECT legoId, legoImage FROM ${table}`)).rows;

  for (const row of rows) {
    const filename = String(row.legoImage).split('/').pop();
    const localPath = join(clientDir, 'images', folder, filename);

    console.log(`Uploading ${filename}...`);
    try {
      const url = await uploadImage(localPath, folder);
      sqlLines.push(`UPDATE ${table} SET legoImage = '${url}' WHERE legoId = '${row.legoId}';`);
      console.log(`  ✓ ${filename}`);
    } catch (e) {
      console.error(`  ✗ ${filename}: ${e.message}`);
    }
  }
}

console.log('Uploading bricks to Cloudinary...');
await migrate('legos', 'bricks');
console.log('Uploading kits to Cloudinary...');
await migrate('kits', 'kits');

const sqlFile = join(__dirname, 'update-image-urls.sql');
await writeFile(sqlFile, sqlLines.join('\n') + '\n');
console.log(`\nDone! Run this against Turso:\nturso db shell legoshop "$(cat scripts/update-image-urls.sql)"`);
