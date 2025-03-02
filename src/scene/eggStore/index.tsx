import Phaser from 'phaser';
import BuyEggModal from './buy';
import HatchEggModal from './hatch';
import { fetchRemainingEggsCount } from '../../api/eggStore';
import { DEFAULT_SCENE_HEIGHT, FONT_COLOR_PRIMARY } from '../../const/ui';
// import { dAppToolkit } from '../../utils/radix';
import { SendTransactionResult } from '../../const/type';
import Label from '../../components/label';
import { showRadixButton } from '../../utils/radix';

class Egg extends Phaser.GameObjects.Sprite {
  constructor(scene: EggStore, x: number, y: number, eggTexture: string) {
    super(scene, x, y, eggTexture);

    // Add egg button to scene
    scene.add.existing(this);

    // Enable input
    this.setInteractive({ useHandCursor: true });

    // Event Listeners
    this.on('pointerdown', () => {
      this.setScale(0.8);
    }, this);
    this.on('pointerup', () => {
      this.setScale(1);
      scene.showBuyEggModal();
    }, this);
  }
}

class EggContainer extends Phaser.GameObjects.Container {
  posInPercent: { x: number, y: number } = { x: 0, y: 0 };
  constructor(scene: Phaser.Scene, x: number, y: number,
  ) {
    super(scene, 0, 0);
    this.posInPercent = { x, y };
    scene.add.existing(this);
  }
}

class EggStore extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;
  private eggsCount: string = '1000';
  private buyEggModal!: BuyEggModal;
  private hatchEggModal!: HatchEggModal;
  // private connectButton!: Phaser.GameObjects.Container;
  private nameplate!: Label;
  private eggContainers: EggContainer[] = [];

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

  constructor() {
    super({ key: 'EggStore' });
  }

  preload() {
    this.load.image('scene-eggStore-bg', '/scene/eggStore/bg.png'); // Background
    this.load.image('egg', '/scene/eggStore/egg.png'); // Egg
    this.load.image('glow', '/scene/eggStore/glow.png'); // Glow effect
    this.load.image('buy-egg-modal', '/scene/eggStore/buy-egg-modal.png');
    this.load.image('modal-close', '/scene/eggStore/modal-close.png');
    this.load.image('hatch-egg-modal', '/scene/eggStore/hatch-egg-modal.png');
    this.load.image('scene-eggStore-nameplate', '/scene/eggStore/nameplate.png'); // Nameplate
    this.load.image('scene-eggStore-shelf', '/scene/eggStore/shelf.png');
    this.load.image('scene-eggStore-table', '/scene/eggStore/table.png');
    this.load.image('scene-eggStore-cushion1', '/scene/eggStore/cushion1.png');
    this.load.image('scene-eggStore-cushion2', '/scene/eggStore/cushion2.png');
    this.load.image('scene-eggStore-cushion3', '/scene/eggStore/cushion3.png');
    this.load.image('scene-eggStore-cushion4', '/scene/eggStore/cushion4.png');
    this.load.image('scene-eggStore-board', '/scene/eggStore/board.png');
    this.load.image('scene-eggStore-piece', '/scene/eggStore/piece.png');
    this.load.image('scene-eggStore-pricePanel', '/scene/eggStore/price-panel.png');
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
    this.background = this.add.image(0, 0, 'scene-eggStore-bg').setOrigin(0, 0);
    this.buyEggModal = new BuyEggModal(this);

    // Namepalte
    this.nameplate = new Label(
      this,
      0, 0,
      'scene-eggStore-nameplate',
      new Phaser.GameObjects.Text(this, 0, 0, 'EGG STORE',
        { fontFamily: 'Irish Grover', fontSize: '50.93px', color: FONT_COLOR_PRIMARY }
      ),
      undefined, undefined,
      0.4, 0.4,
    );

    const shelf = new EggContainer(this, 0.4, 0.5);
    shelf.add(new Phaser.GameObjects.Image(this, 0, 0, 'scene-eggStore-shelf'));
    shelf.add(new Egg(
      this,
      18, -162,
      'egg',
    ))
    shelf.add(new Egg(
      this,
      18, 0,
      'egg',
    ))

    const cushion3 = new EggContainer(this, 0.75, 0.75);
    cushion3.add(new Phaser.GameObjects.Image(this, 0, 0, 'scene-eggStore-cushion3'));
    cushion3.add(new Egg(
      this,
      -120, -60,
      'egg',
    ))

    const table2 = new EggContainer(this, 0.42, 0.78);
    table2.add(new Phaser.GameObjects.Image(this, 0, 0, 'scene-eggStore-table'));
    table2.add(new Egg(
      this,
      -15, -112,
      'egg',
    ))

    const cushion4 = new EggContainer(this, 0.85, 0.85);
    cushion4.add(new Phaser.GameObjects.Image(this, 0, 0, 'scene-eggStore-cushion4'));
    cushion4.add(new Egg(
      this,
      0, -95,
      'egg',
    ))

    const table1 = new EggContainer(this, 0.08, 0.85);
    table1.add(new Phaser.GameObjects.Image(this, 0, 0, 'scene-eggStore-table').setScale(1.4));
    table1.add(new Egg(
      this,
      -35, -142,
      'egg',
    ))

    const cushion2 = new EggContainer(this, 0.55, 0.9);
    cushion2.add(new Phaser.GameObjects.Image(this, 0, 0, 'scene-eggStore-cushion2'));
    cushion2.add(new Egg(
      this,
      30, -60,
      'egg',
    ))

    const cushion1 = new EggContainer(this, 0.44, 0.9);
    cushion1.add(new Phaser.GameObjects.Image(this, 0, 0, 'scene-eggStore-cushion1'));
    cushion1.add(new Egg(
      this,
      0, -60,
      'egg',
    ))

    const board = new EggContainer(this, 0.75, 0.2);
    board.add(new Label(
      this,
      0, 0,
      'scene-eggStore-board',
      new Phaser.GameObjects.Text(this, 0, 0, 'Total number of egg remaining',
        { fontFamily: 'Irish Grover', fontSize: '17px', color: '#B45A1E' }
      ),
      board,
      undefined, undefined,
      0.5, 0.22,
    ))
    this.eggsCount.split('').forEach((num, index) => {
      board.add(new Label(
        this,
        70 + index * 61, 90,
        'scene-eggStore-piece',
        new Phaser.GameObjects.Text(this, 0, 0, num,
          { fontFamily: 'Irish Grover', fontSize: '57.93px', color: FONT_COLOR_PRIMARY }
        ),
        board,
      ))
    })
    board.add(new Label(
      this,
      90, 160,
      'scene-eggStore-pricePanel',
      new Phaser.GameObjects.Text(this, 0, 0, '1 EGG = 300XRD',
        { fontFamily: 'Irish Grover', fontSize: '21.63px', color: FONT_COLOR_PRIMARY }
      ),
      board,
    ))

    this.eggContainers.push(...[
      shelf,
      table2,
      cushion3,
      cushion4,
      table1,
      cushion2,
      cushion1,
      board,
    ]);

    // this.connectButton = this.add.container(this.scale.width / 2, this.scale.height / 2);
    // const domElement = this.add.dom(0, 0).createFromHTML(`
    //   <div style="width: 206px; height: 55px;">
    //     <radix-connect-button />
    //   </div>
    // `);
    // this.connectButton.add(domElement);
    // dAppToolkit.buttonApi.setMode('dark');
    showRadixButton(true);

    this.onResize();
    // Adjust positions and scale on window resize
    this.scale.on('resize', this.onResize, this);
  }

  private onResize = () => {
    const { width, height } = this.scale;
    this.background.setDisplaySize(width, height);
    const scaleFactor = height / DEFAULT_SCENE_HEIGHT;

    this.nameplate.setScale(scaleFactor);
    this.eggContainers.forEach(container => {
      container.setScale(scaleFactor);
      container.setPosition(container.posInPercent.x * width, container.posInPercent.y * height);
    });

    // const buttonScaleFactor = Math.sqrt(scaleFactor);
    // this.connectButton.setScale(buttonScaleFactor);
    // this.connectButton.setPosition(this.background.displayWidth - 236 * buttonScaleFactor, 45 * buttonScaleFactor);
  };

  public showBuyEggModal = () => {
    this.buyEggModal.show();
    this.buyEggModal.on('bought', (res: SendTransactionResult) => {
      this.onBuyEgg(res);
    });
  }

  private onBuyEgg = (res: SendTransactionResult) => {
    if (res.isOk()) {
      this.hatchEggModal = new HatchEggModal(this, 30, 30); // Temporarily set 30 seconds
      this.hatchEggModal.show();
      this.hatchEggModal.on('hatched', () => {
        this.tweens.add({
          targets: this.cameras.main,
          scaleX: 0.5,
          scaleY: 0.5,
          alpha: 0,
          duration: 500,
          onComplete: () => {
            this.scene.switch('Home');
          }
        });
      });
    } else {
      console.error('Buy Egg: ', res.error);
    }
  }
}

export default EggStore;
