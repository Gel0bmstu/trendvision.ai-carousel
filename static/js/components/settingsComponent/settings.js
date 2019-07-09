let templateScript

export default function getTemplate(admin) {
    if (admin) {
        templateScript = `
            <i class="fas fa-chevron-left settings-close"></i>
            <p class="settings-title">Settings</p>
            <div class="settings__inputs-section">
                <p class="settings__inputs-section-tip mode-title">Chose mode:</p>
                <form class="settings__inputs-section-form">
                    <input type="radio" class="settings__inputs-section-input validate" name="mode">Validate </br>
                    <input type="radio" class="settings__inputs-section-input markup" name="mode">Markup </br>
                </form>
                <hr class="settings__inputs-section-hr">
                <p class="settings__inputs-section-tip">Show only global graphics</p>
                <input type="checkbox" class="settings__inputs-section-input currency">
                <p class="settings__inputs-section-tip">Show only global shifts</p>
                <input type="checkbox" class="settings__inputs-section-input currency">
                <p class="settings__inputs-section-tip">Show only trends</p>
                <input type="checkbox" class="settings__inputs-section-input gems">
                <p class="settings__inputs-section-tip">Show only industries</p>        
                <input type="checkbox" class="settings__inputs-section-input companies">
            </div>
            <button class="settings-apply-btn" data-section="save"><i class="fas fa-save" data-section="save"></i> Save</button>
        `;
    } else {
        templateScript = `
            <i class="fas fa-chevron-left settings-close"></i>
            <p class="settings-title">Settings</p>
            <div class="settings__inputs-section">
                <p class="settings__inputs-section-tip">Show only global graphics</p>
                <input type="checkbox" class="settings__inputs-section-input currency">
                <p class="settings__inputs-section-tip">Show only global shifts</p>
                <input type="checkbox" class="settings__inputs-section-input currency">
                <p class="settings__inputs-section-tip">Show only trends</p>
                <input type="checkbox" class="settings__inputs-section-input gems">
                <p class="settings__inputs-section-tip">Show only industries</p>        
                <input type="checkbox" class="settings__inputs-section-input companies">
            </div>
            <button class="settings-apply-btn" data-section="save"><i class="fas fa-save" data-section="save"></i> Save</button>
        `;
    }

    const template = Handlebars.compile(templateScript);
    return template();
}