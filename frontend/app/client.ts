import { createThirdwebClient, getContract, } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID as string;
const SECRET_KEY=process.env.SECRET_KEY as string;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
  secretKey:SECRET_KEY
});
export const contract = getContract({
  client,
  chain: defineChain(10143),
  address: "0x273AD701C33e8a0577b55fB3D9f8D44A6e1b9899",
});
