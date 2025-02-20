import Phaser from 'phaser';

class HomeScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;
  private eggs: { egg: Phaser.GameObjects.Image; glow: Phaser.GameObjects.Image; }[] = [];
  private numbers: Phaser.GameObjects.Text[] = [];
  private eggsCount: string = '1000';

  // Default width & height of the background
  private readonly defaultBgWidth = 1440;
  private readonly defaultBgHeight = 1024;

  // Egg positions based on default background dimensions
  private readonly eggPositions = [
    { x: 93, y: 723, scale: 1 }, // Absolute position on default size
    { x: 551, y: 702, scale: 1 },
    { x: 561, y: 891, scale: 1 },
    { x: 958, y: 889, scale: 1 },
    { x: 559, y: 381, scale: 1 },
    { x: 556, y: 543, scale: 1 },
    { x: 1268, y: 803, scale: 1 },
    { x: 1038, y: 670, scale: 1 },
  ];

  // Default first number position relative to background
  private readonly numPositions = [
    { x: 1160, y: 358, size: 52 },
    { x: 1223, y: 358, size: 52 },
    { x: 1284, y: 358, size: 52 },
    { x: 1351, y: 358, size: 52 },
  ];

  constructor() {
    super({ key: 'HomeScene' });
  }

  preload() {
    this.load.image('background', '/scene/home/background.png'); // Background
    this.load.image('egg', '/scene/home/egg.png'); // Egg
    this.load.image('glow', '/scene/home/glow.png'); // Glow effect
  }

  create() {
    // Background image
    this.background = this.add.image(0, 0, 'background').setOrigin(0.5, 0);
    this.resizeBackground();

    this.showEggs();
    this.showRemainingEggsCount(this.eggsCount);

    // Adjust positions and scale on window resize
    this.scale.on('resize', this.resizeScene, this);
  }

  private showRemainingEggsCount = (count: string) => {
    const bgWidth = this.background.displayWidth;
    const bgHeight = this.background.displayHeight;
    const scaleFactor = bgWidth / this.defaultBgWidth;

    this.numbers.forEach((char) => char.destroy());
    // Add numbers with the required font and styles
    count.split('').forEach((num, index) => {
      // Calculate number position relative to the background
      const numX = this.background.x - bgWidth / 2 + (this.numPositions[index].x * bgWidth / this.defaultBgWidth);
      const numY = this.background.y + (this.numPositions[index].y * bgHeight / this.defaultBgHeight);
      const numSize = this.numPositions[index].size * scaleFactor;

      const number = this.add.text(numX, numY, num, {
        fontFamily: 'Irish Grover',
        fontSize: `${numSize}px`,
        color: '#720E20', // Set base number color
        fontStyle: 'normal',
        align: 'center',
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
      }).setOrigin(0.5);
      // Apply shadow effects (inset and outer shadow approximation)
      number.setShadow(0, 3.33 * scaleFactor, '#3A1C0A', 0 * scaleFactor, true, false); // Inset-like effect
      number.setShadow(0, 1.26 * scaleFactor, '#D94A2B', 1 * scaleFactor, false, true); // Outer shadow

      this.numbers.push(number);
    })

  }

  private showEggs = () => {
    const bgWidth = this.background.displayWidth;
    const bgHeight = this.background.displayHeight;
    const scaleFactor = bgWidth / this.defaultBgWidth;

    this.eggs.forEach((egg) => {
      egg.egg.destroy();
      egg.glow.destroy();
    });
    // Create eggs and glow effects
    this.eggPositions.forEach((pos) => {
      // Position the egg based on scaled coordinates
      const eggX = this.background.x - bgWidth / 2 + (pos.x * bgWidth) / this.defaultBgWidth;
      const eggY = this.background.y + (pos.y * bgHeight) / this.defaultBgHeight;

      // Glow effect (initially hidden)
      const glow = this.add.image(0, 0, 'glow')
        .setOrigin(0.5)
        .setAlpha(0); // Start as invisible

      // Egg image
      const egg = this.add.image(0, 0, 'egg')
        .setOrigin(0.5)
        .setInteractive(); // Make it clickable

      // Set position of the egg
      egg.setPosition(eggX, eggY);
      glow.setPosition(eggX, eggY);

      // Scale the egg based on the background's scale factor
      egg.setScale(scaleFactor * pos.scale);
      glow.setScale(scaleFactor * pos.scale);

      // Hover effect (Show glow)
      egg.on('pointerover', () => {
        glow.setAlpha(1); // Show glow
      });

      // Remove hover effect (Hide glow)
      egg.on('pointerout', () => {
        glow.setAlpha(0); // Hide glow
      });

      // Click event
      egg.on('pointerdown', () => {
        console.log('Egg clicked!');
        egg.setScale(egg.scale * 1.1);
        this.time.delayedCall(100, () => egg.setScale(egg.scale / 1.1));
      });

      // Store both egg & glow
      this.eggs.push({ egg, glow });
    });
  }

  private resizeBackground = () => {
    const { width, height } = this.scale;
    this.background.displayHeight = height;
    this.background.scaleX = this.background.scaleY;
    this.background.x = width / 2;
  };

  private resizeScene = () => {
    this.resizeBackground();
    this.showRemainingEggsCount(this.eggsCount);
    this.showEggs();
  };
}

export default HomeScene;
