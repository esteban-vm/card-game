import CardDraggable from '@/card-draggable'
import { Fonts, Images } from '@/constants'

export default class CardPlayer extends CardDraggable {
  private textHealth
  private numHealth!: number
  private textMaxHealth
  private numMaxHealth!: number
  private textArmor
  private spriteArmor
  private numArmor!: number

  constructor(health: number, ...params: ConstructorParameters<typeof CardDraggable>) {
    super(...params)
    const { Sprite, BitmapText } = Phaser.GameObjects
    this.textHealth = new BitmapText(this.scene, 0, -102, Fonts.PressStart)
    this.textMaxHealth = new BitmapText(this.scene, -20, -90, Fonts.PressStart)
    this.textArmor = new BitmapText(this.scene, 0, -102, Fonts.PressStart)
    this.spriteArmor = new Sprite(this.scene, 50, -80, Images.Armor)
    this.add([this.textHealth, this.textMaxHealth, this.spriteArmor, this.textArmor])
    this.healthLevel = health
    this.maxHealthLevel = health
    this.armorLevel = 0
  }

  public attack(value: number) {
    if (value <= this.armorLevel) {
      this.armorLevel = this.armorLevel - value
    } else {
      this.healthLevel = this.healthLevel - value - this.armorLevel
      this.armorLevel = 0
    }
    if (this.healthLevel <= 0) this.dead = true
  }

  public set healthLevel(health: number) {
    this.numHealth = health
    this.textHealth.text = this.numHealth.toString()
    this.textHealth.x = -44 - this.textHealth.width * 0.5
    this.textHealth.y = -100
    this.textHealth.tint = 0
  }

  public get healthLevel() {
    return this.numHealth
  }

  public set maxHealthLevel(health: number) {
    this.numMaxHealth = health
    this.textMaxHealth.text = this.numMaxHealth.toString()
    this.textMaxHealth.x = -20
    this.textMaxHealth.y = -90
    this.textMaxHealth.fontSize = 12
    this.textMaxHealth.tint = 1
  }

  public get maxHealthLevel() {
    return this.numMaxHealth
  }

  public set armorLevel(value: number) {
    this.numArmor = value
    this.textArmor.text = this.numArmor.toString()
    this.textArmor.x = 46 - this.textArmor.width * 0.5
    this.textArmor.alpha = this.numArmor === 0 ? 0 : 1
    this.spriteArmor.alpha = this.numArmor === 0 ? 0 : 1
  }

  public get armorLevel() {
    return this.numArmor
  }

  public set dead(_: boolean) {
    this.healthLevel = 0
    this.cardName = 'DEAD'
    this.isDraggable = false
    this.deathAnimation()
  }

  public get dead() {
    return this.cardName === 'DEAD'
  }
}
