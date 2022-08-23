
export function validateMeal (meal) {
  if (!meal) {
    throw new Error('Seems there\'s no food in this meal...');
  }
  if (!meal.title) {
    throw new Error('Please enter a title!');
  }
  if (!meal.type) {
    throw new Error('Please choose a meal type!');
  }
  if (!meal.foods.length) {
    throw new Error('Seems there\'s no food in this meal... Add some ingredients!');
  }

}