"use client";
import Hero from "./Components/Hero";
import PokemonCard from "./Components/PokemonCards";
import EvolutionGuide from "./Components/EvolutionGuide";

export default function Home() {
  return (
    <>
      <Hero/>
      <PokemonCard/>
      <EvolutionGuide/>
    </>
  );
}