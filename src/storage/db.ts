const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    database: 'demo',
    password: 'Aa123456',
    user: 'user'
});

export async function query<T>(text: string, params?: any[]): Promise<T[]> {
    const res = await pool.query(text, params);
    return res.rows as T[];
}

export async function transactionQuery<T>(queries: { text: string, values: any[] }[]): Promise<T[]> {
    const client = await pool.connect();
    const results = [];
    try {
        await client.query('BEGIN');
        for (const query of queries) {
            const res = await client.query(query.text, query.values);
            results.push(res.rows[0]);
        }
        await client.query('COMMIT');

    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
    return results as T[];
}