import { useState } from 'react'
import Card from './components/Card'
import Inventory from './components/Inventory'

import { DndContext, closestCorners, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import "./App.css";

import { findMergeCombination } from './merger';
import Score from './components/Score';
import MergeHistory from './components/MergeHistory';

const cardsA = ["water", "fire", "air", "earth"];

const containers = {
  "inventory": cardsA,
  "mergingA": [],
  "mergingB": [],
}

function App() {

  const [draggingItem, setDraggingItem] = useState(null);
  const [allItems, setAllItems] = useState(containers);

  const [goals, setGoals] = useState([
    { "goal": "life", "completed": false },
    { "goal": "dragon", "completed": false },
    { "goal": "human", "completed": false },
    { "goal": "philosophy", "completed": false },
    { "goal": "computer", "completed": false },
    { "goal": "mecha", "completed": false }
  ]);

  const [mergeHistory, setMergeHistory] = useState([]);
  const [score, setScore] = useState(0);

  const [recentRecipes, setRecentRecipes] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [mergeFailures, setMergeFailures] = useState([]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function findContainer(id) {
    if (id in allItems) {
      return id;
    }

    return Object.keys(allItems).find((key) => allItems[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    setDraggingItem(active.id);
  }

  function handleDragOver(event) {
    const { active, over, delta } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setAllItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          delta.y > over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          allItems[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = allItems[activeContainer].findIndex((item => item === active.id));
    const overIndex = allItems[overContainer].findIndex((item => item === over.id));

    if (overContainer === "mergingA" && allItems["mergingA"].length > 1) {
      const itemToReplace = allItems["mergingA"].filter(item => item !== draggingItem)[0];
      setAllItems((items) => ({
        ...items,
        inventory: [...allItems["inventory"], itemToReplace],
        mergingA: [draggingItem]
      }));
    }
    else if (overContainer === "mergingB" && allItems["mergingB"].length > 1) {
      const itemToReplace = allItems["mergingB"].filter(item => item !== draggingItem)[0];
      setAllItems((items) => ({
        ...items,
        inventory: [...allItems["inventory"], itemToReplace],
        mergingB: [draggingItem]
      }));
    }
    else {
      setAllItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    }

    handleMerge();
  }

  const handleMerge = () => {
    // set timeout for waiting react state to resolve
    setTimeout(() => {
      attempMerge();
    }, 100);

    function attempMerge() {
      const mergingA = allItems["mergingA"][0];
      const mergingB = allItems["mergingB"][0];

      // console.log(mergingA, mergingB);
      if (mergingA && mergingB) {
        const [result, resultScore] = findMergeCombination(mergingA, mergingB);

        if (result) {
          const inventoryUniques = Array.from(new Set([...allItems["inventory"], ...allItems["mergingA"], ...allItems["mergingB"], ...result]));
          setAllItems((items) => ({
            "inventory": inventoryUniques,
            "mergingA": [],
            "mergingB": []
          }));

          setMergeHistory(prev => {

            let shortList = prev;
            shortList.length > 3 && shortList.shift();

            return [...shortList, `${mergingA} + ${mergingB} = ${result.join(", ")}`]
          });

          setScore(prev => prev + resultScore);

          setRecentRecipes([mergingA, mergingB]);
          setRecentResults([...result]);

          setTimeout(() => {
            setRecentRecipes([]);
            setRecentResults([]);
          }, 500);

          goals.forEach((goal, index) => {
            if (result.includes(goal["goal"])) {
              setGoals(prev => {
                prev[index] = {...prev[index], "completed": true}
                return [...prev];
              });
              setScore(prev => prev + 100);
            }
          })
        
        }
        else {
          setMergeFailures([mergingA, mergingB]);

          setTimeout(() => {
            setMergeFailures([]);
          }, 500);
        }
      }
    }
  }

  const handleReset = () => {
    setAllItems(containers);
    setScore(0);
    setMergeHistory([]);
    setGoals([
      { "goal": "life", "completed": false },
      { "goal": "dragon", "completed": false },
      { "goal": "human", "completed": false },
      { "goal": "philosophy", "completed": false },
      { "goal": "computer", "completed": false },
      { "goal": "mecha", "completed": false }
    ]);
  }

  return (
    <div className="page">
      <div className="title-description">
        <h1 style={{ textAlign: "center" }}>Synthesis Lunatic</h1>
        <div>Combine elemets to create new elements</div>
      </div>



      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="droppables">
          <div className="merging-droppables">

            <Score score={score} />

            <button id="reset" onClick={handleReset}>
              reset
            </button>

            <Inventory id="mergingA" items={allItems["mergingA"]}>
              {allItems["mergingA"].map((item, index) => (
                <Card id={item} key={item} name={item} extraClass={mergeFailures.includes(item) ? " merge-failures" : ""} />
              ))}
            </Inventory>

            <div>
              +
            </div>

            <Inventory id="mergingB" items={allItems["mergingB"]}>
              {allItems["mergingB"].map((item, index) => (
                <Card id={item} key={item} name={item} extraClass={mergeFailures.includes(item) ? " merge-failures" : ""} />
              ))}
            </Inventory>

            <MergeHistory mergeHistory={mergeHistory} />

          </div>

          <div style={{ position: "relative" }}>
            <Inventory id="inventory" items={allItems["inventory"]}>
              {allItems["inventory"].map((item, index) => (
                <Card id={item} key={item} name={item} extraClass={recentRecipes.includes(item) ? " recent-recipe" : recentResults.includes(item) ? " recent-result" : ""} />
              ))}
            </Inventory>

            <div className="goal">
              <div>Goals</div>
              <ul>
                {goals.map(goal => (
                  <li>
                    <span>{goal["goal"]}</span>&nbsp;
                    {goal["completed"] ?
                      <span>&#10003;</span>
                      :
                      <span>&#10007;</span>
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </DndContext>
    </div>
  );
}

export default App
