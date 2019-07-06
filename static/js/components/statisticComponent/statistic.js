const templateScript = `
    <i class="fas fa-chevron-left statistic-close"></i>
    <p class="statistic-title">Statistic</p>
    <div class="statistic-section">
        <canvas class="statistic-section-graph"></canvas>
    </div>
`;

const template = Handlebars.compile(templateScript);

export default template;