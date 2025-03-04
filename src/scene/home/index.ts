import { DEFAULT_SCENE_HEIGHT, DEFAULT_SCENE_WIDTH } from "../../const/ui";
import { isMobile, isPortrait } from "../../utils/other";
import { showRadixButton } from "../../utils/radix";
import Bank from "./bank";
import BuyEgg from "./buy-egg";
import Character from "./character";
import Choice from "./choice";
import Item from "./item";
import Jail from "./jail";
import Job from "./job";
import Menu from "./menu";
import Occupation from "./occupation";
import School from "./school";
import Store from "./store";
import UserDetail from "./user-detail";
import UserHave from "./user-have";
import UserStatus from "./user-status";

class Home extends Phaser.Scene {
  background!: Phaser.GameObjects.Image;
  user_status!: UserStatus;
  user_have!: UserHave;
  user_detail!: UserDetail;
  menu!: Menu;
  bank!: Bank;
  buy_egg!: BuyEgg;
  school!: School;
  jail!: Jail;
  choice!: Choice;
  store!: Store;
  item!: Item;
  job!: Job;
  occupation!: Occupation;
  character!: Character;

  constructor() {
    super({ key: 'Home' });
  }

  editorCreate(): void {
    // Override the add.image method
    const originalAddImage = this.add.image;
    this.add.image = function (x, y, texture) {
      const image = originalAddImage.call(this, x, y, texture);
      image.setOrigin(0, 0); // Set origin to top-left
      return image;
    };

    // background
    this.background = this.add.image(0, 0, 'background').setOrigin(0).setScrollFactor(0);

    this.user_status = new UserStatus(this);
    this.user_status.setPosition(53, 28);

    this.menu = new Menu(this);
    this.menu.setPosition(664, 46);

    this.user_have = new UserHave(this);
    this.user_have.setPosition(199, 149);

    this.user_detail = new UserDetail(this);
    this.user_detail.setPosition(49, 237);

    this.bank = new Bank(this);
    this.bank.setPosition(386, 249);

    this.buy_egg = new BuyEgg(this);
    this.buy_egg.setPosition(121, 813);

    this.school = new School(this);
    this.school.setPosition(745, 157);

    this.jail = new Jail(this);
    this.jail.setPosition(745, 447);

    this.choice = new Choice(this);
    this.choice.setPosition(1083, 148);

    this.store = new Store(this);
    this.store.setPosition(1083, 469);

    this.item = new Item(this);
    this.item.setPosition(773, 738);

    this.job = new Job(this);
    this.job.setPosition(423, 642);

    this.occupation = new Occupation(this);
    this.occupation.setPosition(1110, 790);

    this.character = new Character(this);
    this.character.setPosition(977, 52);

    showRadixButton(true);

    this.events.emit("scene-awake");

    this.onResize();
    // Adjust positions and scale on window resize
    this.scale.on('resize', this.onResize, this);
  }

  private onResize = () => {
    const { width, height } = this.scale;
    this.background.setDisplaySize(width, height);
    const scaleFactorHeight = height / DEFAULT_SCENE_HEIGHT;
    const scaleFactorWidth = width / DEFAULT_SCENE_WIDTH;


    if (isMobile()) {
      if (isPortrait()) {
        // Set camera bounds to match the world
        this.cameras.main.setBounds(0, 0, width, 2000 * scaleFactorHeight);
        // Enable camera drag with mouse/touch
        this.input.on("pointermove", (pointer: { isDown: any; x: number; prevPosition: { x: number; y: number; }; y: number; }) => {
          if (pointer.isDown) {
            this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x);
            this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y);
          }
        });

        const scaleFactorHeightMobilePortrait = width / 706;
        this.user_status.setScale(scaleFactorHeightMobilePortrait);
        this.user_have.setScale(scaleFactorHeightMobilePortrait);
        this.user_detail.setScale(scaleFactorHeightMobilePortrait);
        this.menu.setScale(scaleFactorHeightMobilePortrait);
        this.bank.setScale(scaleFactorHeightMobilePortrait);
        this.buy_egg.setScale(scaleFactorHeightMobilePortrait);
        this.school.setScale(scaleFactorHeightMobilePortrait);
        this.jail.setScale(scaleFactorHeightMobilePortrait);
        this.choice.setScale(scaleFactorHeightMobilePortrait);
        this.store.setScale(scaleFactorHeightMobilePortrait);
        this.item.setScale(scaleFactorHeightMobilePortrait);
        this.job.setScale(scaleFactorHeightMobilePortrait);
        this.occupation.setScale(scaleFactorHeightMobilePortrait);
        this.character.setScale(scaleFactorHeightMobilePortrait);

        this.menu.setPosition(53 * scaleFactorHeightMobilePortrait, 46 * scaleFactorHeightMobilePortrait);
        this.character.setPosition(330 * scaleFactorHeightMobilePortrait, 52 * scaleFactorHeightMobilePortrait);
        this.user_status.setPosition(53 * scaleFactorHeightMobilePortrait, 148 * scaleFactorHeightMobilePortrait);
        this.user_have.setPosition(199 * scaleFactorHeightMobilePortrait, 269 * scaleFactorHeightMobilePortrait);
        this.user_detail.setPosition(30 * scaleFactorHeightMobilePortrait, 360 * scaleFactorHeightMobilePortrait);
        this.bank.setPosition(360 * scaleFactorHeightMobilePortrait, 360 * scaleFactorHeightMobilePortrait);
        this.school.setPosition(360 * scaleFactorHeightMobilePortrait, 764 * scaleFactorHeightMobilePortrait);
        this.jail.setPosition(360 * scaleFactorHeightMobilePortrait, 1056 * scaleFactorHeightMobilePortrait);
        this.choice.setPosition(360 * scaleFactorHeightMobilePortrait, 1348 * scaleFactorHeightMobilePortrait);
        this.store.setPosition(360 * scaleFactorHeightMobilePortrait, 1658 * scaleFactorHeightMobilePortrait);
        this.job.setPosition(80 * scaleFactorHeightMobilePortrait, 943 * scaleFactorHeightMobilePortrait);
        this.occupation.setPosition(30 * scaleFactorHeightMobilePortrait, 1290 * scaleFactorHeightMobilePortrait);
        this.item.setPosition(30 * scaleFactorHeightMobilePortrait, 1500 * scaleFactorHeightMobilePortrait);
        this.buy_egg.setPosition(80 * scaleFactorHeightMobilePortrait, 1850 * scaleFactorHeightMobilePortrait);
      } else {
        this.user_detail.convertLayout(true);
        const scaleFactorHeightMobileLandscape = height / 800;
        const scaleFactorWidthMobileLandscape = width / 1440;

        this.user_status.setScale(scaleFactorWidthMobileLandscape);
        this.user_have.setScale(scaleFactorWidthMobileLandscape);
        this.menu.setScale(scaleFactorWidthMobileLandscape);
        this.character.setScale(scaleFactorWidthMobileLandscape);

        this.user_detail.setScale(530 * scaleFactorHeightMobileLandscape / 302);
        this.bank.setScale(530 * scaleFactorHeightMobileLandscape / 378);
        this.school.setScale(530 * scaleFactorHeightMobileLandscape / 272);
        this.jail.setScale(530 * scaleFactorHeightMobileLandscape / 272);
        this.store.setScale(530 * scaleFactorHeightMobileLandscape / 290);
        this.choice.setScale(530 * scaleFactorHeightMobileLandscape / 290);
        this.buy_egg.setScale(530 * scaleFactorHeightMobileLandscape / 200);
        this.occupation.setScale(530 * scaleFactorHeightMobileLandscape / 183);
        this.job.setScale(530 * scaleFactorHeightMobileLandscape / 300);
        this.item.setScale(530 * scaleFactorHeightMobileLandscape / 288);

        this.user_status.setPosition(53 * scaleFactorWidth, 28 * scaleFactorHeight);
        this.user_have.setPosition(570 * scaleFactorWidth, 80 * scaleFactorHeight);
        this.menu.setPosition(780 * scaleFactorWidth, 80 * scaleFactorHeight);
        this.character.setPosition(1070 * scaleFactorWidth, 90 * scaleFactorHeight);
        const container = this.add.container(53, 230 * scaleFactorHeightMobileLandscape);
        var containerWidth = 2000;
        var containerX = 0;
        this.input.on("pointermove", (pointer: { isDown: any; x: number; prevPosition: { x: number; }; }) => {
          if (pointer.isDown) {
            containerX += (pointer.x - pointer.prevPosition.x);
            // Keep container within bounds
            containerX = Phaser.Math.Clamp(containerX, -containerWidth, 0);
            container.setX(containerX);
          }
        });

        this.user_detail.setPosition(49 * 180 / 302, 0);
        this.bank.setPosition(680 * 180 / 302, 0);
        this.school.setPosition(949 * 180 / 302, 0);
        this.jail.setPosition(1300 * 180 / 302, 0);
        this.store.setPosition(1650 * 180 / 302, 0);
        this.choice.setPosition(2000 * 180 / 302, 0);
        this.job.setPosition(2400 * 180 / 302, 0);
        this.occupation.setPosition(2670 * 180 / 302, 0);
        this.item.setPosition(3150 * 180 / 302, 0);
        this.buy_egg.setPosition(3500 * 180 / 302, 0);
        container.add([
          this.user_detail,
          this.bank,
          this.buy_egg,
          this.school,
          this.jail,
          this.choice,
          this.store,
          this.item,
          this.job,
          this.occupation,
        ])
      }
    } else {
      this.user_status.setScale(scaleFactorHeight);
      this.user_have.setScale(scaleFactorHeight);
      this.user_detail.setScale(scaleFactorHeight);
      this.menu.setScale(scaleFactorHeight);
      this.bank.setScale(scaleFactorHeight);
      this.buy_egg.setScale(scaleFactorHeight);
      this.school.setScale(scaleFactorHeight);
      this.jail.setScale(scaleFactorHeight);
      this.choice.setScale(scaleFactorHeight);
      this.store.setScale(scaleFactorHeight);
      this.item.setScale(scaleFactorHeight);
      this.job.setScale(scaleFactorHeight);
      this.occupation.setScale(scaleFactorHeight);
      this.character.setScale(scaleFactorHeight);

      this.user_status.setPosition(53 * scaleFactorWidth, 28 * scaleFactorHeight);
      this.menu.setPosition(664 * scaleFactorWidth, 46 * scaleFactorHeight);
      this.user_have.setPosition(199 * scaleFactorWidth, 149 * scaleFactorHeight);
      this.user_detail.setPosition(49 * scaleFactorWidth, 237 * scaleFactorHeight);
      this.bank.setPosition(386 * scaleFactorWidth, 249 * scaleFactorHeight);
      this.buy_egg.setPosition(121 * scaleFactorWidth, 813 * scaleFactorHeight);
      this.school.setPosition(745 * scaleFactorWidth, 157 * scaleFactorHeight);
      this.jail.setPosition(745 * scaleFactorWidth, 447 * scaleFactorHeight);
      this.choice.setPosition(1083 * scaleFactorWidth, 148 * scaleFactorHeight);
      this.store.setPosition(1083 * scaleFactorWidth, 469 * scaleFactorHeight);
      this.item.setPosition(773 * scaleFactorWidth, 738 * scaleFactorHeight);
      this.job.setPosition(423 * scaleFactorWidth, 642 * scaleFactorHeight);
      this.occupation.setPosition(1110 * scaleFactorWidth, 790 * scaleFactorHeight);
      this.character.setPosition(977 * scaleFactorWidth, 52 * scaleFactorHeight);
    }

  };

  preload() {
    this.editorCreate();
  }

  update() {
    this.user_have.update();
    this.user_detail.update();
  }

}

export default Home;
