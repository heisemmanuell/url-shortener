'use server'

import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

function normalizeUrl(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    const normalizedHost = url.hostname.toLowerCase(); 

    let normalizedPath = url.pathname;
    if (normalizedPath.endsWith('/') && normalizedPath.length > 1) {
      normalizedPath = normalizedPath.slice(0, -1);
    }
    
    // Keep the query parameters exactly as they are
    return `${url.protocol}//${normalizedHost}${normalizedPath}${url.search}${url.hash}`;
  } catch (e) {
    return urlStr;
  }
}

export async function createShortLink(formData: FormData) {
  

  let originalUrl = formData.get("originalUrl") as string;
  originalUrl = originalUrl.trim(); 

  if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
    originalUrl = "https://" + originalUrl;
  }

  const cleanUrl = normalizeUrl(originalUrl);

  // console.log(`Checking DB for: "${originalUrl}" OR "${cleanUrl}"`);

  const existingLink = await prisma.link.findFirst({
    where: {
      OR: [
        { originalUrl: originalUrl }, 
        { originalUrl: cleanUrl }     
      ]
    }
  });

  if (existingLink) {
    // console.log("Found existing link:", existingLink.shortCode);
    return { success: true, shortCode: existingLink.shortCode };
  }

  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
     return { error: "User session not found. Please refresh." };
  }

  // CREATE NEW
  const shortCode = nanoid(6);

  try {
    const link = await prisma.link.create({
      data: {
        originalUrl: cleanUrl, 
        shortCode: shortCode,
        userId: userId,
      },
    });

    // console.log("Created NEW link:", link.shortCode);
    revalidatePath("/");
    return { success: true, shortCode: link.shortCode };
    
  } catch (error) {
    // console.error("Database Error:", error);
    return { error: "Failed to create link." };
  }
}