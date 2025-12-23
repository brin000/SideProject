import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { documentTable } from "./document";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const skillsTable = pgTable("skill", {
  id: serial("id").primaryKey(),
  docId: integer("document_id")
    .references(() => documentTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  name: varchar("name", { length: 255 }),
  rating: integer("rating").notNull().default(0),
});

export const skillsRelations = relations(skillsTable, ({ one }) => ({
  document: one(documentTable, {
    fields: [skillsTable.docId],
    references: [documentTable.id],
  }),
}));

export const skillsSchema = createInsertSchema(skillsTable, {
  id: z.number().optional(),
}).pick({
  id: true,
  name: true,
  rating: true,
});
export type SkillsSchema = z.infer<typeof skillsSchema>;
