const templateScript = `
    <div class="header__container">
        <img src="./icons/S7_new_logo.png" class="header__container-logo" alt="">
        <div class="header__container-hrefs-block">
            <a href="/"><i class="fas fa-chart-bar"></i> Statistic</a>
            <a href="/"><i class="fas fa-cog"></i> Settings</a>
        </div>
    </div>
`;

const template = Handlebars.compile(templateScript);

export default template;