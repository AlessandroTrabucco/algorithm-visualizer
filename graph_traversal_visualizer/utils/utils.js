export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const dragStartHandler = e => {
  let canvas = document.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.left = '-100%';
    document.body.appendChild(canvas);
  }
  e.dataTransfer.setDragImage(canvas, 0, 0);
};
