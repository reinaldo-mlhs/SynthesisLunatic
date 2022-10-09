

//materials
// water, air, earth, fire
// dust, lava, steam, sand, stone, glass, mud
// time, metal, life
const combinations = [
    {recipe: ["air", "earth"], result: ["dust"]},
    {recipe: ["air", "water"], result: ["cloud"]},
    {recipe: ["air", "fire"], result: ["wind"]},
    {recipe: ["earth", "water"], result: ["swamp"]},
    {recipe: ["earth", "fire"], result: ["lava"]},
    {recipe: ["water", "fire"], result: ["steam"]},
    {recipe: ["water", "lava"], result: ["steam"]},
    {recipe: ["stone", "wind"], result: ["sand"]},
    {recipe: ["sand", "fire"], result: ["glass"]},
    {recipe: ["lava", "air"], result: ["stone"]},
    {recipe: ["stone", "water"], result: ["sand"]},
    {recipe: ["dust", "fire"], result: ["ash"]},
    {recipe: ["cloud", "fire"], result: ["lighting"]},
    {recipe: ["lighting", "metal"], result: ["electricity"]},

    {recipe: ["sand", "glass"], result: ["time"]},
    {recipe: ["stone", "fire"], result: ["metal"]},
    {recipe: ["swamp", "time"], result: ["life"]},
    {recipe: ["fire", "electricity"], result: ["plasma"]},

    {recipe: ["space", "earth"], result: ["gravity"]},
    {recipe: ["earth", "gravity"], result: ["star", "planet"]},
    {recipe: ["space", "earth"], result: ["gravity"]},

    {recipe: ["life", "stone"], result: ["golemn"]},
    {recipe: ["life", "water"], result: ["lizard", "mammal", "fish", "plant"]},
    {recipe: ["mammal", "time"], result: ["human"]},
    {recipe: ["time", "plant"], result: ["tree"]},
    {recipe: ["lizard", "air"], result: ["bird"]},
    {recipe: ["lizard", "fire"], result: ["dragon"]},
    {recipe: ["human", "time"], result: ["death"]},
    {recipe: ["human", "stone"], result: ["tools"]},
    {recipe: ["tools", "tree"], result: ["wood"]},
    {recipe: ["tools", "wood"], result: ["paper"]},
    {recipe: ["paper", "human"], result: ["knowledge"]},
    {recipe: ["knowledge", "human"], result: ["law", "religion"]},
]

export function findMergeCombination(mergingA, mergingB) {
    const combination = combinations.filter(combination => {
        if (combination["recipe"].includes(mergingA) && combination["recipe"].includes(mergingB)) {
            return true;
        }
        return false;
    });

    return [combination[0] ? combination[0]["result"] : null, 10];
}