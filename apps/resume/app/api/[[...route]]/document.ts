import { desc, and, eq, ne } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  createDocumentSchema,
  documentTable,
  UpdateDocumentSchema,
  personalInfoTable,
  experiencesTable,
  educationsTable,
  skillsTable,
  updateCombinedSchema,
} from "@repo/db/schema/index";
import { getAuthUser } from "@/lib/kinde";
import { generateDocUUID } from "@/lib/helper";
import { db } from "@repo/db";
import { z } from "zod";

const documentRoute = new Hono()
  .post(
    "/create",
    zValidator("json", createDocumentSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { title } = c.req.valid("json");
        const userId = user.id;
        const authorName = `${user.given_name} ${user.family_name}`;
        const authorEmail = user.email as string;
        const documentId = generateDocUUID();

        const newDoc = {
          title: title,
          userId: userId,
          documentId: documentId,
          authorName: authorName,
          authorEmail: authorEmail,
        };

        const [data] = await db
          .insert(documentTable)
          .values(newDoc)
          .returning();

        return c.json({ success: true, data }, 200);
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to create document",
            error: error,
          },
          500,
        );
      }
    },
  )
  .patch(
    "/update/:documentId",
    zValidator("param", z.object({ documentId: z.string() })),
    zValidator("json", updateCombinedSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { documentId } = c.req.valid("param");
        const {
          title,
          status,
          thumbnail,
          themeColor,
          summary,
          currentPosition,
          personalInfo,
          educations,
          experiences,
          skills,
        } = c.req.valid("json");

        const userId = user.id;

        if (!documentId) {
          return c.json(
            { success: false, message: "Document ID is required" },
            404,
          );
        }

        await db.transaction(async (tx) => {
          const [existingDocument] = await tx
            .select()
            .from(documentTable)
            .where(
              and(
                eq(documentTable.documentId, documentId),
                eq(documentTable.userId, userId),
              ),
            );

          if (!existingDocument) {
            return c.json(
              { success: false, message: "Document not found" },
              404,
            );
          }

          const resumeUpdate = {} as UpdateDocumentSchema;
          if (title) resumeUpdate.title = title;
          if (status) resumeUpdate.status = status;
          if (thumbnail) resumeUpdate.thumbnail = thumbnail;
          if (themeColor) resumeUpdate.themeColor = themeColor;
          if (summary) resumeUpdate.summary = summary;
          if (currentPosition) resumeUpdate.currentPosition = currentPosition;

          if (Object.keys(resumeUpdate)?.length > 0) {
            console.log("resumeUpdate", resumeUpdate);
            await tx
              .update(documentTable)
              .set(resumeUpdate)
              .where(
                and(
                  eq(documentTable.documentId, documentId),
                  eq(documentTable.userId, userId),
                ),
              )
              .returning();
          }

          if (personalInfo) {
            if (!personalInfo.firstName && !personalInfo.lastName) {
              return;
            }

            const exists = await tx
              .select()
              .from(personalInfoTable)
              .where(eq(personalInfoTable.docId, existingDocument.id))
              .limit(1);

            if (exists.length > 0) {
              await tx
                .update(personalInfoTable)
                .set(personalInfo)
                .where(eq(personalInfoTable.docId, existingDocument.id));
            } else {
              await tx.insert(personalInfoTable).values({
                docId: existingDocument.id,
                ...personalInfo,
              });
            }
          }

          if (experiences && Array.isArray(experiences)) {
            const existingExperience = await tx
              .select()
              .from(experiencesTable)
              .where(eq(experiencesTable.docId, existingDocument.id));

            const existingExperienceSet = new Set(
              existingExperience.map((exp) => exp.id),
            );
            for (const exp of experiences) {
              const { id, ...data } = exp;

              if (id !== undefined && existingExperienceSet.has(id)) {
                await tx
                  .update(experiencesTable)
                  .set(data)
                  .where(
                    and(
                      eq(experiencesTable.docId, existingDocument.id),
                      eq(experiencesTable.id, id),
                    ),
                  );
              } else {
                await tx.insert(experiencesTable).values({
                  docId: existingDocument.id,
                  ...data,
                });
              }
            }
          }

          if (educations && Array.isArray(educations)) {
            const existingEducation = await tx
              .select()
              .from(educationsTable)
              .where(eq(educationsTable.docId, existingDocument.id));

            const existingEducationSet = new Set(
              existingEducation.map((edu) => edu.id),
            );
            for (const edu of educations) {
              const { id, ...data } = edu;

              if (id !== undefined && existingEducationSet.has(id)) {
                await tx
                  .update(educationsTable)
                  .set(data)
                  .where(
                    and(
                      eq(educationsTable.docId, existingDocument.id),
                      eq(educationsTable.id, id),
                    ),
                  );
              } else {
                await tx.insert(educationsTable).values({
                  docId: existingDocument.id,
                  ...data,
                });
              }
            }
          }

          if (skills && Array.isArray(skills)) {
            const existingSkills = await tx
              .select()
              .from(skillsTable)
              .where(eq(skillsTable.docId, existingDocument.id));

            const existingSkillsSet = new Set(
              existingSkills.map((skill) => skill.id),
            );
            for (const skill of skills) {
              const { id, ...data } = skill;
              if (id !== undefined && existingSkillsSet.has(id)) {
                await tx
                  .update(skillsTable)
                  .set(data)
                  .where(
                    and(
                      eq(skillsTable.docId, existingDocument.id),
                      eq(skillsTable.id, id),
                    ),
                  );
              } else {
                await tx.insert(skillsTable).values({
                  docId: existingDocument.id,
                  ...data,
                });
              }
            }
          }
        });

        return c.json(
          { success: true, message: "Document updated successfully" },
          200,
        );
      } catch (error) {
        return c.json(
          { success: false, message: "Failed to update document", error },
          500,
        );
      }
    },
  )
  .get("all", getAuthUser, async (c) => {
    try {
      const user = c.get("user");
      const userId = user.id;
      const documents = await db
        .select()
        .from(documentTable)
        .orderBy(desc(documentTable.updatedAt))
        .where(
          and(
            eq(documentTable.userId, userId),
            ne(documentTable.status, "archived"),
          ),
        );

      return c.json({ success: true, data: documents }, 200);
    } catch (error) {
      return c.json(
        { success: false, message: "Failed to fetch documents", error },
        500,
      );
    }
  })
  .get(
    "/:documentId",
    zValidator("param", z.object({ documentId: z.string() })),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const userId = user.id;
        const { documentId } = c.req.valid("param");

        const documentData = await db.query.documentTable.findFirst({
          where: and(
            eq(documentTable.userId, userId),
            eq(documentTable.documentId, documentId),
          ),
          with: {
            personalInfo: true,
            educations: true,
            experiences: true,
            skills: true,
          },
        });
        return c.json({ success: true, data: documentData });
      } catch (error) {
        return c.json(
          { success: false, message: "Failed to fetch documents", error },
          500,
        );
      }
    },
  );

export default documentRoute;
