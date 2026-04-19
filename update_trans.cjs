const fs = require('fs');

const tsPath = './data/translations.ts';
let tsContent = fs.readFileSync(tsPath, 'utf8');

const jsonPath = './data/content.json';
let jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const newKeysAr = {
    'gallery.placeholder.p1': 'تندرج هذه المبادرة في إطار الجهود المتواصلة لتعزيز التنمية المجالية وتقليص الفوارق الاجتماعية، وذلك تنفيذا للتوجيهات الملكية السامية الداعية إلى الاهتمام بالعنصر البشري وتوفير شروط العيش الكريم للمواطنين. وقد عبأت المبادرة الوطنية للتنمية البشرية كافة الموارد اللازمة لإنجاح هذا الورش، بتنسيق تام مع مختلف الشركاء والفاعلين المحليين.',
    'gallery.placeholder.p2': 'ويأتي هذا المشروع استجابة للحاجيات الملحة للساكنة، حيث سيمكن من تحسين مؤشرات التنمية البشرية بالمنطقة، وتسهيل الولوج إلى الخدمات الأساسية. كما سيساهم في خلق دينامية اقتصادية واجتماعية، تعود بالنفع على مختلف الفئات المستهدفة، وخاصة الشباب والنساء والأشخاص في وضعية هشاشة.',
    'programs.stats.projects_done': 'مشروع متكامل',
    'programs.stats.beneficiaries': 'مستفيد ومستفيدة'
};

const newKeysFr = {
    'gallery.placeholder.p1': "Cette initiative s'inscrit dans le cadre des efforts continus visant à renforcer le développement territorial et à réduire les disparités sociales, conformément aux Hautes Orientations Royales appelant à accorder une attention particulière à l'élément humain et à garantir des conditions de vie dignes aux citoyens. L'Initiative Nationale pour le Développement Humain a mobilisé toutes les ressources nécessaires pour la réussite de ce chantier, en parfaite coordination avec les différents partenaires et acteurs locaux.",
    'gallery.placeholder.p2': "Ce projet intervient en réponse aux besoins urgents de la population, puisqu'il permettra d'améliorer les indicateurs de développement humain dans la région et de faciliter l'accès aux services de base. Il contribuera également à créer une dynamique économique et sociale bénéficiant aux différentes catégories cibles, notamment les jeunes, les femmes et les personnes en situation de précarité.",
    'programs.stats.projects_done': 'Projet intégré',
    'programs.stats.beneficiaries': 'Bénéficiaires'
};

const newKeysEn = {
    'gallery.placeholder.p1': 'This initiative is part of continuous efforts to enhance territorial development and reduce social disparities, in implementation of the High Royal Directives calling for attention to the human element and the provision of decent living conditions for citizens. The National Initiative for Human Development has mobilized all necessary resources to ensure the success of this project, in full coordination with various partners and local actors.',
    'gallery.placeholder.p2': 'This project comes in response to the urgent needs of the population, as it will improve human development indicators in the region and facilitate access to basic services. It will also contribute to creating an economic and social dynamic that benefits various target groups, especially youth, women, and people in vulnerable situations.',
    'programs.stats.projects_done': 'Integrated project',
    'programs.stats.beneficiaries': 'Beneficiaries'
};

Object.assign(jsonContent.translations.ar, newKeysAr);
Object.assign(jsonContent.translations.fr, newKeysFr);
Object.assign(jsonContent.translations.en, newKeysEn);
fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));
console.log('Updated content.json successfully');

function injectKeys(content, lang, keys) {
    const marker = new RegExp("  " + lang + ": {\\n\\s*// UI Common");

    let injection = '';
    for (const [k, v] of Object.entries(keys)) {
        injection += `    '${k}': '${v.replace(/'/g, "\\\\'")}',\\n`;
    }

    return content.replace(marker, "  " + lang + ": {\\n" + injection + "    // UI Common");
}

tsContent = injectKeys(tsContent, 'ar', newKeysAr);
tsContent = injectKeys(tsContent, 'fr', newKeysFr);
tsContent = injectKeys(tsContent, 'en', newKeysEn);
fs.writeFileSync(tsPath, tsContent);
console.log('Updated translations.ts successfully');
