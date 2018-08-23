let imageSrc;
const xIndent = 40;
const yIndent = 40;
const gapSize = 20
let counterX = 0;
let counterY = 0;
let diameter = 6 * 43;
let numOfImagesInRow = Math.floor((904 - xIndent) / (diameter + gapSize));

const can = document.getElementById('can').getContext('2d');
can.fillStyle = '#FFF';
can.fillRect(0, 0, 904, 1280);

const onFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const img = document.getElementById('img');
    reader.onload = (event) => {
        img.src = event.target.result;
        imageSrc = event.target.result;
    }
    reader.readAsDataURL(file);
};

const onDiameterInput = (event) => {
    diameter = parseFloat(event.target.value) * 43;
    numOfImagesInRow = Math.floor((904 - xIndent) / (diameter + gapSize));
};

const clearCan = () => {
    counterX = counterY = 0;
    can.clearRect(0, 0, 904, 1280);
    can.fillStyle = '#FFF';
    can.fillRect(0, 0, 904, 1280);
};

const addImageToList = () => {
    if (!imageSrc) {
        return;
    }
    const image = new Image();
    image.src = imageSrc;
    const gapX = counterX !== 0 ? gapSize : 0;
    const gapY = counterY !== 0 ? gapSize : 0;

    const hwRatio = image.height / image.width;
    const whRatio = image.width / image.height;

    const isImgHorizontal = whRatio > 1;
    const hdRatio = image.height / diameter;
    const wdRatio = image.width / diameter;
    can.drawImage(
        image,
        xIndent + diameter*counterX + gapX*counterX + (!isImgHorizontal ? (diameter - image.width/hdRatio) / 2 : 0),
        yIndent + diameter*counterY + gapY*counterY + (isImgHorizontal ? (diameter - image.height/wdRatio) / 2 : 0),
        diameter*hwRatio > diameter ? diameter*whRatio : diameter,
        diameter*hwRatio > diameter ? diameter : diameter*hwRatio
    );
    ++counterX;
    if (counterX === numOfImagesInRow) {
        counterX = 0;
        ++counterY;
    }
}

