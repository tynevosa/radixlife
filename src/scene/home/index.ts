import { DEFAULT_SCENE_HEIGHT, DEFAULT_SCENE_WIDTH } from "../../const/ui";
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
    this.background = this.add.image(0, 0, 'background').setOrigin(0);

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
