"use client";
import { MediaRenderer, useActiveAccount } from "thirdweb/react";
import { client, contract } from "../client";
import { getOwnedNFTs } from "thirdweb/extensions/erc1155";
import { useEffect, useState } from "react";
import { NFT } from "thirdweb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Info } from "lucide-react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

const CollectionPage = () => {
  const account = useActiveAccount();
  const userAddress = "0x6Fd50cdB870061aAa07edD2b91b77FB148D0c686";
  const userAddressClaim = account?.address;
  const [claimStatus, setClaimStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { mutate: sendTransaction } = useSendTransaction();

  // State for NFTs and UI
  const [nfts, setNfts] = useState<(NFT & { quantityOwned: bigint })[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery");

  const fetchNFTs = async () => {
    if (!userAddress) return;

    setLoading(true);
    try {
      const ownedNFTs = await getOwnedNFTs({
        contract,
        address: userAddress,
        start: 0,
        count: 100,
      });

      console.log("NFTs:", ownedNFTs);
      setNfts(ownedNFTs);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false);
    }
  };
  const claim = async (_tokenId: any) => {
    if (!userAddressClaim) return;

    setClaimStatus("loading");
    try {
      // Use prepareContractCall instead of claimTo
      const transaction = prepareContractCall({
        contract: contract,
        method:
          "function claim(address _receiver, uint256 _tokenId, uint256 _quantity)",
        params: [
          userAddressClaim, // _receiver
          _tokenId, // _tokenId
          BigInt(1), // _quantity
        ],
      });

      console.log("transaction", transaction);

      await sendTransaction(transaction);
      setClaimStatus("success");

      // Refresh NFTs after successful claim
    } catch (error) {
      console.error("Error claiming NFT:", error);
      setClaimStatus("error");
    }
  };

  useEffect(() => {
    if (userAddressClaim) {
      fetchNFTs();
    }
  }, [userAddressClaim]);

  // Calculate max stats for relative progress bars
  const getMaxStats = () => {
    let maxStats = {
      HP: 0,
      Attack: 0,
      Defence: 0,
      "Sp.Attack": 0,
      "Sp.Def": 0,
      Speed: 0,
      Total: 0,
    };

    nfts.forEach((nft) => {
      if (nft.metadata.attributes) {
        //@ts-ignore
        nft.metadata.attributes.forEach((attr: any) => {
          const value = parseInt(attr.value);
          if (
            attr.trait_type in maxStats &&
            value > maxStats[attr.trait_type as keyof typeof maxStats]
          ) {
            maxStats[attr.trait_type as keyof typeof maxStats] = value;
          }
        });
      }
    });

    // Set minimum values for stats that might be missing
    Object.keys(maxStats).forEach((key) => {
      if (maxStats[key as keyof typeof maxStats] === 0) {
        maxStats[key as keyof typeof maxStats] = 100;
      }
    });

    return maxStats;
  };

  const maxStats = getMaxStats();

  // Map stat names to colors
  const statColors: Record<string, string> = {
    HP: "bg-red-500",
    Attack: "bg-orange-500",
    Defence: "bg-blue-500",
    "Sp.Attack": "bg-purple-500",
    "Sp.Def": "bg-green-500",
    Speed: "bg-yellow-500",
    Total: "bg-indigo-500",
  };

  return (
    <div className="container mx-auto py-24 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">MarketPlace</h1>
        <p className="text-muted-foreground text-3xl mb-6">
          Connect your wallet and Catch some Pokemons
        </p>

        {/* {!userAddress && (
      <div className="flex justify-center mb-8">
        <ConnectButton 
          client={client}
          connectButton={{
            label: "Connect Wallet",
            className: "px-6 py-3 bg-background text-white rounded-xl font-bold hover:bg-blue-700",
          }}
        />
      </div>
    )} */}
      </div>

      {/* {userAddress && (
    <div className="mb-8 bg-background rounded-xl p-4 border border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <Info size={18} className="text-blue-400" />
        <h2 className="text-lg font-semibold">Collection Info</h2>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <span className="text-muted-foreground text-sm">Owner:</span>
          <span className="ml-2 text-sm font-mono px-2 py-1 rounded">
            {userAddress}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground text-sm">Total Pokémon:</span>
          <span className="ml-2 text-lg font-bold">{nfts.length}</span>
        </div>
        <Button
          variant="outline"
          className="ml-auto"
          onClick={fetchNFTs}
          disabled={loading}
        >
          Refresh Collection
        </Button>
      </div>
    </div>
  )} */}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8 cursor-pointer">
          <TabsTrigger value="gallery">Gallery View</TabsTrigger>
          <TabsTrigger value="stats">Stats View</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border border-border bg-background">
                  <CardContent className="p-0">
                    <Skeleton className="w-full aspect-square" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : nfts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nfts.map((nft) => (
                <Card
                  key={nft.id.toString()}
                  className="border border-border bg-background overflow-hidden hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="aspect-square w-full overflow-hidden relative">
                    <MediaRenderer
                      client={client}
                      src={nft.metadata.image}
                      alt={nft.metadata.name || `NFT #${nft.id.toString()}`}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary/90">
                      #{nft.id.toString()}
                    </Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {nft.metadata.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/50"
                      >
                        {nft.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    {nft.metadata.description && (
                      <p className="text-muted-foreground text-sm mb-3">
                        {nft.metadata.description.slice(0, 40)}
                      </p>
                    )}
                    <div className="mt-3">
                      <h4 className="text-sm font-semibold mb-2 text-foreground">
                        Attributes
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {nft.metadata.attributes &&
                          Array.isArray(nft.metadata.attributes) &&
                          nft.metadata.attributes.map(
                            (attr: any, index: number) => (
                              <div key={index} className="p-2 rounded bg-muted">
                                <span className="text-xs text-muted-foreground">
                                  {attr.trait_type}
                                </span>
                                <div className="font-semibold text-foreground">
                                  {attr.value}
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </CardContent>
                  {nft.id % BigInt(3) === BigInt(0) && (
                    <Button
                      onClick={() => {
                        claim(nft.id);
                      }}
                      disabled={claimStatus === "loading"}
                      className={claimStatus === "loading" ? "opacity-70" : ""}
                    >
                      {claimStatus === "loading" ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span>
                          Claiming...
                        </>
                      ) : (
                        "Claim"
                      )}
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          ) : userAddress ? (
            <div className="text-center py-20 bg-background rounded-xl border border-border">
              <AlertCircle
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-foreground">
                No Pokémon Found
              </h3>
              <p className="text-muted-foreground mb-6">
                Your collection is empty. Visit the marketplace to get started!
              </p>
              <Button className="bg-primary text-white hover:bg-primary/90">
                Go to Marketplace
              </Button>
            </div>
          ) : (
            <div className="text-center py-20 bg-background rounded-xl border border-border">
              <AlertCircle
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Connect Your Wallet
              </h3>
              <p className="text-muted-foreground mb-4">
                Connect your wallet to view your Pokémon NFTs
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="stats" className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-full h-24" />
              ))}
            </div>
          ) : nfts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nfts.map((nft) => (
                <Card
                  key={nft.id.toString()}
                  className="border border-border overflow-hidden"
                >
                  <CardHeader className="p-4 pb-2 flex flex-row items-center bg-background">
                    <div className="w-16 h-16 mr-4 rounded-full overflow-hidden bg-muted">
                      <MediaRenderer
                        client={client}
                        src={nft.metadata.image}
                        alt={nft.metadata.name || `NFT #${nft.id.toString()}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground">
                        {nft.metadata.name}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {nft.id.toString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {nft.metadata.attributes &&
                        Array.isArray(nft.metadata.attributes) &&
                        nft.metadata.attributes.map(
                          (attr: any, index: number) => {
                            const statValue = parseInt(attr.value);
                            const maxValue =
                              maxStats[
                                attr.trait_type as keyof typeof maxStats
                              ] || 100;
                            const percentage = Math.min(
                              100,
                              (statValue / maxValue) * 100
                            );
                            const color =
                              statColors[attr.trait_type] || "bg-gray-500";

                            return (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium text-foreground">
                                    {attr.trait_type}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {attr.value}
                                  </span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${color} rounded-full`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : userAddress ? (
            <div className="text-center py-20 rounded-xl border border-border">
              <AlertCircle
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-foreground">
                No Pokémon Stats Available
              </h3>
              <p className="text-muted-foreground">
                Your collection is empty. Visit the marketplace to get started!
              </p>
            </div>
          ) : (
            <div className="text-center py-20 rounded-xl border border-border">
              <AlertCircle
                size={48}
                className="mx-auto text-muted-foreground mb-4"
              />
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Connect Your Wallet
              </h3>
              <p className="text-muted-foreground mb-4">
                Connect your wallet to view your Pokémon stats
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollectionPage;
