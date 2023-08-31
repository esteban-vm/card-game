import { Fonts, Images, Scenes } from '@/constants'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(Scenes.Preloader)
  }

  public preload() {
    this.load.bitmapFont(Fonts.PressStart, `fonts/${Fonts.PressStart}.png`, `fonts/${Fonts.PressStart}.fnt`)
    Object.values(Images).forEach((image) => this.load.image(image, `images/${image}.png`))
  }

  public create() {
    this.scene.start(Scenes.Main)
  }
}
