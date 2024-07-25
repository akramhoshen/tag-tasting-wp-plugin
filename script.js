function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
    
    if (tabId === 'preview') {
        updatePreview();
    } else if (tabId === 'link') {
        generateLink();
    }
}

function updatePreview() {
    const htmlContent = document.getElementById('htmlInput').value;
    const previewFrame = document.getElementById('previewFrame').contentWindow.document;
    previewFrame.open();
    previewFrame.write(htmlContent);
    previewFrame.close();
}

function generateLink() {
    const htmlContent = document.getElementById('htmlInput').value;
    const encodedContent = btoa(unescape(encodeURIComponent(htmlContent))); // Encode to base64
    const link = `${window.location.href.split('?')[0]}?content=${encodedContent}`;
    document.getElementById('generatedLink').value = link;
}

function copyLink() {
    const linkInput = document.getElementById('generatedLink');
    linkInput.select();
    document.execCommand('copy');
}

function loadContentFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get('content');
    if (content) {
        const decodedContent = decodeURIComponent(escape(atob(content))); // Decode from base64
        document.getElementById('htmlInput').value = decodedContent;
        showTab('preview');
    } else {
        showTab('creative');
    }
}

window.onload = loadContentFromURL;
