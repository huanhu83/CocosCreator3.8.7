# CocosCreator3.8.7
1.输入时字符不能超过限定长度
    修改文件：engine\platforms\minigame\common\engine\Editbox.js
    _registerKeyboardEvent () {
        ...

        cbs.onKeyboardInput = function (res) {
            //#region [自定义]，添加如下代码，输入内容超出限定长度后截断
            if(res.value.length>delegate.maxLength){
                res.value = res.value.substr(0,delegate.maxLength);
            }
            //#endregion

            if (delegate._string !== res.value) {
                delegate._editBoxTextChanged(res.value);
            }
        };

        ...
    }

     _showKeyboard () {
        const delegate = this._delegate;
        const multiline = (delegate.inputMode === EditBoxComp.InputMode.ANY);
        __globalAdapter.showKeyboard({
            defaultValue: delegate.string,
            maxLength: MAX_VALUE, //delegate.maxLength < 0 ? MAX_VALUE : delegate.maxLength, [自定义]
            multiple: multiline,
            confirmHold: false,
            confirmType: getKeyboardReturnType(delegate.returnType),
            success (res) {

            },
            fail (res) {
                cc.warn(res.errMsg);
            },
        });
    },

2.底层渲染报错的保护
    修改文件：engine\cocos\2d\components\graphics.ts
    protected _render(render: IBatcher): void {
        //#region [自定义]，保护渲染报错
        if (!this.getMaterialInstance(0)) {
            return;
        }
        //endregion

        if (this._isNeedUploadData) {
            if (this.impl) {
                const renderDataList = this.impl.getRenderDataList();
                const len = this.model!.subModels.length;
                if (renderDataList.length > len) {
                    for (let i = len; i < renderDataList.length; i++) {
                        this.activeSubModel(i);
                    }
                }
            }
            this._uploadData();
        }

        render.commitModel(this, this.model, this.getMaterialInstance(0));
    }

3.指定文件下载目录，从默认temp到user_path
    修改文件：engine\platforms\minigame\common\engine\AssetManager.js
    function handleZip (url, options, onComplete) {
        const cachedUnzip = cacheManager.cachedFiles.get(url);
        if (cachedUnzip) {
            cacheManager.updateLastTime(url);
            onComplete && onComplete(null, cachedUnzip.url);
        } else if (REGEX.test(url)) {
            //[自定义]，第二个参数指定文件下载到哪个目录，null下载到temp目录
            downloadFile(url, options.downloadPath, options.header, options.onFileProgress, (err, downloadedZipPath) => {
                if (err) {
                    onComplete && onComplete(err);
                    return;
                }
                cacheManager.unzipAndCacheBundle(url, downloadedZipPath, options.__cacheBundleRoot__, onComplete);
            });
        } else {
            cacheManager.unzipAndCacheBundle(url, url, options.__cacheBundleRoot__, onComplete);
        }
    }

4.修复创建目录一直报目录已存在的警告
    修改文件：engine\platforms\minigame\common\engine\cache-manager.js
    makeBundleFolder (bundleName) {
        //[自定义]，创建目录前判断一下目录是否已经存在
        exists(`${this.cacheDir}/${bundleName}`,(isExists)=>{
            if(!isExists){
                makeDirSync(`${this.cacheDir}/${bundleName}`, true);
            }
        });
    },

    PS:需要引入exists
    const {
        getUserDataPath, readJsonSync, makeDirSync,
        writeFileSync, copyFile, downloadFile, deleteFile,
        rmdirSync, unzip, isOutOfStorage,exists,//增加exists
    } = window.fsUtils;

5.删除解压后的zip包
    修改文件：engine\platforms\minigame\common\engine\cache-manager.js
    unzipAndCacheBundle (id, zipFilePath, cacheBundleRoot, onComplete) {
        const time = Date.now().toString();
        const targetPath = `${this.cacheDir}/${cacheBundleRoot}/${time}${suffix++}`;
        const self = this;
        makeDirSync(targetPath, true);
        unzip(zipFilePath, targetPath, (err) => {
            if (err) {
                rmdirSync(targetPath, true);
                if (isOutOfStorage(err.message)) {
                    self.outOfStorage = true;
                    self.autoClear && self.clearLRU();
                }
                onComplete && onComplete(err);
                return;
            }
            self.cachedFiles.add(id, { bundle: cacheBundleRoot, url: targetPath, lastTime: time });
            self.writeCacheFile();
            onComplete && onComplete(null, targetPath);

            //[自定义]，文件解压后，将zip包删除
            exists(zipFilePath, (res) => {
                if (res) {
                    deleteFile(zipFilePath);
                }
            })
        });
    },

6.cocoscreator3.8.7才有的bug
    修改文件：engine\cocos\2d\framework\ui-renderer.ts
    public onDisable(): void {
        this.node.off(NodeEventType.ANCHOR_CHANGED, this._nodeStateChange, this);
        this.node.off(NodeEventType.SIZE_CHANGED, this._nodeStateChange, this);
        this.node.off(NodeEventType.PARENT_CHANGED, this._colorDirty, this);
        // When disabling, it is necessary to free up idle space to fully utilize chunks
        // and avoid breaking batch processing.
        // this._destroyData(); //注释掉这行代码，不然共享材质无法修改属性
        uiRendererManager.removeRenderer(this);
        this._renderFlag = false;
        this._renderEntity.enabled = false;
    }

7.RichText支持Sorting2D
    修改文件：engine\cocos\2d\components\rich-text.ts

    //引入Sorting2D
    import { Sorting2D } from "exports/sorting-2d";

    //增加了第三个参数richTextNode: Node
    function getSegmentByPool(type: string, content: string | SpriteFrame, richTextNode: Node): ISegment | null {
        let seg;
        if (type === RichTextChildName) {
            seg = labelPool._get();
        } else if (type === RichTextChildImageName) {
            seg = imagePool._get();
        }
        node.active = true; // Reset node state when use node
        if (type === RichTextChildImageName) {
            seg.comp = node.getComponent(Sprite) || node.addComponent(Sprite);
            seg.comp.spriteFrame = content as SpriteFrame;
            seg.comp.type = Sprite.Type.SLICED;
            seg.comp.sizeMode = Sprite.SizeMode.CUSTOM;
        } else {
            // RichTextChildName
            seg.comp = node.getComponent(Label) || node.addComponent(Label);
            seg.comp.string = content as string;
            seg.comp.horizontalAlign = HorizontalTextAlignment.LEFT;
            seg.comp.verticalAlign = VerticalTextAlignment.TOP;
            seg.comp.underlineHeight = 2;
        }

        // 为了让RichText支持Sorting2D
        {
            const parentSorting2d = richTextNode.getComponent(Sorting2D);
            if (parentSorting2d) {
                let sorting2d = node.getComponent(Sorting2D) || node.addComponent(Sorting2D);
                sorting2d.sortingLayer = parentSorting2d.sortingLayer;
                sorting2d.sortingOrder = parentSorting2d.sortingOrder;
            }
        }

        node.setPosition(0, 0, 0);
        const trans = node._getUITransformComp()!;
        trans.setAnchorPoint(0.5, 0.5);

        seg.node = node;
        seg.lineCount = 0;
        seg.styleIndex = 0;
        seg.imageOffset = "";
        seg.clickParam = "";
        seg.clickHandler = "";
        return seg as ISegment | null;
    }

8.修复平铺贴图有接缝的BUG(3.8.7)
    修改文件：engine\cocos\2d\assembler\tiled.ts

    注释掉updateRenderData方法中的一句代码：
    // dynamicAtlasManager.packToDynamicAtlas(sprite, frame); //[自定义]，解决平铺贴图有接缝的问题