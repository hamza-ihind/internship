## Core Info Required to Apply

* Contact: phone, city, country, dateOfBirth (optional), photoUrl

* Academic: university, faculty, degree/program, level (L1–M2), graduationYear, gpa (optional), transcriptUrl (optional)

* Skills & Languages: `skills[]`, `languages[]` (e.g., \["Arabic","French","English"]) with proficiency later

* Experience: internships/part-time roles (company, title, start/end, description)

* Projects: title, description, tech stack, links

* Links: linkedinUrl, githubUrl, portfolioUrl, websiteUrl

* Documents: cvUrl (required to apply), otherCertificates\[] (optional)

* Preferences & Availability: preferredLocations\[], workMode (remote/hybrid/on-site), earliestStartDate, weeklyAvailabilityHours

* Compliance & Consents: termsAcceptedAt, profilePublic (boolean), marketingConsent (optional)

## Prisma Schema: Extend Existing Models

### Profile (extend)

* `city String?`

* `country String?`

* `dateOfBirth DateTime?`

* `photoUrl String?`

* `graduationYear Int?`

* `gpa Float?`

* `transcriptUrl String?`

* `languages String[]` (e.g., \["Arabic","French","English"])

* `linkedinUrl String?`

* `githubUrl String?`

* `portfolioUrl String?`

* `websiteUrl String?`

* `preferredLocations String[]`

* `workMode String?` (enum later: REMOTE/HYBRID/ON\_SITE)

* `earliestStartDate DateTime?`

* `weeklyAvailabilityHours Int?`

* `termsAcceptedAt DateTime?`

* `profilePublic Boolean @default(false)`

### Optional Tables (normalize later)

* `Experience` (userId, company, title, startDate, endDate, description)

* `Project` (userId, title, description, techTags\[], linkUrl)

* `Certification` (userId, name, issuer, issuedAt, credentialUrl?)

* `LanguageProficiency` (userId, language, level enum: BASIC/INTERMEDIATE/ADVANCED)

## Application Model (enhance)

* `id String @id @default(cuid())`

* `userId String` → relation to `User`

* `internshipId String` → relation to `Internship`

* `status ApplicationStatus @default(PENDING)`

* `coverLetter String?` (free text)

* `cvUrl String?` (snapshot of the CV used for this application)

* `answers Json?` (screening questions/short answers)

* `source String?` (e.g., "web", "referral")

* `priority Int?` (optional ranking)

* `withdrawnAt DateTime?`

* `submittedAt DateTime @default(now())`

* `updatedAt DateTime @updatedAt`

* Unique: `@@unique([userId, internshipId])`

## Internship (screening support)

* Add `screeningQuestions Json?` for lightweight Q\&A forms

* Keep `requirements String?` for free text; later consider tags `String[]`

## Validation & Access Rules

* Require `cvUrl` on apply; reject if missing

* Enforce FREE plan application limit (e.g., 10/month) vs PRO unlimited

* Validate earliestStartDate and weeklyAvailabilityHours where internships require minimum availability

* Admin-only CRUD on internships; user can withdraw own application

## Future Enhancements

* Add enums for `workMode` and structured `LanguageProficiency`

* Store parsed CV metadata (skills, education) from AI processing in `Profile`

* Audit log model for application status changes

## Outcome

* I will extend `Profile` and `Application` per above, optionally scaffold `Experience`, `Project`, `Certification`, and `LanguageProficiency` tables. Confirm if you want the normalized tables now or keep arrays/Json for MVP, and I’ll implement accordingly.

