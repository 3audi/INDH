import React, { useEffect } from 'react';
import { ArrowRight, ArrowLeft, Quote } from 'lucide-react';
import { AmbientBackground } from './ui/AmbientBackground';
import { Navbar } from './Navbar';
import { useLanguage } from './LanguageContext';

interface FullSpeechPageProps {
  onBack: () => void;
}

export const FullSpeechPage: React.FC<FullSpeechPageProps> = ({ onBack }) => {
  const { t, dir } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-void text-white font-sans selection:bg-m-red selection:text-white pb-20" dir={dir}>
      <AmbientBackground opacity={0.3} />

      {/* Site Navbar */}
      <Navbar />

      {/* Back Button - positioned below navbar */}
      <div className="fixed top-[88px] left-0 right-0 z-40 px-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-3 px-5 py-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-m-red hover:border-m-red transition-all group shadow-lg"
          >
            {dir === 'rtl' ? <ArrowRight className="w-4 h-4 text-white group-hover:-translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 text-white group-hover:-translate-x-1 transition-transform" />}
            <span className="font-bold text-sm">{t('ui.back')}</span>
          </button>
        </div>
      </div>

      {/* Hero Section with Image */}
      <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/d/1xe1wxz3oZ7NmHn-Yy8iQ0n3C3ZUShARr"
            alt="Moroccan Heritage"
            className="w-full h-full object-cover object-top opacity-70"
          />
          {/* Gradient Overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-black/40" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-m-red animate-pulse"></span>
            <span className="text-xs font-bold text-white/90 uppercase tracking-widest">{t('speech.date')}</span>
          </div>

          {/* Title in selected language */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-void dark:text-white mb-8 tracking-tighter drop-shadow-2xl font-cairo">
            {t('speech.tag')}
          </h1>

          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-m-green to-transparent mx-auto mb-8 opacity-60"></div>

          {/* Excerpt always in Arabic RTL */}
          <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto leading-relaxed font-cairo drop-shadow-lg" dir="rtl">
            {t('speech.excerpt')}
          </p>
        </div>
      </div>

      {/* Speech Text Content - Always Arabic RTL, simple and professional */}
      <div className="relative max-w-3xl mx-auto px-6 sm:px-10 z-20 mt-16 mb-20" dir="rtl">
        <div className="space-y-6 text-right leading-[2.2] text-white/85 text-lg font-light font-cairo">

          {/* Opening */}
          <p className="font-bold text-white text-xl text-center py-2">
            الحمد لله، والصلاة والسلام على مولانا رسول الله وآله وصحبه.
          </p>

          {/* Greeting */}
          <p className="font-bold text-m-green text-xl py-2">شعبي العزيز،</p>

          <p className="text-white/80">
            لقد عهدتني، منذ تحملت أمانة قيادتك، دائم الانشغال بقضاياك، متجاوبا مع تطلعاتك، حريصا على إشراكك في إيجاد الحلول الناجعة، لرفع التحديات الكبرى للوطن، بروح الالتزام والتعبئة، والعمل والأمل.
          </p>

          <p className="text-white/80">
            وسيرا على هذا النهج، وبعد إمعان النظر فيما استخلصته من وقوفي الميداني الموصول على أحوالك، في مختلف جهات المملكة، فقد قررت أن أخاطبك اليوم بشأن قضية تهم المغاربة جميعا في العمق. قضية تسائل كل المؤسسات، والفاعلين السياسيين والنقابيين، والاقتصاديين، والهيئات الجمعوية. بل إنها تشكل الهاجس الملح لكافة الأسر والمواطنين.
          </p>

          {/* Core Message */}
          <div className="py-6 px-8 my-6 border-r-4 border-m-red/40 bg-white/5 rounded-xl">
            <p className="text-white text-xl leading-relaxed">
              "إن الأمر يتعلق بالمعضلة الاجتماعية، التي نعتبرها بمثابة التحدي الأكبر، لتحقيق مشروعنا المجتمعي التنموي، والتي قررنا، بعون الله وتوفيقه، أن نتصدى لها بإطلاق مبادرة طموحة وخلاقة، باسم المبادرة الوطنية للتنمية البشرية."
            </p>
          </div>

          <p className="text-white/80">
            وتندرج هذه المبادرة ضمن رؤية شمولية، تشكل قوام مشروعنا المجتمعي، المرتكز على مبادئ الديمقراطية السياسية، والفعالية الاقتصادية، والتماسك الاجتماعي، والعمل والاجتهاد، وتمكين كل مواطن من الاستثمار الأمثل لمؤهلاته وقدراته.
          </p>

          <div className="space-y-5 py-4">
            <div>
              <p className="text-m-green font-bold text-lg block mb-2">فعلى المدى القريب،</p>
              <p className="text-white/80">كلفت الوزير الأول، بالسهر على أن تنكب الحكومة على تجسيد هذه المبادرة، في دفعتها الأولى، ضمن برامج مندمجة وملموسة، على أن يرفع إلى نظرنا السامي، في غضون الأشهر الثلاثة القادمة، خطة عمل متكاملة، تستجيب لأهداف هذه المبادرة.</p>
            </div>

            <div>
              <p className="text-m-red font-bold text-lg block mb-2">أما على المدى المتوسط،</p>
              <p className="text-white/80">فإنه يتعين على الطبقة السياسية، وهي مقبلة على استحقاقات حزبية وانتخابية، في أفق سنة 2007، أن تجعل في صلب اهتماماتها بلورة مشاريع ملموسة لتجسيد هذه المبادرة، لأن أهدافها التنموية، تشكل جوهر الانشغالات اليومية للشعب، والمحك الحقيقي لإعادة الاعتبار للعمل السياسي.</p>
            </div>

            <div>
              <p className="text-white font-bold text-lg block mb-2">وأما على المدى البعيد،</p>
              <p className="text-white/80">"فإن طموحي الكبير، الذي هو طموحك شعبي العزيز، يستهدف الارتقاء بمؤشرات التنمية البشرية لوطننا العزيز إلى مستوى البلدان المتقدمة."</p>
            </div>
          </div>

          <p className="text-white/80">
            وتأكيدا للصبغة الوطنية الشاملة لهذه المبادرة، فقد وجهنا وزيرنا الأول بأن يعرضها على البرلمان، في جلسة مخصصة لمناقشتها، بما تقتضيه من دعم بناء.
          </p>

          <p className="text-white/80">
            وبصفة عامة، ندعو الحكومة إلى اعتماد مقاربة تقوم على الإصغاء والتشاور مع كل القوى الحية للأمة، من أحزاب سياسية، ومنظمات نقابية، وجماعات محلية، وهيآت المجتمع المدني، وقطاع خاص. وحتى مع المواطنين الذين لهم خبرة وغيرة في مجال التنمية.
          </p>

          <p className="text-white/80">
            ويجب أن يشكل تفعيل المبادرة الوطنية للتنمية البشرية، فرصة للاجتهاد والإبداع والتجديد، في آليات وأساليب العمل الاجتماعي. منطلقنا في ذلك أن تكون قوية التأثير في نتائجها، وغير مكلفة في وسائلها، ومعززة بموارد بشرية مؤهلة، وآليات مراقبة ورصد لظواهر الفقر والإقصاء، بكل موضوعية ويقظة.
          </p>

          <p className="font-bold text-m-green text-xl py-2">شعبي العزيز،</p>

          {/* Closing Quote */}
          <div className="relative py-10 text-center">
            <Quote size={36} className="mx-auto text-m-red mb-5 opacity-40" />
            <p className="text-2xl md:text-3xl font-bold leading-tight text-white font-cairo">
              "إن المبادرة الوطنية للتنمية البشرية ليست مشروعا مرحليا، ولا برنامجا ظرفيا عابرا، وإنما هي ورش مفتوح باستمرار."
            </p>
            <p className="mt-6 text-base text-white/60 max-w-2xl mx-auto font-light">
              كما أنها ليست تغييرا في الأسبقيات التي حددناها، بل هي تأكيد وتجسيد لالتزامنا. إذ ما فتئنا في كل مناسبة نؤكد أسبقية واستمرارية ما نخوضه من معارك موصولة، لتأهيل الموارد البشرية، وتقوية التنافسية الاقتصادية الوطنية.
            </p>
          </div>

          <div className="text-center py-6">
            <p className="text-xl font-medium text-white/90 leading-relaxed font-cairo max-w-2xl mx-auto">
              "وإنه لعهد وثيق يجب أن نأخذه جميعا على أنفسنا لتكريس كل الجهود، من أجل انتشال الفئات والجهات المحرومة من براثن الفقر والإقصاء والتخلف، وتمكينها من الأخذ بناصية التقدم، وتحقيق التنمية البشرية المستدامة، باعتبارها المعركة الأساسية لمغرب اليوم والغد."
            </p>
          </div>

          <p className="font-semibold text-white/90 text-center py-4 border-t border-white/10 mt-6 font-cairo">
            "وقل اعملوا فسيرى الله عملكم ورسوله والمؤمنون". صدق الله العظيم.<br />
            والسلام عليكم ورحمة الله تعالى وبركاته
          </p>

          <div className="mt-12 pt-10 border-t border-white/10 text-center">
            <div className="font-cairo text-2xl font-bold text-white mb-1">{t('king.name')}</div>
            <div className="text-m-red text-sm uppercase tracking-[0.3em] font-bold">{t('king.title')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};