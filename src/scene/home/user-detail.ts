const HEARTS = ['DEAD', 'WOUNDED', 'HUNGRY', 'SICK', 'HEALTHY'];

class UserDetail extends Phaser.GameObjects.Container {
  health_bar: Phaser.GameObjects.Graphics;
  health_bar_value: number;
  health: Phaser.GameObjects.Text;
  health_frame: Phaser.GameObjects.NineSlice;

  constructor(
    scene: Phaser.Scene,
  ) {
    super(scene);
    this.setSize(302, 563);

    // bg
    const bg = scene.add.roundedRectangleGraphics(0, 0, 302, 563, 8.2);
    bg.fillColor = 0x0C0C16;
    this.add(bg);

    // Define container0 (main container)
    const container0 = scene.add.container(63, 27.01); // Position in the scene
    container0.setSize(183, 262.72);

    // Add text at the top of container0
    const text0 = scene.add.text(0, 0, "USERNAME", { "fontFamily": "Irish Grover", "fontSize": "20px" });
    text0.setOrigin(0.5, 0); // Center horizontally

    // Add image 12px below text
    const image0 = scene.add.image(0, 0, "user_avatar_mask");
    const user_avatar = scene.add.image(0, 0, "user_avatar");
    Phaser.Display.Align.To.BottomCenter(image0, text0, 0, 12);
    Phaser.Display.Align.In.Center(user_avatar, image0);

    // Define container00 (sub-container)
    const container00 = scene.add.container(0, text0.height + image0.height + 24); // 12px below image0

    // Add text and image in a horizontal row
    const text1 = scene.add.text(0, 0, "AGE", { "fontFamily": "Irish Grover", "fontSize": "16px" });
    const image1 = scene.add.nineslice(text1.width + 12, 0, "frame_other", undefined, 53.53, 31.62, 5, 5, 5, 5);

    // Center elements in container00
    text1.setOrigin(0, 0.5);
    image1.setOrigin(0, 0.5);

    // Add items to container00
    container00.add([text1, image1]);
    this.resizeContainer(container00);

    // Center container00 in container0
    Phaser.Display.Align.To.BottomCenter(container00, image0, 0, 12);
    container00.x = -(container00.getBounds().width / 2);

    // Add everything to container0
    container0.add([text0, image0, user_avatar, container00]);
    this.resizeContainer(container0);

    // ============================= //

    // container_heath
    const container_heath = scene.add.container(13, container0.getBounds().bottom + 27 + 12);
    container_heath.setSize(276, 56);
    // health_icon
    const health_bar_bg = scene.add.circle(0, 0, 28, 0x0, 0.48);
    health_bar_bg.setOrigin(0, 0.5);
    this.health_bar = scene.add.graphics();
    this.health_bar.setPosition(health_bar_bg.getCenter().x, health_bar_bg.getCenter().y);
    this.health_bar.lineStyle(5, 0xff0000);
    this.health_bar_value = 0;
    scene.tweens.add({
      targets: this,
      health_bar_value: 360,
      duration: 5000,
      ease: 'Linear',
      yoyo: false,
      repeat: -1,
      onUpdate: function (_tween, target) {
        target.updateHealthBar(target.health_bar_value);
      }
    });
    const heart_bg = scene.add.image(0, 0, "green-bg");
    const heart = scene.add.image(0, 0, "heart-pink");
    Phaser.Display.Align.In.Center(heart_bg, health_bar_bg);
    Phaser.Display.Align.In.Center(heart, health_bar_bg);
    // health_frame
    this.health_frame = scene.add.nineslice(67, 0, "frame_progress", undefined, 189.38, 45, 10, 10, 10, 10);
    this.health_frame.setOrigin(0, 0.5);
    // health
    this.health = scene.add.text(0, 0, "HEALTH", { fontFamily: "Irish Grover", fontSize: "20px", color: "#00FF00" })
    Phaser.Display.Align.In.Center(this.health, this.health_frame);
    container_heath.add([health_bar_bg, heart_bg, heart, this.health_bar, this.health_frame, this.health]);
    this.resizeContainer(container_heath)

    // gender container
    const container_gender = scene.add.container(13, container_heath.getBounds().bottom + 27 + 9);
    container_gender.setSize(276, 56);
    // gender_text
    const gender_text = scene.add.text(0, 0, "GENDER", { fontFamily: "Irish Grover", fontSize: "16px" });
    gender_text.setOrigin(0, 0.5);
    // gender_bg
    const gender_bg = scene.add.roundedRectangleGraphics(71, 0, 102, 35);
    gender_bg.radiusTopLeft = 4;
    gender_bg.radiusTopRight = 4;
    gender_bg.radiusBottomLeft = 4;
    gender_bg.radiusBottomRight = 4;
    gender_bg.fillColor = 0xFFFFFF;
    gender_bg.fillAlpha = 0.23;
    gender_bg.isStroked = false;
    gender_bg.setOrigin(0, 0.5);
    // gender
    const gender = scene.add.text(0, 0, "MALE", { fontFamily: "Irish Grover", fontSize: "16px" })
    Phaser.Display.Align.In.Center(gender, gender_bg);
    container_gender.add([gender_text, gender_bg, gender]);
    this.resizeContainer(container_gender);

    // mood container
    const container_mood = scene.add.container(13, container_gender.getBounds().bottom + 27 + 9);
    // mood_text
    const mood_text = scene.add.text(0, 0, "MOOD", { fontFamily: "Irish Grover", fontSize: "16px" });
    mood_text.setOrigin(0, 0.5);
    // mood_frame
    const mood_frame = scene.add.nineslice(71, 0, "frame_other", undefined, 49, 49, 10, 10, 10, 10);
    mood_frame.setOrigin(0, 0.5);
    const mood_icon = scene.add.image(0, 0, "emoji-sick");
    Phaser.Display.Align.In.Center(mood_icon, mood_frame);
    // mood
    const mood = scene.add.text(131, 0, "SAD", { fontFamily: "Irish Grover", fontSize: "16px" });
    mood.setOrigin(0, 0.5);
    container_mood.add([mood_text, mood_frame, mood_icon, mood]);
    this.resizeContainer(container_mood)

    // thought container
    const container_thought = scene.add.container(13, container_mood.getBounds().bottom + 27 + 9);
    // thought_bg
    const thought_bg = scene.add.roundedRectangleGraphics(0, 0, 279, 53);
    thought_bg.fillColor = 0x202020;
    thought_bg.strokeColor = 0xFFFFFF;
    thought_bg.strokeAlpha = 0.32;
    thought_bg.lineWidth = 0.86;
    thought_bg.radiusTopLeft = 8.6;
    thought_bg.radiusTopRight = 8.6;
    thought_bg.radiusBottomLeft = 8.6;
    thought_bg.radiusBottomRight = 8.6;
    thought_bg.setOrigin(0, 0.5);
    // thought_avatar_frame
    const thought_avatar_frame = scene.add.nineslice(5, 2, "frame_avatar", undefined, 48, 48, 1, 1, 1, 1);
    thought_avatar_frame.setOrigin(0, 0.5);
    // thought_avatar
    const thought_avatar = scene.add.image(0, 0, "user_avatar");
    thought_avatar.setDisplaySize(30, 30);
    thought_avatar.setOrigin(0.5);
    Phaser.Display.Align.In.Center(thought_avatar, thought_avatar_frame);
    // thought
    const thought = scene.add.text(65, 0, "WHAT ARE YOUR DESIRE", { fontFamily: "Irish Grover", fontSize: "16px" });
    thought.setOrigin(0, 0.5);
    container_thought.add([
      thought_bg,
      thought_avatar_frame,
      thought_avatar,
      thought
    ]);

    this.add([container0, container_heath, container_gender, container_mood, container_thought]);
    container0.x = bg.width / 2;

    scene.add.existing(this);
  }

  resizeContainer(container: Phaser.GameObjects.Container) {
    const bounds = container.getBounds(); // Get new size
    container.setSize(bounds.width, bounds.height); // Update container size
  }

  updateHealthBar(value: number) {
    if (!this.health_bar) return; // Ensure the object exists

    // Clear previous drawing
    this.health_bar.clear();

    // Define colors
    const color1 = new Phaser.Display.Color(255, 0, 0);  // Red
    const color2 = new Phaser.Display.Color(0, 255, 0);  // Green

    // Interpolate color based on progress
    const interpolatedColor = Phaser.Display.Color.Interpolate.ColorWithColor(
      color1, color2, 360, value
    );

    const hexColor = Phaser.Display.Color.GetColor(
      interpolatedColor.r, interpolatedColor.g, interpolatedColor.b
    );

    // Set line style with interpolated color
    this.health_bar.lineStyle(5, hexColor, 1);
    this.health.setColor(this.hexToColorString(hexColor));
    this.health.setText(HEARTS[Math.floor(value / (360 / HEARTS.length))]);
    Phaser.Display.Align.In.Center(this.health, this.health_frame);

    // Convert degrees to radians
    const startAngle = Phaser.Math.DegToRad(45);
    const endAngle = Phaser.Math.DegToRad(value + 45);

    // Draw the arc (progress bar)
    this.health_bar.beginPath();
    this.health_bar.arc(0, 0, 22, startAngle, endAngle, false);
    this.health_bar.strokePath();
  }

  hexToColorString(hexColor: number) {
    return "#" + hexColor.toString(16).padStart(6, "0");
  }

}

export default UserDetail;
