export function getNarratorResponse(emotion, mode) {
  switch (mode) {
    case 'soup':
      return "This emotion needs a little simmering. Let\u2019s stir it together.";
    case 'iceCream':
      return "Looks like your joy is melting! Should we scoop it into a cone?";
    case 'potion':
      return "Mix a little courage with that sadness and you\u2019ve got a Braveheart Brew!";
    case 'mask':
      return "Is this the face you show… or the one you feel inside?";
    case 'garden':
      return "This feeling is like a seed—let’s water it and see what grows.";
    default:
      return "Let’s figure this emotion out together.";
  }
}
