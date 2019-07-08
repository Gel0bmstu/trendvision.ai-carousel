let templateScript;

export default function getTemplate(res, mode) {
    
    if (mode == 'markup') {
        templateScript = `
            <div class="main__confirm-bar-title">
                <h1>Confirm</h1>
            </div>
            <div class="main__confirm-bar-answers"></div>
        `;
    } else {
        templateScript = `
            <div class="main__confirm-bar-title">
                <h1>Confirm</h1>
            </div>
            <div class="main__confirm-bar-answers">
                {{#each confirmed}}
                    <div class="main__chose-section-carousel-item"><p>{{this}}</p></div>
                {{/each}}
            </div>
        `;
    }

    const template = Handlebars.compile(templateScript);
    return template(res);
};