import type { CardItem } from '@/types'
import { Images, Scenes } from '@/constants'
import { CardGrid, CardPlayer } from '@/sprites'

export default class Main extends Phaser.Scene {
  private gw!: number
  private gh!: number
  public player!: CardPlayer
  public grid!: CardGrid
  public activeCard?: CardItem

  constructor() {
    super(Scenes.Main)
  }

  public create() {
    this.gw = this.game.config.width as number
    this.gh = this.game.config.height as number
    this.player = new CardPlayer(16, this.move, this, this.gw * 0.5, this.gh - 200, 'PlayerCard', 'Paladin', 'Player')
    this.grid = new CardGrid(this, 3, 3)
    this.input.keyboard?.on('keydown', this.toggleFullscreen)
  }

  public update() {
    const [first, second, third] = this.grid.items
    first.highlighted = false
    second.highlighted = false
    third.highlighted = false
    this.activeCard = undefined
    const columnWidth = this.gw / this.grid.columns
    const xDiff = Math.abs(this.player.x - this.player.originalX)
    if (this.player.y < 700 && xDiff < columnWidth * 1.4) {
      if (this.player.x < columnWidth) {
        first.highlighted = true
        this.activeCard = first
      } else if (this.player.x > columnWidth * 2) {
        third.highlighted = true
        this.activeCard = third
      } else {
        second.highlighted = true
        this.activeCard = second
      }
    }
  }

  private move = () => {
    this.player.x = this.player.originalX
    this.player.y = this.player.originalY
    if (this.activeCard) {
      this.player.originalX = this.player.x = this.activeCard.x
      this.activeCard.selected = true
      switch (this.activeCard.skill) {
        case 'attack':
          this.player.attack(this.activeCard.valueLevel)
          this.activeCard.dead = true
          this.activeCard.deathAnimation()
          break
        case 'heal':
          this.player.healthLevel = Math.min(
            this.player.healthLevel + this.activeCard.valueLevel,
            this.player.maxHealthLevel
          )
          break
        case 'armor':
          this.player.armorLevel = this.activeCard.valueLevel
          break
      }
      if (this.player.dead) this.addRestartButton()
      else this.grid.fadeFrontRow()
    }
  }

  private toggleFullscreen = (event: KeyboardEvent) => {
    if (event.key === 'f') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen()
      else document.exitFullscreen()
    }
  }

  private addRestartButton() {
    const restartButton = this.add.image(this.gw * 0.5, this.gh * 0.5, Images.RestartButton)
    restartButton.depth = 2
    restartButton.setInteractive()
    restartButton.on('pointerover', () => (restartButton.tint = 0xcccccc))
    restartButton.on('pointerout', () => (restartButton.tint = 0xffffff))
    restartButton.on('pointerdown', () => {
      restartButton.tint = 0xffffff
      this.scene.restart()
    })
  }
}
