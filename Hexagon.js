//常量
const SQRT3 = Math.sqrt(3);
const SQRT3_2 = SQRT3 / 2;

class Hexagon {
    side;
    minWidth;
    minHeight;

    constructor(props) {
        this.side = props.side;
        this.minWidth = SQRT3_2 * this.side;//单元宽
        this.minHeight = 1.5 * this.side;//单元高
    }

    //获取六个点坐标
    getHexagonPoints(lon, lat) {
        return [
            [lon + 0, lat + this.side],
            [lon + SQRT3_2 * this.side, lat + 0.5 * this.side],
            [lon + SQRT3_2 * this.side, lat - 0.5 * this.side],
            [lon + 0, lat - this.side],
            [lon - SQRT3_2 * this.side, lat - 0.5 * this.side],
            [lon - SQRT3_2 * this.side, lat + 0.5 * this.side]
        ];
    }

    //获取xy下标
    getSequence(x, y) {
        //最小单元序列
        let ix = Math.floor(x / this.minWidth);
        let jy = Math.floor(y / this.minHeight);

        let type;
        let sy = y / this.minHeight - jy;
        let sx = x / this.minWidth - ix;
        if ((ix + jy) % 2 === 0) {
            if (sy <= 1 / 3) {
                type = 1;
            } else if (sy >= 2 / 3) {
                type = 2;
            } else {
                //侧重1边
                if ((sx * this.minWidth) / ((2 / 3 - sy) * this.minHeight) <= SQRT3) {
                    type = 1;
                } else {
                    type = 2;
                }
            }
        } else {
            if (sy <= 1 / 3) {
                type = 3;
            } else if (sy >= 2 / 3) {
                type = 4;
            } else {
                //侧重3边
                if (((sx * this.minWidth) / ((sy - 1 / 3) * this.minHeight)) < SQRT3) {
                    type = 4;
                } else {
                    type = 3;
                }
            }
        }

        let i = 0;
        let j = 0;
        let d = 0;
        switch (type) {
            case 1:
                j = jy;
                d = j % 2 === 0 ? 0 : 1;
                i = (ix - d) / 2;
                break;
            case 2:
                j = jy + 1;
                d = j % 2 === 0 ? -1 : 0;
                i = (ix - d) / 2;
                break;
            case 3:
                j = jy;
                d = j % 2 === 0 ? -1 : 0;
                i = (ix - d) / 2;
                break;
            case 4:
                j = jy + 1;
                d = j % 2 === 0 ? 0 : 1;
                i = (ix - d) / 2;
                break;
            default:
        }

        return { i, j }
    }

    //获取经纬度
    getPosition(i, j) {
        let offsetX = 0;
        if (j % 2 !== 0) offsetX = this.minWidth;
        let x = i * 2 * this.minWidth + offsetX;
        let y = j * this.minHeight;
        return { x, y }
    }
}

export default Hexagon;