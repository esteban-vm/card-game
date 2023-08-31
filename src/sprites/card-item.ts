import type { Skill } from '@/types'
import CardBase from '@/card-base'
import { Fonts } from '@/constants'

export default class CardItem extends CardBase {
  public textValue
  public skill

  constructor(value: number, skill: Skill, ...params: ConstructorParameters<typeof CardBase>) {
    super(...params)
    this.textValue = new Phaser.GameObjects.BitmapText(this.scene, 0, 0, Fonts.PressStart)
    this.textValue.text = value.toString()
    this.textValue.x = -45 - this.textValue.width * 0.5
    this.textValue.y = -100
    this.textValue.tint = 0
    this.add(this.textValue)
    this.skill = skill
  }

  public set highlighted(highlight: boolean) {
    const color = highlight ? 0xcccc88 : 0xffffff
    this.spriteCard.tint = color
    this.spriteChar.tint = color
  }
}
