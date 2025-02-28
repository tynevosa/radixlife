import Menu from "./menu";
import UserDetail from "./user-detail";
import UserHave from "./user-have";
import UserStatus from "./user-status";

class Home extends Phaser.Scene {
  user_have!: UserHave;
  user_detail!: UserDetail;
  menu!: Menu;

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
    this.add.image(0, 0, 'background').setOrigin(0);

    // user_status
    const user_status = new UserStatus(this);
    user_status.setPosition(53, 28);

    this.menu = new Menu(this);
    this.menu.setPosition(664, 46);

    this.user_have = new UserHave(this);
    this.user_have.setPosition(199, 149);

    this.user_detail = new UserDetail(this);
    this.user_detail.setPosition(49, 237);

    this.events.emit("scene-awake");
  }


  preload() {
    this.editorCreate();
  }

  update() {
    this.user_have.update();
    this.user_detail.update();
  }

}

export default Home;
