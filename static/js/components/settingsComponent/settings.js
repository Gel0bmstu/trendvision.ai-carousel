const templateScript = `
    <i class="fas fa-chevron-left settings-close"></i>
    <p class="settings-title">Settings</p>
    <div class="settings__inputs-section">
        <p class="settings__inputs-section-tip">Show only currency</p>
        <input type="checkbox" class="settings__inputs-section-input currency">
        <p class="settings__inputs-section-tip">Show only gems</p>
        <input type="checkbox" class="settings__inputs-section-input gems">
        <p class="settings__inputs-section-tip">Show only companies</p>        
        <input type="checkbox" class="settings__inputs-section-input companies">
    </div>
    <button class="settings-apply-btn" data-section="save"><i class="fas fa-save" data-section="save"></i> Save</button>
`;

const template = Handlebars.compile(templateScript);

export default template;