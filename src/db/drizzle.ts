import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env' }); // Load environment variables from .env file

// Create a connection to the Neon database using Drizzle
export const connect = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined. Please add it to your environment variables.');
    }

    // Initialize a Neon connection
    const sql = neon(process.env.DATABASE_URL);

    // Create and return the Drizzle instance
    const db = drizzle({ client: sql });

    console.log('Connected to Neon Database successfully');
    return db;
  } catch (error) {
    console.error('Error connecting to Neon Database:', error);
    throw new Error('Unable to connect to the database');
  }
};
