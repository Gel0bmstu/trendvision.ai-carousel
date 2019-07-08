let templateScript;

export default function getTemplate(res, mode) {
    
    if (mode == 'markup') {
        templateScript = `
            <div class="main__reject-bar-title">
                <h1>Reject</h1>
            </div>
            <div class="main__reject-bar-answers"></div>
        `;
    } else {
        templateScript = `
            <div class="main__reject-bar-title">
                <h1>Reject</h1>
            </div>
            <div class="main__reject-bar-answers">
                {{#each rejected}}
                    <div class="main__chose-section-carousel-item"><p>{{this}}</p></div>
                {{/each}}
            </div>
        `;
    }

    const template = Handlebars.compile(templateScript);
    return template(res);
};
