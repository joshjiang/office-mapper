import pgPromise from 'pg-promise';

const pgp = pgPromise();


const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

export async function createMap(name, description) { 
    const query = `
        INSERT INTO office_maps (name, description)
        VALUES ($1, $2)
        RETURNING * 
        `;
    
        try {
            const result = await db.one(query, [name, description]); // Use db.one to expect a single row
            console.log('Inserted Map:', result); 
            return result;
            } catch (err) {
            console.error('Error inserting office map:', err);
            throw err; // Rethrow the error to be handled by the caller
        }
}

export async function getAllMaps() {
    const query = `
        SELECT * FROM office_maps
    `;
    try {
        const result = await db.any(query);
        console.log('Fetched Maps:', result);
        return result;
    } catch (err) {
        console.error('Error fetching office maps:', err);
        throw err; // Rethrow the error to be handled by the caller
    }
}