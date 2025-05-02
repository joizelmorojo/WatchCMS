import { AmbientColor } from '@/components/decorations/ambient-color';
import DynamicZoneManager from '@/components/dynamic-zone/manager'
import { DynamicBgSections } from '@/components/dynamic-zone/dynamic-bg-section';

export default function PageContent({ pageData }: { pageData: any }) {
  const dynamicZone = pageData?.dynamic_zone;
  const bgSections = pageData?.bg_section;
  return (
    <div className="relative overflow-hidden w-full">
      {/* <AmbientColor /> */}
      {dynamicZone && (<DynamicZoneManager dynamicZone={dynamicZone} locale={pageData.locale} />)}
      {bgSections && <DynamicBgSections bgSections={bgSections} locale={pageData.locale} />}
    </div>
  );
}
