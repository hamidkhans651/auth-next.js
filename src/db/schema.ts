import { integer, pgTable, serial, text, timestamp,boolean } from 'drizzle-orm/pg-core';
import { usersTable } from '../../drizzle/schema';

export const userstable = pgTable('users_table', {
  id: serial("id").primaryKey(), // Auto-incrementing primary key
  username: text("username").notNull().unique(), // Unique username
  email: text("email").notNull().unique(), // Unique email
  password: text("password").notNull(), // Hashed password
  isVerified: boolean("is_verified").default(false), // Corrected boolean field
  isAdmin: boolean("is_admin").default(false), // Corrected boolean field
  forgotPasswordToken: text("forgot_password_token"), // Optional field
  forgotPasswordTokenExpiry: timestamp("forgot_password_token_expiry"), // Optional field
  verifyToken: text("verify_token"), // Optional field
  verifyTokenExpiry: timestamp("verify_token_expiry"), // Optional field
});


export const postsTable = pgTable('posts_table', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});



export const propertyTable = pgTable('property_table', {
  id: serial('id').primaryKey(),
  propertyname: text('name').notNull(),
  categories: integer('age').notNull(),
  address: text('email').notNull().unique(),
});

export const adminTable = pgTable('admin_table', {
  id: serial('id').primaryKey(),
  propertyname: text('name').notNull(),
  categories: integer('age').notNull(),
  address: text('email').notNull().unique(),
});

export type Insertadmin = typeof adminTable.$inferInsert;
export type Selectadmin = typeof adminTable.$inferSelect;

export type Insertproperty = typeof propertyTable.$inferInsert;
export type Selectproperty = typeof propertyTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
