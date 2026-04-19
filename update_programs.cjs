const fs = require('fs');

const tsPath = './data/translations.ts';
let tsContent = fs.readFileSync(tsPath, 'utf8');

const jsonPath = './data/content.json';
let jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const progPath = './components/ProgramsSection.tsx';
let progContent = fs.readFileSync(progPath, 'utf8');

const translationsToAddAr = {
    'programs.stats.projects_count': 'عدد المشاريع المنجزة',
    'programs.stats.beneficiaries_total': 'إجمالي المستفيدين',
    'programs.stats.financial_data': 'البيانات المالية',
    'programs.stats.total_cost': 'الكلفة الإجمالية',
    'programs.stats.indh_contribution': 'مساهمة المبادرة (100%)',
    'programs.p1.d1.desc_alt': 'توسيع الشبكة والربط الفردي',
    'programs.p1.desc_alt': 'يهدف هذا البرنامج إلى فك العزلة عن الساكنة القروية وتحسين ظروف عيشهم من خلال توفير البنيات التحتية الأساسية والولوج إلى الخدمات الاجتماعية.',
    'programs.p1.title_alt': 'تدارك الخصاص في البنيات التحتية والخدمات الاجتماعية الأساسية بالمجالات الأقل تجهيزا'
};

const translationsToAddFr = {
    'programs.stats.projects_count': 'Nombre de projets réalisés',
    'programs.stats.beneficiaries_total': 'Total des bénéficiaires',
    'programs.stats.financial_data': 'Données financières',
    'programs.stats.total_cost': 'Coût total',
    'programs.stats.indh_contribution': "Contribution de l'INDH (100%)",
    'programs.p1.d1.desc_alt': 'Extension du réseau et raccordement individuel',
    'programs.p1.desc_alt': 'Ce programme vise à désenclaver la population rurale et à améliorer ses conditions de vie en fournissant des infrastructures de base et un accès aux services sociaux.',
    'programs.p1.title_alt': 'Rattrapage des déficits en infrastructures et services sociaux de base dans les territoires les moins équipés'
};

const translationsToAddEn = {
    'programs.stats.projects_count': 'Number of completed projects',
    'programs.stats.beneficiaries_total': 'Total beneficiaries',
    'programs.stats.financial_data': 'Financial data',
    'programs.stats.total_cost': 'Total cost',
    'programs.stats.indh_contribution': 'INDH Contribution (100%)',
    'programs.p1.d1.desc_alt': 'Network extension and individual connection',
    'programs.p1.desc_alt': 'This program aims to open up the rural population and improve their living conditions by providing basic infrastructure and access to social services.',
    'programs.p1.title_alt': 'Addressing deficits in infrastructure and basic social services in the least equipped areas'
};


// 1. ADD to JSON
Object.assign(jsonContent.translations.ar, translationsToAddAr);
Object.assign(jsonContent.translations.fr, translationsToAddFr);
Object.assign(jsonContent.translations.en, translationsToAddEn);
fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));


// 2. ADD to TS
function injectKeys(content, lang, keys) {
    const marker = new RegExp("  " + lang + ": \\{\\n\\s*// UI Common");
    let injection = '';
    for (const [k, v] of Object.entries(keys)) {
        injection += `    '${k}': "${v.replace(/"/g, '\\"')}",\n`;
    }
    return content.replace(marker, "  " + lang + ": {\n" + injection + "    // UI Common");
}

tsContent = injectKeys(tsContent, 'ar', translationsToAddAr);
tsContent = injectKeys(tsContent, 'fr', translationsToAddFr);
tsContent = injectKeys(tsContent, 'en', translationsToAddEn);
fs.writeFileSync(tsPath, tsContent);


// 3. Update ProgramsSection.tsx
if (!progContent.includes('useLanguage')) {
    progContent = progContent.replace(
        "import { Target, Users, Wallet, Zap, Droplets, Map, CheckCircle2, Activity } from 'lucide-react';",
        "import { Target, Users, Wallet, Zap, Droplets, Map, CheckCircle2, Activity } from 'lucide-react';\nimport { useLanguage } from './LanguageContext';"
    );
}

if (!progContent.includes('const { t, dir } = useLanguage();')) {
    progContent = progContent.replace(
        "export const ProgramsSection: React.FC = () => {",
        "export const ProgramsSection: React.FC = () => {\n  const { t, dir } = useLanguage();"
    );
}

// Add dir={dir}
progContent = progContent.replace(
    'className="relative w-full py-24 md:py-32',
    'dir={dir} className="relative w-full py-24 md:py-32'
);

// Map
const h2BlockOld = `              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-void dark:text-white mb-6 leading-tight">
                برامج المبادرة الوطنية <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-void via-void/80 to-void/40 dark:from-white dark:via-white/80 dark:to-white/40">
                  للتنمية البشرية
                </span>
              </h2>`;
const h2BlockNew = `              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-void dark:text-white mb-6 leading-tight">
                {t('programs.title')}
              </h2>`;

progContent = progContent.replace(h2BlockOld, h2BlockNew);

const simpleReplacements = [
    ['ركائز التنمية', "{t('programs.pillars_tag')}"],
    ['أربعة برامج مهيكلة تستهدف الحد من الفوارق المجالية والاجتماعية والاستثمار في الرأسمال البشري.', "{t('programs.desc')}"],
    ['البرنامج الأول', "{t('programs.p1.tag')}"],
    ['تدارك الخصاص في البنيات التحتية والخدمات الاجتماعية الأساسية بالمجالات الأقل تجهيزا', "{t('programs.p1.title_alt')}"],
    ['يهدف هذا البرنامج إلى فك العزلة عن الساكنة القروية وتحسين ظروف عيشهم من خلال توفير البنيات التحتية الأساسية والولوج إلى الخدمات الاجتماعية.', "{t('programs.p1.desc_alt')}"],
    ['عدد المشاريع المنجزة', "{t('programs.stats.projects_count')}"],
    ['مشروع متكامل', "{t('programs.stats.projects_done')}"],
    ['إجمالي المستفيدين', "{t('programs.stats.beneficiaries_total')}"],
    ['مستفيد ومستفيدة', "{t('programs.stats.beneficiaries')}"],
    ['البيانات المالية', "{t('programs.stats.financial_data')}"],
    ['الكلفة الإجمالية', "{t('programs.stats.total_cost')}"],
    ['مساهمة المبادرة (100%)', "{t('programs.stats.indh_contribution')}"],
    ['تمويل كلي من صندوق المبادرة الوطنية للتنمية البشرية', "{t('programs.p1.full_funding')}"],
    ['مجالات التدخل', "{t('programs.p1.domains')}"],
    ['الماء والكهرباء', "{t('programs.p1.d1.title')}"],
    ['توسيع الشبكة والربط الفردي', "{t('programs.p1.d1.desc_alt')}"],
    ['الطرق والمسالك', "{t('programs.p1.d2.title')}"],
    ['فك العزلة وتسهيل التنقل', "{t('programs.p1.d2.desc')}"]
];

for (const [ar, expr] of simpleReplacements) {
    progContent = progContent.replace(ar, expr);
}

fs.writeFileSync(progPath, progContent);
console.log('ProgramsSection translated successfully!');
