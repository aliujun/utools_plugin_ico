<template>
    <div class="converter">
        <div class="drop-zone" @drop.prevent="handleDrop" @dragover.prevent @dragenter.prevent>
            <div v-if="!imageUrl">
                拖拽图片到此处或点击选择图片
                <input type="file" @change="handleFileSelect" accept="image/*" class="file-input" />
            </div>
            <img v-else :src="imageUrl" class="preview" />
        </div>

        <div class="controls" v-if="imageUrl">
            <div class="sizes">
                <label v-for="size in availableSizes" :key="size">
                    <input type="checkbox" v-model="selectedSizes" :value="size" />
                    {{ size }}x{{ size }}
                </label>
            </div>

            <button @click="convertImage" :disabled="!selectedSizes.length">转换为ICO</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: null,
            imagePath: null,
            availableSizes: [16, 32, 48, 64, 128],
            selectedSizes: [32]
        }
    },

    methods: {
        handleDrop(e) {
            const file = e.dataTransfer.files[0]
            this.handleFile(file)
        },

        handleFileSelect(e) {
            const file = e.target.files[0]
            this.handleFile(file)
        },

        handleFile(file) {
            if (file && file.type.startsWith('image/')) {
                this.imagePath = file.path
                this.imageUrl = URL.createObjectURL(file)
            }
        },

        async convertImage() {
            try {
                const icoBuffer = await window.convertToIco(this.imagePath, this.selectedSizes)

                // 使用包装后的API
                const savePath = await window.uToolsUtils.showSaveDialog({
                    title: '保存ICO文件',
                    defaultPath: 'icon.ico',
                    filters: [{ name: 'ICO Files', extensions: ['ico'] }]
                })

                if (savePath) {
                    await window.saveFile(icoBuffer, savePath)
                    window.uToolsUtils.showNotification('转换成功！')
                }
            } catch (error) {
                window.uToolsUtils.showNotification('转换失败：' + error.message)
            }
        }
    }
}
</script>

<style scoped>
.converter {
    padding: 20px;
}

.drop-zone {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    min-height: 200px;
    position: relative;
}

.preview {
    max-width: 200px;
    max-height: 200px;
}

.file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

.controls {
    margin-top: 20px;
}

.sizes {
    margin-bottom: 10px;
}

.sizes label {
    margin-right: 10px;
}

button {
    padding: 8px 16px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background: #ccc;
}
</style>
