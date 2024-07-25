document.addEventListener("DOMContentLoaded", function() {
    // Function to show the specified tab
    function showTab(tabId) {
        var tab = new bootstrap.Tab(document.getElementById(tabId + '-tab'));
        tab.show();
    }

    // Function to update the preview
    function updatePreview() {
        const htmlContent = document.getElementById('htmlInput').value;
        const previewFrame = document.getElementById('previewFrame').contentWindow.document;
        previewFrame.open();
        previewFrame.write(htmlContent);
        previewFrame.close();
    }

    // Function to generate the link
    function generateLink() {
        const htmlContent = document.getElementById('htmlInput').value;
        const encodedContent = btoa(unescape(encodeURIComponent(htmlContent))); // Encode to base64
        const link = `${window.location.href.split('?')[0]}?content=${encodedContent}`;
        document.getElementById('generatedLink').value = link;
    }

    // Function to copy the generated link
    function copyLink() {
        const linkInput = document.getElementById('generatedLink');
        linkInput.select();
        document.execCommand('copy');
    }

    // Function to load content from URL if present
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

    // Function to refresh the preview
    function refreshPreview() {
        showTab('nav-preview');
        updatePreview();
    }

    // Function to clear the input
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
