import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const USER_TABLE= pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  isMember: boolean().default(false),
  email: varchar({ length: 255 }).notNull().unique(),
});
export const STUDY_MATERIAL_TABLE = pgTable('studyMaterial', {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficultyLevel: varchar().default('Easy'),
  courseLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().default('Generating')
});

