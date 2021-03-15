export default class SimpleTile {
    constructor({data, block, config, api}){
        this.data = data
        this.block = block
        this.config = config
        this.api = api
    }

    static get toolbox() {
        return {
            title: 'Simple Tile',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        };
    }

    render() {
        const box = this._make('div', 'simple-tile')
        box.addEventListener('click', (e) => {
            if (e.target.className === 'simple-tile__btn-select') {
                this.modal()
            }
        })
        box.innerHTML = `
            <div class="simple-tile__ui">
                <img
                    class="simple-tile__img"
                    src="https://i.stack.imgur.com/y9DpT.jpg"
                    alt="image"
                >
                <button class="simple-tile__btn-select">
                    Select Your Tile
                </button>
            </div>
        `
        return box
    }

    save(blockContent) {
        return {
            imageUrl: blockContent.querySelector('.simple-tile__modal-img-url').value,
            desc: blockContent.querySelector('.simple-tile__modal-textarea').value
        }
    }

    renderSettings() {
        const settings = [
            {
                name: 'Edit',
                title: 'Edit',
                icon: `<svg class="simple-tile__edit-icon" x="0px" y="0px" width="583.007px" height="583.006px" viewBox="0 0 583.007 583.006" xml:space="preserve"><g><g><polygon points="488.409,267.779 316.246,95.602 287.516,124.293 459.713,296.476 \t\t"/><polygon points="341.511,70.858 513.788,243.155 583.007,173.134 410.733,0.823"/><polygon points="430.857,323.481 403.753,296.389 151.04,548.061 33.469,548.061 33.469,433.516 287.692,180.334 260.549,153.206 0,412.594 0,582.184 171.106,582.184"/><polygon points="121.396,516.848 373.334,265.972 319.12,211.757 67.162,462.629"/></g></g></svg>`
            }
        ];
        const wrapper = document.createElement('div');
        settings.forEach( tune => {
            let button = document.createElement('div');

            button.classList.add('cdx-settings-button');
            button.innerHTML = tune.icon;
            wrapper.appendChild(button);
            button.addEventListener('click', () => {
                this.modal()
            })
        });
        return wrapper;
    }

    _make(tagName, classNames = null, attributes = {}) {
        const el = document.createElement(tagName);
        if (Array.isArray(classNames)) {
            el.classList.add(...classNames);
        } else if (classNames) {
            el.classList.add(classNames);
        }
        for (const attrName in attributes) {
            el[attrName] = attributes[attrName];
        }
        return el;
    }

    modal() {
        const block = this.block.holder.querySelector('.simple-tile')
        const blockUi = this.block.holder.querySelector('.simple-tile__ui')
        const isModalCreated = block.querySelector('.simple-tile__modal')
        if (isModalCreated !== null) {
            this.block.holder.querySelector('.simple-tile__modal').style.display = 'block'
            return
        }
        const modal = this._make('div', 'simple-tile__modal')
        modal.innerHTML = `
            <div class="simple-tile__modal-wrapper">
                <button class="simple-tile__modal-times">&#215;</button>
                <label class="simple-tile__modal-label" for="input">
                    Image url:
                    <input class="simple-tile__modal-img-url" id="input" type="text">
                </label>
                <label class="simple-tile__modal-label" for="textarea">
                    Text description:
                    <textarea class="simple-tile__modal-textarea" name="" id="textarea" cols="30" rows="10"></textarea>
                </label>
                <button class="simple-tile__modal-save">
                    Save
                </button>
            </div>
        `
        block.appendChild(modal)
        modal.addEventListener('click', (e) => {
            if (e.target.className === 'simple-tile__modal-times') {
                this.api.blocks.delete()
            }
            if (e.target.className === 'simple-tile__modal-save') {
                this.api.saver.save().then(outputData => {
                    const img = this._make('img', 'simple-tile__img')
                    const desc = this._make('p', 'simple-tile__desc')
                    img.src = outputData.blocks[this.api.blocks.getCurrentBlockIndex()].data.imageUrl
                    desc.innerText = outputData.blocks[this.api.blocks.getCurrentBlockIndex()].data.desc
                    blockUi.innerHTML = ''
                    blockUi.appendChild(img)
                    blockUi.appendChild(desc)
                })
                modal.style.display = 'none'
            }
        })
    }
}
