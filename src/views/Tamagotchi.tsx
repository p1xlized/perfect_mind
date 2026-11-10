import Button from "../components/primitives/button";

export default function Tamagotchi() {
  return (
    <div className="mx-auto flex h-full w-full max-w-xl flex-col items-center justify-center gap-6 text-center">
      <div className="flex size-40 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-6xl">
        ◌
      </div>
      <div>
        <h1 className="text-2xl">Tamagotchi</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your focus companion is resting.</p>
      </div>
      <Button type="button" variant="primary">Coming soon</Button>
    </div>
  );
}
