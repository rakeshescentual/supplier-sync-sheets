
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { OptimizationSettings } from "@/utils/optimizerUtils";

interface SettingsTabProps {
  settings: OptimizationSettings;
  onSettingsChange: (settings: OptimizationSettings) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onSettingsChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Optimization Balance</label>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>SEO Focus: {settings.seoFocus}%</span>
          <span>Conversion Focus: {settings.conversionFocus}%</span>
        </div>
        <Slider
          value={[settings.seoFocus]}
          min={0}
          max={100}
          step={10}
          onValueChange={(values) => onSettingsChange({
            ...settings,
            seoFocus: values[0],
            conversionFocus: 100 - values[0]
          })}
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Use Industry-Specific Terms</label>
          <Switch
            checked={settings.useIndustryTerms}
            onCheckedChange={(checked) => onSettingsChange({
              ...settings,
              useIndustryTerms: checked
            })}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Include Emoji (where appropriate)</label>
          <Switch
            checked={settings.includeEmoji}
            onCheckedChange={(checked) => onSettingsChange({
              ...settings,
              includeEmoji: checked
            })}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Maintain Brand Tone Consistency</label>
          <Switch
            checked={settings.toneConsistency}
            onCheckedChange={(checked) => onSettingsChange({
              ...settings,
              toneConsistency: checked
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
