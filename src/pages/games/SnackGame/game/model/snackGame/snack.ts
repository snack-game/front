export interface SnackPropType {
  coordinates: { y: number; x: number };
  snackNumber: number;
  index: number;
}

abstract class Snack {
  private index: number;
  private coordinates: { y: number; x: number };
  private position = { x: 0, y: 0 };
  private velocity = { x: Math.random() * 4 - 2, y: 0 };
  private radius = 0;
  private snackNumber: number;
  private image = new Image();
  private isSelected = false;
  private toDelete = false;
  private canSelect = false;

  constructor({ coordinates, snackNumber, index }: SnackPropType) {
    this.coordinates = coordinates;
    this.snackNumber = snackNumber;
    this.index = index;
  }

  getIsSelected(): boolean {
    return this.isSelected;
  }

  getToDelete() {
    return this.toDelete;
  }

  getCanSelect() {
    return this.canSelect;
  }

  getIndex() {
    return this.index;
  }

  setCanSelect(canSelect: boolean) {
    this.canSelect = canSelect;
  }

  setToDelete(toDelete: boolean): void {
    this.toDelete = toDelete;
  }

  setIsSelected(isSelected: boolean): void {
    this.isSelected = isSelected;
  }

  getVelocity(): { y: number; x: number } {
    return this.velocity;
  }

  setVelocity(velocity: { y: number; x: number }): void {
    this.velocity = velocity;
  }

  getCoordinates(): { y: number; x: number } {
    return this.coordinates;
  }

  setImage(imageSrc: string): void {
    this.image.src = imageSrc;
  }

  getNumber(): number {
    return this.snackNumber;
  }

  setNumber(snackNumber: number) {
    this.snackNumber = snackNumber;
  }

  getRadius(): number {
    return this.radius;
  }

  setRadius(radius: number): void {
    this.radius = radius;
  }

  getPosition(): { x: number; y: number } {
    return this.position;
  }

  setPosition(position: { x: number; y: number }): void {
    this.position = position;
  }

  isClicked(x: number, y: number): boolean {
    const distance = Math.sqrt(
      (x - (this.position.x + this.radius)) ** 2 +
        (y - (this.position.y + this.radius)) ** 2,
    );
    return distance <= this.radius;
  }

  distanceTo(other: Snack): number {
    return Math.sqrt(
      (this.coordinates.x - other.coordinates.x) ** 2 +
        (this.coordinates.y - other.coordinates.y) ** 2,
    );
  }

  drawSnack(ctx: CanvasRenderingContext2D) {
    if (this.canSelect || this.isSelected) {
      ctx.globalAlpha = 0.5;
    }

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.radius * 2,
      this.radius * 2,
    );

    ctx.globalAlpha = 1;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = `${this.radius}px Dovemayo_gothic`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      String(this.snackNumber),
      this.position.x + this.radius,
      this.position.y + this.radius + this.radius / 3,
    );
  }

  highlightBorder(ctx: CanvasRenderingContext2D, color: string) {
    const centerX = this.position.x + this.radius;
    const centerY = this.position.y + this.radius;

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

export default Snack;
