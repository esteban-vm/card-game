import type { Skill } from '@/types'
import CardBase from '@/card-base'
import { Fonts } from '@/constants'

export default class CardItem extends CardBase {
  private textValue
  private numValue!: number
  public skill
  public dead

  constructor(value: number, skill: Skill, ...params: ConstructorParameters<typeof CardBase>) {
    super(...params)
    this.textValue = new Phaser.GameObjects.BitmapText(this.scene, 0, 0, Fonts.PressStart)
    this.valueLevel = value
    this.add(this.textValue)
    this.skill = skill
    this.dead = false
  }

  public set valueLevel(value: number) {
    this.numValue = value
    this.textValue.text = this.numValue.toString()
    this.textValue.x = -45 - this.textValue.width * 0.5
    this.textValue.y = -100
    this.textValue.tint = 0
  }

  public get valueLevel() {
    return this.numValue
  }

  public set highlighted(highlight: boolean) {
    const color = highlight ? 0xcccc88 : 0xffffff
    this.spriteCard.tint = color
    this.spriteChar.tint = color
  }
}
