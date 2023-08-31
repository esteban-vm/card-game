import CardDraggable from '@/card-draggable'
import { Fonts, Images } from '@/constants'

export default class CardPlayer extends CardDraggable {
  private textHealth
  private textMaxHealth
  private textArmor
  private spriteArmor

  constructor(health: number, ...params: ConstructorParameters<typeof CardDraggable>) {
    super(...params)
    const { Sprite, BitmapText } = Phaser.GameObjects
    this.textHealth = new BitmapText(this.scene, 0, 0, Fonts.PressStart)
    this.textHealth.text = health.toString()
    this.textHealth.x = -44 - this.textHealth.width * 0.5
    this.textHealth.y = -100
    this.textHealth.tint = 0
    this.textMaxHealth = new BitmapText(this.scene, 0, 0, Fonts.PressStart)
    this.textMaxHealth.text = health.toString()
    this.textMaxHealth.x = -20
    this.textMaxHealth.y = -90
    this.textMaxHealth.fontSize = 12
    this.textMaxHealth.tint = 1
    this.textArmor = new BitmapText(this.scene, 0, 0, Fonts.PressStart)
    this.textArmor.text = health.toString()
    this.textArmor.x = 46 - this.textArmor.width * 0.5
    this.textArmor.alpha = 0
    this.spriteArmor = new Sprite(this.scene, 50, -80, Images.Armor)
    this.spriteArmor.alpha = 0
    this.add([this.textHealth, this.textMaxHealth, this.textArmor, this.spriteArmor])
  }
}
