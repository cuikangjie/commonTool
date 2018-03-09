// create 2018-3-9 by Kin

const icondown = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALBAMAAACNJ7BwAAAAG1BMVEUAAAD////////////////////////////////rTT7CAAAACHRSTlMAMxDzyzwoGOAihncAAAA6SURBVAjXYygUhAIxBpUOKDBlYPKAsJoDGIDCUEEGoDBMECgMFQQLQwTBwmBBqDBIECoMFIQJC4BIAFB8GFOdHQ6yAAAAAElFTkSuQmCC';
const iconclose = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALBAMAAABbgmoVAAAAJFBMVEUAAAChoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaHZa8SpAAAAC3RSTlMA2c0aEfjIuzInMRFlLq4AAAA3SURBVAjXY2gzYGBwb2CoFmZg0U5gcNpoAERApqS2MAMDg9PWjQZAijM6igHGg8pBVUL1QU0BAEuSDzv8P9BQAAAAAElFTkSuQmCC';

export default function MapOverLay({template, isShowClose, closeFun, point, x, y, divClass}) {
  this._point = point;
  this._template = template || '';
  this._closeFun = closeFun;
  this._x = x || 18;
  this._y = y || 27;
  this._divClass = divClass || 'map_info_tip';
  this.isShowClose = isShowClose || false;
}

MapOverLay.prototype = new BMap.Overlay();

MapOverLay.prototype.initialize = function(map) {
  this._map = map;
  var div = this._div = document.createElement("div");
  div.style.position = "absolute";
  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
  div.className = this._divClass;

  div.innerHTML = this._template;
  let that = this;

  // 向下的箭头


  if(this.isShowClose){
    let close = this._arrow = document.createElement("div");
    close.style.background = `url(${iconclose}) no-repeat`;
    close.style.position = "absolute";
    close.style.width = "12px";
    close.style.height = "12px";
    close.style.top = "5px";
    close.style.right = "5px";
    close.style.overflow = "hidden";
    div.appendChild(close);
    close.onclick = (event)=>{
      event.stopPropagation();
      typeof that._closeFun === 'function' && that._closeFun()
    }

    close.ondblclick = (event)=>{
      event.stopPropagation();
    }
  }

  // 向下的箭头
  var arrow = this._arrow = document.createElement("div");
  arrow.style.background = `url(${icondown}) no-repeat`;
  arrow.style.position = "absolute";
  arrow.style.width = "20px";
  arrow.style.height = "10px";
  arrow.style.bottom = "-10px";
  arrow.style.left = "10px";
  arrow.style.overflow = "hidden";
  div.appendChild(arrow);

  // 弹框事件处理
  div.ondblclick = (event)=>{
    event.stopPropagation();
  }

  this._map.getPanes().labelPane.appendChild(div);

  return div;
}

MapOverLay.prototype.draw = function() {
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x - parseInt(this._arrow.style.left) - this._x + "px";
  if(pixel.y > 0){
    this._div.style.bottom = '-' +   (pixel.y - this._y) + 'px'
  }else{
    this._div.style.bottom =   -(pixel.y - this._y) + 'px'
  }

}
