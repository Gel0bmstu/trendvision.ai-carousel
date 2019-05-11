const templateScript = `
    <i class="fas fa-chevron-left settings-close"></i>
    <p class="settings-title">Settings</p>
    <div class="settings__inputs-section">
        <p class="settings__inputs-section-tip">Change initial URL</p>
        <input type="text" class="settings__inputs-section-input init">
        <p class="settings__inputs-section-tip">Change apply URL</p>
        <input type="text" class="settings__inputs-section-input apply">
        <p class="settings__inputs-section-tip">Change statistic URL</p>        
        <input type="text" class="settings__inputs-section-input statistic">
    </div>
    <button class="settings-apply-btn" data-section="save"><i class="fas fa-save" data-section="save"></i> Save</button>
`;

const template = Handlebars.compile(templateScript);

export default template;