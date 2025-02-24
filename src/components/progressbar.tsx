import Phaser from 'phaser';

export default class ProgressBar extends Phaser.GameObjects.Container {
  private bgGraphics: Phaser.GameObjects.Graphics;
  private borderGraphics: Phaser.GameObjects.Graphics;
  private progressGraphics: Phaser.GameObjects.Graphics;
  private progress: number = 0; // Ranges from 0 to 1

  private barWidth: number;
  private barHeight: number;
  private borderThickness: number;
  private bgColor: number;
  private borderColor: number;
  private indicatorColor: number;
  private radius: number; // Border radius for rounded corners

  constructor(
    scene: Phaser.Scene,
    barWidth: number = 200,
    barHeight: number = 30,
    borderThickness: number = 4,
    bgColor: number = 0xFFFFFF,
    borderColor: number = 0xDD8C43,
    indicatorColor: number = 0xF7AD0B,
    radius: number = 6 // Default radius for rounded corners
  ) {
    super(scene);

    this.barWidth = barWidth;
    this.barHeight = barHeight;
    this.borderThickness = borderThickness;
    this.bgColor = bgColor;
    this.borderColor = borderColor;
    this.indicatorColor = indicatorColor;
    this.radius = radius;

    // Create graphics objects
    this.bgGraphics = scene.add.graphics();
    this.borderGraphics = scene.add.graphics();
    this.progressGraphics = scene.add.graphics();

    // Draw initial bar
    this.drawBar();

    // Add graphics to container
    this.add([this.borderGraphics, this.bgGraphics, this.progressGraphics]);

    // Add to scene
    scene.add.existing(this);
  }

  private drawBar() {
    // Clear previous drawings
    this.borderGraphics.clear();
    this.bgGraphics.clear();
    this.progressGraphics.clear();

    // Draw border with rounded corners
    this.borderGraphics.lineStyle(this.borderThickness, this.borderColor, 1);
    this.borderGraphics.strokeRoundedRect(-this.barWidth / 2, -this.barHeight / 2, this.barWidth, this.barHeight, this.radius);

    // Draw background with transparency
    this.bgGraphics.fillStyle(this.bgColor, 0.23); // Alpha is set to 0 for full transparency
    this.bgGraphics.fillRoundedRect(
      -this.barWidth / 2 + this.borderThickness,
      -this.barHeight / 2 + this.borderThickness,
      this.barWidth - this.borderThickness * 2,
      this.barHeight - this.borderThickness * 2,
      this.radius
    );

    // Draw progress indicator with rounded corners
    this.updateProgressBar();
  }

  private updateProgressBar() {
    this.progressGraphics.clear();
    this.progressGraphics.fillStyle(this.indicatorColor, 1);
    this.progressGraphics.fillRoundedRect(
      -this.barWidth / 2 + this.borderThickness,
      -this.barHeight / 2 + this.borderThickness,
      (this.barWidth - this.borderThickness * 2) * this.progress,
      this.barHeight - this.borderThickness * 2,
      this.radius
    );
  }

  public setProgress(value: number) {
    this.progress = Phaser.Math.Clamp(value, 0, 1); // Ensure progress is between 0 and 1

    // Animate progress change
    this.scene.tweens.add({
      targets: this.progressGraphics,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        this.updateProgressBar();
      }
    });
  }
}
