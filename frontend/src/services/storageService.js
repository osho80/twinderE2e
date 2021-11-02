function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    if (!val || val === 'undefined') {
        return null
    }
    return JSON.parse(val)
}

function clear() {
    localStorage.clear();
}

export const storageService = {
    saveToStorage,
    loadFromStorage,
    clear
}