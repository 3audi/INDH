const fs = require('fs');
let ts = fs.readFileSync('c:/Users/ch3al/Downloads/INDH/data/translations.ts', 'utf8');

ts = ts.replace(/'nav\.gallery': 'أنشطة المبادرة',/g, "'nav.gallery': 'الأنشطة',");
ts = ts.replace(/'gallery\.title': 'أنشطة المبادرة ببوجدور',/g, "'gallery.title': 'الأنشطة ببوجدور',");

ts = ts.replace(/'nav\.gallery': 'Activités de l\\'INDH',/g, "'nav.gallery': 'Activités',");
ts = ts.replace(/'gallery\.title': 'Activités de l\\'INDH',/g, "'gallery.title': 'Activités à Boujdour',");

ts = ts.replace(/'nav\.gallery': 'INDH Activities',/g, "'nav.gallery': 'Activities',");
ts = ts.replace(/'gallery\.title': 'INDH Activities in Boujdour',/g, "'gallery.title': 'Activities in Boujdour',");

fs.writeFileSync('c:/Users/ch3al/Downloads/INDH/data/translations.ts', ts);

let json = fs.readFileSync('c:/Users/ch3al/Downloads/INDH/data/content.json', 'utf8');

json = json.replace(/"nav\.gallery": "أنشطة المبادرة",/g, '"nav.gallery": "الأنشطة",');
json = json.replace(/"gallery\.title": "أنشطة المبادرة ببوجدور",/g, '"gallery.title": "الأنشطة ببوجدور",');

json = json.replace(/"nav\.gallery": "Activités de l'INDH",/g, '"nav.gallery": "Activités",');
json = json.replace(/"gallery\.title": "Activités de l'INDH",/g, '"gallery.title": "Activités à Boujdour",');

json = json.replace(/"nav\.gallery": "INDH Activities",/g, '"nav.gallery": "Activities",');
json = json.replace(/"gallery\.title": "INDH Activities in Boujdour",/g, '"gallery.title": "Activities in Boujdour",');

fs.writeFileSync('c:/Users/ch3al/Downloads/INDH/data/content.json', json);

console.log('Successfully updated translations');
