// Mod Editor Management
class ModEditor {
  constructor() {
    this.editor = null
    this.currentMod = null
    this.mods = this.loadMods()
    this.init()
  }

  init() {
    this.setupCodeEditor()
    this.setupControls()
    this.setupModLibrary()
    this.loadDefaultMod()
  }

  setupCodeEditor() {
    const textarea = document.getElementById("code-editor")
    if (textarea && typeof window.CodeMirror !== "undefined") {
      this.editor = window.CodeMirror.fromTextArea(textarea, {
        mode: "lua",
        theme: "monokai",
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      })

      this.editor.setSize("100%", "400px")

      // Auto-save on change
      this.editor.on("change", () => {
        this.autoSave()
      })
    }
  }

  setupControls() {
    // Download button
    const downloadBtn = document.getElementById("download-mod")
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        this.downloadMod()
      })
    }

    // Save button
    const saveBtn = document.getElementById("save-mod")
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        this.saveMod()
      })
    }

    // Mod name and description inputs
    const modNameInput = document.getElementById("mod-name")
    const modDescInput = document.getElementById("mod-description")

    if (modNameInput) {
      modNameInput.addEventListener("input", () => {
        this.updateCurrentMod()
      })
    }

    if (modDescInput) {
      modDescInput.addEventListener("input", () => {
        this.updateCurrentMod()
      })
    }
  }

  downloadMod() {
    if (this.currentMod && this.editor) {
      const modCode = this.editor.getValue()
      const modName = this.currentMod.name || "new_mod"
      const filename = `${modName}.lua`

      const blob = new Blob([modCode], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  saveMod() {
    if (this.currentMod && this.editor) {
      const modCode = this.editor.getValue()
      this.currentMod.code = modCode
      this.currentMod.lastModified = new Date()
      this.saveMods()
      this.populateModLibrary()
      this.showNotification("Mod saved successfully!")
    }
  }

  autoSave() {
    if (this.currentMod && this.editor) {
      const modCode = this.editor.getValue()
      this.currentMod.code = modCode
      this.currentMod.lastModified = new Date()
      this.saveMods()
    }
  }

  updateCurrentMod() {
    if (this.currentMod) {
      const modNameInput = document.getElementById("mod-name")
      const modDescInput = document.getElementById("mod-description")

      if (modNameInput) {
        this.currentMod.name = modNameInput.value
      }

      if (modDescInput) {
        this.currentMod.description = modDescInput.value
      }
    }
  }

  loadMod(modName) {
    const mod = this.mods[modName]
    if (mod && this.editor) {
      this.currentMod = mod
      this.editor.setValue(mod.code)

      const modNameInput = document.getElementById("mod-name")
      const modDescInput = document.getElementById("mod-description")

      if (modNameInput) {
        modNameInput.value = mod.name
      }

      if (modDescInput) {
        modDescInput.value = mod.description
      }
    }
  }

  deleteMod(modName) {
    if (this.mods[modName]) {
      delete this.mods[modName]
      this.saveMods()
      this.populateModLibrary()
      this.loadDefaultMod()
      this.showNotification("Mod deleted successfully!")
    }
  }

  loadDefaultMod() {
    const modNames = Object.keys(this.mods)
    if (modNames.length > 0) {
      this.loadMod(modNames[0])
    } else {
      this.createNewMod()
    }
  }

  createNewMod() {
    const newModName = "new_mod_" + Date.now()
    this.currentMod = {
      name: "New Mod",
      description: "A new mod",
      code: "-- Your mod code here",
      lastModified: new Date(),
    }
    this.mods[newModName] = this.currentMod
    this.saveMods()
    this.populateModLibrary()
    this.loadMod(newModName)
  }

  loadMods() {
    try {
      const modsData = localStorage.getItem("tropikMods")
      return modsData ? JSON.parse(modsData) : {}
    } catch (error) {
      console.error("Error loading mods from localStorage:", error)
      return {}
    }
  }

  saveMods() {
    try {
      localStorage.setItem("tropikMods", JSON.stringify(this.mods))
    } catch (error) {
      console.error("Error saving mods to localStorage:", error)
    }
  }

  populateModLibrary() {
    const modLibrary = document.getElementById("mod-library")
    if (modLibrary) {
      modLibrary.innerHTML = "" // Clear existing list

      for (const modName in this.mods) {
        if (this.mods.hasOwnProperty(modName)) {
          const mod = this.mods[modName]
          const listItem = document.createElement("li")
          listItem.textContent = mod.name
          listItem.classList.add("mod-item")

          // Load button
          const loadButton = document.createElement("button")
          loadButton.textContent = "Load"
          loadButton.classList.add("load-button")
          loadButton.addEventListener("click", () => {
            this.loadMod(modName)
          })
          listItem.appendChild(loadButton)

          // Delete button
          const deleteButton = document.createElement("button")
          deleteButton.textContent = "Delete"
          deleteButton.classList.add("delete-button")
          deleteButton.addEventListener("click", () => {
            this.deleteMod(modName)
          })
          listItem.appendChild(deleteButton)

          modLibrary.appendChild(listItem)
        }
      }
    }
  }

  setupModLibrary() {
    this.populateModLibrary()

    const createModBtn = document.getElementById("create-mod")
    if (createModBtn) {
      createModBtn.addEventListener("click", () => {
        this.createNewMod()
      })
    }
  }

  showNotification(message) {
    const notification = document.getElementById("notification")
    notification.textContent = message
    notification.style.display = "block"

    setTimeout(() => {
      notification.style.display = "none"
    }, 3000) // Hide after 3 seconds
  }
}

// Initialize Mod Editor
document.addEventListener("DOMContentLoaded", () => {
  new ModEditor()
})
