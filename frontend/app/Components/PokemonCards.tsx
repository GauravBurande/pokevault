import { Card, CardContent } from "@/components/ui/card"
const allPokemon = [
    {
      id: 1,
      name: "Bulbasaur",
      evolution: "Evolves to Ivysaur",
      rarity: "Uncommon",
      type: "Grass/Poison",
      attackDamage: 45,
      specialAbility: "Overgrow",
      gifUrl: "https://i.pinimg.com/originals/a4/00/bb/a400bbe6c782df285a1ce363fa55e6b9.gif",
    },
    {
      id: 4,
      name: "Charmander",
      evolution: "Evolves to Charmeleon",
      rarity: "Rare",
      type: "Fire",
      attackDamage: 52,
      specialAbility: "Blaze",
      gifUrl: "https://i.pinimg.com/originals/d2/60/07/d26007ab6524f141ebd64ee1894af718.gif",
    },
    {
      id: 7,
      name: "Squirtle",
      evolution: "Evolves to Wartortle",
      rarity: "Rare",
      type: "Water",
      attackDamage: 48,
      specialAbility: "Torrent",
      gifUrl: "https://media1.giphy.com/media/X5TVGmA2mpfmo/giphy.gif?cid=6c09b9527ddwve7mwxwptjnilor0whgj0vkbgta285xhnpbt&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    },
    {
      id: 25,
      name: "Pikachu",
      evolution: "Evolves to Raichu",
      rarity: "Epic",
      type: "Electric",
      attackDamage: 55,
      specialAbility: "Static",
      gifUrl: "https://i.pinimg.com/originals/8a/81/ec/8a81ecd8fdd266b3221da325875c0ea8.gif",
    },
    {
      id: 39,
      name: "Jigglypuff",
      evolution: "Evolves to Wigglytuff",
      rarity: "Uncommon",
      type: "Normal/Fairy",
      attackDamage: 45,
      specialAbility: "Cute Charm",
      gifUrl: "https://media2.giphy.com/media/eXUlPn1gmZavu/giphy.gif?cid=6c09b952lza7zktstdxkllwmw9ar91103ma3kn8xzpg9rypa&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    },
    {
        id: 53,
        name: "Meowth",
        evolution: "Evolves to Persian",
        rarity: "Uncommon",
        type: "Normal",
        attackDamage: 52,
        specialAbility: "Damp",
        gifUrl: "https://media.tenor.com/ARc0RsG0saIAAAAM/pokemon-pok%C3%A9mon.gif",
      },
      {
        id: 54,
        name: "Psuduck",
        evolution: "Evolves to GoldDuck",
        rarity: "Uncommon",
        type: "Defence",
        attackDamage: 110,
        specialAbility: "Immunity Ability",
        gifUrl: "https://media.tenor.com/2fk2J-zpIA4AAAAM/psyduck-flex.gif",
      },
      {
        id: 142,
        name: "Snorlax",
        evolution: "Highest Form",
        rarity: "Uncommon",
        type: "Normal/Fairy",
        attackDamage: 45,
        specialAbility: "Cute Charm",
        gifUrl: "https://media.tenor.com/L8dp0-pg9g8AAAAM/snorlax-good-morning.gif",
      },
      {
        id: 206,
        name: "Gligar",
        evolution: "Evolves to Gliscor",
        rarity: "Uncommon",
        type: "Ground/Flying",
        attackDamage: "75",
        specialAbility: "Ctting Paws",
        gifUrl: "https://i.pinimg.com/originals/f4/e5/78/f4e578b04eb68eb8e6f3d8a45f451355.gif",
      },
      {
        id: 399,
        name: "Snubbull",
        evolution: "Evolves to Granbull",
        rarity: "Uncommon",
        type: "Normal/Fairy",
        attackDamage: "80",
        specialAbility: "Friendship",
        gifUrl: "https://24.media.tumblr.com/ed30d062a71ec9a4d5e6d2e392d0c21e/tumblr_miflqtc6Pk1qm1z0oo1_500.gif",
      },
  ];
  
  const PokemonCard= () => {
    return (
      <section className="container mx-auto" id="all-pokémon">
        <h2 className="text-3xl font-bold text-center mb-8">All Pokémon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-4">
          {allPokemon.map((pokemon) => (
            <Card key={pokemon.id} className="border-2 border-primary shadow-xl hover:scale-105 transition-all">
              <CardContent className="p-4 flex flex-col items-center">
                <img
                  src={pokemon.gifUrl}
                  alt={pokemon.name}
                  className="w-50 h-50 object-cover rounded-lg"
                />
                <h3 className="text-xl font-bold mt-4">{pokemon.name}</h3>
                <p className="text-sm text-muted-foreground">{pokemon.evolution}</p>
                <p className="mt-2 text-sm font-semibold">Type: {pokemon.type}</p>
                <p className="text-sm">Attack Damage: {pokemon.attackDamage}</p>
                <p className="text-sm">Special: {pokemon.specialAbility}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }
  export default PokemonCard
  