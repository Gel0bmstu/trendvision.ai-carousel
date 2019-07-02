const templateScript = `
    <i class="fas fa-chevron-left upload-close"></i>
    <p class="upload-title">Upload</p>
    <iframe name="votar" style="display:none;"></iframe>
    <div class="upload__input-form">
        <form enctype="multipart/form-data" method="post" class="upload__input-form-section" action="/api/upload" target="votar">
            <input type="file" name="f" class="upload__input-form-section-file">
            <button type="submit" class="upload__input-form-section-send-btn">Send</button>
        </form>
    </div>
`;

const template = Handlebars.compile(templateScript);

export default template;