CREATE TABLE "fruit" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"fruityvice_id" integer
);
--> statement-breakpoint
CREATE TABLE "ledger" (
	"fruit_id" varchar NOT NULL,
	"location_id" integer NOT NULL,
	"amount" integer,
	"time" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"headcount" varchar
);
