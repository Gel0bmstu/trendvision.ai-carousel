const templateScript = `
    <div class="main__reject-bar-title">
        <h1>Reject</h1>
    </div>
    <div class="main__reject-bar-answers"></div>
`;

const template = Handlebars.compile(templateScript);

export default template;
