export interface NewApplePropType {
  coordinates: { y: number; x: number };
  appleNumber: number;
}

abstract class NewApple {
  private coordinates: { y: number; x: number };
  private position = { x: 0, y: 0 };
  private velocity = { x: Math.random() * 4 - 2, y: 0 };
  private radius = 0;
  private appleNumber: number;
  private image = new Image();
  private isSelected = false;

  constructor({ coordinates, appleNumber }: NewApplePropType) {
    this.coordinates = coordinates;
    this.appleNumber = appleNumber;
  }

  getIsSelected(): boolean {
    return this.isSelected;
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
    return this.appleNumber;
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

  drawApple(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.radius * 2,
      this.radius * 2,
    );

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = `${this.radius}px Dovemayo_gothic`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      String(this.appleNumber),
      this.position.x + this.radius,
      this.position.y + this.radius + this.radius / 3,
    );
  }

  highlightBorder(ctx: CanvasRenderingContext2D) {
    const centerX = this.position.x + this.radius;
    const centerY = this.position.y + this.radius;

    if (this.isSelected) {
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}

export default NewApple;
