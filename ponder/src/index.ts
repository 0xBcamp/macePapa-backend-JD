import { ponder } from "@/generated";

ponder.on("Blitmap:Transfer", async ({ event, context }) => {
  const { BlitmapToken } = context.db;

  await BlitmapToken.create({
    id: event.args.tokenId,
    data: {
      owner: event.args.to,
    },
  });
});
