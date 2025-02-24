import Phaser from 'phaser';
import { DEFAULT_SCENE_HEIGHT } from '../../const/ui';

export default class TimerBlock extends Phaser.GameObjects.Container {
  private hourBlock: TimeUnitBox;
  private minuteBlock: TimeUnitBox;
  private secondBlock: TimeUnitBox;

  constructor(scene: Phaser.Scene, time: number) {
    super(scene);

    const { height } = scene.scale;
    const scaleFactor = height / DEFAULT_SCENE_HEIGHT;

    // Create time unit blocks
    this.hourBlock = new TimeUnitBox(this.scene, "00").setScale(scaleFactor);
    this.hourBlock.setPosition(-108 * scaleFactor, 0);

    this.minuteBlock = new TimeUnitBox(this.scene, "00").setScale(scaleFactor);
    this.minuteBlock.setPosition(0, 0);

    this.secondBlock = new TimeUnitBox(this.scene, "00").setScale(scaleFactor);
    this.secondBlock.setPosition(108 * scaleFactor, 0);

    // Create colons
    const colon1 = new Colon(this.scene).setPosition(-54 * scaleFactor, 0).setScale(scaleFactor);
    const colon2 = new Colon(this.scene).setPosition(54 * scaleFactor, 0).setScale(scaleFactor);

    // Create labels
    const textHr = scene.add.text(-108 * scaleFactor, 48 * scaleFactor, 'Hr', {
      fontFamily: 'Irish Grover',
      fontSize: '16px',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5).setScale(scaleFactor);

    const textMin = scene.add.text(0, 48 * scaleFactor, 'Min', {
      fontFamily: 'Irish Grover',
      fontSize: '16px',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5).setScale(scaleFactor);

    const textSec = scene.add.text(108 * scaleFactor, 48 * scaleFactor, 'Sec', {
      fontFamily: 'Irish Grover',
      fontSize: '16px',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5).setScale(scaleFactor);

    // Add elements to the container
    this.add([this.hourBlock, this.minuteBlock, this.secondBlock, colon1, colon2, textHr, textMin, textSec]);

    // Add to scene
    scene.add.existing(this);

    // Initialize with the correct time
    this.updateTime(time);
  }

  public updateTime(time: number) {
    // Convert time to HH:MM:SS format
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const secs = (time % 60).toString().padStart(2, '0');

    // Update text content in each block
    this.hourBlock.setText(hours);
    this.minuteBlock.setText(minutes);
    this.secondBlock.setText(secs);
  }
}

class TimeUnitBox extends Phaser.GameObjects.Container {
  private bgGraphics: Phaser.GameObjects.Graphics;
  private text: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    content: string = "00",
    width: number = 68,
    height: number = 62,
    borderThickness: number = 2,
    borderRadius: number = 4,
    textColor: string = "#FFFFFF",
    bgColor: number = 0x202020,
    borderColor: number = 0xFFFFFF
  ) {
    super(scene);

    // Create graphics object
    this.bgGraphics = scene.add.graphics();
    this.drawBackground(width, height, borderThickness, borderRadius, bgColor, borderColor);

    // Create text object
    this.text = scene.add.text(0, 0, content, {
      fontFamily: 'Irish Grover',
      fontSize: '24px',
      color: textColor,
      align: 'center'
    }).setOrigin(0.5);

    // Add everything to container
    this.add([this.bgGraphics, this.text]);

    // Add to scene
    scene.add.existing(this);
  }

  // Method to update text dynamically
  public setText(newContent: string) {
    this.text.setText(newContent);
  }

  private drawBackground(
    width: number,
    height: number,
    borderThickness: number,
    borderRadius: number,
    bgColor: number,
    borderColor: number
  ) {
    this.bgGraphics.clear();

    // Draw rounded background
    this.bgGraphics.fillStyle(bgColor, 1);
    this.bgGraphics.fillRoundedRect(-width / 2, -height / 2, width, height, borderRadius);

    // Draw top border
    this.bgGraphics.fillStyle(borderColor, 0.32);
    this.bgGraphics.fillRoundedRect(-width / 2, -height / 2, width, borderThickness, { tl: borderRadius, tr: borderRadius, bl: 0, br: 0 });

    // Draw bottom border
    this.bgGraphics.fillRoundedRect(-width / 2, height / 2 - borderThickness, width, borderThickness, { tl: 0, tr: 0, bl: borderRadius, br: borderRadius });
  }
}

class Colon extends Phaser.GameObjects.Graphics {
  constructor(scene: Phaser.Scene) {
    super(scene);

    // Define colors
    const borderColor = 0xFFFFFF; // Gray border
    const backgroundColor = 0x202020; // Black background

    const radius = 4;

    // Draw border (slightly larger circle)
    this.lineStyle(1, borderColor, 0.32);
    this.strokeCircle(0, -8, radius + 1);
    this.fillStyle(backgroundColor, 1);
    this.fillCircle(0, -8, radius);

    this.lineStyle(1, borderColor, 0.32);
    this.strokeCircle(0, 8, radius + 1);
    this.fillStyle(backgroundColor, 1);
    this.fillCircle(0, 8, radius);

    scene.add.existing(this);
  }
}