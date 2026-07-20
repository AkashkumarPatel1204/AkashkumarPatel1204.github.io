// Complete variable definitions and random functions

const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}
const storyText =
  "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised :insertx: weighs 300 pounds.";

const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and slithered away"
];


// Raw text strings

// Willy the Goblin
// Big Daddy
// Father Christmas

// the soup kitchen
// Disneyland
// the White House

// spontaneously combusted
// melted into a puddle on the sidewalk
// turned into a slug and slithered away

// Partial return random string function

function returnRandomStoryString() {
  // It was 94 Fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised :insertx: weighs 300 pounds, and it was a hot day.

  return storyText;
}

// Event listener and partial generate function definition

generateBtn.addEventListener("click", generateStory);

function generateStory() {
  // Step 1: Create newStory
  let newStory = storyText;

  // Step 2: Random items
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  // Step 3: Replace placeholders
  newStory = newStory.replaceAll(":insertx:", xItem);
  newStory = newStory.replaceAll(":inserty:", yItem);
  newStory = newStory.replaceAll(":insertz:", zItem);

  // Step 4: Replace Bob with custom name
  if (customName.value !== "") {
    newStory = newStory.replaceAll("Bob", customName.value);
  }

  // Step 5: UK conversions
  if (document.getElementById("uk").checked) {
    const weightInStones = Math.round(300 / 14);
    const tempInCelsius = Math.round((94 - 32) * 5 / 9);

    newStory = newStory.replaceAll("300 pounds", `${weightInStones} stone`);
    newStory = newStory.replaceAll("94 fahrenheit", `${tempInCelsius} centigrade`);
  }

  // Step 6: Output story
  story.textContent = newStory;
  story.style.visibility = "visible";
}
