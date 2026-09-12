import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Lock, Check, Sparkles, Coins } from 'lucide-react';
import { 
  CostumeCategory, 
  CustomizableItem, 
  SquirrelCostumeId, 
  PalaceStyleId, 
  BackgroundThemeId 
} from '../types';
import { KingAvatar } from './KingAvatar';
import { SquirrelCompanion } from './SquirrelCompanion';
import { PalaceBackground } from './PalaceBackground';
import { sound } from '../utils/audio';

interface RoyalCustomizationModalProps {
  coins: number;
  // King
  kingCostumes: CustomizableItem[];
  activeCostumeId: string;
  onSelectKingCostume: (id: string) => void;
  onBuyKingCostume: (item: CustomizableItem) => void;

  // Squirrel
  squirrelCostumes: CustomizableItem[];
  activeSquirrelCostumeId: SquirrelCostumeId;
  onSelectSquirrelCostume: (id: SquirrelCostumeId) => void;
  onBuySquirrelCostume: (item: CustomizableItem) => void;

  // Palace
  palaceStyles: CustomizableItem[];
  activePalaceStyleId: PalaceStyleId;
  onSelectPalaceStyle: (id: PalaceStyleId) => void;
  onBuyPalaceStyle: (item: CustomizableItem) => void;

  // Background
  backgroundItems: CustomizableItem[];
  activeBackgroundId: BackgroundThemeId;
  onSelectBackground: (id: BackgroundThemeId) => void;
  onBuyBackground: (item: CustomizableItem) => void;

  onClose: () => void;
}

export const RoyalCustomizationModal: React.FC<RoyalCustomizationModalProps> = ({
  coins,
  kingCostumes,
  activeCostumeId,
  onSelectKingCostume,
  onBuyKingCostume,

  squirrelCostumes,
  activeSquirrelCostumeId,
  onSelectSquirrelCostume,
  onBuySquirrelCostume,

  palaceStyles,
  activePalaceStyleId,
  onSelectPalaceStyle,
  onBuyPalaceStyle,

  backgroundItems,
  activeBackgroundId,
  onSelectBackground,
  onBuyBackground,

  onClose
}) => {
  const [activeTab, setActiveTab] = useState<CostumeCategory>('king');

  // Track preview item ID for each category
  const [previewKingId, setPreviewKingId] = useState<string>(activeCostumeId);
  const [previewSquirrelId, setPreviewSquirrelId] = useState<string>(activeSquirrelCostumeId);
  const [previewPalaceId, setPreviewPalaceId] = useState<string>(activePalaceStyleId);
  const [previewBackgroundId, setPreviewBackgroundId] = useState<string>(activeBackgroundId);

  // Get current list based on tab
  const getCategoryData = () => {
    switch (activeTab) {
      case 'king':
        return {
          title: 'രാജാവിന്റെ വസ്ത്രങ്ങൾ',
          subtitle: 'കിംഗ് രാജാവിന് പുതിയ രാജകീയ വസ്ത്രങ്ങളും തൊപ്പികളും!',
          items: kingCostumes,
          activeId: activeCostumeId,
          previewId: previewKingId,
          setPreviewId: setPreviewKingId,
          onSelect: onSelectKingCostume,
          onBuy: onBuyKingCostume
        };
      case 'squirrel':
        return {
          title: 'ചിപ്പൻ അണ്ണാന്റെ വേഷങ്ങൾ',
          subtitle: 'ചിപ്പന് സ്വർണ്ണക്കിരീടം, നിഞ്ച മാസ്ക്, കൂളിംഗ് ഗ്ലാസ്, ഡംബൽ!',
          items: squirrelCostumes,
          activeId: activeSquirrelCostumeId,
          previewId: previewSquirrelId,
          setPreviewId: setPreviewSquirrelId,
          onSelect: onSelectSquirrelCostume as (id: string) => void,
          onBuy: onBuySquirrelCostume
        };
      case 'palace':
        return {
          title: 'കൊട്ടാര അലങ്കാര ശൈലികൾ',
          subtitle: 'തേക്ക് കൊട്ടാരം, 24K സ്വർണ്ണ ദർബാർ, കുളിർമഴ, പൂരക്കൊട്ടാരം!',
          items: palaceStyles,
          activeId: activePalaceStyleId,
          previewId: previewPalaceId,
          setPreviewId: setPreviewPalaceId,
          onSelect: onSelectPalaceStyle as (id: string) => void,
          onBuy: onBuyPalaceStyle
        };
      case 'background':
        return {
          title: 'കേരള പശ്ചാത്തല ഭംഗി',
          subtitle: 'ആലപ്പുഴ കായൽ, തൃശ്ശൂർ പൂരം, മൂന്നാർ മലകൾ, വർക്കല ബീച്ച്!',
          items: backgroundItems,
          activeId: activeBackgroundId,
          previewId: previewBackgroundId,
          setPreviewId: setPreviewBackgroundId,
          onSelect: onSelectBackground as (id: string) => void,
          onBuy: onBuyBackground
        };
    }
  };

  const currentCategory = getCategoryData();
  const selectedItem = currentCategory.items.find(item => item.id === currentCategory.previewId) || currentCategory.items[0];
  const isCurrentlyEquipped = currentCategory.activeId === selectedItem.id;

  const handleEquip = () => {
    sound.playPop();
    sound.playDing();
    currentCategory.onSelect(selectedItem.id);
  };

  const handleBuy = () => {
    if (coins >= selectedItem.price) {
      sound.playDing();
      sound.playFanfare();
      currentCategory.onBuy(selectedItem);
    } else {
      sound.playSlideWhistle();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 select-none animate-fadeIn">
      <motion.div 
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="bg-white border-4 border-amber-400 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-3 sm:px-6 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl">🎨</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-cartoon leading-none flex items-center gap-1.5">
                <span>രാജകീയ അലങ്കാര ബസാർ</span>
                <Sparkles className="w-4 h-4 text-yellow-200 fill-yellow-200 animate-pulse" />
              </h2>
              <p className="text-[11px] sm:text-xs text-amber-100 font-bold mt-0.5">
                വസ്ത്രങ്ങളും കൊട്ടാരവും അലങ്കരിക്കൂ!
              </p>
            </div>
          </div>

          {/* Current Coins Pill & Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 bg-black/25 px-3 py-1.5 rounded-full border border-yellow-300/40 shadow-inner">
              <Coins className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-xs sm:text-sm font-black text-yellow-200">
                {coins} 🪙
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 bg-black/20 hover:bg-black/35 rounded-full text-white transition-colors"
              title="അടയ്ക്കൂ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Category Selection Tabs */}
        <div className="bg-amber-100/90 border-b-2 border-amber-200 px-2 sm:px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => { sound.playPop(); setActiveTab('king'); }}
            className={`px-3 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-all cartoon-btn ${
              activeTab === 'king'
                ? 'bg-amber-600 text-white shadow-md scale-102 border-2 border-amber-400'
                : 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-300'
            }`}
          >
            <span>👑</span>
            <span>രാജാവിന്റെ വസ്ത്രം</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setActiveTab('squirrel'); }}
            className={`px-3 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-all cartoon-btn ${
              activeTab === 'squirrel'
                ? 'bg-amber-600 text-white shadow-md scale-102 border-2 border-amber-400'
                : 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-300'
            }`}
          >
            <span>🐿️</span>
            <span>ചിപ്പൻ അണ്ണാൻ</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setActiveTab('palace'); }}
            className={`px-3 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-all cartoon-btn ${
              activeTab === 'palace'
                ? 'bg-amber-600 text-white shadow-md scale-102 border-2 border-amber-400'
                : 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-300'
            }`}
          >
            <span>🛕</span>
            <span>കൊട്ടാര ശൈലി</span>
          </button>

          <button
            onClick={() => { sound.playPop(); setActiveTab('background'); }}
            className={`px-3 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-all cartoon-btn ${
              activeTab === 'background'
                ? 'bg-amber-600 text-white shadow-md scale-102 border-2 border-amber-400'
                : 'bg-white text-amber-900 hover:bg-amber-50 border border-amber-300'
            }`}
          >
            <span>🌄</span>
            <span>പശ്ചാത്തലം</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-5">
          {/* Left Preview Section (5 cols on md) */}
          <div className="md:col-span-5 bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-2xl border-2 border-amber-200 p-3 sm:p-4 flex flex-col justify-between items-center text-center shadow-inner">
            {/* Live Interactive Preview Box */}
            <div className="w-full min-h-[170px] sm:min-h-[190px] flex items-center justify-center relative rounded-xl bg-white/80 border border-amber-200/80 p-2 overflow-hidden shadow-sm">
              {activeTab === 'king' && (
                <KingAvatar 
                  mood="idle" 
                  costumeId={selectedItem.id} 
                  size="lg" 
                />
              )}

              {activeTab === 'squirrel' && (
                <div className="scale-125 my-4">
                  <SquirrelCompanion 
                    costumeId={selectedItem.id as SquirrelCostumeId}
                    showBubble={false}
                  />
                </div>
              )}

              {activeTab === 'palace' && (
                <div className="w-full h-36 rounded-xl overflow-hidden shadow">
                  <PalaceBackground 
                    theme="palace" 
                    palaceStyle={selectedItem.id as PalaceStyleId}
                    className="h-full border-2 border-amber-400"
                  >
                    <div className="flex items-center justify-center h-full">
                      <KingAvatar mood="idle" costumeId={activeCostumeId} size="sm" />
                    </div>
                  </PalaceBackground>
                </div>
              )}

              {activeTab === 'background' && (
                <div className="w-full h-36 rounded-xl overflow-hidden shadow">
                  <PalaceBackground 
                    theme={selectedItem.id as BackgroundThemeId}
                    className="h-full border-2 border-amber-400"
                  >
                    <div className="flex items-center justify-center h-full">
                      <KingAvatar mood="idle" costumeId={activeCostumeId} size="sm" />
                    </div>
                  </PalaceBackground>
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="w-full mt-2">
              <h3 className="font-black text-amber-950 text-base sm:text-lg flex items-center justify-center gap-1.5">
                <span>{selectedItem.emoji}</span>
                <span>{selectedItem.name}</span>
              </h3>
              <p className="text-xs text-amber-900 mt-1 leading-snug font-medium max-w-[280px] mx-auto">
                {selectedItem.description}
              </p>

              {selectedItem.specialGag && (
                <div className="mt-2 text-[11px] font-extrabold text-orange-700 bg-orange-100/90 px-2.5 py-1 rounded-lg border border-orange-300 flex items-center justify-center gap-1">
                  <span>✨</span>
                  <span>{selectedItem.specialGag}</span>
                </div>
              )}
            </div>

            {/* Equip / Buy Action Button */}
            <div className="w-full mt-3">
              {selectedItem.unlocked ? (
                <button
                  onClick={handleEquip}
                  disabled={isCurrentlyEquipped}
                  className={`w-full py-2.5 rounded-xl font-black text-xs sm:text-sm cartoon-btn transition-all ${
                    isCurrentlyEquipped
                      ? 'bg-slate-200 text-slate-500 cursor-default border border-slate-300'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md border border-emerald-600'
                  }`}
                >
                  {isCurrentlyEquipped ? 'ധരിച്ചിരിക്കുന്നു ✔' : 'ഇത് ഉപയോഗിക്കൂ!'}
                </button>
              ) : (
                <button
                  onClick={handleBuy}
                  disabled={coins < selectedItem.price}
                  className={`w-full py-2.5 rounded-xl font-black text-xs sm:text-sm cartoon-btn transition-all ${
                    coins >= selectedItem.price
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md border border-orange-600'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  {coins >= selectedItem.price ? (
                    <span>നാണയം നൽകി വാങ്ങൂ ({selectedItem.price} 🪙)</span>
                  ) : (
                    <span>നാണയം തികഞ്ഞില്ല ({selectedItem.price} 🪙 വേണം)</span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Items Grid (7 cols on md) */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-amber-950 uppercase tracking-wide">
                  ലഭ്യമായ ഇനങ്ങൾ ({currentCategory.items.length})
                </span>
                <span className="text-[11px] font-bold text-amber-700">
                  {currentCategory.items.filter(i => i.unlocked).length} അൺലോക്ക് ആയി
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {currentCategory.items.map((item) => {
                  const isSelected = currentCategory.previewId === item.id;
                  const isEquipped = currentCategory.activeId === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        sound.playPop();
                        currentCategory.setPreviewId(item.id);
                      }}
                      className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 shadow-md scale-102 ring-2 ring-amber-400/50'
                          : 'bg-white border-amber-200 hover:bg-amber-50/80 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                        {isEquipped ? (
                          <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-300">
                            ധരിച്ചത്
                          </span>
                        ) : !item.unlocked ? (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 border border-amber-300">
                            <Lock className="w-3 h-3 text-amber-700" /> {item.price} 🪙
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                            ഉണ്ട്
                          </span>
                        )}
                      </div>

                      <div className="font-black text-xs text-amber-950 leading-tight line-clamp-1">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-amber-800 line-clamp-1 mt-0.5 opacity-80">
                        {item.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Helpful Coin Tip at Bottom */}
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold text-amber-900">
              <span className="text-lg">💡</span>
              <span>കളികളിൽ വിജയിച്ചോ വ്യായാമ വെല്ലുവിളികൾ തീർത്തോ കൂടുതൽ നാണയങ്ങൾ 🪙 നേടൂ!</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
