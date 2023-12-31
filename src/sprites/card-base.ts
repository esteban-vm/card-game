import type { CardType, Character } from '@/types'
import { Fonts, Images } from '@/constants'

export default abstract class CardBase extends Phaser.GameObjects.Container {
  protected spriteCard
  protected spriteChar
  protected textName

  constructor(scene: Phaser.Scene, x: number, y: number, card: CardType, char: Character, name: string, depth = 1) {
    super(scene, x, y)
    const { Sprite, BitmapText } = Phaser.GameObjects
    this.spriteCard = new Sprite(this.scene, 0, 0, Images[card])
    this.spriteChar = new Sprite(this.scene, 0, 20, Images[char])
    this.textName = new BitmapText(this.scene, 0, 0, Fonts.PressStart)
    this.cardName = name
    this.depth = depth
    this.name = name
    this.add([this.spriteCard, this.spriteChar, this.textName])
    this.scene.add.existing(this)
  }

  protected set cardName(name: string) {
    this.name = name
    this.textName.text = name
    this.textName.fontSize = 16
    this.textName.align = Phaser.GameObjects.BitmapText.ALIGN_CENTER
    this.textName.maxWidth = this.spriteCard.width
    this.textName.tint = 0
    this.textName.x = -this.textName.width * 0.5
    this.textName.y = 120 - this.textName.height
  }

  protected get cardName() {
    return this.name
  }

  public deathAnimation() {
    this.scene.tweens.add({
      targets: this.spriteChar,
      alpha: 0,
      duration: 100,
      repeat: 1,
      yoyo: true,
      onComplete: () => this.spriteChar.setTexture(Images.Dead),
    })
  }
}
