/*
 Copyright (c) 2020-2023 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { ccclass, disallowMultiple, editable, executeInEditMode, executionOrder, help, menu, serializable, tooltip } from 'cc.decorator';
import { EDITOR_NOT_IN_PREVIEW, JSB } from 'internal:constants';
import { Component } from '../../scene-graph/component';
import { clamp } from '../../core';

/**
 * @en
 * Set the UI transparency component.
 * This component can be used to influence subsequent render nodes.
 * Nodes that already have a rendering component can modify the alpha channel of color directly.
 *
 * @zh
 * UI 透明度设置组件。可以通过该组件设置透明度来影响后续的渲染节点。已经带有渲染组件的节点可以直接修改 color 的 alpha 通道。
 */
@ccclass('cc.UIOpacity')
@help('i18n:cc.UIOpacity')
@executionOrder(110)
@menu('UI/UIOpacity')
@executeInEditMode
@disallowMultiple
export class UIOpacity extends Component {
    constructor () {
        super();
    }

    /**
     * @en
     * The transparency value of the impact.
     *
     * @zh
     * 透明度。
     */
    @editable
    @tooltip('i18n:UIOpacity.opacity')
    get opacity (): number {
        return this._opacity;
    }

    set opacity (value) {
        if (this._opacity === value) {
            return;
        }
        value = clamp(value, 0, 255);
        this._opacity = value;
        this._syncLocalOpacity(value / 255);

        if (EDITOR_NOT_IN_PREVIEW) {
            setTimeout(() => {
                EditorExtends.Node.emit('change', this.node.uuid, this.node);
            }, 200);
        }
    }

    @serializable
    protected _opacity = 255;

    public onEnable (): void {
        this._syncLocalOpacity(this._opacity / 255);
    }

    public onDisable (): void {
        this._syncLocalOpacity(1);
    }

    private _syncLocalOpacity (localOpacity: number): void {
        this.node._uiProps.localOpacity = localOpacity;
    }
}
