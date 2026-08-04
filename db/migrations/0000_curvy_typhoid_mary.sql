CREATE TABLE `applications` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`application_id` varchar(32) NOT NULL,
	`role` enum('producer','buyer') NOT NULL,
	`company` varchar(255) NOT NULL,
	`cnpj` varchar(32),
	`email` varchar(255) NOT NULL,
	`phone` varchar(64),
	`country` varchar(128),
	`commodity` varchar(128),
	`terms_accepted` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `applications_id` PRIMARY KEY(`id`),
	CONSTRAINT `applications_application_id_unique` UNIQUE(`application_id`)
);
--> statement-breakpoint
CREATE TABLE `contact_messages` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`topic` varchar(128),
	`message` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`application_id` bigint unsigned NOT NULL,
	`filename` varchar(255) NOT NULL,
	`mime` varchar(128) NOT NULL,
	`size` int NOT NULL,
	`data` longtext NOT NULL,
	`uploaded_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `freight_bookings` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`reference_code` varchar(32) NOT NULL,
	`origin` varchar(128) NOT NULL,
	`destination` varchar(128) NOT NULL,
	`volume_mt` int NOT NULL,
	`cargo_type` varchar(64),
	`incoterm` varchar(16),
	`load_date` varchar(32),
	`total_usd` int,
	`name` varchar(255) NOT NULL,
	`company` varchar(255) NOT NULL,
	`email` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `freight_bookings_id` PRIMARY KEY(`id`),
	CONSTRAINT `freight_bookings_reference_code_unique` UNIQUE(`reference_code`)
);
