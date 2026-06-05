import { loadEnvConfig } from "@next/env";
import bcrypt from "bcryptjs";

loadEnvConfig(process.cwd());

async function main(): Promise<void> {
  const { connectDB } = await import("@/lib/db");
  const { User } = await import("@/app/models/user");

  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length === 0 ||
    password.length === 0
  ) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in env.");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existingAdmin = await User.findOne({
    email: normalizedEmail,
  });

  if (existingAdmin) {
    console.log("Admin already exists:", normalizedEmail);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await User.create({
    email: normalizedEmail,
    passwordHash,
    role: "admin",
  });

  console.log("Admin seeded:", normalizedEmail);
  process.exit(0);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});