import IRoundedRectangleGraphics from "./roundedRectangleGraphics.d";

export default function drawRoundedRectangle(obj: IRoundedRectangleGraphics, gr: Phaser.GameObjects.Graphics) {
  // Translate canvas to apply origin-based offset
  gr.translateCanvas(-obj.originX * obj.width, -obj.originY * obj.height);

  const shadowX1 = obj.shadowOffsetLeft < 0 ? 0 : obj.shadowOffsetLeft;
  const shadowY1 = obj.shadowOffsetTop < 0 ? 0 : obj.shadowOffsetTop;
  const shadowX2 = obj.shadowOffsetRight < 0 ? obj.width + obj.shadowOffsetRight : obj.width;
  const shadowY2 = obj.shadowOffsetBottom < 0 ? obj.height + obj.shadowOffsetBottom : obj.height;

  const lw = obj.lineWidth / 2;

  let fillX1 = lw + (obj.shadowOffsetLeft < 0 ? -obj.shadowOffsetLeft : 0);
  let fillY1 = lw + (obj.shadowOffsetTop < 0 ? -obj.shadowOffsetTop : 0);
  let fillX2 = -lw + (obj.shadowOffsetRight < 0 ? obj.width : obj.width - obj.shadowOffsetRight);
  let fillY2 = -lw + (obj.shadowOffsetBottom < 0 ? obj.height : obj.height - obj.shadowOffsetBottom);

  const hasShadow = obj.shadowOffsetLeft !== 0 || obj.shadowOffsetTop !== 0
    || obj.shadowOffsetRight !== 0 || obj.shadowOffsetBottom !== 0;

  // Handle shadow
  if (hasShadow) {
    gr.save();

    gr.fillStyle(obj.shadowColor, obj.shadowAlpha);

    const tl = shadowRadius(obj.radiusTopLeft, shadowX1, shadowY1, fillX1, fillY1);
    const tr = shadowRadius(obj.radiusTopRight, shadowX2, shadowY1, fillX2, fillY1);
    const bl = shadowRadius(obj.radiusBottomLeft, shadowX1, shadowY2, fillX1, fillY2);
    const br = shadowRadius(obj.radiusBottomRight, shadowX2, shadowY2, fillX2, fillY2);

    renderShape(obj, gr,
      shadowX1, shadowY1, shadowX2 - shadowX1, shadowY2 - shadowY1,
      tl, tr, bl, br);

    gr.fillPath();
    gr.restore();
  }

  // Draw the filled and stroked rectangle if needed
  if (obj.isFilled || obj.isStroked) {
    // Apply stroke if needed
    if (obj.isStroked) {
      gr.lineStyle(obj.lineWidth, obj.strokeColor, obj.strokeAlpha);
    }

    // Apply fill
    if (obj.isGradient) {
      gr.fillGradientStyle(...obj.fillGradient);
    } else if (obj.isFilled) {
      gr.fillStyle(obj.fillColor, obj.fillAlpha);
    }

    // Render the shape with specific sides for stroke
    renderShape(obj, gr, fillX1, fillY1, fillX2 - fillX1, fillY2 - fillY1);

    // Fill and stroke paths based on flags
    if (obj.isFilled) {
      gr.fillPath();
    }

    if (obj.isStroked) {
      gr.strokePath();
    }
  }
}

// Calculate shadow radius based on the corner radius and shadow offsets
function shadowRadius(radius: number, x1: number, y1: number, x2: number, y2: number) {
  return radius === 0 ? 0
    : radius + Phaser.Math.Distance.Between(x1, y1, x2, y2) / Phaser.Math.TAU;
}

// Render the shape with specific side strokes
function renderShape(obj: IRoundedRectangleGraphics, gr: Phaser.GameObjects.Graphics,
  x: number, y: number, width: number, height: number,
  tl?: number, tr?: number, bl?: number, br?: number) {

  tl ??= obj.radiusTopLeft;
  tr ??= obj.radiusTopRight;
  bl ??= obj.radiusBottomLeft;
  br ??= obj.radiusBottomRight;

  gr.beginPath();

  // Top-left corner and edge
  gr.moveTo(x + tl, y);
  gr.lineTo(x + width - tr, y);
  gr.arc(x + width - tr, y + tr, tr, -Phaser.Math.TAU, 0, false);

  // Top-right corner and edge
  if (obj.strokeRight) {
    gr.lineTo(x + width, y + height - br);
    gr.arc(x + width - br, y + height - br, br, 0, Phaser.Math.TAU, false);
  }

  // Bottom-right corner and edge
  if (obj.strokeBottom) {
    gr.lineTo(x + bl, y + height);
    gr.arc(x + bl, y + height - bl, bl, Phaser.Math.TAU, Math.PI, false);
  }

  // Bottom-left corner and edge
  if (obj.strokeLeft) {
    gr.lineTo(x, y + tl);
    gr.arc(x + tl, y + tl, tl, -Math.PI, -Phaser.Math.TAU, false);
  }

  gr.closePath();
}
