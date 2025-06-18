const pool = require('./db');
const { sitesData } = require('../src/data/sites.ts');

async function createSitesTable() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sites (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        url VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        tags JSON,
        rating INT
      )
    `);
    console.log('Table "sites" created or already exists.');
  } finally {
    connection.release();
  }
}

async function insertSitesData() {
  const connection = await pool.getConnection();
  try {
    for (const site of sitesData) {
      const tags = JSON.stringify(site.tags);
      await connection.query(
        'INSERT INTO sites (id, name, description, url, category, tags, rating) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), url=VALUES(url), category=VALUES(category), tags=VALUES(tags), rating=VALUES(rating)',
        [site.id, site.name, site.description, site.url, site.category, tags, site.rating]
      );
    }
    console.log('Data inserted into "sites" table.');
  } finally {
    connection.release();
  }
}

async function migrate() {
  try {
    await createSitesTable();
    await insertSitesData();
    console.log('Database migration completed successfully.');
  } catch (err) {
    console.error('Error during migration:', err);
  } finally {
    pool.end();
  }
}

migrate();
