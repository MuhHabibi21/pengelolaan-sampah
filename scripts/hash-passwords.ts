import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const hash = await bcrypt.hash("12345678", 10);
  await prisma.user.updateMany({
    data: { password: hash }
  });
  console.log("Semua password user telah di-update menjadi 12345678 dan di-hash");
}

main();
