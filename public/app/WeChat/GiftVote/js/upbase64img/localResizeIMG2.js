    /**
     * ���base64
     * @param {Object} obj
     * @param {Number} [obj.width] ͼƬ��Ҫѹ���Ŀ�ȣ��߶Ȼ�������
     * @param {Number} [obj.quality=0.8] ѹ����������ѹ��Ϊ1
     * @param {Function} [obj.before(this, blob, file)] ����ǰ����,thisָ�����input:file
     * @param {Function} obj.success(obj) �������
     * @example
     *
     */
    $.fn.localResizeIMG = function(obj) {
        this.on('change', function() {
            var file = this.files[0];
            var URL = window.URL || window.webkitURL;
            var blob = URL.createObjectURL(file);

            // ִ��ǰ����
            if ($.isFunction(obj.before)) {
                obj.before(this, blob, file)
            };

            _create(blob, file);
            this.value = ''; // �����ʱ����
        });

        /**
         * ����base64
         * @param blob ͨ��file��õĶ�����
         */
        function _create(blob,file) {
            var img = new Image();
            img.src = blob;

            img.onload = function() {
                var that = this;

                //���ɱ���
                var w = that.width,
                    h = that.height,
                    scale = w / h;
                w = obj.width || w;
                h = w / scale;

                //����canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                $(canvas).attr({
                    width: w,
                    height: h
                });
                ctx.drawImage(that, 0, 0, w, h);

                /**
                 * ����base64
                 * �����޸��ƶ��豸��Ҫ����mobileBUGFix.js
                 */
                var base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);

                // �޸�IOS
                if (navigator.userAgent.match(/iphone/i)) {
                    var mpImg = new MegaPixImage(img);
                    mpImg.render(canvas, {
                        maxWidth: w,
                        maxHeight: h,
                        quality: obj.quality || 0.8
                    });
                    base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);
                }

                // �޸�android
                if (navigator.userAgent.match(/Android/i)) {
                    var encoder = new JPEGEncoder();
                    base64 = encoder.encode(ctx.getImageData(0, 0, w, h), obj.quality * 100 || 80);
                }

			var Orientation = '';  
			EXIF.getData(that, function() {
		   
		    EXIF.getAllTags(that); 
		    
		    Orientation = EXIF.getTag(that, 'Orientation');
				
 
				if(Orientation != "" && Orientation != 1){
						 
						switch(Orientation){
						 	case 6://��Ҫ˳ʱ�루����90����ת
						 		 
						 		rotateImg(that,'left',canvas);
						 		break;
						 	case 8://��Ҫ��ʱ�루���ң�90����ת
						 		 
						 		rotateImg(that,'right',canvas);
						 		break;
						 	case 3://��Ҫ180����ת
						 		 
								//rotateImg(that,'right',canvas);//ת����
								rotateImg(that,'right-2',canvas);
								break;
						}
						 
					 base64 = canvas.toDataURL("image/jpeg", 0.8);	
					} 



                // ���ɽ��
                var result = {
                    base64: base64,
                    clearBase64: base64.substr(base64.indexOf(',') + 1)
                };

                // ִ�к���
                obj.success(result);
					 
				});
            };
        }
    };




function rotateImg(img, direction,canvas) {   
		//alert(img);
        //��С�������ת����ͼƬ��ת4�κ�ص�ԭ����  
        var min_step = 0;  
        var max_step = 3;  
        //var img = document.getElementById(pid);  
        if (img == null)return;  
        //img�ĸ߶ȺͿ�Ȳ�����imgԪ�����غ��ȡ����������  
        var height = img.height;  
        var width = img.width;  
        //var step = img.getAttribute('step');  
        var step = 2;  
        if (step == null) {  
            step = min_step;  
        }  
        if (direction == 'right') {  
            step++;  
            //��ת��ԭλ�ã����������ֵ  
            step > max_step && (step = min_step);  
        } else  if (direction == 'right-2') {  
		step=9;  
		}else {  
            step--;  
            step < min_step && (step = max_step);  
        }  
        //img.setAttribute('step', step);  
        /*var canvas = document.getElementById('pic_' + pid);  
        if (canvas == null) {  
            img.style.display = 'none';  
            canvas = document.createElement('canvas');  
            canvas.setAttribute('id', 'pic_' + pid);  
            img.parentNode.appendChild(canvas);  
        }  */
        //��ת�Ƕ��Ի���ֵΪ����  
        var degree = step * 90 * Math.PI / 180;  
        var ctx = canvas.getContext('2d');  
        switch (step) {  
            case 0:  
                canvas.width = width;  
                canvas.height = height;  
                ctx.drawImage(img, 0, 0);  
                break;  
            case 1:  
                canvas.width = height;  
                canvas.height = width;  
                ctx.rotate(degree);  
                ctx.drawImage(img, 0, -height);  
                break;  
            case 2:  
                canvas.width = width;  
                canvas.height = height;  
                ctx.rotate(degree);  
                ctx.drawImage(img, -width, -height);  
                break;  
             case 3:  
                canvas.width = height;  
                canvas.height = width;  
                ctx.rotate(degree);  
                ctx.drawImage(img, -width, 0);  
                break; 
			case 9:  
                canvas.width = width;  
                canvas.height = height;  
                ctx.rotate(180 * Math.PI / 180);  
                ctx.drawImage(img,-width,-height);  
                break;
        }
		 
		 
    } 
    // ����
    /*
    $('input:file').localResizeIMG({
        width: 100,
        quality: 0.1,
        //before: function (that, blob) {},
        success: function (result) {
            var img = new Image();
            img.src = result.base64;

            $('body').append(img);
            console.log(result);
        }
    });
*/