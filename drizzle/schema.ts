import { pgTable, unique, serial, text, boolean, timestamp, foreignKey, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const usersTable = pgTable("users_table", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	username: text().notNull(),
	password: text().notNull(),
	isVerified: boolean("is_verified").default(false),
	isAdmin: boolean("is_admin").default(false),
	forgotPasswordToken: text("forgot_password_token"),
	forgotPasswordTokenExpiry: timestamp("forgot_password_token_expiry", { mode: 'string' }),
	verifyToken: text("verify_token"),
	verifyTokenExpiry: timestamp("verify_token_expiry", { mode: 'string' }),
}, (table) => {
	return {
		usersTableEmailUnique: unique("users_table_email_unique").on(table.email),
		usersTableUsernameUnique: unique("users_table_username_unique").on(table.username),
	}
});

export const postsTable = pgTable("posts_table", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	content: text().notNull(),
	userId: integer("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => {
	return {
		postsTableUserIdUsersTableIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [usersTable.id],
			name: "posts_table_user_id_users_table_id_fk"
		}).onDelete("cascade"),
	}
});

export const propertyTable = pgTable("property_table", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	age: integer().notNull(),
	email: text().notNull(),
}, (table) => {
	return {
		propertyTableEmailUnique: unique("property_table_email_unique").on(table.email),
	}
});

export const adminTable = pgTable("admin_table", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	age: integer().notNull(),
	email: text().notNull(),
}, (table) => {
	return {
		adminTableEmailUnique: unique("admin_table_email_unique").on(table.email),
	}
});
