const templateScript = `
    <i class="fas fa-chevron-left upload-close"></i>
    <p class="upload-title">Upload</p>
    <iframe name="votar" style="display:none;"></iframe>
    <form enctype="multipart/form-data" method="post" class="mainForm" action="/api/upload" target="votar">
        <input type="file" name="f" class="upload-section-input">
        <button type="submit" class="upload-section-send-btn">Send</button>
    </form> 
`;

const template = Handlebars.compile(templateScript);

export default template;