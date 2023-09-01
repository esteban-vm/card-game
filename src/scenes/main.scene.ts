import type { CardItem } from '@/types'
import { Scenes } from '@/constants'
import { CardGrid, CardPlayer } from '@/sprites'

export default class Main extends Phaser.Scene {
  public active!: CardItem | null
  public player!: CardPlayer
  public grid!: CardGrid

  constructor() {
    super(Scenes.Main)
  }

  public create() {
    const { width, height } = this.game.config as { width: number; height: number }
    this.player = new CardPlayer(16, this.makeMove, this, width * 0.5, height - 200, 'PlayerCard', 'Paladin', 'Player')
    this.grid = new CardGrid(this, 3, 3)
    this.input.keyboard?.on('keydown', this.toggleFullscreen)
  }

  public update() {
    this.grid.items[0].highlighted = false
    this.grid.items[1].highlighted = false
    this.grid.items[2].highlighted = false
    this.active = null
    if (this.player.y < 700) {
      const columnWidth = (this.game.config.width as number) / this.grid.columns
      if (this.player.x < columnWidth) {
        this.grid.items[0].highlighted = true
        this.active = this.grid.items[0]
      } else if (this.player.x > columnWidth * 2) {
        this.grid.items[2].highlighted = true
        this.active = this.grid.items[2]
      } else {
        this.grid.items[1].highlighted = true
        this.active = this.grid.items[1]
      }
    }
  }

  private makeMove = () => {
    this.player.x = this.player.originalX
    this.player.y = this.player.originalY
    if (this.active) {
      switch (this.active.skill) {
        case 'attack':
          this.player.attack(this.active.valueLevel)
          this.active.dead = true
          break
        case 'heal':
          this.player.healthLevel = Math.min(
            this.player.healthLevel + this.active.valueLevel,
            this.player.maxHealthLevel
          )
          break
        case 'armor':
          this.player.armorLevel = this.active.valueLevel
          break
      }
    }
  }

  private toggleFullscreen = (event: KeyboardEvent) => {
    if (event.key === 'f') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen()
      else document.exitFullscreen()
    }
  }
}
