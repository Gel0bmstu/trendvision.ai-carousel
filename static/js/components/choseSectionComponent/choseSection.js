const templateScript = `
    <div class="main__chose-section-graph">
        <img src="{{imgURL}}" alt="img" class="main__chose-section-graph-image">
    </div>
    <div class="main__chose-section-carousel">
        {{#each tags}}
            <div class="main__chose-section-carousel-item"><p>{{this}}</p></div>
        {{/each}}
    </div>
    <div class="main__chose-section-buttons-section">
        <button class="main__chose-section-buttons-section-button confirm-btn" data-section="confirm"><i class="fas fa-arrow-left" data-section="confirm"></i></button>
        <button class="main__chose-section-buttons-section-button undo-btn" data-section="undo"><i class="fas fa-undo-alt" data-section="undo"></i></button>
        <button class="main__chose-section-buttons-section-button reject-btn" data-section="reject"><i class="fas fa-arrow-right" data-section="reject"></i></button>            
        <button class="main__chose-section-buttons-section-button apply-btn" data-section="apply"><i class="fas fa-check" data-section="apply"></i></button>                        
    </div>
`;

const template = Handlebars.compile(templateScript);

export default function getTemplate(data) {

    for (let i = 0; i < data.tags.length; i++) {
        if (data.tags[i].length > 24 ) {
            console.log(data.tags[i]);
            data.tags[i] = data.tags[i].substr(0, 24) + '...';
        }
    }

    return template(data);
}