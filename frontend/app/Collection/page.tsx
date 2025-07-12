"use client";
import { ConnectButton, MediaRenderer, useActiveAccount } from "thirdweb/react";
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
import { Loader2 } from "lucide-react";

const CollectionPage = () => {
  const account = useActiveAccount();
  const userAddress = account?.address;
  const { mutate: sendTransaction } = useSendTransaction();

  // State for NFTs and UI
  const [nfts, setNfts] = useState<(NFT & { quantityOwned: bigint })[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery");
  const [evolvingId, setEvolvingId] = useState<bigint | null>(null);

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

  const evolv = async (_tokenId: any) => {
    setEvolvingId(BigInt(_tokenId));
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function evolve(uint256 _tokenId)",
        params: [_tokenId],
      });
      await sendTransaction(transaction);
      // You might want to add a success message or refresh NFTs here
    } catch (error) {
      console.error("Error evolving NFT:", error);
    } finally {
      setEvolvingId(null);
    }
  };

  useEffect(() => {
    if (userAddress) {
      fetchNFTs();
    }
  }, [userAddress]);

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
        <h1 className="text-4xl font-bold mb-4">My Pokémon Collection</h1>
        <p className="text-foreground/70 mb-6">
          Connect your wallet to view and manage your Pokémon NFTs
        </p>

        {!userAddress && (
          <div className="flex justify-center mb-8">
            <ConnectButton
              client={client}
              connectButton={{
                label: "Connect Wallet",
                className:
                  "px-6 py-3 bg-background text-white rounded-xl font-bold hover:bg-primary/70",
              }}
            />
          </div>
        )}
      </div>

      {userAddress && (
        <div className="mb-8 bg-background rounded-xl p-4 border border-accent">
          <div className="flex items-center gap-2 mb-2">
            <Info size={18} className="text-primary" />
            <h2 className="text-lg font-semibold">Collection Info</h2>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <span className="text-foreground/70 text-sm">Owner:</span>
              <span className="ml-2 text-sm font-mono  px-2 py-1 rounded">
                {userAddress}
              </span>
            </div>
            <div>
              <span className="text-foreground/70 text-sm">Total Pokémon:</span>
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
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8 cursor-pointer">
          <TabsTrigger value="gallery">Gallery View</TabsTrigger>
          <TabsTrigger value="stats">Stats View</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border border-accent bg-background">
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
                  className="border border-accent bg-background overflow-hidden hover:border-primary/70 transition-all hover:shadow-lg hover:shadow-blue-900/20"
                >
                  <div className="aspect-square w-full overflow-hidden  relative">
                    <MediaRenderer
                      client={client}
                      src={nft.metadata.image}
                      alt={nft.metadata.name || `NFT #${nft.id.toString()}`}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary/60 hover:bg-primary/70">
                      #{nft.id.toString()}
                    </Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-xl font-bold">
                      {nft.metadata.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/50"
                      >
                        {nft.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/50"
                      >
                        Qty: {nft.quantityOwned.toString()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    {nft.metadata.description && (
                      <p className="text-foreground/70 text-sm mb-3">
                        {nft.metadata.description.slice(0, 40)}
                      </p>
                    )}
                    <div className="mt-3">
                      <h4 className="text-sm font-semibold mb-2">Attributes</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {nft.metadata.attributes &&
                          Array.isArray(nft.metadata.attributes) &&
                          nft.metadata.attributes.map(
                            (attr: any, index: number) => (
                              <div
                                key={index}
                                className="p-2 rounded bg-accent"
                              >
                                <span className="text-muted-foreground text-xs">
                                  {attr.trait_type}
                                </span>
                                <div className="font-semibold">
                                  {attr.value}
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                    <div className="flex flex-col item-center justify-center pt-7">
                      {nft.id != BigInt(2) &&
                        nft.id != BigInt(5) &&
                        nft.id != BigInt(8) &&
                        nft.id != BigInt(10) && (
                          <Button
                            onClick={() => evolv(nft.id)}
                            disabled={
                              evolvingId === nft.id ||
                              parseInt(nft.quantityOwned.toString()) % 2 !== 0
                            }
                            className="cursor-pointer"
                          >
                            {evolvingId === nft.id ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Evolving...
                              </>
                            ) : (
                              `Evolve`
                            )}
                          </Button>
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : userAddress ? (
            <div className="text-center py-20 bg-background rounded-xl border border-accent">
              <AlertCircle size={48} className="mx-auto text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">No Pokémon Found</h3>
              <p className="text-foreground/70 mb-6">
                Your collection is empty. Visit the marketplace to get started!
              </p>
              <Button className="bg-primary/60 hover:bg-primary/70 text-white">
                Go to Marketplace
              </Button>
            </div>
          ) : (
            <div className="text-center py-20 bg-background rounded-xl border border-accent">
              <AlertCircle size={48} className="mx-auto text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
              <p className="text-foreground/70 mb-4">
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
                  className="border border-accent  overflow-hidden"
                >
                  <CardHeader className="p-4 pb-2 flex flex-row items-center bg-background">
                    <div className="w-16 h-16 mr-4 rounded-full overflow-hidden bg-background/70">
                      <MediaRenderer
                        client={client}
                        src={nft.metadata.image}
                        alt={nft.metadata.name || `NFT #${nft.id.toString()}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">
                        {nft.metadata.name}
                      </CardTitle>
                      <div className="text-sm text-foreground/70">
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
                                  <span className="font-medium">
                                    {attr.trait_type}
                                  </span>
                                  <span>{attr.value}</span>
                                </div>
                                <div className="h-2 bg-accent rounded-full overflow-hidden">
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
            <div className="text-center py-20  rounded-xl border border-accent">
              <AlertCircle size={48} className="mx-auto text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">
                No Pokémon Stats Available
              </h3>
              <p className="text-foreground/70">
                Your collection is empty. Visit the marketplace to get started!
              </p>
            </div>
          ) : (
            <div className="text-center py-20 rounded-xl border border-accent">
              <AlertCircle size={48} className="mx-auto text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
              <p className="text-foreground/70 mb-4">
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
