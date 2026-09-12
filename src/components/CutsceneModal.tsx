import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Sparkles, Film, Volume2 } from 'lucide-react';
import { KingAvatar } from './KingAvatar';
import { CoachMirchi } from './CoachMirchi';
import { sound } from '../utils/audio';

interface CutsceneModalProps {
  onClose: () => void;
}

export const CutsceneModal: React.FC<CutsceneModalProps> = ({ onClose }) => {
  const [slide, setSlide] = useState<number>(0);

  const slides = [
    {
      title: "കേരള രാജാവിന്റെ ഉറക്കം: രംഗം 1",
      subtitle: "കേരള നാട്ടിലെ രാജകീയ സുഖനിദ്ര",
      kingMood: 'idle' as const,
      kingQuoteMl: "ഉറക്കം... സ്വപ്നത്തിൽ ചൂടുള്ള പഴംപൊരിയും ബീഫും ബിരിയാണിയും... ഉറങ്ങട്ടെ അളിയാ...",
      kingQuoteTranslit: "Urakkam... swapnathil choodulla pazham poriyum biriyaniyum...",
      kingQuoteEn: "Zzz... in my dreams hot banana fritters and biryani...",
      coachQuoteMl: "കഷ്ടം തന്നെ മുതലാളീ! ചൊവ്വാഴ്ച മുതൽ കിടന്നുറങ്ങുവാണോ?!",
      coachQuoteTranslit: "Kashtam thanne mudhalaali! Chovvazhcha muthal uranguvano?!",
      coachQuoteEn: "Tragic boss! You've been napping horizontally since Tuesday!",
      narration: "പണ്ട് പണ്ട് മനോഹരമായ കേരള നാട്ടിൽ ഭക്ഷണപ്രിയനായ ഒരു രാജാവ് ജീവിച്ചിരുന്നു. രാജഭരണം മുഴുവൻ കട്ടിലിൽ കിടന്നുകൊണ്ടായിരുന്നു!"
    },
    {
      title: "കണ്ണാടിയിലെ സത്യം: രംഗം 2",
      subtitle: "കണ്ണാടിയിലെ ഭീകര സത്യം",
      kingMood: 'shocked' as const,
      kingQuoteMl: "അയ്യോ ദൈവമേ! ഈ കണ്ണാടിയിൽ രണ്ടാമതൊരു എന്നെ കൊണ്ടിട്ടത് ഏവനാടാ?!",
      kingQuoteTranslit: "Ayyoo daivame! Ee kannaadiyil randaamathoru enne kondittathu aavanaada?!",
      kingQuoteEn: "Ayyoo! Who put a second version of me inside this mirror?!",
      coachQuoteMl: "അത് വേറെ ആളല്ല രാജാവേ, അത് നിങ്ങളുടെ സ്വന്തം ബിഗ് ബെല്ലിയാണ്!",
      coachQuoteTranslit: "Athu vere aalalla Rajave, athu ningalude swantham big belly aanu!",
      coachQuoteEn: "That's not another person Your Majesty, that's just your massive belly!",
      narration: "കണ്ണാടി കണ്ട രാജാവ് ഞെട്ടിവിറച്ചു! വയറ് വീർത്ത് കസവ് മുണ്ട് അഴിഞ്ഞു വീഴാറായി!"
    },
    {
      title: "രാജാവിന്റെ ശപഥം: രംഗം 3",
      subtitle: "മസിൽ പെരുപ്പിക്കലും അഴിഞ്ഞ മുണ്ടും",
      kingMood: 'hero_pose' as const,
      kingQuoteMl: "ഇന്ന് മുതൽ ഞാൻ കേരള ഫിറ്റ് കിംഗ് ആകും! ദേ കണ്ടോ എന്റെ മസിൽ പവർ! (അയ്യോ മുണ്ട് അഴിഞ്ഞേ)",
      kingQuoteTranslit: "Innu muthal njan Kerala Fit King aakum! Dhe kando ente muscle power!",
      kingQuoteEn: "From today I become the Kerala Fit King! Behold my muscle power!",
      coachQuoteMl: "കസവ് മുണ്ട് താഴെ വീണു രാജാവേ! എന്തായാലും സ്പിരിറ്റ് കൊള്ളാം!",
      coachQuoteTranslit: "Kasavu mundu thaazhe veenu Rajave! Enthaayaalum spirit kollaam!",
      coachQuoteEn: "Your mundu is on the floor again! But hey, great spirit!",
      narration: "കാറ്റ് വീശുന്നു, കൊട്ടാരത്തിൽ കൊമ്പും കുഴലും മുഴങ്ങുന്നു! രാജാവ് മസിൽ പെരുപ്പിക്കാൻ തയ്യാറെടുക്കുന്നു!"
    },
    {
      title: "മാന്ത്രിക ലഡു രഹസ്യം: രംഗം 4",
      subtitle: "ലഡു തിന്ന് ഫിറ്റാകൂ!",
      kingMood: 'eating' as const,
      kingQuoteMl: "ലഡു തിന്ന് ഫിറ്റ് ആകാമെന്നോ?! പൊളി സാധനം അളിയാ! ഞാൻ റെഡി!",
      kingQuoteTranslit: "Laddu thinnu fit aakaamenno?! Poli saanam aliya! Njan ready!",
      kingQuoteEn: "Eat Laddus to gain muscle & fitness?! Legendary deal! I'm 100% ready!",
      coachQuoteMl: "ലഡു എനർജിയാണ്, സോഫാ തലയിണയല്ല! ഇനി ഗ്രൗണ്ടിൽ ഇറങ്ങി ഓടടോ!",
      coachQuoteTranslit: "Laddu energy aanu! Ini groundil irangi odado!",
      coachQuoteEn: "Laddus are athletic fuel, not snacks! Now run through the royal village!",
      narration: "മാന്ത്രിക ലഡു കഴിക്കുക, വാഴപ്പഴത്തൊലിയും കള്ളത്തേങ്ങയും ചാടിക്കടക്കുക, കേരളത്തിന്റെ ഇതിഹാസ ഫിറ്റ് രാജാവാകുക!"
    }
  ];

  const current = slides[slide];

  // Auto-speak in Malayalam when slide changes
  useEffect(() => {
    sound.speakMalayalam(current.kingQuoteMl, current.kingQuoteTranslit);
  }, [slide]);

  const handleNext = () => {
    sound.playPop();
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      sound.playDing();
      onClose();
    }
  };

  const handlePlayVoice = () => {
    sound.speakMalayalam(current.kingQuoteMl, current.kingQuoteTranslit);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 select-none">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white border-4 border-amber-400 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Cinema Film Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-yellow-300" />
            <div>
              <h3 className="text-sm font-black tracking-wider text-yellow-200">
                {current.title}
              </h3>
              <span className="text-[11px] text-amber-100 font-bold">
                {current.subtitle}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comic Strip Canvas Frame */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center min-h-[380px] justify-between">
          {/* Narrator intro banner */}
          <div className="bg-white/95 border-2 border-amber-300 rounded-2xl p-3 text-xs sm:text-sm text-slate-800 font-bold text-center shadow-sm max-w-md leading-relaxed">
            "{current.narration}"
          </div>

          {/* Characters Acting Scene */}
          <div className="my-auto flex items-end justify-center gap-4 sm:gap-8 w-full">
            <div className="flex flex-col items-center">
              <KingAvatar 
                mood={current.kingMood} 
                costumeId="kerala_mallu"
                size="lg" 
                showSpeech={true} 
                speechText={current.kingQuoteMl}
                speechMalayalam={current.kingQuoteMl}
                speechTranslit={current.kingQuoteTranslit}
              />
              <button
                onClick={handlePlayVoice}
                className="mt-2 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-full shadow flex items-center gap-1 cartoon-btn"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>സംസാരിക്കൂ</span>
              </button>
            </div>

            <div className="hidden xs:block">
              <CoachMirchi 
                quote={{
                  ml: current.coachQuoteMl,
                  translit: current.coachQuoteTranslit,
                  en: current.coachQuoteEn
                }}
                mood={slide === 1 ? 'shocked' : 'roasting'} 
              />
            </div>
          </div>

          {/* Dots and Navigation Button */}
          <div className="w-full flex items-center justify-between mt-4 pt-2 border-t border-amber-200">
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === slide ? 'w-7 bg-amber-500' : 'bg-amber-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm rounded-xl shadow cartoon-btn flex items-center gap-1.5"
            >
              <span>{slide === slides.length - 1 ? 'കളി തുടങ്ങാം! ➔' : 'അടുത്ത രംഗം ➔'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
