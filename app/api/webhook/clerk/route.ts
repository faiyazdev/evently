import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse, NextRequest } from "next/server.js";
import {
  upsertUser,
  deleteUser,
  syncClerkMetadata,
} from "@/lib/actions/user.actions";
import { CreateUserParams } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const email =
        evt.data.email_addresses.find(
          (e) => e.id === evt.data.primary_email_address_id,
        )?.email_address ??
        evt.data.email_addresses[0]?.email_address ??
        null;

      const clerkId = evt.data.id!;
      const firstName = evt.data.first_name ?? "";
      const lastName = evt.data.last_name ?? "";
      const username =
        evt.data.username ??
        `${firstName ?? ""}${lastName ?? ""}`.toLowerCase();
      const photo = evt.data.image_url ?? "";

      if (!email || lastName || firstName || username || photo) {
        return NextResponse.json(
          {
            success: false,
            error: "validation failed",
          },
          { status: 400 },
        );
      }

      const userData: CreateUserParams = {
        clerkId,
        email,
        username,
        firstName,
        lastName,
        photo,
      };
      const user = await upsertUser(userData);
      if (evt.type === "user.created") {
        await syncClerkMetadata({
          clerkId,
          userId: user._id.toString(),
        });
      }
    } else if (evt.type === "user.deleted") {
      if (!evt.data.id)
        return NextResponse.json(
          {
            success: false,
            error: "failed to delete user",
          },
          { status: 500 },
        );
      await deleteUser(evt.data.id);
    }

    return NextResponse.json(
      {
        success: true,
        event: evt.type,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Clerk webhook error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Webhook processing failed",
      },
      { status: 500 },
    );
  }
}
