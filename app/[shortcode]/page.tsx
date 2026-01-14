import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function ShortCodePage({
  params
} : {
  params: Promise<{shortcode: string}>
}) {
  const {shortcode} = await params;

  const link = await prisma.link.findUnique({
    where: { shortCode: shortcode},
  })

  if(!link){
    notFound();
  }

  await prisma.link.update({
    where: { shortCode: shortcode},
    data: { clicks: { increment: 1} },
  })

  redirect(link.originalUrl);
}