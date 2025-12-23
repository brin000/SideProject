import { z } from "zod";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { personalInfoTable, personalInfoSchema } from "./personal-info";
import { skillsSchema, skillsTable } from "./skills";
import { experiencesSchema, experiencesTable } from "./experiences";
import { educationsSchema, educationsTable } from "./educations";
import { createInsertSchema } from "drizzle-zod";

export const StatusEnum = pgEnum("status", ["archived", "private", "public"]);

export const documentTable = pgTable("document", {
  id: serial("id").notNull().primaryKey(),
  documentId: varchar("document_id").unique().notNull(),
  userId: varchar("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary"),
  themeColor: varchar("theme_color", { length: 255 })
    .notNull()
    .default("#7c3aed"),
  thumbnail: text("thumbnail"),
  currentPosition: integer("current_position").notNull().default(1),
  status: StatusEnum("status").notNull().default("private"),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const documentRelations = relations(documentTable, ({ one, many }) => ({
  personalInfo: one(personalInfoTable),
  experiences: many(experiencesTable),
  educations: many(educationsTable),
  skills: many(skillsTable),
}));

export const createDocumentSchema = createInsertSchema(documentTable, {
  title: z.string().min(1),
  themeColor: (schema) => schema.optional(),
  thumbnail: (schema) => schema.optional(),
  currentPosition: (schema) => schema.optional(),
}).pick({
  title: true,
  status: true,
  summary: true,
  themeColor: true,
  thumbnail: true,
  currentPosition: true,
});

export const updateCombinedSchema = z.object({
  title: createDocumentSchema.shape.title.optional(),
  status: createDocumentSchema.shape.status.optional(),
  thumbnail: createDocumentSchema.shape.thumbnail.optional(),
  summary: createDocumentSchema.shape.summary.optional(),
  themeColor: createDocumentSchema.shape.themeColor.optional(),
  currentPosition: createDocumentSchema.shape.currentPosition.optional(),
  personalInfo: personalInfoSchema.optional(),
  educations: z.array(educationsSchema).optional(),
  experiences: z.array(experiencesSchema).optional(),
  skills: z.array(skillsSchema).optional(),
});

export type DocumentSchema = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentSchema = z.infer<typeof updateCombinedSchema>;
