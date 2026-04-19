const fs = require('fs');

const ar = {
    "youth.hero.title": "منصة الشباب بوجدور",
    "youth.hero.subtitle": "فضاء للإبداع والمواكبة",
    "youth.hero.desc": "منظومة متكاملة لدعم الشباب حاملي المشاريع والباحثين عن الشغل، توفر خدمات الاستماع والتوجيه والمواكبة لتحقيق طموحاتهم.",
    "youth.spaces.title": "فضاءات المنصة",
    "youth.space.listen.title": "الاستماع والتوجيه",
    "youth.space.listen.desc": "المحطة الأولى لاستقبال الشباب وتحديد حاجياتهم وتوجيههم نحو الفرص المتاحة.",
    "youth.space.support.title": "مواكبة ريادة الأعمال",
    "youth.space.support.desc": "دعم تقني لتطوير الأفكار وإنجاز دراسات الجدوى والمخططات المالية للمشاريع.",
    "youth.space.employ.title": "تحسين القابلية للتشغيل",
    "youth.space.employ.desc": "ورشات تكوينية في المهارات الذاتية والتقنيات الحديثة لتسهيل الولوج لسوق الشغل.",
    "youth.cta.title": "انطلق في مسارك المهني اليوم",
    "youth.cta.btn": "تواصل معنا"
};

const en = {
    "youth.hero.title": "Boujdour Youth Platform",
    "youth.hero.subtitle": "A Space for Creativity and Support",
    "youth.hero.desc": "An integrated ecosystem to support youth with projects and job seekers, providing listening, guidance, and support services to achieve their ambitions.",
    "youth.spaces.title": "Platform Spaces",
    "youth.space.listen.title": "Listening and Guidance",
    "youth.space.listen.desc": "The first stop to welcome youth, identify their needs, and guide them towards available opportunities.",
    "youth.space.support.title": "Entrepreneurship Support",
    "youth.space.support.desc": "Technical support to develop ideas and create feasibility studies and financial plans for projects.",
    "youth.space.employ.title": "Employability Improvement",
    "youth.space.employ.desc": "Training workshops on soft skills and modern technologies to facilitate access to the job market.",
    "youth.cta.title": "Start your professional journey today",
    "youth.cta.btn": "Contact us"
};

const fr = {
    "youth.hero.title": "Plateforme des Jeunes de Boujdour",
    "youth.hero.subtitle": "Un Espace de Créativité et d'Accompagnement",
    "youth.hero.desc": "Un écosystème intégré pour soutenir les jeunes porteurs de projets et les chercheurs d'emploi, offrant des services d'écoute, d'orientation et d'accompagnement pour réaliser leurs ambitions.",
    "youth.spaces.title": "Espaces de la Plateforme",
    "youth.space.listen.title": "Écoute et Orientation",
    "youth.space.listen.desc": "La première étape pour accueillir les jeunes, identifier leurs besoins et les orienter vers les opportunités disponibles.",
    "youth.space.support.title": "Accompagnement à l'Entrepreneuriat",
    "youth.space.support.desc": "Un soutien technique pour développer des idées et réaliser des études de faisabilité et des plans financiers pour les projets.",
    "youth.space.employ.title": "Amélioration de l'Employabilité",
    "youth.space.employ.desc": "Des ateliers de formation en compétences non techniques et nouvelles technologies pour faciliter l'accès au marché du travail.",
    "youth.cta.title": "Lancez votre parcours professionnel aujourd'hui",
    "youth.cta.btn": "Contactez-nous"
};

const jp = 'data/content.json';
const data = JSON.parse(fs.readFileSync(jp, 'utf8'));

Object.assign(data.translations.ar, ar);
Object.assign(data.translations.en, en);
Object.assign(data.translations.fr, fr);

fs.writeFileSync(jp, JSON.stringify(data, null, 2));

const ts = 'data/translations.ts';
let tsContent = fs.readFileSync(ts, 'utf8');

const langs = [
    { key: 'ar', dict: ar },
    { key: 'en', dict: en },
    { key: 'fr', dict: fr }
];

langs.forEach(l => {
    let startIndex = tsContent.indexOf('  ' + l.key + ': {');
    if (startIndex === -1 && l.key === 'ar') startIndex = tsContent.indexOf('ar: {');
    let nextKeyIndex = tsContent.indexOf('  ' + (l.key === 'ar' ? 'fr' : (l.key === 'fr' ? 'en' : 'something_else')) + ': {');
    if (nextKeyIndex === -1 && l.key === 'en') nextKeyIndex = tsContent.length;

    if (startIndex !== -1 && nextKeyIndex !== -1) {
        let block = tsContent.substring(startIndex, nextKeyIndex);
        for (const [k, v] of Object.entries(l.dict)) {
            const escapedV = v.replace(/'/g, "\\\\'");
            const regex1 = new RegExp(`('${k}':\\s*')[^']+(')`);
            const regex2 = new RegExp(`('${k}':\\s*")[^"]+(")`);
            if (regex1.test(block)) {
                block = block.replace(regex1, `$1${escapedV}$2`);
            } else if (regex2.test(block)) {
                block = block.replace(regex2, `$1${escapedV}$2`);
            }
        }
        tsContent = tsContent.substring(0, startIndex) + block + tsContent.substring(nextKeyIndex);
    }
});

fs.writeFileSync(ts, tsContent);
console.log('Successfully updated translations for Youth Platform!');
