export default class Emotion {
  constructor({ name, intensity, location, color, modeMeta = {} }) {
    this.name = name;
    this.intensity = intensity;
    this.location = location;
    this.color = color;
    this.modeMeta = modeMeta;
  }
}
