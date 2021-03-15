<template>
  <div class="editorjs">
    <h1 class="editorjs__title">
      EditorJS
      <a class="editorjs__link" href="https://editorjs.io" target="_blank">
        https://editorjs.io
      </a>
      <img src="" alt="">
    </h1>
    <div class="editorjs__container">
      <div>
        <h2 class="editorjs__block-title">
          Editor:
        </h2>
        <div
            id="editorjs"
            class="editorjs__editor"
        />
      </div>
      <div>
        <h2 class="editorjs__block-title">
          Output:
        </h2>
        <div class="editorjs__output">
          <pre>{{ JSON.stringify(editorOutput, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import List from '@editorjs/list'
import SimpleTile from '@/editorJsPlugins/SimpleTile'
import '@/assets/simple-tile.scss'

export default {
  name: 'EditorJs',
  data() {
    return {
      editorOutput: {}
    }
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const editor = new EditorJS({
      holder: 'editorjs',
      autofocus: true,
      placeholder: 'Let`s write something incredible!',
      tools: {
        list: {
          class: List,
          inlineToolbar: true
        },
        simpleTile: {
          class: SimpleTile
        }
      },
      onChange: () => {
        editor.save().then((outputData) => {
          this.editorOutput = outputData
        }).catch((error) => {
          this.editorOutput = error
        });
      }
    })
  }
}
</script>

<style lang="scss">
.editorjs {
  margin: 2rem;
  &__title {
    margin-bottom: 40px;
    display: grid;
  }
  &__link {
    margin-top: 10px;
    font-size: 17px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
  &__container {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-gap: 2rem;
  }
  &__block-title {
    text-align: left;
  }
  &__editor {
    box-shadow: 0 0 3px rgba(0,0,0,0.12), 0 0 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    background: #fff;
    border-radius: 2px;
    display: block;
    position: relative;
    text-align: left;
    padding: 1rem;
  }
  &__output {
    box-shadow: 0 0 3px rgba(0,0,0,0.12), 0 0 2px rgba(0,0,0,0.24);
    position: relative;
    display: block;
    padding: 2rem;
    text-align: left;
    background: #fff;
  }
}
</style>
