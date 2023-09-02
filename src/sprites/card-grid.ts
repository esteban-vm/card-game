import type { Character, Skill } from '@/types'
import CardItem from '@/card-item'

export default class CardGrid {
  public scene
  public columns
  public rows
  public topY
  public offsetX
  public offsetY
  public items: CardItem[]
  private data: CardData[]

  constructor(scene: Phaser.Scene, columns: number, rows: number) {
    this.scene = scene
    this.columns = columns
    this.rows = rows
    this.topY = (this.scene.game.config.height as number) * 0.5
    this.offsetX = 120
    this.offsetY = 280
    this.items = []
    this.data = [
      { name: 'Minor Healing Potion', value: 3, character: 'HealingPotion', skill: 'heal' },
      { name: 'Major Healing Potion', value: 6, character: 'HealingPotion', skill: 'heal' },
      { name: 'Shield', value: 5, character: 'Shield', skill: 'armor' },
      { name: 'Kobold', value: 6, character: 'Kobold', skill: 'attack' },
      { name: 'Ogre', value: 10, character: 'Ogre', skill: 'attack' },
      { name: 'Death Knight', value: 12, character: 'DeathKnight', skill: 'attack' },
      { name: 'Fire Drake', value: 16, character: 'FireDrake', skill: 'attack' },
      { name: 'Golden Dragon', value: 20, character: 'GoldenDragon', skill: 'attack' },
    ]
    this.addCards(0)
  }

  private addCards(startIndex: number) {
    for (let index = startIndex; index < this.columns * this.rows; index++) {
      const card = this.data[Math.floor(Math.random() * this.data.length)]
      const x = this.offsetX + ((this.scene.game.config.width as number) * 0.5 - this.offsetX) * (index % this.columns)
      const y = this.topY - this.offsetY * Math.floor(index / this.columns)
      const item = new CardItem(card.value, card.skill, this.scene, x, y, 'Card', card.character, card.name, 0)
      this.items.push(item)
    }
  }

  public fadeFrontRow() {
    setTimeout(() => {
      this.items.splice(0, 3).forEach((item) => item.destroy())
      this.items.forEach((item) => {
        this.scene.tweens.add({
          targets: item,
          duration: 400,
          y: item.y + this.offsetY,
          onComplete: () => this.addBackRow(),
        })
      })
    }, 1_000)

    this.items.slice(0, 3).forEach((item) => {
      if (!item.selected) {
        this.scene.tweens.add({ targets: item, alpha: 0, duration: 200 })
      }
    })
  }

  private addBackRow() {
    if (this.items.length >= this.columns * this.rows) return
    this.addCards(6)
  }
}

interface CardData {
  name: string
  value: number
  character: Character
  skill: Skill
}
