var storage = sessionStorage;
function doFirst() {
    if (storage['additemlist'] == null) {
        //  additemlist由購物車選擇商品它的識別編號用逗號隔開  <value="Pic1:001.JPG:250>，儲存於sessionStorage

        storage['additemlist'] = '';




    }

    var spanButtons = document.querySelectorAll('.subutton');
    // querySelectorAll找全部的.subutton，要用迴圈幫忙seletor(有一堆東西所以是陣列)

    for (var i = 0; i < spanButtons.length; i++) {                                            // for迴圈
        spanButtons[i].addEventListener('click', function () {
            var picinfo = document.querySelector('#' + this.id + ' input').value;
            // function()寫的是click時，要找到某id裡面的input (input前面要加空白)

            addItem(this.id, picinfo);                                                 // 當有勾選，id顯示商品資訊

        }, false);
    }
}
function addItem(itemId, itemValue) {
    var newItem = document.getElementById('newItem');             //先跟畫面產生關連
    if (newItem.hasChildNodes()) {                                    //當有先前的商品資訊要先移除再秀出之後選的商品
        while (newItem.childNodes.length >= 1) {
            newItem.removeChild(newItem.firstChild);
        }

    }
    var img = document.createElement('img');
    img.src = itemValue.split(':')[1];                                 //圖檔位置在其他資料夾時要在最前面用 'images/'                                                                              
    img.id = 'imageSelect';

    var imgTitle = document.createElement('span');                               // 代入標題

    imgTitle.innerHTML = itemValue.split(':')[0];               // split找出字串，若html宣告時有空格也要算為一格

    var imgPrice = document.createElement('div');                                 // 代入價錢
    imgPrice.innerHTML = 'Price : ' + itemValue.split(':')[2];

    document.getElementById('newItem').appendChild(img);
    document.getElementById('newItem').appendChild(imgTitle);
    document.getElementById('newItem').appendChild(imgPrice);


    if (storage[itemId]) {
        alert('');                                                                          // 如果有放入購物車，跳出視窗告知
    } else {
        storage['additemlist'] += (itemId + ',');                              // ','
        storage[itemId] = itemValue;

        var total = 0;                                                                   // 要計算的值,初值給0
        var itemString = storage['additemlist'];
        var items = itemString.substr(0, itemString.length - 1).split(',');
        for (var key in items) {
            var itemInfo = storage[items[key]];
            var price = parseInt(itemInfo.split(':')[2]);
            total += price;

        }
        document.getElementById('itemcount').innerHTML = items.length;
        document.getElementById('subtotal').innerHTML = total;
    }
}

window.addEventListener('load', doFirst, false);