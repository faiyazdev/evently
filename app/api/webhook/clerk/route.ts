import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse, NextRequest } from "next/server";
import {
  createUser,
  deleteUser,
  syncClerkMetadata,
  updateUser,
} from "@/lib/actions/user.actions";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    switch (eventType) {
      case "user.created":
      case "user.updated": {
        const email =
          evt.data.email_addresses.find(
            (e) => e.id === evt.data.primary_email_address_id,
          )?.email_address ??
          evt.data.email_addresses[0]?.email_address ??
          null;

        const clerkId = evt.data.id!;
        const firstName = evt.data.first_name;
        const lastName = evt.data.last_name ?? undefined;
        const username =
          evt.data.username ?? `${firstName}${lastName ?? ""}`.toLowerCase();
        const initial = firstName ? firstName.charAt(0).toUpperCase() : "U";
        const photo =
          evt.data.image_url ??
          `https://ui-avatars.com/api/?name=${initial}&background=random`;

        if (!email || !clerkId || !username || !firstName) {
          console.log("Validation failed: A required field is missing.");
          return NextResponse.json(
            {
              success: false,
              error: "validation failed",
            },
            { status: 400 },
          );
        }

        if (evt.type === "user.created") {
          const user = await createUser({
            clerkId,
            email,
            firstName,
            lastName,
            username,
            photo,
          });
          await syncClerkMetadata({
            clerkId,
            userId: user._id.toString(),
          });
        } else {
          await updateUser(clerkId, {
            firstName,
            lastName,
            username,
            photo,
          });
        }

        break;
      }
      case "user.deleted": {
        if (!evt.data.id) {
          return NextResponse.json(
            {
              success: false,
              error: "failed to delete user",
            },
            { status: 500 },
          );
        }
        await deleteUser(evt.data.id);
        break;
      }
      default:
        {
          console.log("Unknown evt type", evt.type);
        }
        break;
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
