document.addEventListener("DOMContentLoaded", function() {
    // show specified tab
    function showTab(tabId) {
        var tab = new bootstrap.Tab(document.getElementById(tabId + '-tab'));
        tab.show();
    }

    // update the preview
    function updatePreview() {
        const htmlContent = document.getElementById('htmlInput').value;
        const previewFrame = document.getElementById('previewFrame').contentWindow.document;
        const previewMessage = document.getElementById('previewMessage');

        if (htmlContent.trim() === "") {
            previewFrame.open();
            previewFrame.write("");
            previewFrame.close();
            previewMessage.style.display = "block";
        } else {
            previewFrame.open();
            previewFrame.write(htmlContent);
            previewFrame.close();
            previewMessage.style.display = "none";
        }
    }

    // generate the link
    function generateLink() {
        const htmlContent = document.getElementById('htmlInput').value;
        const linkInput = document.getElementById('generatedLink');
        const copyLinkBtn = document.getElementById('copyLinkBtn')
        const linkMessage = document.getElementById('linkMessage');

        if (htmlContent.trim() === "") {
            linkInput.style.display = "none";
            copyLinkBtn.style.display = "none";
            linkMessage.style.display = "block";
        } else {
            const encodedContent = btoa(unescape(encodeURIComponent(htmlContent))); // Encode to base64
            const link = `${window.location.href.split('?')[0]}?content=${encodedContent}`;
            document.getElementById('generatedLink').value = link;
            linkInput.style.display = "block";
            copyLinkBtn.style.display = "block";
            linkMessage.style.display = "none";
        }
    }

    // copy the generated link
    function copyLink() {
        const linkInput = document.getElementById('generatedLink');
        linkInput.select();
        document.execCommand('copy');
    }

    // load content from URL if present
    function loadContentFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const content = urlParams.get('content');
        if (content) {
            const decodedContent = decodeURIComponent(escape(atob(content))); // Decode from base64
            document.getElementById('htmlInput').value = decodedContent;
            showTab('nav-preview');
            updatePreview();
        } else {
            showTab('nav-creative');
        }
    }

    // refresh the preview
    function refreshPreview() {
        showTab('nav-preview');
        updatePreview();
    }

    // clear the input
    function clearInput() {
        document.getElementById('htmlInput').value = '';
    }

    // Event listeners
    document.getElementById('nav-preview-tab').addEventListener('click', updatePreview);
    document.getElementById('nav-link-tab').addEventListener('click', generateLink);
    document.querySelector('.refresh-btn').addEventListener('click', refreshPreview);
    document.querySelector('.clear-button').addEventListener('click', clearInput);
    document.getElementById('copyLinkBtn').addEventListener('click', copyLink);

    // Load content from URL on page load
    loadContentFromURL();
});