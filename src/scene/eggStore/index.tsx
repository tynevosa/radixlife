import Phaser from 'phaser';
import BuyEggModal from './buy';
import HatchEggModal from './hatch';
import { fetchRemainingEggsCount } from '../../api/eggStore';
import { DEFAULT_SCENE_HEIGHT, DEFAULT_SCENE_WIDTH } from '../../const/ui';
import { dAppToolkit } from '../../utils/radix';
import { SendTransactionResult } from '../../const/type';

class EggStoreScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;
  private eggs: { egg: Phaser.GameObjects.Image; glow: Phaser.GameObjects.Image; }[] = [];
  private numbers: Phaser.GameObjects.Text[] = [];
  private eggsCount: string = '1000';
  private buyEggModal!: BuyEggModal;
  private hatchEggModal!: HatchEggModal;
  private connectButton!: Phaser.GameObjects.Container;

  // Egg positions based on default background dimensions
  private eggPositions = [
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
    super({ key: 'EggStoreScene' });
  }

  preload() {
    this.load.image('background', '/scene/eggStore/background.png'); // Background
    this.load.image('egg', '/scene/eggStore/egg.png'); // Egg
    this.load.image('glow', '/scene/eggStore/glow.png'); // Glow effect
    this.load.image('buy-egg-modal', '/scene/eggStore/buy-egg-modal.png');
    this.load.image('modal-close', '/scene/eggStore/modal-close.png');
    this.load.image('hatch-egg-modal', '/scene/eggStore/hatch-egg-modal.png');
  }

  async create() {
    // Fetch remaining eggs count
    const remainingEggsCount = await fetchRemainingEggsCount();
    this.eggsCount = remainingEggsCount.toString().padStart(4, '0');

    // If the remaining eggs count is less than the maximum number of eggs to display on the scene,
    // slice the eggPositions array to only include positions corresponding to the remaining eggs count.
    if (remainingEggsCount < this.eggPositions.length) {
      this.eggPositions = this.eggPositions.slice(0, remainingEggsCount);
    }

    // Background image
    this.background = this.add.image(0, 0, 'background').setOrigin(0.5, 0);
    this.buyEggModal = new BuyEggModal(this);
    this.connectButton = this.add.container(this.scale.width / 2, this.scale.height / 2);
    const domElement = this.add.dom(0, 0).createFromHTML(`
      <div style="width: 206px; height: 55px;">
        <radix-connect-button />
      </div>
    `);
    this.connectButton.add(domElement);
    dAppToolkit.buttonApi.setMode('dark');

    this.onResize();

    // Adjust positions and scale on window resize
    this.scale.on('resize', this.onResize, this);
  }

  private showRemainingEggsCount = (count: string) => {
    const bgWidth = this.background.displayWidth;
    const bgHeight = this.background.displayHeight;
    const scaleFactor = bgWidth / DEFAULT_SCENE_WIDTH;

    this.numbers.forEach((char) => char.destroy());
    // Add numbers with the required font and styles
    count.split('').forEach((num, index) => {
      // Calculate number position relative to the background
      const numX = this.background.x - bgWidth / 2 + (this.numPositions[index].x * bgWidth / DEFAULT_SCENE_WIDTH);
      const numY = this.background.y + (this.numPositions[index].y * bgHeight / DEFAULT_SCENE_HEIGHT);
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
    const scaleFactor = bgWidth / DEFAULT_SCENE_WIDTH;

    this.eggs.forEach((egg) => {
      egg.egg.destroy();
      egg.glow.destroy();
    });
    // Create eggs and glow effects
    this.eggPositions.forEach((pos) => {
      // Position the egg based on scaled coordinates
      const eggX = this.background.x - bgWidth / 2 + (pos.x * bgWidth) / DEFAULT_SCENE_WIDTH;
      const eggY = this.background.y + (pos.y * bgHeight) / DEFAULT_SCENE_HEIGHT;

      // Glow effect (initially hidden)
      const glow = this.add.image(0, 0, 'glow')
        .setOrigin(0.5)
        .setAlpha(0); // Start as invisible

      // Egg image
      const egg = this.add.image(0, 0, 'egg')
        .setOrigin(0.5)
        .setInteractive({ cursor: 'pointer' });

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
        egg.setScale(egg.scale * 1.1);
        this.time.delayedCall(100, () => egg.setScale(egg.scale / 1.1));
        this.buyEggModal.show();
        this.buyEggModal.on('bought', (res: SendTransactionResult) => {
          this.onBuyEgg(res);
        });
      });

      // Store both egg & glow
      this.eggs.push({ egg, glow });
    });
  }

  private onResize = () => {
    const { width, height } = this.scale;
    this.background.displayHeight = height;
    this.background.scaleX = this.background.scaleY;
    this.background.x = width / 2;
    const scaleFactor = height / DEFAULT_SCENE_HEIGHT;

    this.showRemainingEggsCount(this.eggsCount);
    this.showEggs();
    this.connectButton.setScale(scaleFactor);
    this.connectButton.setPosition(this.background.x + this.background.displayWidth / 2 - 133 * scaleFactor, 72 * scaleFactor);
  };

  private onBuyEgg = (res: SendTransactionResult) => {
    if (res.isOk()) {
      this.hatchEggModal = new HatchEggModal(this, 30, 30); // Temporarily set 30 seconds
      this.hatchEggModal.show();
      this.hatchEggModal.on('hatched', () => {
        // Procedure after egg hatched goes here...
      });
    } else {
      console.error('Buy Egg: ', res.error);
    }
  }
}

export default EggStoreScene;
