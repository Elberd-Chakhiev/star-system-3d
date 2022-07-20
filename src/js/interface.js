const message = document.getElementById('hideAfterClick')
const hideStyles = 'transition: 1s; bottom: 15vh; opacity: 0; visibility: hidden; pointer-events: none;'



const hideMessage = listener => {
    return document.getElementById('maincanvas').addEventListener(listener, () => message.style.cssText = hideStyles)
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    hideMessage('touchstart')
}else{
    hideMessage('mousedown')
}