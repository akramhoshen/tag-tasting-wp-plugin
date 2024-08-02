document.addEventListener("DOMContentLoaded", function() {
    // show specified tab
    function showTab(tabId) {
        var tab = new bootstrap.Tab(document.getElementById(tabId + '-tab'));
        tab.show();
    }

    // update the preview
    // function updatePreview() {
    //     const htmlContent = document.getElementById('htmlInput').value;
    //     const previewFrame = document.getElementById('previewFrame');
    //     const previewMessage = document.getElementById('previewMessage');

    //     if (htmlContent.trim() === "") {
    //         previewFrame.style.display = "none";
    //         previewMessage.style.display = "block";
    //     } else {
    //         previewFrame.style.display = "block";
    //         const frameDocument = previewFrame.contentWindow.document;
    //         frameDocument.open();
    //         frameDocument.write(htmlContent);
    //         frameDocument.close();
    //         previewMessage.style.display = "none";
    //     }
    // }

    function updatePreview() {
        const htmlContent = document.getElementById('htmlInput').value;
        const previewFrame = document.getElementById('previewFrame');
        const previewMessage = document.getElementById('previewMessage');
        const videoContainer = document.getElementById('ad-video');
        const adCompleteMessage = document.getElementById('adCompleteMessage');

        if (htmlContent.trim() === "") {
            previewFrame.style.display = "none";
            previewMessage.style.display = "block";
            videoContainer.style.display = "none";
        } else {
            previewFrame.style.display = "block";
            videoContainer.style.display = "none";
            adCompleteMessage.style.display = "none";

            if (htmlContent.startsWith("http")) {
                // Assuming it's a VAST tag URL
                loadVideo(htmlContent);
            } else {
                const frameDocument = previewFrame.contentWindow.document;
                frameDocument.open();
                frameDocument.write(htmlContent);
                frameDocument.close();
                previewMessage.style.display = "none";
            }
        }
    }

    // Load video ads using Google IMA SDK
    function loadVideo(vastUrl) {
        const videoContainer = document.getElementById('ad-video');
        const adCompleteMessage = document.getElementById('adCompleteMessage');
        videoContainer.style.display = 'block';

        var adDisplayContainer = new google.ima.AdDisplayContainer(
            document.getElementById('preVid'), 
            document.createElement('video')
        );

        adDisplayContainer.initialize();

        var adsLoader = new google.ima.AdsLoader(adDisplayContainer);
        adsLoader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            function(e) {
                var adsManager = e.getAdsManager();

                adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, function() {
                    adCompleteMessage.style.display = 'block';
                });

                adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(e) {
                    console.error('Ad Error:', e.getError());
                });

                try {
                    adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
                    adsManager.start();
                } catch (e) {
                    console.error('Ad could not be started.');
                }
            },
            false
        );

        var adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = vastUrl;

        adsRequest.linearAdSlotWidth = 640;
        adsRequest.linearAdSlotHeight = 360;

        adsLoader.requestAds(adsRequest);
    }

    // generate the link
    async function generateLink() {
        const htmlContent = document.getElementById('htmlInput').value;
        const linkInput = document.getElementById('generatedLink');
        const copyLinkBtn = document.getElementById('copyLinkBtn')
        const linkMessage = document.getElementById('linkMessage');

        if (htmlContent.trim() === "") {
            linkInput.style.display = "none";
            copyLinkBtn.style.display = "none";
            linkMessage.style.display = "block";
        } else {
            try {
                const response = await fetch('store.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: htmlContent })
                });
                const data = await response.json();
                const link = `${window.location.href.split('?')[0]}?content=${data.id}`;
                document.getElementById('generatedLink').value = link;
                linkInput.style.display = "block";
                copyLinkBtn.style.display = "block";
                linkMessage.style.display = "none";
            } catch (error) {
                console.error('Error storing content:', error);
            }
        }
    }

    // copy the generated link
    function copyLink() {
        const linkInput = document.getElementById('generatedLink');
        linkInput.select();
        document.execCommand('copy');
    }

    // load content from URL if present
    async function loadContentFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const contentId = urlParams.get('content');
        if (contentId) {
            try {
                const response = await fetch(`retrieve.php?content=${contentId}`);
                if (response.ok) {
                    const data = await response.json();
                    document.getElementById('htmlInput').value = data.content;
                    showTab('nav-preview');
                    updatePreview();
                } else {
                    console.error('Content not found');
                }
            } catch (error) {
                console.error('Error retrieving content:', error);
            }
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