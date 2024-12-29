const generateButton = document.getElementById("generateButton");
const copyButton = document.getElementById("copyButton");
const noticeDiv = document.getElementById("notice");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// const symbols = "!@#$%^&*()_+=-`~[]\{}|;':\",.<>?";
let intervalId = 0;

document.addEventListener("DOMContentLoaded", () => {
    console.log("random string generator");
    ranStr.init();
});

const ranStr = {   
    init : function() {

        generateButton.addEventListener("click", () => {
            ranStr.generateString();
        });

        copyButton.addEventListener("click", () => {
            ranStr.copyToClipboard();
        });

    },
    isSymbolsChecked : function() {
        let useSymbols = document.getElementById("symbolCheck").checked;
        return useSymbols;
    },
    generateString : function() {
        let length = parseInt(document.getElementById("length").value);
        let symbols = document.getElementById("symbols").value
        let char = characters;
        if (ranStr.isSymbolsChecked()) {
            char += symbols;
        }
        let result = "";
        for (let i = 0; i < length; i++) {
            result += char.charAt(Math.floor(Math.random() * char.length));
        }
        document.getElementById("result").value = result;    
    },
    copyToClipboard : function() {
        const textarea = document.getElementById("result");
        textarea.select();
        let randomString = textarea.value;
        if(randomString === "") {
            ranStr.noticeCopyText("no string!");
            return;
        }
        try{
            document.execCommand("copy");
        }catch(ex) {
            prompt("Copy to clipboard: Ctrl+C, Enter", randomString);
        }
        ranStr.noticeCopyText("copy!");
    },
    noticeCopyText : function(text) {
        noticeDiv.innerHTML = text;
        intervalId = setInterval(ranStr.clearCopyText, 2000);
    },
    clearCopyText : function() {
        noticeDiv.innerHTML = "";
        clearInterval(intervalId);
    }
}