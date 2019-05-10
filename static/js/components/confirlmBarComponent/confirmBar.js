const templateScript = `
    <div class="main__confirm-bar-title">
        <h1>Confirm</h1>
    </div>
    <div class="main__confirm-bar-answers"></div>
`;

const template = Handlebars.compile(templateScript);

export default template;