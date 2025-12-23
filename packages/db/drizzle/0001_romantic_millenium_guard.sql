CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"university_name" varchar(255),
	"degree" varchar(255),
	"major" varchar(255),
	"description" text,
	"start_date" date,
	"end_date" date
);
--> statement-breakpoint
CREATE TABLE "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"title" varchar(255),
	"company_name" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"currently_working" boolean DEFAULT false NOT NULL,
	"work_summary" text,
	"start_date" date,
	"end_date" date
);
--> statement-breakpoint
CREATE TABLE "personal_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255),
	"job_title" varchar(255),
	"address" varchar(255),
	"phone" varchar(50),
	"email" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "skill" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"name" varchar(255),
	"rating" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience" ADD CONSTRAINT "experience_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_info" ADD CONSTRAINT "personal_info_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill" ADD CONSTRAINT "skill_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;