import '@/game.css'
import Phaser from 'phaser'
import { Main, Preloader } from '@/scenes'

const config: Phaser.Types.Core.GameConfig = {
  width: 640,
  height: 1024,
  backgroundColor: '#333',
  scene: [Preloader, Main],
  type: Phaser.AUTO,
  scale: { autoCenter: Phaser.Scale.CENTER_BOTH, mode: Phaser.Scale.FIT },
}

export default new Phaser.Game(config)
