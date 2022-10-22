

//materials
// water, air, earth, fire
// dust, lava, steam, sand, stone, glass, mud
// time, metal, life
const combinations = [
    {recipe: ["air", "steam"], result: ["cloud"]},
    {recipe: ["air", "fire"], result: ["wind"]},
    {recipe: ["air", "lava"], result: ["stone"]},
    {recipe: ["air", "lizard"], result: ["bird"]},

    {recipe: ["water", "fire"], result: ["steam"]},
    {recipe: ["water", "lava"], result: ["steam", "stone"]},
    {recipe: ["water", "stone"], result: ["sand"]},
    {recipe: ["water", "life"], result: ["lizard", "mammal", "fish", "plant"]},

    {recipe: ["earth", "water"], result: ["swamp"]},
    {recipe: ["earth", "fire"], result: ["lava"]},

    {recipe: ["fire", "sand"], result: ["glass"]},
    {recipe: ["fire", "stone"], result: ["metal"]},
    {recipe: ["fire", "lizard"], result: ["dragon"]},
    
    
    {recipe: ["wind", "cloud"], result: ["lighting"]},
    {recipe: ["stone", "wind"], result: ["sand"]},
    {recipe: ["lighting", "metal"], result: ["electricity"]},
    {recipe: ["sand", "glass"], result: ["time"]},
    {recipe: ["sand", "electricity"], result: ["computer"]},
    {recipe: ["swamp", "time"], result: ["life"]},
    {recipe: ["swamp", "lighting"], result: ["life"]},
    {recipe: ["life", "stone"], result: ["golemn"]},
    {recipe: ["mammal", "time"], result: ["human"]},
    {recipe: ["time", "plant"], result: ["tree"]},
    {recipe: ["human", "time"], result: ["death"]},
    {recipe: ["human", "stone"], result: ["tools"]},
    {recipe: ["tools", "tree"], result: ["wood"]},
    {recipe: ["tools", "wood"], result: ["paper"]},
    {recipe: ["paper", "human"], result: ["knowledge"]},
    {recipe: ["knowledge", "human"], result: ["philosophy"]},
    {recipe: ["computer", "human"], result: ["programming"]},
    {recipe: ["golemn", "programming"], result: ["robot"]},
    {recipe: ["human", "tools"], result: ["weapons"]},
    {recipe: ["human", "weapons"], result: ["war", "death"]},
    {recipe: ["robot", "weapons"], result: ["mecha"]},
    {recipe: ["death", "electricity"], result: ["zombie"]},
    {recipe: ["death", "life"], result: ["cycle"]},

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