export default function getTemplate(admin) {

    let templateScript;

    console.log("template",admin);

    if (admin) {
        templateScript = `
        <div class="header__container">
            <img src="./static/icons/trendvisionLogo.png" class="header__container-logo" alt="logo">
            <div class="header__container-hrefs-block">
                <a class="header__container-hrefs-block-result"><i class="fas fa-download header__container-hrefs-block-result"></i> Result</a>
                <a class="header__container-hrefs-block-upload"><i class="fas fa-upload header__container-hrefs-block-upload"></i> Upload</a>
                <a class="header__container-hrefs-block-statistic"><i class="fas fa-chart-bar"></i> Statistic</a>
                <a class="header__container-hrefs-block-settings"><i class="fas fa-cog"></i> Settings</a>
            </div>
        </div>`
    } else {
        templateScript = `
        <div class="header__container">
            <img src="./static/icons/trendvisionLogo.png" class="header__container-logo" alt="logo">
            <div class="header__container-hrefs-block">
                <a class="header__container-hrefs-block-statistic"><i class="fas fa-chart-bar"></i> Statistic</a>
                <a class="header__container-hrefs-block-settings"><i class="fas fa-cog"></i> Settings</a>
            </div>
        </div>`
    };

    const template = Handlebars.compile(templateScript);
    return template(admin);
}