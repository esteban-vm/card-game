import CardBase from '@/card-base'

export default abstract class CardDraggable extends CardBase {
  public originalX
  public originalY
  protected isDraggable
  protected isDragging
  protected ondragend

  constructor(ondragend: (pointer: Phaser.Input.Pointer) => void, ...params: ConstructorParameters<typeof CardBase>) {
    super(...params)
    this.originalX = this.x
    this.originalY = this.y
    this.isDraggable = true
    this.isDragging = false
    this.ondragend = ondragend
    this.setSize(this.spriteCard.width, this.spriteCard.height)
    this.setInteractive()
    this.scene.input.setDraggable(this)
    this.scene.input.on('drag', this.handleDrag)
    this.scene.input.on('dragend', this.handleDragend)
  }

  private handleDrag = (_: Phaser.Input.Pointer, __: InstanceType<typeof CardDraggable>, x: number, y: number) => {
    if (!this.isDraggable) return
    this.isDragging = true
    this.x = x
    this.y = y
  }

  private handleDragend = (pointer: Phaser.Input.Pointer) => {
    this.isDragging = false
    this.ondragend(pointer)
  }
}
